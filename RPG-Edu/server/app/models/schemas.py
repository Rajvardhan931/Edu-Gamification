from dataclasses import dataclass
from typing import Optional, List

@dataclass
class UserProfile:
    user_id: str
    knowledge_level: int
    capability_level: int
    total_xp: int

@dataclass
class SkillNode:
    node_id: str
    name: str
    prerequisite_id: Optional[str]
    xp_reward: int
    xp_type: str # 'knowledge' or 'capability'
