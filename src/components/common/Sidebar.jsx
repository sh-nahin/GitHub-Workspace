import { NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/search', label: 'Search' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/collections', label: 'Collections' },
  { to: '/notifications', label: 'Notifications' },
  { to: '/settings', label: 'Settings' },
];

export function Sidebar() {
  return (
    <div className="sidebar">
      {LINKS.map((link) => (
        // NavLink automatically adds the "active" class when the
        // current URL matches `to` — that's why it's used instead of Link.
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}
