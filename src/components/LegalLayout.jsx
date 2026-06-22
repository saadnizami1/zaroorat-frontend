import Navbar from "./Navbar";
import Footer from "./Footer";
import PageHero from "./PageHero";
import "../css/Pages.css";

/** Shared shell for Privacy / Terms / Cookies pages. */
const LegalLayout = ({ title, subtitle, updated, children }) => {
  return (
    <div className="page">
      <Navbar />
      <PageHero eyebrow="Legal" title={title} subtitle={subtitle} align="left" />
      <section className="content">
        <div className="container">
          <article className="prose legal-prose">
            {updated && <p className="legal-updated">Last updated: {updated}</p>}
            {children}
          </article>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LegalLayout;
