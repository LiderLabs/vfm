import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import WhatWeDo from "./pages/WhatWeDo";
import Publications from "./pages/Publications";
import News from "./pages/News";
import Mandate from "./pages/Mandate"; 
import Contact from "./pages/Contact"; // <-- IMPORT CONTACT
import Placeholder from "./pages/Placeholder";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: "sans-serif", margin: 0, padding: 0, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/mandate" element={<Mandate />} />
            <Route path="/what-we-do" element={<WhatWeDo />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/news" element={<News />} />
            
            {/* WIRE UP CONTACT HERE */}
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/portal" element={<Placeholder />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}