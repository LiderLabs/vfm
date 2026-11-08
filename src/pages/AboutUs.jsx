import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import InteractiveVfmWall from "../components/InteractiveVfmWall";
import { ChevronDown } from "lucide-react";

// ========================================================
// 1. STATS SECTION HAND-DRAWN ICONS
// ========================================================
const HandDrawnScaleIcon = ({ color = "#001F3F" }) => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 7 L24 41" strokeWidth="2.6" />
    <path d="M15 41 L33 41" strokeWidth="3" />
    <circle cx="24" cy="6" r="2.5" fill={color} />
    <path d="M8 14 C16 12.5, 32 12.5, 40 14" strokeWidth="2.5" />
    <path d="M8 14 L4 25 M8 14 L14 25" strokeWidth="2" />
    <path d="M3 25 C4 30, 14 30, 15 25 Z" fill={color === "#B8860B" ? "rgba(252,209,22,0.12)" : "rgba(0,31,63,0.06)"} strokeWidth="2" />
    <path d="M40 14 L34 25 M40 14 L44 25" strokeWidth="2" />
    <path d="M33 25 C34 30, 44 30, 45 25 Z" fill={color === "#B8860B" ? "rgba(252,209,22,0.12)" : "rgba(0,31,63,0.06)"} strokeWidth="2" />
  </svg>
);

const HandDrawnPinIcon = ({ color = "#B8860B" }) => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 5 C16.5 5, 11 11, 11 18.5 C11 28, 24 43, 24 43 C24 43, 37 28, 37 18.5 C37 11, 31.5 5, 24 5 Z" />
    <circle cx="24" cy="18" r="5" strokeWidth="2.2" fill="rgba(252,209,22,0.25)" />
    <path d="M16 44 C19 46, 29 46, 32 44" strokeWidth="1.8" strokeDasharray="3 3" opacity="0.6" />
  </svg>
);

const HandDrawnClockIcon = ({ color = "#001F3F" }) => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="18" strokeWidth="2.6" />
    <circle cx="24" cy="24" r="14" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.3" />
    <path d="M24 13 L24 24 L31 24" strokeWidth="2.8" />
    <circle cx="24" cy="24" r="2" fill={color} />
    <path d="M7 14 L3 12 M8 34 L4 36" strokeWidth="2" opacity="0.45" />
  </svg>
);

const HandDrawnBanIcon = ({ color = "#B8860B" }) => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="17" strokeWidth="2.6" />
    <path d="M12 12 L36 36" strokeWidth="3" />
    <path d="M24 8 C15.2 8, 8 15.2, 8 24 C8 32.8, 15.2 40, 24 40" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.35" />
  </svg>
);

// ========================================================
// 2. INSTITUTIONAL VALUES HAND-DRAWN ICONS
// ========================================================
const HandDrawnIntegrityIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 6 C30 8, 38 7, 40 13 C41 26, 33 37, 24 43 C15 37, 7 26, 8 13 C10 7, 18 8, 24 6 Z" />
    <path d="M24 9 C28 10.5, 34 10, 36.5 14.5 C37.5 24, 31 33, 24 38 C17 33, 10.5 24, 11.5 14.5 C14 10, 19.5 10.5, 24 9 Z" strokeWidth="1.4" strokeDasharray="3 3" opacity="0.4" />
    <path d="M24 16 L25.5 21 L31 21.5 L27 25.5 L28 31 L24 28 L20 31 L21 25.5 L17 21.5 L22.5 21 Z" fill="rgba(252,209,22,0.35)" strokeWidth="2" />
  </svg>
);

const HandDrawnTransparencyIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 24 C11 14, 27 14, 42 24 C37 34, 21 34, 6 24 Z" strokeWidth="2.5" />
    <circle cx="24" cy="24" r="6" strokeWidth="2.2" />
    <circle cx="25.5" cy="22.5" r="2" fill="#001F3F" />
    <path d="M24 6 L24 10" strokeWidth="2" />
    <path d="M12 9 L14.5 12" strokeWidth="2" />
    <path d="M36 9 L33.5 12" strokeWidth="2" />
    <path d="M8 24 C8 24, 14 30, 24 30 C34 30, 40 24, 40 24" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.4" />
  </svg>
);

const HandDrawnAccountabilityIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="19" cy="15" r="7.5" strokeWidth="2.5" />
    <path d="M7 40 C7 31, 13 27, 21 27 C24 27, 26 27.8, 28 29" strokeWidth="2.4" />
    <circle cx="34" cy="31" r="9" strokeWidth="2.2" fill="rgba(252,209,22,0.25)" />
    <path d="M30 31 L33 34 L39 27" strokeWidth="2.8" />
  </svg>
);

const HandDrawnEfficiencyIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 38 L42 38" strokeWidth="2.5" />
    <path d="M6 38 L6 10" strokeWidth="2.5" />
    <path d="M10 30 L18 20 L26 25 L38 10" strokeWidth="2.8" />
    <path d="M29 10 L39 10 L39 20" strokeWidth="2.8" />
    <path d="M18 13 C22 8, 30 8, 33 11" strokeWidth="1.8" strokeDasharray="2 3" opacity="0.5" />
  </svg>
);

// --- SCROLL ANIMATION HOOK ---
function useScrollReveal(isMobile) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (isMobile) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => { setIsVisible(entry.isIntersecting); },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [isMobile]);

  return [ref, isVisible];
}

const Reveal = ({ children, delay = 0, width = "100%", isMobile }) => {
  const [ref, isVisible] = useScrollReveal(isMobile);
  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        width: width
      }}
    >
      {children}
    </div>
  );
};

export default function AboutUs() {
  const { hash } = useLocation();
  const [openScope, setOpenScope] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 992px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const stats = [
    { number: "Act 1172", unit: "", label: "LEGAL FRAMEWORK", sub: "Value for Money Office Act, 2026", icon: HandDrawnScaleIcon, isGold: false },
    { number: "16", unit: "Regions", label: "NATIONAL COVERAGE", sub: "Across all administrative regions", icon: HandDrawnPinIcon, isGold: true },
    { number: "14", unit: "Days", label: "COMPLAINT ASSESSMENT", sub: "Statutory Timeline (Section 45)", icon: HandDrawnClockIcon, isGold: false },
    { number: "2 – 5", unit: "Years", label: "DEBARMENT PENALTY", sub: "For Cost Inflation (Section 38)", icon: HandDrawnBanIcon, isGold: true },
  ];

  const scopes = [
    { title: "Statutory Pre-Contract Reviews", desc: "Mandatory evaluation of all major capital projects and single-source procurements prior to the award of contract." },
    { title: "Compliance & Sanctions", desc: "Continuous oversight of project execution, with the statutory power to halt non-compliant processes and apply administrative penalties." },
    { title: "Institutional Standards", desc: "Setting national benchmarks for cost estimation, lifecycle maintenance, and value-for-money auditing across all MDAs." },
    { title: "Public Reporting", desc: "Publishing annual value-for-money registers and gazetted findings to ensure transparency and citizen accountability." }
  ];

  const values = [
    { title: "Integrity", desc: "Upholding the highest standards of honesty and ethical conduct in all our evaluations.", icon: HandDrawnIntegrityIcon },
    { title: "Transparency", desc: "Ensuring our processes and findings are open, clear, and accessible to the public.", icon: HandDrawnTransparencyIcon },
    { title: "Accountability", desc: "Taking responsibility for our actions and holding public entities to the same standard.", icon: HandDrawnAccountabilityIcon },
    { title: "Efficiency", desc: "Maximizing the impact of every Cedi spent to deliver the best outcomes for citizens.", icon: HandDrawnEfficiencyIcon },
  ];

  const boardMembers = [
    { title: "Director-General", desc: "Dr. Abdul-Baasit Aziz-Bamba", isDG: true, image: "/dg-aziz-bamba.jpg" },
    { title: "Attorney-General's Rep", desc: "Chief State Attorney or above" },
    { title: "Ministry of Finance Rep", desc: "Legal Affairs Directorate" },
    { title: "Gender & Equity Expert", desc: "Presidential Nominee" },
    { title: "Audit Service Rep", desc: "Director level or above" },
    { title: "ICAG Rep", desc: "Institute of Chartered Accountants" },
    { title: "Architects Rep", desc: "Ghana Institute of Architects" },
    { title: "PPA Rep", desc: "Public Procurement Authority" },
    { title: "Surveyors Rep", desc: "Ghana Institution of Surveyors" },
    { title: "Engineers Rep", desc: "Ghana Institution of Engineering" }
  ];

  return (
    <div style={{ minHeight: "100vh", overflowX: "hidden", fontFamily: "'Inter', sans-serif" }}>
      
      {/* 1. PAGE HEADER */}
      <section style={{ position: "relative", backgroundColor: "#F8F9FA", width: "100%" }}>
        <div style={{ 
          width: "100%", height: "clamp(300px, 50vw, 600px)",
          backgroundImage: "url(/about-hero-banner.jpg)", backgroundSize: "cover",
          backgroundPosition: "center 60%", position: "relative",
          display: "flex", alignItems: "flex-end"
        }}>
          <div style={{ 
            width: "100%", height: "100%",
            background: "linear-gradient(to bottom, rgba(0, 31, 63, 0) 20%, rgba(0, 31, 63, 0.4) 60%, rgba(0, 31, 63, 1) 100%)"
          }} />
        </div>

        <div style={{ position: "relative", marginTop: "-80px", display: "flex", justifyContent: "center", padding: "0 24px" }}>
          <Reveal isMobile={isMobile}>
            <div style={{ 
              backgroundColor: "#001F3F", borderRadius: "16px", padding: "40px 60px", 
              textAlign: "center", color: "white", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", maxWidth: "800px",
              position: "relative", zIndex: 10
            }}>
              <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "900", margin: "0 0 16px 0", letterSpacing: "-1px" }}>About Us</h1>
              <p style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "#E2E8F0", margin: "0 auto", fontWeight: "500", lineHeight: "1.6" }}>
                Learn more about our mandate, our leadership, and the values that drive us to ensure value for every Cedi.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. EXECUTIVE SUMMARY & STATS */}
      <section style={{ position: "relative", padding: "100px 24px 80px", overflow: "hidden", backgroundColor: "#F4F5F0" }}>
        <div style={{ position: "absolute", right: "-5%", top: "10%", width: "600px", height: "600px", backgroundImage: "url('/vfm-logo.png')", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", opacity: 0.03, zIndex: 0, pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", marginBottom: "80px", alignItems: "stretch" }}>
            <Reveal isMobile={isMobile}>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ marginBottom: "24px" }}>
                  <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "1.5px", color: "#8B7355", textTransform: "uppercase" }}>
                    The Object of the Office
                  </span>
                </div>
                <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: "800", color: "#0F172A", lineHeight: "1.2", margin: "0 0 24px 0" }}>
                  To regulate, monitor, coordinate, promote, develop and conduct value for money assessments.
                </h1>
                <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#334155", marginBottom: "20px", fontWeight: "500" }}>
                  Established under Act 1172, our core object is to review procurement practices—including cost estimation methodologies, contract management processes, and expenditure control mechanisms—to ensure efficiency in public expenditure.
                </p>
                <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#64748B", marginBottom: "32px" }}>
                  We scrutinise major capital projects, establish benchmarks for public capital efficiency, and ensure every public investment translates into tangible, durable socio-economic benefits for Ghanaian citizens across all sixteen administrative regions.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2} isMobile={isMobile}>
              <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.15)", height: "100%", minHeight: "400px" }}>
                <img src="/boardroom.jpg" alt="VfM Boardroom" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} isMobile={isMobile}>
            <div style={{ 
              backgroundColor: "#FFFFFF", borderRadius: "20px", padding: "40px 32px", 
              boxShadow: "0 20px 45px -10px rgba(0, 31, 63, 0.08)", 
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", 
              gap: "28px", border: "1px solid #E2E8F0", marginBottom: "80px", position: "relative"
            }}>
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                const accentColor = stat.isGold ? "#B8860B" : "#001F3F";
                const lightBadge = stat.isGold ? "rgba(252, 209, 22, 0.15)" : "rgba(0, 31, 63, 0.05)";

                return (
                  <div 
                    key={index} 
                    style={{ 
                      display: "flex", flexDirection: "column", padding: "12px 16px",
                      borderRight: index < stats.length - 1 ? "1px solid #F1F5F9" : "none",
                      transition: "transform 0.25s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                      <div style={{ 
                        width: "50px", height: "50px", borderRadius: "12px", 
                        backgroundColor: lightBadge,
                        display: "flex", alignItems: "center", justifyContent: "center" 
                      }}>
                        <IconComponent color={accentColor} />
                      </div>
                      <span style={{ 
                        fontSize: "10px", fontWeight: "800", color: accentColor, 
                        letterSpacing: "1px", textTransform: "uppercase",
                        backgroundColor: lightBadge, padding: "4px 8px", borderRadius: "6px"
                      }}>
                        {stat.label}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "6px" }}>
                      <h3 style={{ fontSize: "34px", fontWeight: "900", margin: 0, color: accentColor, lineHeight: 1.1, letterSpacing: "-0.5px" }}>
                        {stat.number}
                      </h3>
                      {stat.unit && (
                        <span style={{ fontSize: "20px", fontWeight: "800", color: accentColor, lineHeight: 1 }}>
                          {stat.unit}
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: "13px", color: "#64748B", margin: 0, lineHeight: "1.45", fontWeight: "500" }}>
                      {stat.sub}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>

        </div>
      </section>

      {/* 3. STATUTORY INDEPENDENCE */}
      <div style={{ position: "relative" }}>
        <div style={{ 
          position: "absolute", top: 0, left: "50%", transform: "translate(-50%, -50%)",
          zIndex: 20, display: "flex", justifyContent: "center"
        }}>
          <div style={{ 
            width: "180px", height: "180px", backgroundColor: "#FFFFFF", borderRadius: "50%", 
            display: "flex", alignItems: "center", justifyContent: "center", 
            boxShadow: "0 25px 50px rgba(0,0,0,0.4), 0 0 0 4px #FCD116", padding: "25px"
          }}>
            <img src="/vfm-logo.png" alt="VfM Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
        </div>

        <section style={{ position: "relative", padding: "140px 24px 80px", backgroundColor: "#001F3F", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/building-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2, zIndex: 0 }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(90deg, rgba(0,31,63,1) 40%, rgba(0,31,63,0.8) 100%)", zIndex: 1 }} />
          
          <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <Reveal isMobile={isMobile}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: "800", color: "#FFFFFF", marginBottom: "16px" }}>Statutory Independence</h2>
                <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#E2E8F0", lineHeight: "1.6", maxWidth: "800px", margin: "0 auto" }}>
                  "Except as otherwise provided in the Constitution or by any other enactment, the Office is <strong>not subject to the direction or control of a person or an authority</strong> in the performance of the functions of the Office."
                </p>
                <p style={{ fontSize: "14px", fontWeight: "700", color: "#FCD116", marginTop: "16px", letterSpacing: "1px" }}>SECTION 12, ACT 1172</p>
              </div>
            </Reveal>
          </div>
        </section>
      </div>

      {/* 4. INTERACTIVE VFM WALL (Restored for both desktop and mobile) */}
      <InteractiveVfmWall />

      {/* 5. STATUTORY MANDATE */}
      <section style={{ position: "relative", padding: "100px 24px", overflow: "hidden", backgroundColor: "#FFFFFF" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/boardroom.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.05, zIndex: 0 }} />
        <div style={{ position: "absolute", right: "-5%", top: "0%", width: "600px", height: "600px", backgroundImage: "url(/coat-of-arms.png)", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", opacity: 0.03, zIndex: 0, pointerEvents: "none" }} />

        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
          <Reveal isMobile={isMobile}>
            <div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: "800", color: "#0F172A", margin: "0 0 32px 0", lineHeight: "1.2" }}>
                A Statutory Mandate for Fiscal Integrity.
              </h2>
              <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#334155", marginBottom: "24px", fontWeight: "500" }}>
                The VfM Office is not merely an advisory body; it is a statutory authority. Under Section 1 of Act 1172, the Office is established as a body corporate with the power to acquire and hold property, enter into contracts, and perform its functions independently.
              </p>
              <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#475569" }}>
                Our mandate extends across all phases of the public procurement lifecycle, from the earliest feasibility studies to the final project audit and impact evaluation.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. SCOPE OF AUTHORITY */}
      <section style={{ position: "relative", padding: "100px 24px 100px", overflow: "hidden", backgroundColor: "#F0F4F8" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/building-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15, zIndex: 0 }} />
        
        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal isMobile={isMobile}>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: "800", color: "#0F172A", margin: "0 0 16px 0" }}>Scope of Authority</h2>
              <p style={{ color: "#475569", fontSize: "18px", margin: 0, maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>The statutory powers granted to the VfM Office to enforce fiscal discipline.</p>
            </div>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {scopes.map((scope, index) => {
              const isOpen = openScope === index;
              return (
                <Reveal key={index} delay={index * 0.1} isMobile={isMobile}>
                  <div 
                    onClick={() => setOpenScope(isOpen ? null : index)}
                    style={{ 
                      backgroundColor: isOpen ? "#001F3F" : "#FFFFFF", 
                      borderRadius: "12px", cursor: "pointer",
                      transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                      boxShadow: isOpen ? "0 25px 50px rgba(0,31,63,0.25)" : "0 4px 6px rgba(0,0,0,0.03)",
                      border: isOpen ? "1px solid #001F3F" : "1px solid #E2E8F0",
                      overflow: "hidden"
                    }}
                  >
                    <div style={{ padding: "24px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                      <h3 style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: "800", color: isOpen ? "#FFFFFF" : "#0F172A", margin: 0, transition: "color 0.3s ease" }}>
                        {scope.title}
                      </h3>
                      <div style={{ width: "36px", height: "36px", flexShrink: 0, borderRadius: "50%", backgroundColor: isOpen ? "#FCD116" : "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.4s ease", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                        <ChevronDown size={20} color={isOpen ? "#001F3F" : "#64748B"} strokeWidth={2.5} />
                      </div>
                    </div>
                    <div style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0, overflow: "hidden", transition: "max-height 0.4s ease-in-out, opacity 0.3s ease-in-out", backgroundColor: isOpen ? "#0A2E4D" : "transparent" }}>
                      <div style={{ padding: "0 20px 24px 20px" }}>
                        <p style={{ fontSize: "16px", color: "#CBD5E1", lineHeight: "1.7", margin: 0 }}>{scope.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. THE GOVERNING BOARD */}
      <section id="leadership" style={{ position: "relative", backgroundColor: "#F8F9FA", padding: "100px 24px", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/boardroom.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08, zIndex: 0 }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal isMobile={isMobile}>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: "800", color: "#001F3F", margin: "0 0 12px 0" }}>The Governing Board</h2>
              <p style={{ color: "#666666", fontSize: "16px", margin: 0, maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
                The Office is governed by a multidisciplinary Board appointed in accordance with Section 4 of Act 1172. The Board is led by the Chairperson, with the Director-General serving as the chief executive.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: "60px" }}>
            <Reveal width="auto" isMobile={isMobile}>
              <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "40px", border: "2px solid #001F3F", boxShadow: "0 20px 40px rgba(0,31,63,0.15)", textAlign: "center", width: "100%", maxWidth: "320px" }}>
                <div style={{ width: "80px", height: "80px", backgroundColor: "#F1F5F9", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto" }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#001F3F" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#001F3F", margin: "0 0 4px 0" }}>Board Chairperson</h3>
                <p style={{ fontSize: "13px", color: "#64748B", fontWeight: "700", margin: 0, letterSpacing: "1px", textTransform: "uppercase" }}>Nominated by the Minister</p>
              </div>
            </Reveal>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
            <div style={{ width: "2px", height: "40px", backgroundColor: "#CBD5E1" }} />
          </div>

          <Reveal delay={0.1} isMobile={isMobile}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <span style={{ fontSize: "12px", fontWeight: "800", color: "#8B7355", textTransform: "uppercase", letterSpacing: "1.5px" }}>Statutory Members of the Board</span>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            {boardMembers.map((member, index) => (
              <Reveal key={index} delay={index * 0.05} width="100%" isMobile={isMobile}>
                <div style={{ 
                  backgroundColor: member.isDG ? "#001F3F" : "#FFFFFF", 
                  borderRadius: "12px", padding: "24px", 
                  border: member.isDG ? "none" : "1px solid #E2E8F0", 
                  textAlign: "center", height: "100%", 
                  display: "flex", flexDirection: "column", 
                  alignItems: "center", justifyContent: "center",
                  boxShadow: member.isDG ? "0 10px 20px rgba(0,31,63,0.2)" : "0 4px 6px rgba(0,0,0,0.02)"
                }}>
                  {member.image ? (
                    <img src={member.image} alt={member.title} style={{ width: "70px", height: "70px", borderRadius: "50%", objectFit: "cover", objectPosition: "top", marginBottom: "16px", border: "2px solid #FCD116" }} />
                  ) : (
                    <div style={{ width: "56px", height: "56px", backgroundColor: member.isDG ? "rgba(255,255,255,0.1)" : "#F8FAFC", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", border: member.isDG ? "1px solid rgba(255,255,255,0.2)" : "1px solid #E2E8F0" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={member.isDG ? "#FCD116" : "#94A3B8"} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                  )}
                  <h4 style={{ fontSize: "16px", fontWeight: "800", color: member.isDG ? "#FFFFFF" : "#001F3F", margin: "0 0 4px 0" }}>{member.title}</h4>
                  <p style={{ fontSize: "13px", color: member.isDG ? "#CBD5E1" : "#64748B", margin: 0, lineHeight: "1.4" }}>{member.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. INSTITUTIONAL VALUES */}
      <section id="values" style={{ position: "relative", background: "linear-gradient(180deg, #FFFFFF 0%, #FFFBF0 100%)", padding: "90px 24px 100px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal isMobile={isMobile}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 38px)", fontWeight: "900", color: "#001F3F", margin: "0 0 12px 0", letterSpacing: "-0.5px" }}>
                Institutional Values
              </h2>
              <p style={{ color: "#64748B", fontSize: "17px", margin: 0, fontWeight: "500" }}>
                The core statutory principles that guide our evaluations and operations every day.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "28px" }}>
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Reveal key={index} delay={index * 0.08} isMobile={isMobile}>
                  <div 
                    style={{ 
                      backgroundColor: "#FFFFFF", padding: "36px 30px", borderRadius: "16px", 
                      border: "1px solid #E2E8F0", height: "100%", display: "flex", flexDirection: "column", 
                      boxShadow: "0 10px 30px -5px rgba(0, 31, 63, 0.05)",
                      transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease" 
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.boxShadow = "0 20px 40px -10px rgba(0, 31, 63, 0.12)";
                      e.currentTarget.style.borderColor = "#CBD5E1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 10px 30px -5px rgba(0, 31, 63, 0.05)";
                      e.currentTarget.style.borderColor = "#E2E8F0";
                    }}
                  >
                    <div style={{ 
                      width: "68px", height: "68px", backgroundColor: "rgba(0, 31, 63, 0.04)", 
                      borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", 
                      marginBottom: "22px", border: "1px solid rgba(0, 31, 63, 0.06)"
                    }}>
                      <IconComponent />
                    </div>

                    <h3 style={{ fontSize: "21px", fontWeight: "800", color: "#001F3F", margin: "0 0 10px 0" }}>
                      {value.title}
                    </h3>
                    <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.65", margin: 0, flex: 1, fontWeight: "400" }}>
                      {value.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}