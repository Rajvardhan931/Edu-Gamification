from flask import Blueprint, jsonify, request
from app.services.skill_service import SkillService
from app.services.auth_service import AuthService

skills_bp = Blueprint('skills', __name__)
skill_service = SkillService()
auth_service = AuthService()

def get_authenticated_user():
    """Helper to verify JWT and return user ID."""
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return None

    token = auth_header.split(' ')[1]
    user = auth_service.verify_token(token)
    return user.id if user else None

@skills_bp.route('/tree', methods=['GET'])
def get_tree():
    user_id = get_authenticated_user()
    if not user_id:
        return jsonify({"error": "Your Adventurer's Pass is missing or expired"}), 401

    try:
        tree = skill_service.get_skill_tree(user_id)
        return jsonify({
            "tree": tree,
            "message": "The world map has been revealed."
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
