import { createContext, useContext, useReducer, useEffect } from 'react';
import {
  collectionsReducer,
  initialCollectionsState,
  COLLECTIONS_ACTIONS,
} from '../reducers/collectionsReducer';
import { STORAGE_KEYS } from '../utils/storageKeys';

const CollectionsContext = createContext(null);

export function CollectionsProvider({ children }) {
  const [state, dispatch] = useReducer(
    collectionsReducer,
    initialCollectionsState
  );

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COLLECTIONS);
    if (saved) {
      dispatch({
        type: COLLECTIONS_ACTIONS.HYDRATE,
        payload: JSON.parse(saved),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(state));
  }, [state]);

  function createCollection(name) {
    dispatch({ type: COLLECTIONS_ACTIONS.CREATE, payload: { name } });
  }

  function deleteCollection(id) {
    dispatch({ type: COLLECTIONS_ACTIONS.DELETE, payload: { id } });
  }

  function addRepoToCollection(collectionId, repo) {
    dispatch({
      type: COLLECTIONS_ACTIONS.ADD_REPO,
      payload: { collectionId, repo },
    });
  }

  function removeRepoFromCollection(collectionId, repo) {
    dispatch({
      type: COLLECTIONS_ACTIONS.REMOVE_REPO,
      payload: { collectionId, repo },
    });
  }

  return (
    <CollectionsContext.Provider
      value={{
        collections: state,
        createCollection,
        deleteCollection,
        addRepoToCollection,
        removeRepoFromCollection,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
}

export function useCollections() {
  const ctx = useContext(CollectionsContext);
  if (!ctx)
    throw new Error('useCollections must be used inside <CollectionsProvider>');
  return ctx;
}
