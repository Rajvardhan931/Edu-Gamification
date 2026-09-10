-- =============================================================================
-- SKILLQUEST DATABASE SCHEMA (Dual-Track Edition)
-- =============================================================================

-- 1. PROFILES: The "Character Sheet"
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE,
    knowledge_level INTEGER DEFAULT 1,
    capability_level INTEGER DEFAULT 1,
    total_xp INTEGER DEFAULT 0,
    class_type TEXT DEFAULT 'Novice',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. SKILLS: The Domain Categories
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 3. NODES: The Skill Tree Map
CREATE TABLE nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    prerequisite_id UUID REFERENCES nodes(id),
    xp_reward INTEGER NOT NULL,
    xp_type TEXT CHECK (xp_type IN ('knowledge', 'capability')),
    content_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 4. USER_SKILLS: The Global Skill Ledger
CREATE TABLE user_skills (
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    node_id UUID REFERENCES nodes(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('locked', 'unlocked', 'completed')) DEFAULT 'locked',
    proficiency_level INTEGER DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY (user_id, node_id)
);

-- 5. QUESTS: The Actionable Tasks
CREATE TABLE quests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID REFERENCES nodes(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    requirement_type TEXT CHECK (requirement_type IN ('quiz', 'project', 'research')),
    reward_xp INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- INDICES
CREATE INDEX idx_nodes_prereq ON nodes(prerequisite_id);
CREATE INDEX idx_user_skills_user ON user_skills(user_id);
CREATE INDEX idx_user_skills_node ON user_skills(node_id);

-- TRIGGER FOR UPDATED_AT
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_modtime
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE PROCEDURE update_modified_column();
