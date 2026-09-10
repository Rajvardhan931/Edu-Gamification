import requests
import os
from dotenv import load_dotenv

load_dotenv('server/.env')

BASE_URL = "http://localhost:5000/api"
# Replace with a real user created via signup
TEST_USER = {
    "email": "test@skillquest.com",
    "password": "Password123!",
    "username": "DemoHero"
}

def test_happy_path():
    print("🚀 Starting Happy Path Smoke Test...")

    # 1. Signup
    print("\n--- Step 1: Signup ---")
    signup_res = requests.post(f"{BASE_URL}/auth/signup", json=TEST_USER)
    print(f"Signup Status: {signup_res.status_code}")

    # 2. Login
    print("\n--- Step 2: Login ---")
    login_res = requests.post(f"{BASE_URL}/auth/login", json={
        "email": TEST_USER["email"],
        "password": TEST_USER["password"]
    })
    token = login_res.json().get('token')
    print(f"Login Status: {login_res.status_code} | Token acquired: {token is not None}")

    headers = {"Authorization": f"Bearer {token}"}

    # 3. Get Stats
    print("\n--- Step 3: Fetch Stats ---")
    stats_res = requests.get(f"{BASE_URL}/user/stats", headers=headers)
    print(f"Stats Status: {stats_res.status_code} | Class: {stats_res.json().get('class')}")

    # 4. Get Skill Tree
    print("\n--- Step 4: Fetch Tree ---")
    tree_res = requests.get(f"{BASE_URL}/skills/tree", headers=headers)
    nodes = tree_res.json().get('tree', [])
    print(f"Tree Status: {tree_res.status_code} | Nodes found: {len(nodes)}")

    # 5. Get a Quest for the first unlocked node
    unlocked_node = next((n for n in nodes if n['user_status'] == 'unlocked'), None)
    if not unlocked_node:
        print("❌ No unlocked nodes found!")
        return

    node_id = unlocked_node['id']
    print(f"\n--- Step 5: Fetch Quest for {unlocked_node['name']} ---")
    quest_res = requests.get(f"{BASE_URL}/quests/delivery?node_id={node_id}", headers=headers)
    print(f"Quest Status: {quest_res.status_code}")

    # 6. Submit Proof
    print("\n--- Step 6: Submit Proof ---")
    submit_res = requests.post(f"{BASE_URL}/quests/submit",
                               json={"node_id": node_id, "proof": "https://github.com/demo/proof"},
                               headers=headers)
    print(f"Submission Status: {submit_res.status_code} | Result: {submit_res.json().get('message')}")

    # 7. Verify Progression
    print("\n--- Step 7: Verify Level Up ---")
    final_stats = requests.get(f"{BASE_URL}/user/stats", headers=headers).json()
    print(f"Total XP: {final_stats['stats']['total_xp']}")

    print("\n🎉 Happy Path Smoke Test Completed!")

if __name__ == "__main__":
    try:
        test_happy_path()
    except Exception as e:
        print(f"❌ Test failed with error: {e}")
