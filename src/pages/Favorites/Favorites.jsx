import { Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { useFavorites } from '../../context/FavoritesContext';

export function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <AppLayout>
      <h1>Favorites</h1>

      <h3>Developers ({favorites.users.length})</h3>
      {favorites.users.length === 0 && (
        <p className="muted">No favorite developers yet.</p>
      )}
      <div className="card-grid">
        {favorites.users.map((username) => (
          <div key={username} className="card">
            <Link to={`/users/${username}`}>{username}</Link>
            <button
              className="btn btn-secondary"
              style={{ marginLeft: 8 }}
              onClick={() => removeFavorite('users', username)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: 24 }}>Repositories ({favorites.repos.length})</h3>
      {favorites.repos.length === 0 && (
        <p className="muted">No favorite repositories yet.</p>
      )}
      <div className="card-grid">
        {favorites.repos.map((fullName) => (
          <div key={fullName} className="card">
            <Link to={`/repos/${fullName}`}>{fullName}</Link>
            <button
              className="btn btn-secondary"
              style={{ marginLeft: 8 }}
              onClick={() => removeFavorite('repos', fullName)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
