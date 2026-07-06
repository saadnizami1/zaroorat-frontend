import { createContext, useState } from "react";

export const CampaignContext = createContext({
  user: null,
  token: null,
  apiURL: null,
  setUser: () => { },
  setToken: () => { },
  admin: {},
  isValidZip:()=>{},
});

// Dev: talk to the local backend from .env. Production: the API is served
// same-origin — vercel.json proxies /api/* to the Render backend, so the app
// works on any domain with no CORS and first-party cookies.
const apiURL = import.meta.env.DEV
  ? (import.meta.env.VITE_APP_URL || "http://localhost:5000")
  : "";

const CampaignProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const admin = {
    accountHolderName: 'ADNAN NIZAMI',
    accountNumber: '00270320216793',
    bankName: 'Askari Bank Limited, DHA 1 Branch, Lahore',
    ifscCode: 'PK91ASCM0000270320216793',
  }

  const isValidZip = (postcode, country) => {
    const zip = postcode.trim();
    switch (country) {
      case 'United States':
        return /^\d{5}(-\d{4})?$/.test(zip);            // 12345 or 12345-6789
      case 'India':
        return /^\d{6}$/.test(zip);                     // 6 digit PIN
      case 'United Kingdom':
        return /^[A-Z]{1,2}\d[A-Z\d]? \d[ABD-HJLNP-UW-Z]{2}$/i.test(zip);
      case 'Canada':
        return /^[A-Z]\d[A-Z] \d[A-Z]\d$/i.test(zip);
      case 'Australia':
        return /^\d{4}$/.test(zip);                     // 4 digits
      case 'Pakistan':
        return /^\d{5}$/.test(zip);                     // 5 digits
      case 'Indonesia':
        return /^\d{5}$/.test(zip);                     // 5 digits
      case 'Saudi Arabia':
        return /^\d{5}$/.test(zip);                     // 5 digits
      case 'Iran':
        return /^\d{10}$/.test(zip);                    // 10 digits
      case 'Iraq':
        return /^\d{5}$/.test(zip);                     // 5 digits
      case 'Turkey':
        return /^\d{5}$/.test(zip);                     // 5 digits
      case 'Egypt':
        return /^\d{5}$/.test(zip);                     // 5 digits
      case 'Bangladesh':
        return /^\d{4}$/.test(zip);                     // 4 digits
      case 'Malaysia':
        return /^\d{5}$/.test(zip);                     // 5 digits
      case 'Algeria':
        return /^\d{5}$/.test(zip);                     // 5 digits
      case 'Nepal':
        return /^\d{5}$/.test(zip);                     // 5 digits
      case 'Bhutan':
        return /^\d{5}$/.test(zip);                     // 5 digits
      case 'Maldives':
        return /^\d{5}$/.test(zip);                     // 5 digits
      case 'Sri Lanka':
        return /^\d{5}$/.test(zip);                     // 5 digits
      case 'Afghanistan':
        return /^\d{4}$/.test(zip);                     // 4 digits
      default:
        // fallback: require at least 3 characters
        return zip.length > 2;
    }
  };

  return (
    <CampaignContext.Provider value={{ user, token, setUser, setToken, apiURL, admin, isValidZip }}>
      {children}
    </CampaignContext.Provider>
  );
};

export default CampaignProvider;
