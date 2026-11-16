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