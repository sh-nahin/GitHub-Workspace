import { AppProviders } from './app/AppProviders';
import { AppRoutes } from './routes/AppRoutes';

// The root component: wraps every context provider around the router.
// BrowserRouter itself is set up one level up, in main.jsx.
export default function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}
