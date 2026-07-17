import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../utils/storageKeys';

// GitHub's API doesn't need a login for read-only access, so this is a
// FAKE auth system: "registered" users just live in localStorage, and
// "logging in" checks the email/password against that list.
// This is purely to demonstrate forms, validation, Context, and
// protected routes — never do this in a real app (passwords must
// be hashed server-side, never stored in plain text in the browser).

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorage(
    STORAGE_KEYS.AUTH_USER,
    null
  );
  const [registeredUsers, setRegisteredUsers] = useLocalStorage(
    STORAGE_KEYS.REGISTERED_USERS,
    []
  );

  function register({ name, email, password }) {
    const exists = registeredUsers.some((u) => u.email === email);
    if (exists) {
      throw new Error('An account with this email already exists');
    }
    const newUser = { name, email, password };
    setRegisteredUsers([...registeredUsers, newUser]);
    setCurrentUser({ name, email });
    return newUser;
  }

  function login({ email, password }) {
    const match = registeredUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (!match) {
      throw new Error('Invalid email or password');
    }
    setCurrentUser({ name: match.name, email: match.email });
    return match;
  }

  function logout() {
    setCurrentUser(null);
  }

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook so components do `const { login } = useAuth()`
// instead of importing useContext + AuthContext everywhere.
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
