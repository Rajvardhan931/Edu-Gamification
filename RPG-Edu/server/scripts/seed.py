import os
from supabase import create_client
from app.utils.config import Config

def seed_database():
    print("🚀 Starting SkillQuest Content Seeding...")
    supabase = create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)

    # 1. Seed Skills (Domain Categories)
    ai_skill_data = {
        "name": "AI Engineering",
        "description": "The art and science of building production-ready LLM applications.",
        "category": "AI"
    }
    skill_res = supabase.table("skills").insert(ai_skill_data).execute()
    skill_id = skill_res.data[0]['id']
    print(f"✅ Seeded Skill: AI Engineering ({skill_id})")

    # 2. Seed Nodes (The Skill Tree)
    # We define them in order so we can use the IDs for prerequisites
    nodes = [
        {
            "name": "Basics of LLMs",
            "description": "Understanding Transformers, Tokens, and Probabilistic Next-Token Prediction.",
            "xp_reward": 100,
            "xp_type": "knowledge",
            "content_url": "https://example.com/llm-basics"
        },
        {
            "name": "Prompt Engineering",
            "description": "Mastering Few-Shot, Chain-of-Thought, and System Prompting.",
            "xp_reward": 150,
            "xp_type": "capability",
            "content_url": "https://example.com/prompt-eng"
        },
        {
            "name": "RAG Architecture",
            "description": "Retrieval Augmented Generation: Bridging LLMs with external data.",
            "xp_reward": 200,
            "xp_type": "knowledge",
            "content_url": "https://example.com/rag-arch"
        },
        {
            "name": "Vector Databases",
            "description": "Implementing HNSW, Cosine Similarity, and Semantic Search.",
            "xp_reward": 250,
            "xp_type": "capability",
            "content_url": "https://example.com/vector-db"
        },
        {
            "name": "Agentic Workflows",
            "description": "Building autonomous loops with Tool Use and Planning.",
            "xp_reward": 400,
            "xp_type": "capability",
            "content_url": "https://example.com/agents"
        },
    ]

    node_ids = {}
    for node in nodes:
        # Determine prerequisite
        # Simple linear dependency for the demo: each node depends on the previous one
        # except the first.
        prereq_id = None
        if node["name"] == "Prompt Engineering":
            prereq_id = node_ids.get("Basics of LLMs")
        elif node["name"] == "RAG Architecture":
            prereq_id = node_ids.get("Basics of LLMs")
        elif node["name"] == "Vector Databases":
            prereq_id = node_ids.get("RAG Architecture")
        elif node["name"] == "Agentic Workflows":
            # Final node depends on both Prompting and Vector DBs (simplified to one for DB schema)
            prereq_id = node_ids.get("Vector Databases")

        node_data = {
            "skill_id": skill_id,
            "name": node["name"],
            "description": node["description"],
            "prerequisite_id": prereq_id,
            "xp_reward": node["xp_reward"],
            "xp_type": node["xp_type"],
            "content_url": node["content_url"]
        }
        res = supabase.table("nodes").insert(node_data).execute()
        node_id = res.data[0]['id']
        node_ids[node["name"]] = node_id
        print(f"✅ Seeded Node: {node['name']} ({node_id})")

    # 3. Seed Quests
    # Create a quest for each node
    for node_name, node_id in node_ids.items():
        quest_data = {
            "node_id": node_id,
            "title": f"The Trial of {node_name}",
            "description": f"Complete a practical challenge to prove your mastery of {node_name}.",
            "requirement_type": "project" if "capability" in str(node_id) else "quiz", # Mock logic
            "reward_xp": 100 # Standardized for seed
        }
        supabase.table("quests").insert(quest_data).execute()

    print("\n🎉 World map successfully seeded! The realm is ready for adventurers.")

if __name__ == "__main__":
    seed_database()
