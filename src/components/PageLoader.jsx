/** Lightweight fallback shown while a lazily-loaded route chunk downloads. */
const PageLoader = () => (
  <div className="loading-screen" role="status" aria-live="polite">
    <div style={{ display: "grid", placeItems: "center", gap: "1rem" }}>
      <div className="spinner" />
      <span className="sr-only">Loading…</span>
    </div>
  </div>
);

export default PageLoader;
