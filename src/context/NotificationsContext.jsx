import { createContext, useContext, useReducer, useEffect } from 'react';
import {
  notificationsReducer,
  initialNotificationsState,
  NOTIFICATIONS_ACTIONS,
} from '../reducers/notificationsReducer';
import { STORAGE_KEYS } from '../utils/storageKeys';

const NotificationsContext = createContext(null);

export function NotificationsProvider({ children }) {
  const [state, dispatch] = useReducer(
    notificationsReducer,
    initialNotificationsState
  );

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (saved) {
      dispatch({
        type: NOTIFICATIONS_ACTIONS.HYDRATE,
        payload: JSON.parse(saved),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(state));
  }, [state]);

  // Other parts of the app call this to raise a notification, e.g.
  // notify('Repository added', 'facebook/react was added to favorites')
  function notify(title, message) {
    dispatch({ type: NOTIFICATIONS_ACTIONS.ADD, payload: { title, message } });
  }

  function markRead(id) {
    dispatch({ type: NOTIFICATIONS_ACTIONS.MARK_READ, payload: { id } });
  }

  function markAllRead() {
    dispatch({ type: NOTIFICATIONS_ACTIONS.MARK_ALL_READ });
  }

  function clearAll() {
    dispatch({ type: NOTIFICATIONS_ACTIONS.CLEAR });
  }

  const unreadCount = state.filter((n) => !n.isRead).length;

  return (
    <NotificationsContext.Provider
      value={{
        notifications: state,
        unreadCount,
        notify,
        markRead,
        markAllRead,
        clearAll,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx)
    throw new Error(
      'useNotifications must be used inside <NotificationsProvider>'
    );
  return ctx;
}
