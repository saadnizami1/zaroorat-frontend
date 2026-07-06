// Tiny sessionStorage-backed cache. Pages render the last known data
// instantly, then refresh it in the background (stale-while-revalidate).
export const readCache = (key) => {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const writeCache = (key, data) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch {
    /* storage full or unavailable — caching is best-effort */
  }
};
