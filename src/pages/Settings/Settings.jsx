import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/common/Card';
import { useSettings } from '../../context/SettingsContext';

export function Settings() {
  const { settings, updateSettings } = useSettings();

  return (
    <AppLayout>
      <h1>Settings</h1>

      <Card>
        <label>
          <strong>Theme</strong>
          <br />
          <select
            value={settings.theme}
            onChange={(e) => updateSettings({ theme: e.target.value })}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </label>
      </Card>

      <Card>
        <label>
          <strong>Pagination size</strong>
          <br />
          <select
            value={settings.pageSize}
            onChange={(e) =>
              updateSettings({ pageSize: Number(e.target.value) })
            }
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>
      </Card>

      <Card>
        <label>
          <strong>Default search type</strong>
          <br />
          <select
            value={settings.defaultSearchType}
            onChange={(e) =>
              updateSettings({ defaultSearchType: e.target.value })
            }
          >
            <option value="users">Users</option>
            <option value="repositories">Repositories</option>
          </select>
        </label>
      </Card>
    </AppLayout>
  );
}
