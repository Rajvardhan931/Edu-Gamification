const BASE_URL = 'http://localhost:5000';

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function signup(heroName: string, email: string, password: string) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ heroName, email, password })
  });
  if (!res.ok) throw new Error('Signup failed');
  return res.json();
}

export async function getUserStats(token: string) {
  const res = await fetch(`${BASE_URL}/user/stats`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch user stats');
  return res.json();
}

export async function listCareers(token: string) {
  const res = await fetch(`${BASE_URL}/user/careers`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch careers');
  return res.json();
}

export async function selectCareer(token: string, careerId: string) {
  const res = await fetch(`${BASE_URL}/user/select-career`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ career_id: careerId })
  });
  if (!res.ok) throw new Error('Failed to select career');
  return res.json();
}

export async function getSkillTree(token: string) {
  const res = await fetch(`${BASE_URL}/skills/tree`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch skill tree');
  return res.json();
}

export async function submitQuest(token: string, nodeId: string, proof: string) {
  const res = await fetch(`${BASE_URL}/quests/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ nodeId, proof })
  });
  if (!res.ok) throw new Error('Failed to submit quest');
  return res.json();
}
