import { useState, useMemo } from 'react';

// Takes a full array and a page size, returns the current page's slice
// plus controls to move between pages. Used anywhere we show a long
// list (search results, repo lists, followers).
export function usePagination(items = [], pageSize = 10) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const currentItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  function nextPage() {
    setPage((p) => Math.min(p + 1, totalPages));
  }

  function prevPage() {
    setPage((p) => Math.max(p - 1, 1));
  }

  return { currentItems, page, totalPages, nextPage, prevPage, setPage };
}
