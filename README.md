# GitHub Workspace

A mini GitHub client built with React, React Router, and the Context API.
Search developers and repositories, explore profiles, build repository
collections, favorite users/repos, and track your recent activity — all
backed by the real GitHub REST API.

## Tech Stack
- React 18 (functional components + hooks)
- React Router v6 (routing, protected routes, dynamic routes, query params)
- Context API + `useReducer` (state management — no Redux)
- Vite (build tool / dev server)
- GitHub REST API (no auth required for read access)

## Getting Started

```bash
npm install
npm run dev
```
Then open the local URL Vite prints (usually http://localhost:5173).

Optional: copy `.env.example` to `.env` and add a GitHub personal access
token to raise the API rate limit from 60/hr to 5000/hr.

## Project Structure

```
src/
├── app/            # AppProviders — composes all context providers
├── routes/         # route definitions + ProtectedRoute
├── pages/          # one folder per page/module
├── components/
│   ├── common/     # Navbar, Sidebar, Card, Modal, Table, Tabs, Pagination...
│   ├── users/      # UserCard
│   ├── repositories/ # RepoCard
│   └── layout/     # AppLayout (Navbar + Sidebar shell)
├── hooks/          # useFetch, useDebounce, useLocalStorage, usePagination
├── context/         # Auth, Favorites, Collections, Notifications, Settings, Activity
├── reducers/        # reducer + action types for each Context that uses useReducer
├── services/         # githubApi.js — every GitHub API call lives here
└── utils/            # formatDate, storageKeys
```

## Notes / Assumptions
- Authentication is a **fake** local system (GitHub's API doesn't need
  login for public reads) — it exists purely to demonstrate forms,
  validation, Context, protected routes, and localStorage.
- All user data (auth, favorites, collections, notifications, settings,
  activity) is stored in the browser's `localStorage` — nothing is sent
  to a server.
- Built and tested on macOS with Node 20 LTS.
