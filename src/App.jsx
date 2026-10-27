import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import WhatWeDo from "./pages/WhatWeDo";
import Publications from "./pages/Publications";
import News from "./pages/News";
import Mandate from "./pages/Mandate";
import Contact from "./pages/Contact";
import Portal from "./pages/Portal"; // <-- IMPORT PORTAL
import Placeholder from "./pages/Placeholder";

// We create a layout component to handle the Navbar/Footer visibility
function Layout() {
  const location = useLocation();
  
  // Check if the current URL is the portal page
  const isPortal = location.pathname === "/portal";

  return (
    <div style={{ fontFamily: "sans-serif", margin: 0, padding: 0, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      
      {/* Hide Navbar on Portal page */}
      {!isPortal && <Navbar />}
      
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/mandate" element={<Mandate />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* The Portal Route */}
          <Route path="/portal" element={<Portal />} />
          
          <Route path="*" element={<Placeholder />} />
        </Routes>
      </div>

      {/* Hide Footer on Portal page */}
      {!isPortal && <Footer />}
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