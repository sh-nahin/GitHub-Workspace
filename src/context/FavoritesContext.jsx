import { createContext, useContext, useReducer, useEffect } from 'react';
import {
  favoritesReducer,
  initialFavoritesState,
  FAVORITES_ACTIONS,
} from '../reducers/favoritesReducer';
import { STORAGE_KEYS } from '../utils/storageKeys';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialFavoritesState);

  // On first render, load any favorites saved from a previous session.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (saved) {
      dispatch({ type: FAVORITES_ACTIONS.HYDRATE, payload: JSON.parse(saved) });
    }
  }, []);

  // Whenever state changes, persist it.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(state));
  }, [state]);

  function addFavorite(kind, id) {
    dispatch({ type: FAVORITES_ACTIONS.ADD, payload: { kind, id } });
  }

  function removeFavorite(kind, id) {
    dispatch({ type: FAVORITES_ACTIONS.REMOVE, payload: { kind, id } });
  }

  function isFavorite(kind, id) {
    return state[kind].includes(id);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites: state, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used inside <FavoritesProvider>');
  return ctx;
}
