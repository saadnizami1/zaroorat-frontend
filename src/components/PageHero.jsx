import "../css/PageHero.css";

/**
 * Consistent inner-page header. `variant`: "paper" (default) | "navy".
 */
const PageHero = ({ eyebrow, title, subtitle, variant = "paper", children, align = "center" }) => {
  return (
    <section className={`page-hero ph-${variant} ph-${align}`}>
      <div className="page-hero-bg" aria-hidden="true">
        <span className="ph-blob" />
      </div>
      <div className="container page-hero-inner">
        {eyebrow && <span className="ph-eyebrow">{eyebrow}</span>}
        <h1 className="ph-title">{title}</h1>
        {subtitle && <p className="ph-subtitle">{subtitle}</p>}
        {children && <div className="ph-actions">{children}</div>}
      </div>
    </section>
  );
};

export default PageHero;
