// All communication with the real GitHub REST API happens in this file.
// Components never call fetch() directly — they call these functions.
// This makes it easy to test, and easy to add auth headers in one place.

const BASE_URL = 'https://api.github.com';

// Optional: if you create a .env file with VITE_GITHUB_TOKEN=xxxx,
// requests get a much higher rate limit (5000/hr instead of 60/hr).
const token = import.meta.env.VITE_GITHUB_TOKEN;

const headers = token
  ? { Authorization: `Bearer ${token}` }
  : {};

async function handleResponse(res, notFoundMessage) {
  if (res.status === 404) {
    throw new Error(notFoundMessage || 'Not found');
  }
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }
  return res.json();
}

// Module 2 & 3: fetch a single user's profile
export async function getUser(username) {
  const res = await fetch(`${BASE_URL}/users/${username}`, { headers });
  return handleResponse(res, `User "${username}" not found`);
}

// Module 3: repos belonging to a user
export async function getUserRepos(username) {
  const res = await fetch(
    `${BASE_URL}/users/${username}/repos?per_page=100&sort=updated`,
    { headers }
  );
  return handleResponse(res, `Could not load repos for "${username}"`);
}

// Module 3: followers / following lists
export async function getUserFollowers(username) {
  const res = await fetch(`${BASE_URL}/users/${username}/followers`, {
    headers,
  });
  return handleResponse(res);
}

export async function getUserFollowing(username) {
  const res = await fetch(`${BASE_URL}/users/${username}/following`, {
    headers,
  });
  return handleResponse(res);
}

// Module 4: single repository details
export async function getRepo(owner, repo) {
  const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}`, { headers });
  return handleResponse(res, `Repository "${owner}/${repo}" not found`);
}

export async function getRepoContributors(owner, repo) {
  const res = await fetch(
    `${BASE_URL}/repos/${owner}/${repo}/contributors`,
    { headers }
  );
  return handleResponse(res);
}

export async function getRepoIssues(owner, repo) {
  const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}/issues`, {
    headers,
  });
  return handleResponse(res);
}

export async function getRepoBranches(owner, repo) {
  const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}/branches`, {
    headers,
  });
  return handleResponse(res);
}

export async function getRepoCommits(owner, repo) {
  const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}/commits`, {
    headers,
  });
  return handleResponse(res);
}

// Module 7: advanced search with filters (language, stars, forks, sort)
export async function searchRepos({
  query,
  language,
  minStars,
  sort = 'stars',
}) {
  let q = query || '';
  if (language) q += ` language:${language}`;
  if (minStars) q += ` stars:>=${minStars}`;

  const res = await fetch(
    `${BASE_URL}/search/repositories?q=${encodeURIComponent(
      q.trim() || 'stars:>1'
    )}&sort=${sort}&order=desc`,
    { headers }
  );
  return handleResponse(res);
}
