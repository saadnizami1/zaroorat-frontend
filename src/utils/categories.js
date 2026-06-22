// Single source of truth for campaign categories (labels + grouping).
// Keys MUST match the backend `fundCategory` enum values — do not rename.

export const CATEGORY_LABELS = {
  animal: "Animal",
  business: "Business",
  community: "Community",
  competition: "Competition",
  creative: "Creative",
  education: "Education",
  emergencies: "Emergencies",
  environment: "Environment",
  events: "Events",
  faith: "Faith",
  family: "Family",
  funerals_memorials: "Funerals & Memorials",
  medical: "Medical",
  monthly_bills: "Monthly Bills",
  newly_weds: "Newly Weds",
  other: "Other",
  sports: "Sports",
  travel: "Travel",
  ukraine_relief: "Ukraine Relief",
  volunteer: "Volunteer",
  wishes: "Wishes",
  gaza: "Gaza Fund",
  kashmir: "Kashmir Fund",
  Islamic_causes: "Islamic Causes",
  islamic_causes: "Islamic Causes",
};

export const formatCategory = (key = "") =>
  CATEGORY_LABELS[key] ||
  key
    .split("_")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");

// Order used in the create form + discover grid.
export const CATEGORY_OPTIONS = [
  "medical",
  "emergencies",
  "education",
  "family",
  "monthly_bills",
  "funerals_memorials",
  "Islamic_causes",
  "faith",
  "community",
  "environment",
  "animal",
  "business",
  "creative",
  "sports",
  "events",
  "newly_weds",
  "travel",
  "competition",
  "volunteer",
  "wishes",
  "gaza",
  "kashmir",
  "other",
];
