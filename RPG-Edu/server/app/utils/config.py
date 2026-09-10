import os
from dotenv import load_dotenv

# Load .env file from the root of the server directory
# Since run.py is in /server, and .env is usually in /server,
# load_dotenv() without arguments works if executed from /server.
load_dotenv()

class Config:
    """
    Central configuration for the SkillQuest backend.
    Reads environment variables and provides typed access.
    """
    SUPABASE_URL = os.getenv('SUPABASE_URL')
    SUPABASE_KEY = os.getenv('SUPABASE_KEY')
    FLASK_PORT = int(os.getenv('PORT', 5000))
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')

    @staticmethod
    def validate():
        """Ensures critical environment variables are present."""
        missing = []
        if not Config.SUPABASE_URL: missing.append('SUPABASE_URL')
        if not Config.SUPABASE_KEY: missing.append('SUPABASE_KEY')

        if missing:
            raise EnvironmentError(
                f"Missing critical environment variables: {', '.join(missing)}. "
                "Please check your server/.env file."
            )
