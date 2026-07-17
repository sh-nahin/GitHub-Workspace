import { Navbar } from '../common/Navbar';
import { Sidebar } from '../common/Sidebar';

// Every logged-in page shares this shell: Navbar on top, Sidebar on the
// left, page content in the middle. Keeps that markup in one place.
export function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <div className="app-main">{children}</div>
      </div>
    </>
  );
}
