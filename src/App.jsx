import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import WhatWeDo from "./pages/WhatWeDo";
import Publications from "./pages/Publications"; // <-- IMPORT PUBLICATIONS
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
            <Route path="/what-we-do" element={<WhatWeDo />} />
            
            {/* WIRE UP PUBLICATIONS HERE */}
            <Route path="/publications" element={<Publications />} />
            
            <Route path="/mandate" element={<Placeholder />} />
            <Route path="/news" element={<Placeholder />} />
            <Route path="/contact" element={<Placeholder />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}