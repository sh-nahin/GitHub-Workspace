export const ACTIVITY_ACTIONS = {
  HYDRATE: 'HYDRATE_ACTIVITY',
  LOG_USER_VIEW: 'LOG_USER_VIEW',
  LOG_REPO_VIEW: 'LOG_REPO_VIEW',
  LOG_SEARCH: 'LOG_SEARCH',
};

const MAX_ITEMS = 10; // keep each list short and relevant

export const initialActivityState = {
  recentUsers: [],
  recentRepos: [],
  recentSearches: [],
};

// Adds `item` to the front of `list`, removes duplicates, caps length.
function pushUnique(list, item, max = MAX_ITEMS) {
  return [item, ...list.filter((x) => x !== item)].slice(0, max);
}

export function activityReducer(state, action) {
  switch (action.type) {
    case ACTIVITY_ACTIONS.HYDRATE:
      return action.payload;

    case ACTIVITY_ACTIONS.LOG_USER_VIEW:
      return {
        ...state,
        recentUsers: pushUnique(state.recentUsers, action.payload.username),
      };

    case ACTIVITY_ACTIONS.LOG_REPO_VIEW:
      return {
        ...state,
        recentRepos: pushUnique(state.recentRepos, action.payload.repoFullName),
      };

    case ACTIVITY_ACTIONS.LOG_SEARCH:
      return {
        ...state,
        recentSearches: pushUnique(state.recentSearches, action.payload.term),
      };

    default:
      return state;
  }
}
