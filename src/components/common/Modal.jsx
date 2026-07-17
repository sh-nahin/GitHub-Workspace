// A simple reusable modal. Renders nothing when `open` is false.
// Usage: <Modal open={isOpen} onClose={() => setIsOpen(false)}>...content...</Modal>
export function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{ minWidth: 320, background: 'var(--bg)' }}
        // Stop the click from bubbling up to the overlay (which would close the modal)
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <strong>{title}</strong>
          <button className="btn btn-secondary" onClick={onClose}>
            ✕
          </button>
        </div>
        <div style={{ marginTop: 12 }}>{children}</div>
      </div>
    </div>
  );
}
