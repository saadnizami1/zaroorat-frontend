// Shared FAQ content — used on the homepage (subset) and the full /faq page.

export const FAQ_GROUPS = [
  {
    group: "Donating",
    items: [
      {
        q: "How do I know my donation is safe?",
        a: "Every campaign on Zaroorat is manually reviewed and approved before it goes live. When you donate, you transfer to one verified Zaroorat account and upload your payment receipt. Our team verifies each payment before it's counted — so funds only ever move toward genuine, vetted causes.",
      },
      {
        q: "How do I make a donation?",
        a: "Open any active campaign, tap “Donate Now”, choose an amount, and transfer it to the verified Zaroorat bank account shown on screen. Upload a screenshot of your transfer as proof, and our team will verify and reflect it on the campaign — usually within hours.",
      },
      {
        q: "Do you accept credit/debit cards?",
        a: "Zaroorat currently runs on direct bank transfer to keep giving simple, secure, and free of gateway fees for Pakistani donors. You pay into our verified account and upload proof — no card details are ever required.",
      },
      {
        q: "Will I get confirmation of my donation?",
        a: "Yes. Once our team verifies your payment proof, your contribution is added to the campaign total and you receive a thank-you confirmation by email.",
      },
    ],
  },
  {
    group: "Fundraising",
    items: [
      {
        q: "How do I start a fundraiser?",
        a: "Sign in, click “Start a Fundraiser”, and complete the short guided form — your province and city, your cause, a goal amount, a cover photo, and your bank payout details. Your campaign is submitted for review and goes live once approved.",
      },
      {
        q: "Is there any fee to raise funds?",
        a: "Creating a fundraiser is free. Zaroorat keeps costs minimal so the maximum possible amount reaches your cause.",
      },
      {
        q: "How do I receive the money I raise?",
        a: "When you create a campaign you provide your own bank details. After donations are verified, Zaroorat disburses the funds to your account. You can also post progress reports to keep donors updated.",
      },
    ],
  },
  {
    group: "Trust & Safety",
    items: [
      {
        q: "Who can use Zaroorat?",
        a: "Zaroorat is built for Pakistan. Fundraisers are created by verified users within Pakistani provinces and cities, with local bank payout details and +92 contact numbers.",
      },
      {
        q: "What stops fake campaigns?",
        a: "A combination of manual campaign approval, identity details, payment-proof verification for every donation, and the ability for the community to report concerns. Suspicious campaigns can be paused or removed by our admins.",
      },
      {
        q: "Can I give my Zakat through Zaroorat?",
        a: "Yes. Our Zakat Hub helps you calculate your Zakat and direct it to eligible causes, so you can fulfil your obligation transparently.",
      },
    ],
  },
];

// Flattened helper + homepage subset.
export const ALL_FAQS = FAQ_GROUPS.flatMap((g) => g.items);
export const HOME_FAQS = [
  FAQ_GROUPS[0].items[0],
  FAQ_GROUPS[0].items[1],
  FAQ_GROUPS[1].items[0],
  FAQ_GROUPS[1].items[2],
  FAQ_GROUPS[2].items[0],
  FAQ_GROUPS[2].items[2],
];
