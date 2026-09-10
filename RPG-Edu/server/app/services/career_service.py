from app.repositories.career_repo import CareerRepository
from app.repositories.user_repo import UserRepository
from app.repositories.skill_repo import SkillRepository

class CareerService:
    """
    The Path-Finder. Manages career selection and initialization.
    """
    def __init__(self):
        self.career_repo = CareerRepository()
        self.user_repo = UserRepository()
        self.skill_repo = SkillRepository()

    def get_available_careers(self):
        """
        Returns a list of all careers that a new adventurer can choose from.
        """
        return self.career_repo.get_all_careers()

    def select_career(self, user_id: str, career_id: str):
        """
        Assigns a career to a user and unlocks their starting node.
        """
        # 1. Update profile with career_id
        self.user_repo.update_career(user_id, career_id)

        # 2. Unlock the first root node for this career
        nodes = self.skill_repo.get_nodes_by_career(career_id)
        root_nodes = [n for n in nodes if not n.get('prerequisite_id')]

        if root_nodes:
            # Unlock the first root node discovered
            first_node_id = root_nodes[0]['id']
            self.skill_repo.unlock_node(user_id, first_node_id)

        return {"message": "Career path chosen! Your journey begins now."}
