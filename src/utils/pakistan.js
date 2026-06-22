// Pakistan provinces + major cities for the "start a fundraiser" flow,
// and +92 phone helpers used wherever we collect a phone number.

export const PROVINCES = [
  {
    name: "Punjab",
    cities: [
      "Lahore", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala", "Sialkot",
      "Bahawalpur", "Sargodha", "Sahiwal", "Sheikhupura", "Jhang", "Rahim Yar Khan",
      "Gujrat", "Kasur", "Okara", "Dera Ghazi Khan", "Wah Cantonment", "Chiniot",
      "Muzaffargarh", "Mianwali",
    ],
  },
  {
    name: "Sindh",
    cities: [
      "Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah", "Mirpur Khas",
      "Jacobabad", "Shikarpur", "Khairpur", "Dadu", "Thatta", "Badin", "Tando Allahyar",
    ],
  },
  {
    name: "Khyber Pakhtunkhwa",
    cities: [
      "Peshawar", "Mardan", "Mingora", "Kohat", "Abbottabad", "Dera Ismail Khan",
      "Swabi", "Nowshera", "Charsadda", "Mansehra", "Bannu", "Haripur", "Chitral",
    ],
  },
  {
    name: "Balochistan",
    cities: [
      "Quetta", "Turbat", "Khuzdar", "Hub", "Chaman", "Gwadar", "Sibi", "Zhob",
      "Loralai", "Dera Murad Jamali",
    ],
  },
  {
    name: "Islamabad Capital Territory",
    cities: ["Islamabad"],
  },
  {
    name: "Azad Jammu & Kashmir",
    cities: ["Muzaffarabad", "Mirpur", "Kotli", "Rawalakot", "Bhimber", "Bagh"],
  },
  {
    name: "Gilgit-Baltistan",
    cities: ["Gilgit", "Skardu", "Hunza", "Chilas", "Ghizer", "Astore"],
  },
];

export const PROVINCE_NAMES = PROVINCES.map((p) => p.name);

export const citiesFor = (provinceName) =>
  PROVINCES.find((p) => p.name === provinceName)?.cities || [];

/* ---------- Phone (+92) ---------- */

// Strip everything down to the 10-digit national number (without 0 / 92 / +92).
export const toLocalPkPhone = (raw = "") => {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("0092")) d = d.slice(4);
  else if (d.startsWith("92")) d = d.slice(2);
  if (d.startsWith("0")) d = d.slice(1);
  return d.slice(0, 10);
};

// Valid Pakistani mobile: 10 digits beginning with 3 (e.g. 3001234567).
export const isValidPkMobile = (local = "") => /^3\d{9}$/.test(local);

// Full E.164-ish string for submission.
export const fullPkPhone = (local = "") => `+92${local}`;
