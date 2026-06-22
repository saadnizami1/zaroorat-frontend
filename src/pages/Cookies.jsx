import LegalLayout from "../components/LegalLayout";

const Cookies = () => {
  return (
    <LegalLayout
      title="Cookie Policy"
      subtitle="How and why Zaroorat uses cookies and similar technologies."
      updated="June 2026"
    >
      <p>
        Cookies are small files stored on your device that help websites work. This policy explains
        how Zaroorat uses them and the control you have.
      </p>

      <h2>Essential cookies</h2>
      <p>
        We use a small number of <strong>essential cookies</strong> to keep you securely signed in
        and to remember your session as you move between pages. The platform cannot work properly
        without these.
      </p>

      <h2>Preferences</h2>
      <p>
        We remember your <strong>cookie consent choice</strong> so we don't ask you on every visit.
        This is stored locally in your browser.
      </p>

      <h2>What we don't do</h2>
      <p>
        Zaroorat does <strong>not</strong> use advertising or cross-site tracking cookies, and we do
        not sell your data to advertisers.
      </p>

      <h2>Managing cookies</h2>
      <p>
        You can accept or reject non-essential cookies using the banner shown on your first visit.
        You can also clear or block cookies at any time through your browser settings — though
        disabling essential cookies may stop you from signing in.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about cookies? Email <strong>contactzaroorat@gmail.com</strong> or visit the
        Contact page.
      </p>
    </LegalLayout>
  );
};

export default Cookies;
