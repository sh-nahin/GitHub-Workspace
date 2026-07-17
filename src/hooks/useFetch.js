import { useState, useEffect } from 'react';

// Generic data-fetching hook. Takes an async function (not a URL) so it
// works with any of the githubApi.js service functions.
// Usage: const { data, loading, error } = useFetch(() => getUser(username), [username]);
export function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFn();
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Something went wrong');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();

    // cleanup: if the component unmounts (or deps change) before the
    // fetch resolves, ignore the result to avoid a "state update on
    // unmounted component" warning.
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
