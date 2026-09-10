from app.repositories.user_repo import UserRepository
import math

class XPService:
    """
    The Engine of Progression. Handles the logic of "Knowing" vs "Doing".
    """
    def __init__(self):
        self.user_repo = UserRepository()

    def _calculate_level(self, xp: int) -> int:
        """
        Simple RPG leveling formula: Level = floor(sqrt(XP / 100)) + 1
        """
        if xp < 0: return 1
        return math.floor(math.sqrt(xp / 100)) + 1

    def calculate_dual_track_xp(self, activity_type: str, base_xp: int):
        """
        Routes XP to the correct track based on the nature of the achievement.
        """
        # Route to Capability if it's a 'project' or 'implementation'
        # Route to Knowledge if it's a 'quiz', 'research', or 'reading'
        capability_types = ['project', 'implementation', 'code', 'deployment']

        track = 'capability' if activity_type.lower() in capability_types else 'knowledge'
        return track, base_xp

    def grant_xp(self, user_id: str, activity_type: str, amount: int):
        """
        The primary entry point for granting progression.
        """
        track, xp_gain = self.calculate_dual_track_xp(activity_type, amount)

        # 1. Get current profile
        profile = self.user_repo.get_user_profile(user_id)
        if not profile:
            raise ValueError(f"User profile not found for ID: {user_id}")

        # 2. Calculate new totals
        curr_knowledge_xp = profile.get('knowledge_xp', 0)
        curr_capability_xp = profile.get('capability_xp', 0)
        curr_total_xp = profile.get('total_xp', 0)

        new_total_xp = curr_total_xp + xp_gain

        if track == 'knowledge':
            new_k_xp = curr_knowledge_xp + xp_gain
            new_k_lvl = self._calculate_level(new_k_xp)
            new_c_lvl = profile.get('capability_level', 1)

            update_data = {
                "knowledge_xp": new_k_xp,
                "knowledge_level": new_k_lvl,
                "total_xp": new_total_xp
            }
        else:
            new_c_xp = curr_capability_xp + xp_gain
            new_c_lvl = self._calculate_level(new_c_xp)
            new_k_lvl = profile.get('knowledge_level', 1)

            update_data = {
                "capability_xp": new_c_xp,
                "capability_level": new_c_lvl,
                "total_xp": new_total_xp
            }

        # 3. Update Database
        return self.user_repo.update_profile_data(user_id, update_data)
