// Action type constants — avoids typos like 'ADD_FAVORTIE' scattered
// across the codebase.
export const FAVORITES_ACTIONS = {
  ADD: 'ADD_FAVORITE',
  REMOVE: 'REMOVE_FAVORITE',
  HYDRATE: 'HYDRATE_FAVORITES', // load saved favorites from localStorage on startup
};

export const initialFavoritesState = {
  users: [], // array of GitHub usernames
  repos: [], // array of "owner/repo" strings
};

export function favoritesReducer(state, action) {
  switch (action.type) {
    case FAVORITES_ACTIONS.HYDRATE:
      return action.payload;

    case FAVORITES_ACTIONS.ADD: {
      const { kind, id } = action.payload; // kind: 'users' | 'repos'
      if (state[kind].includes(id)) return state; // already favorited
      return { ...state, [kind]: [...state[kind], id] };
    }

    case FAVORITES_ACTIONS.REMOVE: {
      const { kind, id } = action.payload;
      return { ...state, [kind]: state[kind].filter((item) => item !== id) };
    }

    default:
      return state;
  }
}
