import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// ========================================================
// 1. HAND-DRAWN ICONS
// ========================================================
const HandDrawnPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "text-bottom", marginRight: "4px" }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const HandDrawnCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "text-bottom", marginRight: "4px" }}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const HandDrawnClock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "text-bottom", marginRight: "4px" }}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const HandDrawnArrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const HandDrawnBookmark = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
);

// ========================================================
// 2. MAIN PAGE
// ========================================================
export default function News() {
  const prefersReduced = useReducedMotion();
  
  // Hero Scroll Parallax
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const sideArticles = [
    {
      title: "Standardising Unit Costs in Healthcare Facility Infrastructure",
      desc: "An analysis of medical procurement indices, revealing critical insights for standardizing secondary hospital construction schedules and technical installations."
    },
    {
      title: "Quarterly Briefing: Strengthening Oversight Mechanisms Across Metropolitan Assemblies",
      desc: "Guidance directed at Municipal and District Assemblies (MMDAs) outlining newly gazetted procedural checks for high-frequency civic works tenders."
    }
  ];

  return (
    <div style={{ position: "relative", backgroundColor: "#F4F5F0", minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* SUBTLE VFMO LOGO BACKGROUND */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: "url(/vfm-logo.png)", backgroundRepeat: "no-repeat",
          backgroundPosition: "center center", backgroundSize: "min(85vw, 900px)",
          opacity: 0.04, filter: "grayscale(10%)",
        }}
      />

      {/* CONTENT ABOVE LOGO */}
      <div style={{ position: "relative", zIndex: 1 }}>
        
        {/* HEADER SECTION WITH BACKGROUND IMAGE */}
        <section ref={heroRef} style={{ position: "relative", padding: "120px 24px 100px", backgroundColor: "#001F3F", overflow: "hidden" }}>
          <motion.div style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: "-15%",
            backgroundImage: "url(/building-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center",
            opacity: 0.15, zIndex: 0, y: prefersReduced ? 0 : heroBgY, scale: prefersReduced ? 1 : heroScale,
          }} />
          
          <div style={{
            position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,31,63,0.7) 0%, rgba(0,31,63,0.95) 100%)", zIndex: 1
          }} />

          <motion.div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", y: prefersReduced ? 0 : heroContentY, opacity: prefersReduced ? 1 : heroOpacity }}>
            <div>
              <h1 style={{ fontSize: "clamp(34px, 6vw, 52px)", fontWeight: "800", color: "#FFFFFF", margin: 0, lineHeight: "1.1" }}>
                News & Institutional<br/>Insights
              </h1>
            </div>
            
            <motion.a 
              href="#all-news" 
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ display: "flex", alignItems: "center", gap: "8px", color: "#FCD116", fontWeight: "700", fontSize: "15px", textDecoration: "none", borderBottom: "2px solid #FCD116", paddingBottom: "4px" }}
            >
              View All Policy News
              <HandDrawnArrow />
            </motion.a>
          </motion.div>
        </section>

        {/* MAIN CONTENT AREA */}
        <section style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "start" }}>
            
            {/* LEFT COLUMN: FEATURED ARTICLE */}
            <motion.div 
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={prefersReduced ? {} : { y: -6, boxShadow: "0 24px 48px -12px rgba(0,31,63,0.12)" }}
              style={{ 
                backgroundColor: "#FFFFFF", borderRadius: "16px", overflow: "hidden", 
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0",
                display: "flex", flexDirection: "column", height: "100%",
                transition: "box-shadow 0.3s ease"
              }}
            >
              {/* Image Area with Gradient Fade */}
              <div style={{ position: "relative", height: "350px" }}>
                <div style={{ 
                  position: "absolute", inset: 0, 
                  backgroundColor: "#E2E8F0",
                  backgroundImage: "url(/boardroom.jpg)",
                  backgroundSize: "cover", 
                  backgroundPosition: "center" 
                }} />
                
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "150px", background: "linear-gradient(to top, #FFFFFF, transparent)" }} />
                
                <motion.div 
                  initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  style={{ position: "absolute", bottom: "24px", left: "32px", backgroundColor: "#8B7355", color: "#FFFFFF", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", fontWeight: "800", letterSpacing: "1px", textTransform: "uppercase" }}
                >
                  Symposium Brief
                </motion.div>
              </div>

              {/* Text Content */}
              <div style={{ padding: "0 32px 40px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center", fontSize: "13px", color: "#64748B", fontWeight: "600", marginBottom: "16px", flexWrap: "wrap" }}>
                  <span><HandDrawnPin /> Accra, Ghana</span>
                  <span style={{ fontSize: "8px" }}>●</span>
                  <span><HandDrawnCalendar /> November 18, 2024</span>
                  <span style={{ fontSize: "8px" }}>●</span>
                  <span><HandDrawnClock /> 5 min read</span>
                </div>

                <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#8B7355", margin: "0 0 16px 0", lineHeight: "1.3" }}>
                  VFM Office Convenes Multi-Agency Symposium on Capital Project Cost Optimization in Accra
                </h2>

                <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.6", marginBottom: "32px", flexGrow: 1 }}>
                  Senior leadership from the Ministry of Finance, the Ministry of Roads and Highways, and regional development authorities gathered to establish harmonized unit costing models aimed at preventing capital variance in public infrastructure delivery.
                </p>

                <a href="#read" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#8B7355", fontWeight: "700", fontSize: "15px", textDecoration: "none" }}>
                  Read Full Coverage
                  <HandDrawnArrow />
                </a>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: SECONDARY ARTICLES */}
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {sideArticles.map((article, index) => (
                <motion.div 
                  key={index}
                  initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 + (index * 0.1) }}
                  whileHover={prefersReduced ? {} : { y: -4, boxShadow: "0 20px 40px -10px rgba(0,31,63,0.08)", borderColor: "#CBD5E1" }}
                  style={{ 
                    backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "32px", 
                    boxShadow: "0 4px 6px rgba(0,0,0,0.02)", border: "1px solid #E2E8F0", 
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                    <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0F172A", margin: "0 0 12px 0", lineHeight: "1.3" }}>
                      {article.title}
                    </h3>
                    <div style={{ flexShrink: 0, opacity: 0.7 }}>
                      <HandDrawnBookmark />
                    </div>
                  </div>

                  <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", marginBottom: "24px" }}>
                    {article.desc}
                  </p>

                  <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "20px" }}>
                    <a href="#read" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#001F3F", fontWeight: "700", fontSize: "14px", textDecoration: "none" }}>
                      Read Dispatch
                      <HandDrawnArrow size={14} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </section>
      </div>
    </div>
  );
}