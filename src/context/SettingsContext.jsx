import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../utils/storageKeys';

const SettingsContext = createContext(null);

const DEFAULT_SETTINGS = {
  theme: 'system', // 'light' | 'dark' | 'system'
  pageSize: 10, // 10 | 20 | 50
  defaultSearchType: 'users', // 'users' | 'repositories'
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage(
    STORAGE_KEYS.SETTINGS,
    DEFAULT_SETTINGS
  );

  // Apply the theme to the whole document whenever it changes, so
  // CSS variables in index.css switch automatically. "system" reads
  // the OS-level preference.
  useEffect(() => {
    const root = document.documentElement;
    let resolvedTheme = settings.theme;
    if (resolvedTheme === 'system') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    root.setAttribute('data-theme', resolvedTheme);
  }, [settings.theme]);

  function updateSettings(partial) {
    setSettings((prev) => ({ ...prev, ...partial }));
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside <SettingsProvider>');
  return ctx;
}
