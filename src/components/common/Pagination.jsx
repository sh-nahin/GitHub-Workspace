// Pairs with the usePagination hook. Purely presentational.
export function Pagination({ page, totalPages, onNext, onPrev }) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button className="btn btn-secondary" onClick={onPrev} disabled={page === 1}>
        Previous
      </button>
      <span className="muted">
        Page {page} of {totalPages}
      </span>
      <button
        className="btn btn-secondary"
        onClick={onNext}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
