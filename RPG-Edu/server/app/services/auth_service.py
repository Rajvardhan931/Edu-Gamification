from supabase import create_client, Client
from app.utils.config import Config

class AuthService:
    """
    Handles the "Adventurer's Pass" (Authentication).
    """
    def __init__(self):
        self.client: Client = create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)

    def verify_token(self, token: str):
        """
        Verifies a JWT token with Supabase.
        Returns the user object if valid, None otherwise.
        """
        try:
            # Supabase admin client can get user by JWT
            user = self.client.auth.get_user(token)
            return user
        except Exception as e:
            print(f"Token verification failed: {e}")
            return None

    def signup(self, email, password, username):
        """
        Creates a new user in Supabase Auth.
        """
        try:
            response = self.client.auth.sign_up({
                "email": email,
                "password": password,
            })
            # Note: In a real app, we'd need to handle email confirmation.
            # For the demo, we assume the user is created.
            return response
        except Exception as e:
            print(f"Signup failed: {e}")
            raise e

    def login(self, email, password):
        """
        Authenticates a user and returns the session.
        """
        try:
            response = self.client.auth.sign_in_with_password({
                "email": email,
                "password": password,
            })
            return response
        except Exception as e:
            print(f"Login failed: {e}")
            raise e
