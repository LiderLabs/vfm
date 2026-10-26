import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MandateCards from "./components/MandateCards";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif", margin: 0, padding: 0, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <MandateCards />
      <Footer />
    </div>
  );
}