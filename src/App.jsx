import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import WhatWeDo from "./pages/WhatWeDo";
import Publications from "./pages/Publications";
import News from "./pages/News";
import Mandate from "./pages/Mandate";
import Contact from "./pages/Contact";
import Portal from "./pages/Portal";
import Dashboard from "./pages/Dashboard";
import Assessments from "./pages/Assessments";
import Submit from "./pages/Submit"; 
import Track from "./pages/Track"; 
import Clearance from "./pages/Clearance"; 
import Sanctions from "./pages/Sanctions"; 
import OpenData from "./pages/OpenData"; 
import Engagement from "./pages/Engagement"; 
import ReviewPanel from "./pages/ReviewPanel"; // <-- IMPORTED REVIEW PANEL
import Placeholder from "./pages/Placeholder";

function Layout() {
  const location = useLocation();
  
  // Hide Navbar/Footer/ScrollToTop on Portal and ANY Dashboard sub-page
  const isPortal = location.pathname === "/portal";
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div style={{ fontFamily: "sans-serif", margin: 0, padding: 0, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      
      {!isPortal && !isDashboard && <Navbar />}
      
      <div style={{ flex: 1 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/mandate" element={<Mandate />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Public Submission, Tracking, Clearance, Sanctions, Open Data & Engagement Routes */}
          <Route path="/submit" element={<Submit />} />
          <Route path="/track" element={<Track />} />
          <Route path="/clearance" element={<Clearance />} />
          <Route path="/sanctions" element={<Sanctions />} />
          <Route path="/open-data" element={<OpenData />} />
          <Route path="/engagement" element={<Engagement />} />
          <Route path="/review-panel" element={<ReviewPanel />} /> {/* <-- ADDED REVIEW PANEL ROUTE */}
          
          {/* Secure Portal Routes */}
          <Route path="/portal" element={<Portal />} />
          
          {/* Internal Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/assessments" element={<Assessments />} />
          
          {/* Fallback */}
          <Route path="*" element={<Placeholder />} />
        </Routes>
      </div>

      {!isPortal && !isDashboard && <Footer />}
      {!isPortal && !isDashboard && <ScrollToTop />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}