from supabase import create_client, Client
from app.utils.config import Config

class BaseRepository:
    """
    Abstract Base Repository providing a common interface for Supabase interactions.
    All other repositories (UserRepository, SkillRepository, etc.) inherit from this.
    """
    def __init__(self):
        # Initialize the Supabase client using the centralized config
        self.url: str = Config.SUPABASE_URL
        self.key: str = Config.SUPABASE_KEY

        try:
            self.client: Client = create_client(self.url, self.key)
        except Exception as e:
            # In a real app, we would use a proper logger here
            print(f"Error initializing Supabase client: {e}")
            self.client = None

    def _execute_query(self, table: str, query_fn):
        """
        Generic wrapper to handle common Supabase query operations and error handling.

        :param table: The name of the table to query.
        :param query_fn: A lambda or function that defines the query chain.
        :return: The result of the query.
        """
        if not self.client:
            raise ConnectionError("Supabase client is not initialized. Check your configuration.")

        try:
            # Execute the provided query function on the specified table
            response = query_fn(self.client.table(table))
            # If the response has a .data attribute (standard for supabase-py), return it
            return getattr(response, 'data', response)
        except Exception as e:
            print(f"Database error on table {table}: {e}")
            return None

    def select(self, table: str, columns: str = "*", filters: dict = None):
        """Generic select operation with optional equality filters."""
        def query_fn(t):
            q = t.select(columns)
            if filters:
                for key, value in filters.items():
                    q = q.eq(key, value)
            return q.execute()
        return self._execute_query(table, query_fn)

    def insert(self, table: str, data: dict):
        """Generic insert operation."""
        def query_fn(t):
            return t.insert(data).execute()
        return self._execute_query(table, query_fn)

    def update(self, table: str, filters: dict, data: dict):
        """Generic update operation with equality filters."""
        def query_fn(t):
            q = t.update(data)
            if filters:
                for key, value in filters.items():
                    q = q.eq(key, value)
            return q.execute()
        return self._execute_query(table, query_fn)

    def delete(self, table: str, filters: dict):
        """Generic delete operation with equality filters."""
        def query_fn(t):
            q = t.delete()
            if filters:
                for key, value in filters.items():
                    q = q.eq(key, value)
            return q.execute()
        return self._execute_query(table, query_fn)
