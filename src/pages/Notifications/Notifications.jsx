import { AppLayout } from '../../components/layout/AppLayout';
import { useNotifications } from '../../context/NotificationsContext';
import { timeAgo } from '../../utils/formatDate';

export function Notifications() {
  const { notifications, markRead, markAllRead, clearAll } = useNotifications();

  return (
    <AppLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Notifications</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary" onClick={markAllRead}>
            Mark all read
          </button>
          <button className="btn btn-secondary" onClick={clearAll}>
            Clear all
          </button>
        </div>
      </div>

      {notifications.length === 0 && (
        <p className="muted">
          No notifications yet — favorite a repo or create a collection to
          see one here.
        </p>
      )}

      {notifications.map((n) => (
        <div
          key={n.id}
          className="card"
          style={{ opacity: n.isRead ? 0.6 : 1, cursor: 'pointer' }}
          onClick={() => markRead(n.id)}
        >
          <strong>{n.title}</strong>
          <p className="muted">{n.message}</p>
          <p className="muted">{timeAgo(n.createdAt)}</p>
        </div>
      ))}
    </AppLayout>
  );
}
