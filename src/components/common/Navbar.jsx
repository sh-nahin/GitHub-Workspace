import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationsContext';

export function Navbar() {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="navbar">
      <div className="navbar-links">
        <Link to="/dashboard">
          <strong>GitHub Workspace</strong>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/notifications">
          Notifications{unreadCount > 0 ? ` (${unreadCount})` : ''}
        </Link>
        {isAuthenticated ? (
  <>
    <span className="navbar-username">{currentUser.name}</span>{' '}
    <button className="btn-logout" onClick={handleLogout}>
      Log out
    </button>
  </>
) : (
          <Link to="/login">Log in</Link>
        )}
      </div>
    </div>
  );
}
