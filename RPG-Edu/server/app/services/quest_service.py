from app.repositories.base_repo import BaseRepository
from app.repositories.skill_repo import SkillRepository
from app.services.xp_service import XPService

class QuestService:
    """
    Handles the delivery and validation of Quests.
    """
    def __init__(self):
        self.base_repo = BaseRepository()
        self.skill_repo = SkillRepository()
        self.xp_service = XPService()
        self.QUESTS_TABLE = "quests"

    def get_quest_for_node(self, node_id: str):
        """
        Fetches the quest details associated with a specific skill node.
        """
        filters = {"node_id": node_id}
        results = self.base_repo.select(self.QUESTS_TABLE, filters=filters)
        return results[0] if results else None

    def validate_proof(self, proof_data: dict):
        """
        Mock validation logic for the demo.
        Always returns True if proof is provided.
        """
        # In a real app, this would check a GitHub API or run a test suite.
        if not proof_data or not proof_data.get('proof'):
            return False, "No proof of skill provided."

        return True, "Proof validated successfully."

    def complete_quest(self, user_id: str, node_id: str):
        """
        The closing loop: Validate $\rightarrow$ Grant XP $\rightarrow$ Unlock Progression.
        """
        # 1. Fetch the quest to know the reward
        quest = self.get_quest_for_node(node_id)
        if not quest:
            raise ValueError("Quest not found for this node.")

        # 2. Grant XP via XPService (handles dual-track logic)
        # We determine activity type from the quest's requirement_type
        activity_type = quest.get('requirement_type', 'quiz')
        self.xp_service.grant_xp(user_id, activity_type, quest.get('reward_xp', 100))

        # 3. Mark the node as completed in the Skill Ledger
        self.skill_repo.mark_node_completed(user_id, node_id)

        # 4. Unlock descendants
        # Find all nodes that have this node as a prerequisite
        all_nodes = self.skill_repo.get_all_nodes()
        descendants = [n['id'] for n in all_nodes if n.get('prerequisite_id') == node_id]

        for d_id in descendants:
            self.skill_repo.unlock_node(user_id, d_id)

        return {
            "status": "success",
            "reward": quest.get('reward_xp'),
            "unlocked_nodes": descendants
        }
