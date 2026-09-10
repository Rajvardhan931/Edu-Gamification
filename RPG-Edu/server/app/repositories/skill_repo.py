from .base_repo import BaseRepository

class SkillRepository(BaseRepository):
    """
    Repository for the Skill Tree (Nodes and Skills).
    """
    NODES_TABLE = "nodes"
    SKILLS_TABLE = "skills"
    USER_SKILLS_TABLE = "user_skills"

    def get_nodes_by_career(self, career_id: str):
        """
        Fetches all nodes belonging to a specific career.
        Joins nodes with skills to filter by career_id.
        """
        # Since BaseRepository.select doesn't support complex joins directly in a simple way,
        # we use a raw-ish select if needed or filter.
        # For simplicity, we'll fetch nodes that are linked to skills of that career.
        # In a real Supabase environment, we'd use a join.
        # Here, we'll use the select method and filter in Python or use a custom query if the base supports it.

        # This is a simplified approach for the mockup repository:
        # 1. Get all skills for the career
        skills = self.select(self.SKILLS_TABLE, filters={"career_id": career_id})
        skill_ids = [s['id'] for s in skills]

        # 2. Get all nodes for those skills
        # BaseRepository.select usually takes a dict of filters.
        # For 'IN' queries, we might need to iterate or modify the base_repo.
        all_nodes = self.select(self.NODES_TABLE)
        return [n for n in all_nodes if n['skill_id'] in skill_ids]

    def get_user_progress(self, user_id: str):
        """
        Fetches all skill nodes a specific user has interacted with.
        """
        filters = {"user_id": user_id}
        return self.select(self.USER_SKILLS_TABLE, filters=filters)

    def update_node_status(self, user_id: str, node_id: str, status: str):
        """
        Updates the status of a node for a user.
        """
        filters = {"user_id": user_id, "node_id": node_id}
        data = {"status": status}

        result = self.update(self.USER_SKILLS_TABLE, filters=filters, data=data)
        if not result:
            return self.insert(self.USER_SKILLS_TABLE, {
                "user_id": user_id,
                "node_id": node_id,
                "status": status
            })
        return result

    def mark_node_completed(self, user_id: str, node_id: str):
        """
        Marks a node as completed for the user.
        """
        return self.update_node_status(user_id, node_id, "completed")

    def unlock_node(self, user_id: str, node_id: str):
        """
        Changes a node status to 'available'.
        """
        return self.update_node_status(user_id, node_id, "available")
