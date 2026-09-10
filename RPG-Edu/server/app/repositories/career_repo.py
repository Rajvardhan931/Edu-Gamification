from .base_repo import BaseRepository

class CareerRepository(BaseRepository):
    """
    Repository for managing Career Paths.
    """
    TABLE = "careers"

    def get_all_careers(self):
        """
        Fetches all available career options.
        """
        return self.select(self.TABLE)

    def get_career_by_id(self, career_id: str):
        """
        Fetches details for a specific career.
        """
        filters = {"id": career_id}
        results = self.select(self.TABLE, filters=filters)
        return results[0] if results else None
