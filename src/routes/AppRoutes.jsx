import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

import { Login } from '../pages/Login/Login';
import { Register } from '../pages/Register/Register';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Search } from '../pages/Search/Search';
import { UserDetails } from '../pages/UserDetails/UserDetails';
import { RepositoryDetails } from '../pages/RepositoryDetails/RepositoryDetails';
import { Favorites } from '../pages/Favorites/Favorites';
import { Collections } from '../pages/Collections/Collections';
import { Notifications } from '../pages/Notifications/Notifications';
import { Settings } from '../pages/Settings/Settings';

// Every route in the app lives here, so it's easy to see the whole
// site map at a glance.
export function AppRoutes() {
  return (
    <Routes>
      {/* redirect the bare "/" to the dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        }
      />
      {/* dynamic route: /users/torvalds, /users/gaearon, etc. */}
      <Route
        path="/users/:username"
        element={
          <ProtectedRoute>
            <UserDetails />
          </ProtectedRoute>
        }
      />
      {/* dynamic route with two params: /repos/facebook/react */}
      <Route
        path="/repos/:owner/:repo"
        element={
          <ProtectedRoute>
            <RepositoryDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />
      <Route
        path="/collections"
        element={
          <ProtectedRoute>
            <Collections />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* fallback for unknown URLs */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
