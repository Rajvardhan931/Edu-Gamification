# 🎮 SkillQuest Demo Sequence

This document outlines the exact sequence of actions for the live presentation to showcase the "Knowing vs. Doing" dual-track progression.

## 🏁 The Goal
Demonstrate a seamless loop from **Identity $\rightarrow$ Exploration $\rightarrow$ Action $\rightarrow$ Reward**.

---

## 🎬 Scene 1: The Gateway (Identity)
**Goal:** Show the RPG-themed entry and character creation.

1. **Action:** Open `http://localhost:3000/auth`.
2. **Narrative:** *"Every adventurer starts as a Novice. Let's create a legend."*
3. **Interaction:** 
   - Click "I am a new Adventurer".
   - Enter: `HeroName`, `email@example.com`, `password`.
   - Click **"Begin Journey"**.
4. **Expected Result:** Redirect to the Dashboard.

---

## 🏛️ Scene 2: The Adventurer's Hub (Soul)
**Goal:** Introduce the Dual-Track Profile.

1. **Action:** View `/dashboard`.
2. **Narrative:** *"Here is the Character Sheet. Notice the two tracks: Knowledge (Knowing) and Capability (Doing). We start at Level 1 for both."*
3. **Interaction:** Point out the empty XP bars and the 'Novice' class.
4. **Action:** Click **"Open Skill Map"**.

---

## 🗺️ Scene 3: The World Map (Exploration)
**Goal:** Showcase the hierarchical learning path.

1. **Action:** View `/map`.
2. **Narrative:** *"The World Map reveals the path to mastery. Root nodes are unlocked, but advanced skills are locked behind prerequisites."*
3. **Interaction:** 
   - Hover over a **Locked Node** (Grey) $\rightarrow$ *"This is locked until we prove our base knowledge."*
   - Click an **Unlocked Node** (Amber) $\rightarrow$ `Basics of LLMs`.
4. **Interaction:** In the modal, click **"Embark on Quest"**.

---

## ⚔️ Scene 4: The Trial (Action)
**Goal:** Prove skill and trigger the progression engine.

1. **Action:** View `/quests/[nodeId]`.
2. **Narrative:** *"To unlock this skill, we must complete a trial. In this case, a Knowledge Quiz."*
3. **Interaction:** 
   - Enter a mock proof in the textarea (e.g., *"Completed the LLM basics module"*).
   - Click **"Submit Proof"**.
4. **Expected Result:** The **Level Up!** modal appears with an XP explosion.

---

## 🏆 Scene 5: The Full Circle (Reward)
**Goal:** Verify the character has evolved.

1. **Action:** Click "Continue Journey" $\rightarrow$ Redirect to `/dashboard`.
2. **Narrative:** *"Our adventurer has grown. Look at the Knowledge track—the XP bar has filled, and our total mastery has increased."*
3. **Interaction:** Point to the updated XP bar on the Profile Card.
4. **Closing:** *"This loop—Knowing $\rightarrow$ Doing $\rightarrow$ Growing—is the heart of SkillQuest."*
