import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Card } from '../../components/common/Card';
import { useFetch } from '../../hooks/useFetch';
import { useActivity } from '../../context/ActivityContext';
import {
  getUser,
  getUserRepos,
  getUserFollowers,
  getUserFollowing,
} from '../../services/githubApi';

export function UserDetails() {
  // Dynamic route param: /users/:username
  const { username } = useParams();
  const { logUserView } = useActivity();

  const { data: user, loading, error } = useFetch(
    () => getUser(username),
    [username]
  );
  const { data: repos } = useFetch(() => getUserRepos(username), [username]);
  const { data: followers } = useFetch(
    () => getUserFollowers(username),
    [username]
  );
  const { data: following } = useFetch(
    () => getUserFollowing(username),
    [username]
  );

  useEffect(() => {
    if (user) logUserView(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading) return <AppLayout><Loader label="Loading profile..." /></AppLayout>;
  if (error) return <AppLayout><ErrorMessage message={error} /></AppLayout>;
  if (!user) return null;

  return (
    <AppLayout>
      <Card>
        <div style={{ display: 'flex', gap: 16 }}>
          <img
            src={user.avatar_url}
            alt={`${user.login} avatar`}
            width={96}
            height={96}
            style={{ borderRadius: '50%' }}
          />
          <div>
            <h2>{user.name || user.login}</h2>
            <p className="muted">@{user.login}</p>
            {user.bio && <p>{user.bio}</p>}
            <p className="muted">
              {user.company && `🏢 ${user.company} · `}
              {user.location && `📍 ${user.location} · `}
              {user.blog && (
                <a href={user.blog} target="_blank" rel="noreferrer">
                  🔗 {user.blog}
                </a>
              )}
            </p>
          </div>
        </div>
      </Card>

      <h3>Repositories ({repos?.length ?? '...'})</h3>
      <div className="card-grid">
        {repos?.map((repo) => (
          <Link key={repo.id} to={`/repos/${repo.full_name}`} className="card">
            <strong>{repo.name}</strong>
            <p className="muted">{repo.description}</p>
            <p className="muted">⭐ {repo.stargazers_count}</p>
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 32, marginTop: 24 }}>
        <div>
          <h3>Followers ({followers?.length ?? '...'})</h3>
          {followers?.slice(0, 10).map((f) => (
            <p key={f.id}>
              <Link to={`/users/${f.login}`}>{f.login}</Link>
            </p>
          ))}
        </div>
        <div>
          <h3>Following ({following?.length ?? '...'})</h3>
          {following?.slice(0, 10).map((f) => (
            <p key={f.id}>
              <Link to={`/users/${f.login}`}>{f.login}</Link>
            </p>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
