from flask import Blueprint, jsonify, request
from app.services.auth_service import AuthService
from app.repositories.user_repo import UserRepository

auth_bp = Blueprint('auth', __name__)
auth_service = AuthService()
user_repo = UserRepository()

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')

    if not all([email, password, username]):
        return jsonify({"error": "Email, password, and username are required"}), 400

    try:
        # 1. Create user in Supabase Auth
        auth_response = auth_service.signup(email, password, username)
        user = auth_response.user

        # 2. Create the RPG character profile
        user_repo.create_profile(user.id, username)

        return jsonify({
            "message": "Adventurer registered successfully!",
            "user": {
                "id": user.id,
                "email": user.email,
                "username": username
            }
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    try:
        # Authenticate via Supabase
        session = auth_service.login(email, password)

        return jsonify({
            "message": "Welcome back, Adventurer!",
            "token": session.session.access_token,
            "user": {
                "id": session.user.id,
                "email": session.user.email
            }
        }), 200
    except Exception as e:
        return jsonify({"error": "Invalid credentials or authentication failure"}), 401
