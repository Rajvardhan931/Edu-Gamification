import uuid
import json
from app.repositories.career_repo import CareerRepository
from app.repositories.skill_repo import SkillRepository
from app.repositories.user_repo import UserRepository

def seed_data():
    career_repo = CareerRepository()
    skill_repo = SkillRepository()

    print("Starting Career System Seeding...")

    # 1. Define Careers
    careers_data = [
        {
            "id": str(uuid.uuid4()),
            "name": "Software Engineer",
            "description": "Master the art of building scalable systems and clean code.",
            "icon": "rocket"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Data Scientist",
            "description": "Uncover hidden patterns in data and build AI models.",
            "icon": "database"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Cybersecurity Engineer",
            "description": "Defend the digital realm from malicious actors.",
            "icon": "shield"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "UI/UX Designer",
            "description": "Craft intuitive and beautiful human-machine interfaces.",
            "icon": "palette"
        }
    ]

    for c in careers_data:
        career_repo.insert("careers", c)
        print(f"Seeded Career: {c['name']}")

    # 2. Define World Trees for each Career
    # Structure: CareerID -> List of (SkillName, Description, Nodes)
    # Node: (Name, Desc, x, y, prereq_id, xp, type)

    for career in careers_data:
        c_id = career['id']

        if career['name'] == "Software Engineer":
            branches = [
                ("Programming Fundamentals", "The basics of coding", [
                    {"name": "Introduction to Logic", "desc": "Basic boolean logic", "x": 50, "y": 90, "prereq": None, "xp": 100, "type": "knowledge"},
                    {"name": "Python Basics", "desc": "Python syntax and types", "x": 30, "y": 70, "prereq": "Introduction to Logic", "xp": 150, "type": "capability"},
                    {"name": "Java Core", "desc": "Strongly typed programming", "x": 70, "y": 70, "prereq": "Introduction to Logic", "xp": 150, "type": "capability"},
                ]),
                ("Data Structures", "Organizing information", [
                    {"name": "Arrays & Lists", "desc": "Linear data storage", "x": 30, "y": 50, "prereq": "Python Basics", "xp": 200, "type": "knowledge"},
                    {"name": "Trees & Graphs", "desc": "Hierarchical data", "x": 50, "y": 50, "prereq": "Arrays & Lists", "xp": 300, "type": "knowledge"},
                ]),
                ("Web Architecture", "How the internet works", [
                    {"name": "HTTP/HTTPS", "desc": "Request-response cycle", "x": 70, "y": 50, "prereq": "Java Core", "xp": 200, "type": "knowledge"},
                    {"name": "REST APIs", "desc": "Stateless communication", "x": 70, "y": 30, "prereq": "HTTP/HTTPS", "xp": 250, "type": "capability"},
                ])
            ]
        elif career['name'] == "Data Scientist":
            branches = [
                ("Mathematics", "The foundation of AI", [
                    {"name": "Linear Algebra", "desc": "Vectors and Matrices", "x": 50, "y": 90, "prereq": None, "xp": 100, "type": "knowledge"},
                    {"name": "Calculus", "desc": "Rates of change", "x": 30, "y": 70, "prereq": "Linear Algebra", "xp": 150, "type": "knowledge"},
                    {"name": "Statistics", "desc": "Data distribution", "x": 70, "y": 70, "prereq": "Linear Algebra", "xp": 150, "type": "knowledge"},
                ]),
                ("Data Analysis", "Cleaning and exploring", [
                    {"name": "Pandas & NumPy", "desc": "Data manipulation", "x": 30, "y": 50, "prereq": "Calculus", "xp": 200, "type": "capability"},
                    {"name": "Visualization", "desc": "Matplotlib & Seaborn", "x": 50, "y": 50, "prereq": "Pandas & NumPy", "xp": 300, "type": "capability"},
                ]),
                ("Machine Learning", "Predictive models", [
                    {"name": "Regression", "desc": "Predicting values", "x": 70, "y": 50, "prereq": "Statistics", "xp": 200, "type": "knowledge"},
                    {"name": "Neural Networks", "desc": "Mimicking the brain", "x": 70, "y": 30, "prereq": "Regression", "xp": 300, "type": "capability"},
                ])
            ]
        elif career['name'] == "Cybersecurity Engineer":
            branches = [
                ("Network Security", "Securing the flow", [
                    {"name": "TCP/IP Stack", "desc": "How packets move", "x": 50, "y": 90, "prereq": None, "xp": 100, "type": "knowledge"},
                    {"name": "Firewalls", "desc": "Packet filtering", "x": 30, "y": 70, "prereq": "TCP/IP Stack", "xp": 150, "type": "capability"},
                    {"name": "VPNs & Encryption", "desc": "Secure tunnels", "x": 70, "y": 70, "prereq": "TCP/IP Stack", "xp": 150, "type": "capability"},
                ]),
                ("Offensive Security", "Thinking like a hacker", [
                    {"name": "Penetration Testing", "desc": "Finding vulnerabilities", "x": 30, "y": 50, "prereq": "Firewalls", "xp": 200, "type": "capability"},
                    {"name": "Exploit Dev", "desc": "Writing payloads", "x": 50, "y": 50, "prereq": "Penetration Testing", "xp": 300, "type": "capability"},
                ]),
                ("Defensive Security", "Hardening systems", [
                    {"name": "SIEM", "desc": "Security monitoring", "x": 70, "y": 50, "prereq": "VPNs & Encryption", "xp": 200, "type": "knowledge"},
                    {"name": "Incident Response", "desc": "Handling breaches", "x": 70, "y": 30, "prereq": "SIEM", "xp": 250, "type": "capability"},
                ])
            ]
        else: # UI/UX
            branches = [
                ("Design Theory", "Visual language", [
                    {"name": "Color Theory", "desc": "Psychology of color", "x": 50, "y": 90, "prereq": None, "xp": 100, "type": "knowledge"},
                    {"name": "Typography", "desc": "The art of text", "x": 30, "y": 70, "prereq": "Color Theory", "xp": 150, "type": "knowledge"},
                    {"name": "Grid Systems", "desc": "Layout and balance", "x": 70, "y": 70, "prereq": "Color Theory", "xp": 150, "type": "knowledge"},
                ]),
                ("User Research", "Understanding the human", [
                    {"name": "User Personas", "desc": "Creating archetypes", "x": 30, "y": 50, "prereq": "Typography", "xp": 200, "type": "knowledge"},
                    {"name": "Usability Testing", "desc": "Validating designs", "x": 50, "y": 50, "prereq": "User Personas", "xp": 300, "type": "capability"},
                ]),
                ("Prototyping", "Bringing it to life", [
                    {"name": "Wireframing", "desc": "Low-fidelity blueprints", "x": 70, "y": 50, "prereq": "Grid Systems", "xp": 200, "type": "capability"},
                    {"name": "Interactive Prototypes", "desc": "Figma & Adobe XD", "x": 70, "y": 30, "prereq": "Wireframing", "xp": 250, "type": "capability"},
                ])
            ]

        # Seed branches and nodes
        for skill_name, skill_desc, node_list in branches:
            skill_id = str(uuid.uuid4())
            skill_repo.insert("skills", {
                "id": skill_id,
                "career_id": c_id,
                "name": skill_name,
                "description": skill_desc
            })

            node_map = {}
            for n in node_list:
                node_id = str(uuid.uuid4())
                node_map[n['name']] = node_id

                # Resolve prerequisite ID from the map
                prereq_id = None
                if n['prereq']:
                    # Find the ID of the prerequisite node we just created or will create
                    # Note: This requires the list to be in order.
                    # We'll just look up the name in the node_map.
                    prereq_id = node_map.get(n['prereq'])

                skill_repo.insert("nodes", {
                    "id": node_id,
                    "skill_id": skill_id,
                    "name": n['name'],
                    "description": n['desc'],
                    "x": n['x'],
                    "y": n['y'],
                    "prerequisite_id": prereq_id,
                    "xp_reward": n['xp'],
                    "xp_type": n['type']
                })

    print("Successfully seeded all careers and world trees!")

if __name__ == "__main__":
    seed_data()
