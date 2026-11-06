import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ShieldCheck, 
  Search, 
  Scale, 
  TrendingUp, 
  MonitorSmartphone, 
  Eye,
  AlertTriangle,
  FileCheck,
  Ban
} from "lucide-react";

// --- STANDARD REVEAL (For inner text/cards) ---
const Reveal = ({ children, delay = 0, width = "100%" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { setIsVisible(entry.isIntersecting); },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        width: width
      }}
    >
      {children}
    </div>
  );
};

// --- MOBILE-ONLY REVEAL (Uses Framer Motion whileInView for reliability) ---
const MobileReveal = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

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
  const mandates = [
    { title: "Pre-Contract Review", description: "Mandatory VfM certification for major government contracts before they are awarded.", icon: ShieldCheck },
    { title: "Compliance Monitoring", description: "Real-time oversight of projects to prevent cost overruns and unnecessary delays.", icon: Search },
    { title: "Sanctions Enforcement", description: "Applying penalties for violations to ensure absolute accountability across all entities.", icon: Scale },
    { title: "Cost Benchmarking", description: "Setting standard cost benchmarks to ensure uniform pricing and curb contract inflation.", icon: TrendingUp },
    { title: "Digital Integration", description: "Operating a secure digital management platform to track assessments, clearances, and project evaluations in real-time (Section 27).", icon: MonitorSmartphone },
    { title: "Public Transparency", description: "Publishing annual reports and findings to keep citizens informed about the value of public spending.", icon: Eye }
  ];

  const pillars = [
    { title: "Economy", desc: "Acquiring public resources at the appropriate cost, eliminating unjustified premiums and inflation." },
    { title: "Efficiency", desc: "Maximising programmatic outputs through responsible use of human, capital, and material resources." },
    { title: "Effectiveness", desc: "Ensuring infrastructure and programmes achieve their intended socio-economic objectives." }
  ];

  const publicActions = [
    { title: "Report a Concern", desc: "Submit a confidential, legally protected report regarding contract inflation or misuse of public funds.", link: "/submit", btnText: "Submit a Report", icon: AlertTriangle },
    { title: "Verify a Clearance", desc: "Search the public register to confirm if a major government contract has received a Certificate of Clearance.", link: "/clearance", btnText: "View Public Register", icon: FileCheck },
    { title: "Check Debarments", desc: "View the official list of contractors and suppliers banned from participating in public procurement.", link: "/sanctions", btnText: "View Debarment List", icon: Ban }
  ];

  return (
    <div style={{ overflowX: "hidden", backgroundColor: "#F8F9FA" }}>
      
      {/* 1. CORE MANDATE CARDS */}
      <StackSection index={0}>
        <section style={{ position: "relative", padding: "80px 24px", backgroundColor: "#F8F9FA" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <MobileReveal>
              <div style={{ textAlign: "center", marginBottom: "60px" }}>
                <h2 style={{ fontSize: "40px", fontWeight: "800", color: "#001F3F", margin: "0 0 16px 0" }}>
                  Our Core Mandate
                </h2>
                <p style={{ color: "#475569", fontSize: "18px", margin: 0, maxWidth: "600px", marginLeft: "auto", marginRight: "auto", lineHeight: "1.6", fontWeight: "500" }}>
                  Six pillars of value-for-money oversight across the public sector.
                </p>
              </div>
            </MobileReveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
              {mandates.map((item, index) => {
                const Icon = item.icon;
                return (
                  <MobileReveal key={index}>
                    <div 
                      style={{ 
                        backgroundColor: "#FFFFFF", padding: "40px", borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)", 
                        border: "1px solid #E2E8F0",
                        transition: "all 0.3s ease", cursor: "pointer",
                        display: "flex", flexDirection: "column", height: "100%"
                      }}
                    >
                      <div style={{ 
                        width: "72px", height: "72px", 
                        backgroundColor: "#F0F4F8", borderRadius: "12px", 
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginBottom: "24px"
                      }}>
                        <Icon size={36} color="#001F3F" strokeWidth={1.5} />
                      </div>

                      <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#001F3F", margin: "0 0 12px 0" }}>
                        {item.title}
                      </h3>
                      <p style={{ color: "#475569", lineHeight: "1.6", margin: 0, fontSize: "15px", flex: 1 }}>
                        {item.description}
                      </p>
                    </div>
                  </MobileReveal>
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
              <MobileReveal>
                <div>
                  <h2 style={{ fontSize: "clamp(32px, 4vw, 42px)", fontWeight: "800", color: "#FFFFFF", margin: "0 0 20px 0", lineHeight: "1.2" }}>
                    The Statutory Definition of Value for Money.
                  </h2>
                  <p style={{ fontSize: "18px", color: "#CBD5E1", lineHeight: "1.7", margin: 0 }}>
                    Act 1172 mandates that public expenditure be evaluated against three distinct statutory principles. These principles form the foundation of every assessment conducted by the Office.
                  </p>
                </div>
              </MobileReveal>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {pillars.map((pillar, index) => (
                  <MobileReveal key={index}>
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
                  </MobileReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </StackSection>

      {/* 3. INSTITUTIONAL CTA - TRUE EDGE-TO-EDGE SPLIT */}
      <StackSection index={2}>
        <section style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          backgroundColor: "#F4F5F0",
          alignItems: "stretch", // Forces the image to stretch full height
          minHeight: "600px"      // Ensures the section is tall enough to look impressive
        }}>
          
          <MobileReveal>
            <div style={{ 
              width: "100%", 
              height: "100%", 
              position: "relative",
              minHeight: "400px" // Ensures image shows on mobile stacked view
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
          </MobileReveal>

          <MobileReveal>
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
                borderRadius: "4px", fontSize: "16px", fontWeight: "700", textDecoration: "none", transition: "background-color 0.2s ease",
                alignSelf: "flex-start"
              }}
              >
                View Our Scope of Authority
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
            </div>
          </MobileReveal>

        </section>
      </StackSection>

      {/* 4. PUBLIC ACTION DASHBOARD */}
      <StackSection index={3}>
        <section style={{ backgroundColor: "#FFFFFF", padding: "80px 24px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            
            <MobileReveal>
              <div style={{ textAlign: "center", marginBottom: "60px" }}>
                <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#001F3F", margin: "0 0 12px 0" }}>
                  Public Resources & Actions
                </h2>
                <p style={{ color: "#666666", fontSize: "16px", margin: 0 }}>
                  Direct access to the VfM Office's public services and regulatory registers.
                </p>
              </div>
            </MobileReveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
              {publicActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <MobileReveal key={index}>
                    <div style={{ 
                      backgroundColor: "#F8F9FA", borderRadius: "8px", padding: "40px", 
                      border: "1px solid #E2E8F0", display: "flex", flexDirection: "column",
                      height: "100%", transition: "all 0.3s ease",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
                    }}
                    >
                      <div style={{ 
                        width: "72px", height: "72px", 
                        backgroundColor: "#F0F4F8", borderRadius: "12px", 
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginBottom: "24px"
                      }}>
                        <Icon size={36} color="#001F3F" strokeWidth={1.5} />
                      </div>

                      <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#001F3F", margin: "0 0 12px 0" }}>
                        {action.title}
                      </h3>
                      <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", margin: "0 0 32px 0", flex: 1 }}>
                        {action.desc}
                      </p>
                      <Link to={action.link} style={{ 
                        display: "inline-flex", alignItems: "center", gap: "8px", 
                        color: "#001F3F", fontWeight: "700", fontSize: "15px", 
                        textDecoration: "none", borderBottom: "2px solid #001F3F", 
                        paddingBottom: "4px", alignSelf: "flex-start"
                      }}>
                        {action.btnText}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </Link>
                    </div>
                  </MobileReveal>
                );
              })}
            </div>

          </div>
        </section>
      </StackSection>

      {/* 5. PORTAL CTA */}
      <StackSection index={4}>
        <section style={{ position: "relative", backgroundColor: "#001F3F", padding: "80px 24px", overflow: "hidden" }}>
          
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/building-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15, zIndex: 0 }} />
          
          <MobileReveal>
            <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
              <h2 style={{ fontSize: "42px", fontWeight: "800", color: "#FFFFFF", marginBottom: "24px", lineHeight: "1.1" }}>
                Access the VFM Internal Portal
              </h2>
              <p style={{ fontSize: "18px", color: "#CBD5E1", marginBottom: "40px", lineHeight: "1.6" }}>
                Authorized government agencies and VFM staff can log in to manage assessments, upload procurement documents, and track project evaluations in real-time.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/portal" style={{ 
                  backgroundColor: "#FCD116", color: "#001F3F", border: "none", padding: "16px 40px", borderRadius: "4px", fontSize: "16px", 
                  fontWeight: "800", cursor: "pointer", textDecoration: "none", transition: "transform 0.2s ease", display: "inline-block"
                }}
                >
                  Portal Login
                </Link>
                <Link to="/clearance" style={{ 
                  backgroundColor: "rgba(255,255,255,0.1)", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.3)", 
                  padding: "16px 40px", borderRadius: "4px", fontSize: "16px", fontWeight: "700", cursor: "pointer", textDecoration: "none",
                  transition: "background-color 0.2s ease", display: "inline-block"
                }}
                >
                  View Public Register
                </Link>
              </div>
            </div>
          </MobileReveal>
        </section>
      </StackSection>
    </div>
  );
}