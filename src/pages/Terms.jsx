import LegalLayout from "../components/LegalLayout";

const Terms = () => {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="The rules for using Zaroorat as a donor or a campaigner."
      updated="June 2026"
    >
      <p>
        These terms govern your use of Zaroorat. By creating an account, starting a fundraiser, or
        making a donation, you agree to them. Please read them carefully.
      </p>

      <h2>Eligibility &amp; accounts</h2>
      <p>
        You must provide accurate information and keep your login details secure. You are responsible
        for activity on your account. We may suspend accounts that break these terms or that we
        reasonably believe are involved in fraud.
      </p>

      <h2>Campaigns</h2>
      <p>
        Every fundraiser is <strong>reviewed and approved by our team before it goes live</strong>.
        Campaigners must describe their cause honestly and use raised funds for the stated purpose.
        We accept only a small, carefully verified set of cases, and we may pause, close or reject a
        campaign that is misleading, incomplete, or unable to be verified.
      </p>

      <h2>Donations</h2>
      <p>
        Zaroorat does not use an automated payment gateway. Donors transfer funds to the platform's
        verified account and upload a <strong>payment-proof screenshot</strong>. A donation is only
        counted once our team has <strong>manually verified</strong> the proof. Donations are
        voluntary contributions to a cause; please give thoughtfully, as transfers may not be
        reversible.
      </p>

      <h2>Prohibited use</h2>
      <p>
        You may not use Zaroorat to deceive donors, launder money, raise funds for unlawful
        activity, or upload false documents. Misuse may result in removal from the platform and, where
        appropriate, referral to the relevant authorities.
      </p>

      <h2>Disclaimers &amp; liability</h2>
      <p>
        We work hard to verify campaigns and payments, but Zaroorat is a platform that connects
        donors and campaigners. To the extent permitted by law, we are not liable for the conduct of
        any user. The service is provided on an "as is" basis.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the Islamic Republic of Pakistan.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email <strong>contactzaroorat@gmail.com</strong> or use the
        Contact page.
      </p>
    </LegalLayout>
  );
};

export default Terms;
