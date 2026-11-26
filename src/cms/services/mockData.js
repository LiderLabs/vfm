// src/cms/services/mockData.js

// ORIGINAL website content. This is exactly what the public site shows
// before anything is published from the CMS, and what Reset restores.
export const initialPublications = [
  {
    id: "pub-1",
    date: "May 11, 2026",
    tag: "PRESIDENTIAL ASSENT",
    title: "Value for Money Office Act, 2026 (Act 1172) Becomes Law",
    desc: "The President of the Republic of Ghana has formally assented to the Value for Money Office Act, 2026 (Act 1172), establishing the Office as an independent statutory body corporate. This landmark legislation empowers the Office to enforce strict cost benchmarking across all public sector projects.",
    image: "/utilisation-bg.jpg",
  },
  {
    id: "pub-2",
    date: "May 11, 2026",
    tag: "MINISTERIAL DIRECTIVE",
    title: "Interim Monetary Thresholds for Mandatory VFMO Assessments",
    desc: "Pursuant to Section 30(2) of Act 1172, the Minister for Finance, on the advice of the Board, will prescribe interim monetary thresholds for public sector projects. Any project exceeding these thresholds must undergo a mandatory pre-award assessment.",
    image: "/boardroom.jpg",
  },
  {
    id: "pub-3",
    date: "May 11, 2026",
    tag: "INSTITUTIONAL NOTICE",
    title: "Establishment of Value for Money Units in Covered Entities",
    desc: "All covered entities are required to establish internal Value for Money Units over a five-year phased implementation. These units will prioritise infrastructure, education, and health sectors, ensuring internal compliance before contracts reach the national Office. (Section 28)",
    image: "/about-bg.jpg",
  },
];

export const categories = [
  "PRESIDENTIAL ASSENT",
  "MINISTERIAL DIRECTIVE",
  "INSTITUTIONAL NOTICE",
  "ANNUAL REVIEW",
  "PRESS RELEASE",
];

// Shared localStorage keys: import these everywhere to avoid typos
export const LS_PUBLICATIONS_KEY = "vfmo_publications";
export const LS_PUBLICATIONS_EVENT = "vfmo_publications_changed";

// ---- Helpers: the ONLY code that should touch localStorage ----

// No saved key = the original website. Anything saved = CMS changes.
export function getPublications() {
  try {
    const saved = localStorage.getItem(LS_PUBLICATIONS_KEY);
    if (saved === null) return initialPublications;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : initialPublications;
  } catch (e) {
    console.error("Failed to read publications", e);
    return initialPublications;
  }
}

// Throws if storage is full, so the caller can show an error
export function savePublications(list) {
  localStorage.setItem(LS_PUBLICATIONS_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(LS_PUBLICATIONS_EVENT));
}

// Removes all CMS changes and tells the website to go back to the original
export function resetPublications() {
  localStorage.removeItem(LS_PUBLICATIONS_KEY);
  window.dispatchEvent(new Event(LS_PUBLICATIONS_EVENT));
}

// --- SANCTIONS DATA ---
export const initialSanctions = [
  {
    id: "san-1",
    company: "Apex Construction Ltd.",
    tin: "C0012345678",
    reason: "Contract inflation on Ministry of Roads project.",
    duration: "2 Years",
    date: "Jan 15, 2026",
  },
  {
    id: "san-2",
    company: "Golden Builders Ghana",
    tin: "C0087654321",
    reason: "Abandonment of hospital project after 40% payment.",
    duration: "5 Years",
    date: "Mar 02, 2026",
  }
];

export const LS_SANCTIONS_KEY = "vfmo_sanctions";
export const LS_SANCTIONS_EVENT = "vfmo_sanctions_changed";

export function getSanctions() {
  try {
    const saved = localStorage.getItem(LS_SANCTIONS_KEY);
    if (saved === null) return initialSanctions;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : initialSanctions;
  } catch (e) {
    console.error("Failed to read sanctions", e);
    return initialSanctions;
  }
}

export function saveSanctions(list) {
  localStorage.setItem(LS_SANCTIONS_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(LS_SANCTIONS_EVENT));
}

export function resetSanctions() {
  localStorage.removeItem(LS_SANCTIONS_KEY);
  window.dispatchEvent(new Event(LS_SANCTIONS_EVENT));
}

// ========================================================
// --- HOMEPAGE DATA ---
// ========================================================

export const initialHomepageData = {
  heroSlides: [
    {
      id: "slide-1",
      headline1: "Every Cedi Counts.",
      headline2: "Every Outcome Matters.",
      subheadline: "The Value for Money Office is an independent statutory authority established under Act 1172 to regulate, monitor, and conduct value for money assessments across Ghana's public sector.",
      btnText: "Learn About Our Mandate",
      btnLink: "/about",
      bgImage: "/hero-bg.jpg",
    },
    {
      id: "slide-2",
      headline1: "Statutory Independence.",
      headline2: "Unwavering Fiscal Integrity.",
      subheadline: "Except as otherwise provided by law, the Office is not subject to the direction or control of any person or authority in the performance of its statutory functions. (Section 12)",
      btnText: "Read Our Institutional Values",
      btnLink: "/about#values",
      bgImage: "/hero-slide-2.jpg",
    },
    {
      id: "slide-3",
      headline1: "Protecting the Public Purse.",
      headline2: "Guaranteeing Citizen Value.",
      subheadline: "We provide a confidential, legally protected mechanism for citizens and entities to report contract inflation, cost irregularities, and the abuse of public resources.",
      btnText: "Report a Concern",
      btnLink: "/submit",
      bgImage: "/hero-slide-3.jpg",
    }
  ],
  stats: [
    { id: "stat-1", label: "Assessments Conducted", value: "1,245" },
    { id: "stat-2", label: "Contracts Flagged", value: "86" },
    { id: "stat-3", label: "Active Investigations", value: "14" },
    { id: "stat-4", label: "Total Savings Identified", value: "GH₵ 250M+" },
  ],
  publicActions: [
    { 
      id: "action-1", 
      title: "Report a Concern", 
      link: "/submit", 
      desc: "Submit a confidential, legally protected report regarding contract inflation or misuse of public funds under Act 720 and Act 1172." 
    },
    { 
      id: "action-2", 
      title: "Verify a Clearance", 
      link: "/clearance", 
      desc: "Search the public statutory register to confirm if a major government contract has received an authentic Certificate of Clearance." 
    },
    { 
      id: "action-3", 
      title: "Check Debarments", 
      link: "/sanctions", 
      desc: "View the official gazetted register of contractors and suppliers currently banned from public procurement for cost inflation." 
    },
  ]
};

export const LS_HOMEPAGE_KEY = "vfmo_homepage";
export const LS_HOMEPAGE_EVENT = "vfmo_homepage_changed";

export function getHomepageData() {
  try {
    const saved = localStorage.getItem(LS_HOMEPAGE_KEY);
    if (saved === null) return initialHomepageData;
    const parsed = JSON.parse(saved);
    // Simple check to ensure structure is intact
    if (parsed && parsed.heroSlides && parsed.stats && parsed.publicActions) {
      return parsed;
    }
    return initialHomepageData;
  } catch (e) {
    console.error("Failed to read homepage data", e);
    return initialHomepageData;
  }
}

export function saveHomepageData(data) {
  localStorage.setItem(LS_HOMEPAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event(LS_HOMEPAGE_EVENT));
}

export function resetHomepageData() {
  localStorage.removeItem(LS_HOMEPAGE_KEY);
  window.dispatchEvent(new Event(LS_HOMEPAGE_EVENT));
}