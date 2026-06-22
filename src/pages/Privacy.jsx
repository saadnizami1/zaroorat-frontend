import LegalLayout from "../components/LegalLayout";

const Privacy = () => {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How Zaroorat collects, uses and protects your personal information."
      updated="June 2026"
    >
      <p>
        At Zaroorat, your trust is everything. This policy explains what information we collect when
        you use our platform, why we collect it, and the choices you have. By using Zaroorat you
        agree to the practices described here.
      </p>

      <h2>Information we collect</h2>
      <p>
        When you create an account or a fundraiser, we collect details you provide directly — your
        <strong> name, email address, phone number, city</strong>, and, for verification, a
        <strong> CNIC image</strong> and your <strong>bank payout details</strong>. When you donate,
        we collect your name, contact details and the <strong>payment-proof screenshot</strong> you
        upload. We also store basic technical data such as your login session.
      </p>

      <h2>How we use your information</h2>
      <p>
        We use your information to operate the platform: to verify identities and campaigns, to
        manually confirm donations against payment proof, to credit the correct fundraiser, to send
        you essential emails (such as donation confirmations), and to keep Zaroorat safe from fraud
        and misuse.
      </p>

      <h2>How your information is stored</h2>
      <p>
        Account and campaign data is stored in our secure database. Uploaded images (cover photos,
        CNIC images and payment proofs) are stored with our image hosting provider. Access to
        sensitive records is restricted to authorised members of our team.
      </p>

      <h2>Sharing</h2>
      <p>
        We do <strong>not</strong> sell your personal information. Public campaign pages only ever
        display safe, limited details (such as a campaigner's name, city and photo, or a verified
        donor's name and amount). Private information like your CNIC, email and bank details is never
        shown publicly.
      </p>

      <h2>Your rights</h2>
      <p>
        You can view and update your profile at any time. You may request deletion of your account
        from your profile page — once approved, your personal data is removed in line with our
        retention obligations. For any privacy request, contact us using the details below.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about your privacy? Email <strong>contactzaroorat@gmail.com</strong> or reach our
        Pakistan-based team through the Contact page.
      </p>
    </LegalLayout>
  );
};

export default Privacy;
