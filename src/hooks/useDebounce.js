import { useState, useEffect } from 'react';

// Delays updating the returned value until the user stops typing for
// `delay` ms. Used in Search so we don't hit the GitHub API on every
// single keystroke.
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    // cleanup: if `value` changes again before the timer fires,
    // cancel the old timer so we don't set a stale value.
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
