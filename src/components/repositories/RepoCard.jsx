import { Link } from 'react-router-dom';
import { Card } from '../common/Card';
import { useFavorites } from '../../context/FavoritesContext';
import { useNotifications } from '../../context/NotificationsContext';

// Displays one repository's summary. `repo` is a raw GitHub API repo object.
export function RepoCard({ repo }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { notify } = useNotifications();
  const favorited = isFavorite('repos', repo.full_name);

  function toggleFavorite(e) {
    e.preventDefault();
    if (favorited) {
      removeFavorite('repos', repo.full_name);
    } else {
      addFavorite('repos', repo.full_name);
      notify('Repository favorited', `${repo.full_name} was added to favorites`);
    }
  }

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to={`/repos/${repo.full_name}`}>
          <strong>{repo.full_name}</strong>
        </Link>
        <button className="btn btn-secondary" onClick={toggleFavorite}>
          {favorited ? '★' : '☆'}
        </button>
      </div>
      {repo.description && <p className="muted">{repo.description}</p>}
      <p className="muted">
        ⭐ {repo.stargazers_count} · 🍴 {repo.forks_count} ·{' '}
        {repo.language || 'Unknown language'}
      </p>
    </Card>
  );
}
