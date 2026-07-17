import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { UserCard } from '../../components/users/UserCard';
import { RepoCard } from '../../components/repositories/RepoCard';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { useDebounce } from '../../hooks/useDebounce';
import { useActivity } from '../../context/ActivityContext';
import { useSettings } from '../../context/SettingsContext';
import { getUser, searchRepos } from '../../services/githubApi';

// Combines Module 2 (basic user search) and Module 7 (advanced repo
// search with filters). The search type and filters are stored in the
// URL (via useSearchParams) so the page is shareable/bookmarkable —
// e.g. /search?type=repositories&language=javascript&stars=1000
export function Search() {
  const { settings } = useSettings();
  const { logSearch } = useActivity();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchType = searchParams.get('type') || settings.defaultSearchType;
  const [term, setTerm] = useState(searchParams.get('q') || '');
  const [language, setLanguage] = useState(searchParams.get('language') || '');
  const [minStars, setMinStars] = useState(searchParams.get('stars') || '');

  const debouncedTerm = useDebounce(term, 400);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Keep the URL in sync with the current search state.
  useEffect(() => {
    const params = { type: searchType };
    if (debouncedTerm) params.q = debouncedTerm;
    if (language) params.language = language;
    if (minStars) params.stars = minStars;
    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTerm, language, minStars, searchType]);

  // Run the actual search whenever the debounced term or filters change.
  useEffect(() => {
    if (!debouncedTerm) {
      setResult(null);
      return;
    }

    let cancelled = false;
    async function run() {
      setLoading(true);
      setError('');
      try {
        let data;
        if (searchType === 'users') {
          data = await getUser(debouncedTerm);
        } else {
          data = await searchRepos({
            query: debouncedTerm,
            language,
            minStars,
          });
        }
        if (!cancelled) {
          setResult(data);
          logSearch(debouncedTerm);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTerm, searchType, language, minStars]);

  function switchType(type) {
    setSearchParams({ ...Object.fromEntries(searchParams), type });
  }

  return (
    <AppLayout>
      <h1>Search</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button
          className={`btn ${searchType === 'users' ? '' : 'btn-secondary'}`}
          onClick={() => switchType('users')}
        >
          Developers
        </button>
        <button
          className={`btn ${searchType === 'repositories' ? '' : 'btn-secondary'}`}
          onClick={() => switchType('repositories')}
        >
          Repositories
        </button>
      </div>

      <input
        style={{ width: '100%', padding: 10, marginBottom: 12 }}
        placeholder={
          searchType === 'users'
            ? 'Search by username, e.g. torvalds'
            : 'Search repositories, e.g. react'
        }
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />

      {searchType === 'repositories' && (
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <input
            placeholder="Language (e.g. javascript)"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <input
            placeholder="Min stars (e.g. 1000)"
            type="number"
            value={minStars}
            onChange={(e) => setMinStars(e.target.value)}
          />
        </div>
      )}

      {loading && <Loader label="Searching..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && searchType === 'users' && result && (
        <UserCard user={result} />
      )}

      {!loading && !error && searchType === 'repositories' && result && (
        <div className="card-grid">
          {result.items?.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
          {result.items?.length === 0 && (
            <p className="muted">No repositories found.</p>
          )}
        </div>
      )}
    </AppLayout>
  );
}
