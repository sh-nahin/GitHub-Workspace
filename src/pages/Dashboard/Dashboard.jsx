import { Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { useAuth } from '../../context/AuthContext';
import { useActivity } from '../../context/ActivityContext';

export function Dashboard() {
  const { currentUser } = useAuth();
  const { activity } = useActivity();

  return (
    <AppLayout>
      <h1>Welcome, {currentUser?.name} 👋</h1>
      <p className="muted">
        Search GitHub developers, explore repositories, and build your own
        collections.
      </p>

      <div className="card-grid" style={{ marginTop: 24 }}>
        <Link to="/search" className="card">
          <strong>🔍 Search Developers</strong>
          <p className="muted">Find any GitHub user by username</p>
        </Link>
        <Link to="/favorites" className="card">
          <strong>⭐ Favorites</strong>
          <p className="muted">Your starred users and repositories</p>
        </Link>
        <Link to="/collections" className="card">
          <strong>📁 Collections</strong>
          <p className="muted">Organize repositories into custom lists</p>
        </Link>
      </div>

      {activity.recentUsers.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h3>Recently viewed developers</h3>
          <p className="muted">{activity.recentUsers.join(', ')}</p>
        </div>
      )}
    </AppLayout>
  );
}
