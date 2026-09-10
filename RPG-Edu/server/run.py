from flask import Flask
from flask_cors import CORS
from app.api.auth import auth_bp
from app.api.user import user_bp
from app.api.skills import skills_bp
from app.api.quests import quests_bp
from app.utils.config import Config

def create_app():
    # Validate environment before starting the app
    try:
        Config.validate()
    except EnvironmentError as e:
        print(f"FATAL ERROR: {e}")
        exit(1)

    app = Flask(__name__)

    # Finalize CORS Setup: Allow requests from the Next.js frontend (Local & Vercel)
    # In production, these should be moved to Config.ALLOWED_ORIGINS
    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "https://*.vercel.app"]}})

    # Register Blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api/user')
    app.register_blueprint(skills_bp, url_prefix='/api/skills')
    app.register_blueprint(quests_bp, url_prefix='/api/quests')

    @app.route('/health')
    def health():
        return {"status": "healthy", "message": "SkillQuest Backend is running"}, 200

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=Config.FLASK_PORT)
