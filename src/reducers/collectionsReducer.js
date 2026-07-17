export const COLLECTIONS_ACTIONS = {
  HYDRATE: 'HYDRATE_COLLECTIONS',
  CREATE: 'CREATE_COLLECTION',
  DELETE: 'DELETE_COLLECTION',
  ADD_REPO: 'ADD_REPO_TO_COLLECTION',
  REMOVE_REPO: 'REMOVE_REPO_FROM_COLLECTION',
};

export const initialCollectionsState = []; // array of { id, name, repos: [] }

export function collectionsReducer(state, action) {
  switch (action.type) {
    case COLLECTIONS_ACTIONS.HYDRATE:
      return action.payload;

    case COLLECTIONS_ACTIONS.CREATE:
      return [
        ...state,
        { id: crypto.randomUUID(), name: action.payload.name, repos: [] },
      ];

    case COLLECTIONS_ACTIONS.DELETE:
      return state.filter((c) => c.id !== action.payload.id);

    case COLLECTIONS_ACTIONS.ADD_REPO:
      return state.map((c) =>
        c.id === action.payload.collectionId && !c.repos.includes(action.payload.repo)
          ? { ...c, repos: [...c.repos, action.payload.repo] }
          : c
      );

    case COLLECTIONS_ACTIONS.REMOVE_REPO:
      return state.map((c) =>
        c.id === action.payload.collectionId
          ? { ...c, repos: c.repos.filter((r) => r !== action.payload.repo) }
          : c
      );

    default:
      return state;
  }
}
