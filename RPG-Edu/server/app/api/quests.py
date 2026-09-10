from flask import Blueprint, jsonify, request
from app.services.quest_service import QuestService
from app.services.auth_service import AuthService

quests_bp = Blueprint('quests', __name__)
quest_service = QuestService()
auth_service = AuthService()

def get_authenticated_user():
    """Helper to verify JWT and return user ID."""
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return None

    token = auth_header.split(' ')[1]
    user = auth_service.verify_token(token)
    return user.id if user else None

@quests_bp.route('/delivery', methods=['GET'])
def delivery():
    user_id = get_authenticated_user()
    if not user_id:
        return jsonify({"error": "Your Adventurer's Pass is missing or expired"}), 401

    node_id = request.args.get('node_id')
    if not node_id:
        return jsonify({"error": "node_id is required to fetch a quest"}), 400

    try:
        quest = quest_service.get_quest_for_node(node_id)
        if not quest:
            return jsonify({"error": "No quest associated with this skill node"}), 404

        return jsonify({
            "quest": quest,
            "node_id": node_id,
            "message": "A new trial awaits you!"
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@quests_bp.route('/submit', methods=['POST'])
def submit():
    user_id = get_authenticated_user()
    if not user_id:
        return jsonify({"error": "Your Adventurer's Pass is missing or expired"}), 401

    data = request.get_json()
    node_id = data.get('node_id')
    proof = data.get('proof')

    if not node_id or not proof:
        return jsonify({"error": "Both node_id and proof are required"}), 400

    try:
        # 1. Validate proof
        is_valid, message = quest_service.validate_proof({"proof": proof})
        if not is_valid:
            return jsonify({"error": message}), 400

        # 2. Complete quest and trigger rewards
        result = quest_service.complete_quest(user_id, node_id)

        return jsonify({
            "message": "Trial completed! Your mastery grows.",
            "reward": result['reward'],
            "unlocked_nodes": result['unlocked_nodes']
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
