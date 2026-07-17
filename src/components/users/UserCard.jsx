import { Link } from 'react-router-dom';
import { Card } from '../common/Card';
import { useFavorites } from '../../context/FavoritesContext';
import { useNotifications } from '../../context/NotificationsContext';

// Displays one GitHub user's summary — used in Search results and
// anywhere else we list users. Includes a favorite (star) toggle.
export function UserCard({ user }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { notify } = useNotifications();
  const favorited = isFavorite('users', user.login);

  function toggleFavorite(e) {
    e.preventDefault(); // don't trigger the <Link> navigation
    if (favorited) {
      removeFavorite('users', user.login);
    } else {
      addFavorite('users', user.login);
      notify('Developer favorited', `${user.login} was added to favorites`);
    }
  }

  return (
    <Card>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <img
          src={user.avatar_url}
          alt={`${user.login} avatar`}
          width={48}
          height={48}
          style={{ borderRadius: '50%' }}
        />
        <div style={{ flex: 1 }}>
          <Link to={`/users/${user.login}`}>
            <strong>{user.name || user.login}</strong>
          </Link>
          <p className="muted">@{user.login}</p>
          {typeof user.followers === 'number' && (
            <p className="muted">
              {user.followers} followers · {user.following} following ·{' '}
              {user.public_repos} repos
            </p>
          )}
        </div>
        <button className="btn btn-secondary" onClick={toggleFavorite}>
          {favorited ? '★' : '☆'}
        </button>
      </div>
    </Card>
  );
}
