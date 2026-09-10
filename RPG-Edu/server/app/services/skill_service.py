from app.repositories.skill_repo import SkillRepository
from app.repositories.user_repo import UserRepository

class SkillService:
    """
    The Map-Maker. Assembles the hierarchy and validates unlock status.
    """
    def __init__(self):
        self.skill_repo = SkillRepository()
        self.user_repo = UserRepository()

    def get_skill_tree(self, user_id: str):
        """
        Returns the career-specific skill tree with user-specific status for each node.
        """
        # 1. Get user's career
        profile = self.user_repo.get_user_profile(user_id)
        if not profile:
            raise Exception("User profile not found")

        career_id = profile.get('career_id')
        if not career_id:
            raise Exception("User has not selected a career path yet")

        # 2. Fetch nodes specifically for this career
        all_nodes = self.skill_repo.get_nodes_by_career(career_id)
        user_progress = self.skill_repo.get_user_progress(user_id)

        # Map user progress for O(1) lookup
        progress_map = {
            p['node_id']: p['status']
            for p in user_progress
        } if user_progress else {}

        tree = []
        for node in all_nodes:
            status = progress_map.get(node['id'], 'locked')

            # Logic: A node is 'available' if its prerequisite is 'completed'
            # Root nodes (no prereq) are always available if not already progresssed.
            prereq_id = node.get('prerequisite_id')
            if prereq_id:
                prereq_status = progress_map.get(prereq_id, 'locked')
                if prereq_status == 'completed' and status == 'locked':
                    status = 'available'
            else:
                # Root node
                if status == 'locked':
                    status = 'available'

            tree.append({
                **node,
                "user_status": status
            })

        return tree
