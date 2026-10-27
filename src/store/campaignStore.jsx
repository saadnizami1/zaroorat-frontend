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

// Where the API lives:
//  - local dev: the backend from .env (http://localhost:5000)
//  - zaroorat.xyz / www.zaroorat.xyz: the Render backend on its own subdomain.
//    Same site as the frontend, so the login cookie is first-party and Google
//    sign-in (which calls back to api.zaroorat.xyz) keeps working.
//  - any other host (the vercel.app address, preview deploys): same-origin
//    /api, which vercel.json proxies to the backend.
const apiURL = import.meta.env.DEV
  ? (import.meta.env.VITE_APP_URL || "http://localhost:5000")
  : /(^|\.)zaroorat\.xyz$/.test(window.location.hostname)
    ? "https://api.zaroorat.xyz"
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
