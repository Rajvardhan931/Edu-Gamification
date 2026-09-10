from .base_repo import BaseRepository

class UserRepository(BaseRepository):
    """
    Repository for managing User Profiles and their RPG progression.
    """
    TABLE = "profiles"

    def get_user_profile(self, user_id: str):
        """
        Fetches a user's complete profile, including dual-track levels.
        """
        filters = {"id": user_id}
        results = self.select(self.TABLE, filters=filters)
        return results[0] if results else None

    def update_profile_data(self, user_id: str, data: dict):
        """
        Updates arbitrary fields in the user profile.
        """
        filters = {"id": user_id}
        return self.update(self.TABLE, filters=filters, data=data)

    def update_career(self, user_id: str, career_id: str):
        """
        Sets the user's chosen career path.
        """
        return self.update_profile_data(user_id, {"career_id": career_id})

    def create_profile(self, user_id: str, username: str, career_id: str = None):
        """
        Initializes a new character profile upon signup.
        """
        data = {
            "id": user_id,
            "username": username,
            "career_id": career_id,
            "knowledge_xp": 0,
            "capability_xp": 0,
            "knowledge_level": 1,
            "capability_level": 1,
            "total_xp": 0,
            "class_type": "Novice"
        }
        return self.insert(self.TABLE, data)
