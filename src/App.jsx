import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import WhatWeDo from "./pages/WhatWeDo"; // <-- IMPORT THE NEW PAGE
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
            
            {/* THIS IS THE FIX: Pointing to the real page now */}
            <Route path="/what-we-do" element={<WhatWeDo />} /> 
            
            <Route path="/mandate" element={<Placeholder />} />
            <Route path="/publications" element={<Placeholder />} />
            <Route path="/news" element={<Placeholder />} />
            <Route path="/contact" element={<Placeholder />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}