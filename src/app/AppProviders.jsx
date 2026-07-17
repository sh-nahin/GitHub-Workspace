import { AuthProvider } from '../context/AuthContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { CollectionsProvider } from '../context/CollectionsContext';
import { NotificationsProvider } from '../context/NotificationsContext';
import { ActivityProvider } from '../context/ActivityContext';
import { SettingsProvider } from '../context/SettingsContext';

// Wrapping every context provider here (instead of nesting them
// directly in main.jsx) keeps App.jsx clean and makes the provider
// order easy to see and change in one spot.
export function AppProviders({ children }) {
  return (
    <SettingsProvider>
      <AuthProvider>
        <NotificationsProvider>
          <FavoritesProvider>
            <CollectionsProvider>
              <ActivityProvider>{children}</ActivityProvider>
            </CollectionsProvider>
          </FavoritesProvider>
        </NotificationsProvider>
      </AuthProvider>
    </SettingsProvider>
  );
}
