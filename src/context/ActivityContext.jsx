import { createContext, useContext, useReducer, useEffect } from 'react';
import {
  activityReducer,
  initialActivityState,
  ACTIVITY_ACTIONS,
} from '../reducers/activityReducer';
import { STORAGE_KEYS } from '../utils/storageKeys';

const ActivityContext = createContext(null);

export function ActivityProvider({ children }) {
  const [state, dispatch] = useReducer(activityReducer, initialActivityState);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
    if (saved) {
      dispatch({ type: ACTIVITY_ACTIONS.HYDRATE, payload: JSON.parse(saved) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(state));
  }, [state]);

  function logUserView(username) {
    dispatch({ type: ACTIVITY_ACTIONS.LOG_USER_VIEW, payload: { username } });
  }

  function logRepoView(repoFullName) {
    dispatch({
      type: ACTIVITY_ACTIONS.LOG_REPO_VIEW,
      payload: { repoFullName },
    });
  }

  function logSearch(term) {
    dispatch({ type: ACTIVITY_ACTIONS.LOG_SEARCH, payload: { term } });
  }

  return (
    <ActivityContext.Provider
      value={{ activity: state, logUserView, logRepoView, logSearch }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const ctx = useContext(ActivityContext);
  if (!ctx) throw new Error('useActivity must be used inside <ActivityProvider>');
  return ctx;
}
