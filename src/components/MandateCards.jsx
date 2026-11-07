import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// ========================================================
// 1. CORE MANDATE HAND-DRAWN ICONS
// ========================================================

const HandDrawnShield = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 6 C30 8, 38 7, 40 13 C41 26, 33 37, 24 43 C15 37, 7 26, 8 13 C10 7, 18 8, 24 6 Z" />
    <path d="M24 9 C28.5 10.5, 34 10, 36.5 14.5 C37.5 24, 31 33, 24 38 C17 33, 10.5 24, 11.5 14.5 C14 10, 19.5 10.5, 24 9 Z" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
    <path d="M16 23 L22 29 L32 17" strokeWidth="3" />
  </svg>
);

const HandDrawnAudit = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 7 C10 5.5, 11.5 4, 13 4 L28 4 L38 14 L38 42 C38 43.5, 36.5 45, 35 45 L13 45 C11.5 45, 10 43.5, 10 42 Z" />
    <path d="M28 4 L28 14 L38 14" />
    <circle cx="21" cy="25" r="7.5" strokeWidth="2.5" />
    <path d="M26.5 30.5 L34 38" strokeWidth="3" />
    <path d="M16 13 L22 13" strokeWidth="2" />
    <path d="M16 37 L24 37" strokeWidth="2" />
  </svg>
);

const HandDrawnScales = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 8 L24 40" strokeWidth="2.5" />
    <path d="M16 41 L32 41" strokeWidth="3" />
    <circle cx="24" cy="7" r="2.5" fill="#001F3F" />
    <path d="M8 15 C16 13.5, 32 13.5, 40 15" strokeWidth="2.5" />
    <path d="M8 15 L4 26" />
    <path d="M8 15 L14 26" />
    <path d="M3 26 C4 31, 14 31, 15 26 Z" fill="rgba(0,31,63,0.06)" strokeWidth="2" />
    <path d="M40 15 L34 26" />
    <path d="M40 15 L44 26" />
    <path d="M33 26 C34 31, 44 31, 45 26 Z" fill="rgba(0,31,63,0.06)" strokeWidth="2" />
  </svg>
);

const HandDrawnTrend = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 40 L42 40" strokeWidth="2.5" />
    <path d="M6 40 L6 8" strokeWidth="2.5" />
    <path d="M10 32 L19 22 L27 28 L38 12" strokeWidth="2.8" />
    <path d="M30 12 L39 12 L39 21" strokeWidth="2.8" />
    <ellipse cx="28" cy="35" rx="5" ry="2" strokeWidth="1.8" />
    <path d="M23 35 L23 38 C23 39.5, 33 39.5, 33 38 L33 35" strokeWidth="1.8" />
  </svg>
);

const HandDrawnDigital = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="8" width="34" height="23" rx="3" strokeWidth="2.5" />
    <path d="M20 31 L17 39 L31 39 L28 31" strokeWidth="2.2" />
    <path d="M14 39 L34 39" strokeWidth="2.5" />
    <circle cx="16" cy="19" r="2.5" strokeWidth="2" />
    <circle cx="32" cy="19" r="2.5" strokeWidth="2" />
    <circle cx="24" cy="15" r="2" fill="#001F3F" />
    <path d="M18 19 L30 19" strokeWidth="1.8" strokeDasharray="2 2" />
    <path d="M17 18 L23 15 L31 18" strokeWidth="1.8" />
  </svg>
);

const HandDrawnEye = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 24 C11 14, 27 14, 42 24 C37 34, 21 34, 6 24 Z" strokeWidth="2.5" />
    <circle cx="24" cy="24" r="5" strokeWidth="2.5" />
    <circle cx="25" cy="23" r="1.5" fill="#001F3F" />
    <path d="M24 7 L24 11" strokeWidth="2.2" />
    <path d="M12 11 L14.5 14" strokeWidth="2" />
    <path d="M36 11 L33.5 14" strokeWidth="2" />
  </svg>
);

// ========================================================
// 2. PUBLIC ACTIONS HAND-DRAWN ICONS
// ========================================================

const HandDrawnAlert = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 6 L42 39 C43 41, 41.5 42.5, 39.5 42.5 L8.5 42.5 C6.5 42.5, 5 41, 6 39 L24 6 Z" />
    <path d="M24 18 L24 28" strokeWidth="3" />
    <circle cx="24" cy="35" r="1.5" fill="#001F3F" />
    <path d="M11 19 L7 16" strokeWidth="1.8" />
    <path d="M37 19 L41 16" strokeWidth="1.8" />
  </svg>
);

const HandDrawnCertificate = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 6 C11 4.5, 12.5 4, 14 4 L30 4 L40 14 L40 42 C40 43.5, 38.5 44, 37 44 L14 44 C12.5 44, 11 43.5, 11 42 Z" />
    <path d="M30 4 L30 14 L40 14" />
    <circle cx="25" cy="26" r="7.5" strokeWidth="2.2" />
    <path d="M21 26 L24 29 L29 23" strokeWidth="2.6" />
    <path d="M21 33 L18 41 L23 39 L28 41 L26 33" strokeWidth="1.8" fill="rgba(252,209,22,0.25)" />
  </svg>
);

const HandDrawnBan = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="17" strokeWidth="2.6" />
    <circle cx="24" cy="24" r="13" strokeWidth="1.4" strokeDasharray="3 3" opacity="0.4" />
    <path d="M12 12 L36 36" strokeWidth="3" />
    <path d="M8 8 L11 11" strokeWidth="1.5" />
    <path d="M37 37 L40 40" strokeWidth="1.5" />
  </svg>
);

// --- NATIVE MOBILE RISE ---
const MobileRise = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { setIsVisible(entry.isIntersecting); },
      { threshold: 0.05, rootMargin: "0px 0px -80px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        width: "100%"
      }}
    >
      {children}
    </div>
  );
};

// --- DUAL-MODE STACK SECTION WRAPPER ---
const StackSection = ({ children, index }) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"] 
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1 : 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, isMobile ? 1 : 0.6]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", isMobile ? "0px" : "32px"]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: isMobile ? "relative" : "sticky",
        top: isMobile ? "auto" : 0,
        zIndex: index + 1,
        width: "100%",
        marginTop: index === 0 ? 0 : (isMobile ? "0" : "-20px")
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          borderRadius,
          overflow: "hidden",
          transformOrigin: "top center",
          boxShadow: isMobile ? "none" : "0 -10px 40px rgba(0,0,0,0.15)",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default function MandateCards() {
  const [openAction, setOpenAction] = useState(null);

  const mandates = [
    { title: "Pre-Contract Review", description: "Mandatory VfM certification for major government contracts before they are awarded.", icon: HandDrawnShield },
    { title: "Compliance Monitoring", description: "Real-time oversight of projects to prevent cost overruns and unnecessary delays.", icon: HandDrawnAudit },
    { title: "Sanctions Enforcement", description: "Applying penalties for violations to ensure absolute accountability across all entities.", icon: HandDrawnScales },
    { title: "Cost Benchmarking", description: "Setting standard cost benchmarks to ensure uniform pricing and curb contract inflation.", icon: HandDrawnTrend },
    { title: "Digital Integration", description: "Operating a secure digital management platform to track assessments, clearances, and project evaluations in real-time (Section 27).", icon: HandDrawnDigital },
    { title: "Public Transparency", description: "Publishing annual reports and findings to keep citizens informed about the value of public spending.", icon: HandDrawnEye }
  ];

  const pillars = [
    { title: "Economy", desc: "Acquiring public resources at the appropriate cost, eliminating unjustified premiums and inflation." },
    { title: "Efficiency", desc: "Maximising programmatic outputs through responsible use of human, capital, and material resources." },
    { title: "Effectiveness", desc: "Ensuring infrastructure and programmes achieve their intended socio-economic objectives." }
  ];

  const publicActions = [
    { title: "Report a Concern", desc: "Submit a confidential, legally protected report regarding contract inflation or misuse of public funds under Act 720 and Act 1172.", link: "/submit", btnText: "Submit a Report", icon: HandDrawnAlert },
    { title: "Verify a Clearance", desc: "Search the public statutory register to confirm if a major government contract has received an authentic Certificate of Clearance.", link: "/clearance", btnText: "View Public Register", icon: HandDrawnCertificate },
    { title: "Check Debarments", desc: "View the official gazetted register of contractors and suppliers currently banned from public procurement for cost inflation.", link: "/sanctions", btnText: "View Debarment List", icon: HandDrawnBan }
  ];

  return (
    <div style={{ overflowX: "hidden", backgroundColor: "#F8F9FA", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      
      {/* 1. CORE MANDATE */}
      <StackSection index={0}>
        <section style={{ position: "relative", padding: "100px 24px 110px", backgroundColor: "#FFFFFF" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            
            {/* Header: MANDATE in signature brand yellow #FCD116 */}
            <MobileRise>
              <div style={{ textAlign: "center", marginBottom: "70px" }}>
                <h2 style={{ fontSize: "clamp(32px, 4.5vw, 46px)", fontWeight: "900", margin: "0 0 16px 0", letterSpacing: "1px", textTransform: "uppercase" }}>
                  <span style={{ color: "#001F3F" }}>CORE </span>
                  <span style={{ color: "#FCD116" }}>MANDATE</span>
                </h2>
                <p style={{ color: "#475569", fontSize: "18px", margin: 0, maxWidth: "650px", marginLeft: "auto", marginRight: "auto", lineHeight: "1.6", fontWeight: "500" }}>
                  Six statutory pillars of value-for-money oversight enforcing fiscal discipline across Ghana's public sector.
                </p>
              </div>
            </MobileRise>

            {/* Open Borderless Grid matching Image 2 */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
              gap: "60px 48px" 
            }}>
              {mandates.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <MobileRise key={index}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      
                      {/* Side-by-Side: Hand-drawn icon on left + Bold Uppercase Title on right */}
                      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "14px" }}>
                        <div style={{ 
                          flexShrink: 0, 
                          width: "52px", 
                          height: "52px", 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center" 
                        }}>
                          <IconComponent />
                        </div>

                        <h3 style={{ 
                          fontSize: "19px", 
                          fontWeight: "900", 
                          color: "#0F172A", 
                          textTransform: "uppercase", 
                          letterSpacing: "0.5px", 
                          lineHeight: "1.25", 
                          margin: 0 
                        }}>
                          {item.title}
                        </h3>
                      </div>

                      <p style={{ 
                        color: "#475569", 
                        fontSize: "15px", 
                        lineHeight: "1.65", 
                        margin: 0, 
                        fontWeight: "400" 
                      }}>
                        {item.description}
                      </p>
                    </div>
                  </MobileRise>
                );
              })}
            </div>

          </div>
        </section>
      </StackSection>

      {/* 2. STATUTORY DEFINITION OF VFM */}
      <StackSection index={1}>
        <section style={{ position: "relative", backgroundColor: "#001F3F", padding: "80px 24px", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/boardroom.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.4, zIndex: 0 }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(90deg, rgba(0,31,63,0.98) 0%, rgba(0,31,63,0.85) 50%, rgba(0,31,63,0.95) 100%)", zIndex: 1 }} />

          <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px", alignItems: "start" }}>
              <MobileRise>
                <div>
                  <h2 style={{ fontSize: "clamp(32px, 4vw, 42px)", fontWeight: "800", color: "#FFFFFF", margin: "0 0 20px 0", lineHeight: "1.2" }}>
                    The Statutory Definition of Value for Money.
                  </h2>
                  <p style={{ fontSize: "18px", color: "#CBD5E1", lineHeight: "1.7", margin: 0 }}>
                    Act 1172 mandates that public expenditure be evaluated against three distinct statutory principles. These principles form the foundation of every assessment conducted by the Office.
                  </p>
                </div>
              </MobileRise>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {pillars.map((pillar, index) => (
                  <MobileRise key={index}>
                    <div style={{ 
                      padding: "24px 0",
                      borderBottom: index === pillars.length - 1 ? "none" : "1px solid rgba(255,255,255,0.15)",
                      borderTop: index === 0 ? "1px solid rgba(255,255,255,0.15)" : "none"
                    }}>
                      <h3 style={{ fontSize: "26px", fontWeight: "700", color: "#FFFFFF", margin: "0 0 8px 0" }}>
                        {pillar.title}
                      </h3>
                      <p style={{ fontSize: "16px", color: "#CBD5E1", lineHeight: "1.6", margin: 0 }}>
                        {pillar.desc}
                      </p>
                    </div>
                  </MobileRise>
                ))}
              </div>
            </div>
          </div>
        </section>
      </StackSection>

      {/* 3. INSTITUTIONAL CTA - FULL SPLIT SCREEN */}
      <StackSection index={2}>
        <section style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          backgroundColor: "#F4F5F0",
          alignItems: "stretch",
          minHeight: "600px"
        }}>
          
          <MobileRise>
            <div style={{ 
              width: "100%", 
              height: "100%", 
              position: "relative",
              minHeight: "400px"
            }}>
              <img 
                src="/about-bg.jpg" 
                alt="Ghana Infrastructure" 
                style={{ 
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover", 
                  display: "block" 
                }} 
              />
            </div>
          </MobileRise>

          <MobileRise>
            <div style={{ 
              padding: "80px 60px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%"
            }}>
              <h2 style={{ fontSize: "42px", fontWeight: "800", color: "#0F172A", margin: "0 0 24px 0", lineHeight: "1.1" }}>
                Safeguarding Ghana's Development Capital.
              </h2>
              
              <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#475569", marginBottom: "40px" }}>
                We are dedicated to ensuring that every government contract, infrastructure project, and public investment delivers maximum benefit to the citizens of Ghana. By enforcing strict cost benchmarks, we eliminate waste and prevent contract inflation.
              </p>

              <Link to="/about#framework" style={{ 
                display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#001F3F", color: "#FFFFFF", padding: "16px 32px", 
                borderRadius: "4px", fontSize: "16px", fontWeight: "700", textDecoration: "none",
                alignSelf: "flex-start"
              }}
              >
                View Our Scope of Authority
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
            </div>
          </MobileRise>

        </section>
      </StackSection>

      {/* 4. PUBLIC ACTION DASHBOARD (REBUILT: CLICKABLE TO REVEAL DETAILS + HAND-DRAWN ICONS) */}
      <StackSection index={3}>
        <section style={{ backgroundColor: "#FFFFFF", padding: "100px 24px 110px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            
            <MobileRise>
              <div style={{ textAlign: "center", marginBottom: "70px" }}>
                <h2 style={{ fontSize: "clamp(32px, 4.5vw, 42px)", fontWeight: "900", margin: "0 0 16px 0", letterSpacing: "1px", textTransform: "uppercase" }}>
                  <span style={{ color: "#001F3F" }}>PUBLIC </span>
                  <span style={{ color: "#FCD116" }}>ACTIONS</span>
                </h2>
                <p style={{ color: "#475569", fontSize: "18px", margin: 0, maxWidth: "650px", marginLeft: "auto", marginRight: "auto", lineHeight: "1.6", fontWeight: "500" }}>
                  Direct statutory access to the VfM Office's public services, registers, and whistleblower channels. Click any item to explore.
                </p>
              </div>
            </MobileRise>

            {/* Clickable Action Tiles with Hand-Drawn Icons */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
              gap: "36px" 
            }}>
              {publicActions.map((action, index) => {
                const IconComponent = action.icon;
                const isExpanded = openAction === index;

                return (
                  <MobileRise key={index}>
                    <div 
                      onClick={() => setOpenAction(isExpanded ? null : index)}
                      style={{ 
                        backgroundColor: isExpanded ? "#FFFFFF" : "#F8FAFC", 
                        borderRadius: "16px", 
                        padding: "32px 28px", 
                        border: isExpanded ? "2px solid #001F3F" : "1px solid #E2E8F0", 
                        cursor: "pointer",
                        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                        boxShadow: isExpanded 
                          ? "0 20px 40px -10px rgba(0, 31, 63, 0.15)" 
                          : "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
                        display: "flex", 
                        flexDirection: "column",
                        position: "relative",
                      }}
                      onMouseEnter={(e) => {
                        if (!isExpanded) {
                          e.currentTarget.style.backgroundColor = "#FFFFFF";
                          e.currentTarget.style.borderColor = "#CBD5E1";
                          e.currentTarget.style.transform = "translateY(-3px)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isExpanded) {
                          e.currentTarget.style.backgroundColor = "#F8FAFC";
                          e.currentTarget.style.borderColor = "#E2E8F0";
                          e.currentTarget.style.transform = "translateY(0)";
                        }
                      }}
                    >
                      {/* Top Bar: Icon + Uppercase Title + Toggle Chevron */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                          <div style={{ 
                            flexShrink: 0, 
                            width: "48px", 
                            height: "48px", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center" 
                          }}>
                            <IconComponent />
                          </div>

                          <h3 style={{ 
                            fontSize: "18px", 
                            fontWeight: "900", 
                            color: "#0F172A", 
                            textTransform: "uppercase", 
                            letterSpacing: "0.5px", 
                            margin: 0,
                            lineHeight: "1.25"
                          }}>
                            {action.title}
                          </h3>
                        </div>

                        {/* Interactive Indicator */}
                        <div style={{ 
                          width: "32px", 
                          height: "32px", 
                          borderRadius: "50%", 
                          backgroundColor: isExpanded ? "#FCD116" : "#E2E8F0", 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center",
                          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "all 0.3s ease",
                          flexShrink: 0
                        }}>
                          <ChevronDown size={18} color="#001F3F" strokeWidth={2.5} />
                        </div>
                      </div>

                      {/* Clickable Reveal Body */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            style={{ overflow: "hidden" }}
                          >
                            <div style={{ paddingTop: "20px", marginTop: "16px", borderTop: "1px solid #F1F5F9" }}>
                              <p style={{ 
                                fontSize: "15px", 
                                color: "#475569", 
                                lineHeight: "1.65", 
                                margin: "0 0 24px 0",
                                fontWeight: "400"
                              }}>
                                {action.desc}
                              </p>

                              <Link 
                                to={action.link} 
                                onClick={(e) => e.stopPropagation()} 
                                style={{ 
                                  display: "inline-flex", 
                                  alignItems: "center", 
                                  gap: "8px", 
                                  backgroundColor: "#001F3F",
                                  color: "#FCD116",
                                  padding: "12px 22px",
                                  borderRadius: "6px",
                                  fontWeight: "800", 
                                  fontSize: "14px", 
                                  textDecoration: "none", 
                                  transition: "all 0.2s ease"
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0A2E4D")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#001F3F")}
                              >
                                {action.btnText}
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <line x1="5" y1="12" x2="19" y2="12"></line>
                                  <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </MobileRise>
                );
              })}
            </div>

          </div>
        </section>
      </StackSection>

      {/* 5. PORTAL CTA */}
      <StackSection index={4}>
        <section style={{ position: "relative", backgroundColor: "#001F3F", padding: "80px 24px", overflow: "hidden" }}>
          
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/boardroom.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15, zIndex: 0 }} />
          
          <MobileRise>
            <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
              <h2 style={{ fontSize: "42px", fontWeight: "800", color: "#FFFFFF", marginBottom: "24px", lineHeight: "1.1" }}>
                Access the VFMO Portal
              </h2>
              <p style={{ fontSize: "18px", color: "#CBD5E1", marginBottom: "40px", lineHeight: "1.6" }}>
                Authorized government agencies and VFMO staff can log in to manage assessments, upload procurement documents, and track project evaluations in real-time.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/portal" style={{ 
                  backgroundColor: "#FCD116", color: "#001F3F", border: "none", padding: "16px 40px", borderRadius: "4px", fontSize: "16px", 
                  fontWeight: "800", cursor: "pointer", textDecoration: "none", display: "inline-block"
                }}
                >
                  Portal Login
                </Link>
                <Link to="/clearance" style={{ 
                  backgroundColor: "rgba(255,255,255,0.1)", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.3)", 
                  padding: "16px 40px", borderRadius: "4px", fontSize: "16px", fontWeight: "700", cursor: "pointer", textDecoration: "none",
                  display: "inline-block"
                }}
                >
                  View Public Register
                </Link>
              </div>
            </div>
          </MobileRise>
        </section>
      </StackSection>
    </div>
  );
}