A mini GitHub client built with React, React Router, and the Context API. Search developers and repositories, view profiles, build repository collections, favorite items, and track recent activity — all powered by the live GitHub REST API.

Tech Stack

React 18 · React Router v6 · Context API + useReducer (no Redux) · Vite · GitHub REST API

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


Getting Started

bashnpm install
npm run dev

Open the local URL Vite prints (usually http://localhost:5173).

Features

Auth (local/simulated) · Developer search · User profiles · Repository explorer with tabs · Collections · Favorites · Advanced search with filters · Activity feed · Notifications · Settings (theme, pagination, defaults)

Notes


Auth is a simulated local system (GitHub's API needs no login for public reads) — built to demonstrate forms, Context, and protected routes.
All data persists in localStorage; nothing is sent to a server.
