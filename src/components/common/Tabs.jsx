// Controlled tab bar. Parent owns the active tab state.
// Usage: <Tabs tabs={['Overview','Contributors']} active={active} onChange={setActive} />
export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab ${active === tab ? 'active' : ''}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
