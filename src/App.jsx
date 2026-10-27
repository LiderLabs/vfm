import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import WhatWeDo from "./pages/WhatWeDo";
import Publications from "./pages/Publications";
import News from "./pages/News"; // <-- NEWS IMPORTED
import Placeholder from "./pages/Placeholder";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: "sans-serif", margin: 0, padding: 0, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        
        <div style={{ flex: 1 }}>
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<Home />} />
            
            {/* About Us Page */}
            <Route path="/about" element={<AboutUs />} />
            
            {/* What We Do Page */}
            <Route path="/what-we-do" element={<WhatWeDo />} />
            
            {/* Publications Page */}
            <Route path="/publications" element={<Publications />} />
            
            {/* News & Insights Page */}
            <Route path="/news" element={<News />} />
            
            {/* Placeholder Pages (To be built later) */}
            <Route path="/mandate" element={<Placeholder />} />
            <Route path="/contact" element={<Placeholder />} />
            <Route path="/portal" element={<Placeholder />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}