import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// --- NEW CINEMATIC ZOOM REVEAL COMPONENT ---
const ZoomReveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.95)", // Zooms in instead of sliding up
        transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        width: "100%"
      }}
    >
      {children}
    </div>
  );
};

export default function MandateCards() {
  const mandates = [
    { title: "Pre-Contract Review", description: "Mandatory VfM certification for major government contracts before they are awarded." },
    { title: "Compliance Monitoring", description: "Real-time oversight of projects to prevent cost overruns and unnecessary delays." },
    { title: "Sanctions Enforcement", description: "Applying penalties for violations to ensure absolute accountability across all entities." },
    { title: "Cost Benchmarking", description: "Setting standard cost benchmarks to ensure uniform pricing and curb contract inflation." },
    { title: "Digital Integration", description: "Linking with GIFMIS and GHANEPS for automated, real-time financial and procurement data analysis." },
    { title: "Public Transparency", description: "Publishing annual reports and findings to keep citizens informed about the value of public spending." }
  ];

  const pillars = [
    {
      title: "Economy",
      desc: "Acquiring public resources at the appropriate cost, eliminating unjustified premiums and inflation.",
      icon: "M12 3v18 M3 9l9-6 9 6 M3 15h18"
    },
    {
      title: "Efficiency",
      desc: "Maximising programmatic outputs through responsible use of human, capital, and material resources.",
      icon: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8 M21 3v5h-5"
    },
    {
      title: "Effectiveness",
      desc: "Ensuring infrastructure and programmes achieve their intended socio-economic objectives.",
      icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    }
  ];

  return (
    <div style={{ overflow: "hidden" }}>
      
      {/* 1. CORE MANDATE CARDS */}
      <section style={{ position: "relative", padding: "100px 40px", backgroundColor: "#F8F9FA" }}>
        
        {/* CLEARER BACKGROUND IMAGE */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "url(/building-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.35, // Image is much clearer
          zIndex: 0
        }} />
        
        {/* VERY LIGHT WASH - Just enough contrast for the cards to pop */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(180deg, rgba(248,249,250,0.8) 0%, rgba(248,249,250,0.4) 50%, rgba(248,249,250,0.8) 100%)",
          zIndex: 1
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          
          <ZoomReveal>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <h2 style={{ fontSize: "40px", fontWeight: "800", color: "#001F3F", margin: "0 0 16px 0" }}>
                Our Core Mandate
              </h2>
              <p style={{ color: "#475569", fontSize: "18px", margin: 0, maxWidth: "600px", marginLeft: "auto", marginRight: "auto", lineHeight: "1.6", fontWeight: "500" }}>
                Six pillars of value-for-money oversight across the public sector.
              </p>
            </div>
          </ZoomReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px" }}>
            {mandates.map((item, index) => (
              <ZoomReveal key={index} delay={index * 0.1}>
                <div 
                  style={{ 
                    backgroundColor: "#FFFFFF", padding: "40px", borderRadius: "12px",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.1)", // Stronger shadow to float above the image
                    border: "1px solid rgba(0,0,0,0.04)",
                    transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)", cursor: "pointer",
                    display: "flex", flexDirection: "column", height: "100%"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 25px 50px rgba(0,31,63,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.1)";
                  }}
                >
                  <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#001F3F", margin: "0 0 20px 0" }}>
                    {item.title}
                  </h3>
                  <p style={{ color: "#475569", lineHeight: "1.7", margin: 0, fontSize: "16px", flex: 1 }}>
                    {item.description}
                  </p>
                  <div style={{ height: "3px", width: "40px", backgroundColor: "#FCD116", marginTop: "24px", borderRadius: "2px", opacity: 0, transition: "opacity 0.3s ease" }} className="card-accent" />
                </div>
              </ZoomReveal>
            ))}
          </div>

        </div>
      </section>

      {/* 2. THE TRIPARTITE STANDARD */}
      <section style={{ position: "relative", backgroundColor: "#001F3F", padding: "100px 40px" }}>
        
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "url(/boardroom.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.3, zIndex: 0
        }} />
        
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(180deg, rgba(0,31,63,0.9) 0%, rgba(0,31,63,0.7) 50%, rgba(0,31,63,0.9) 100%)",
          zIndex: 1
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          
          <ZoomReveal>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <span style={{ fontSize: "13px", fontWeight: "800", letterSpacing: "2px", color: "#FCD116", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
                The Tripartite Standard
              </span>
              <h2 style={{ fontSize: "42px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 16px 0", lineHeight: "1.1" }}>
                The Three Pillars of Public Value
              </h2>
              <p style={{ fontSize: "18px", color: "#CBD5E1", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
                A disciplined triad applied across all public procurement, infrastructure delivery, and ministerial capital expenditures.
              </p>
            </div>
          </ZoomReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {pillars.map((pillar, index) => (
              <ZoomReveal key={index} delay={index * 0.15}>
                <div 
                  style={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "16px", padding: "40px",
                    display: "flex", flexDirection: "column", transition: "transform 0.3s ease, background-color 0.3s ease", height: "100%"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                  }}
                >
                  <div style={{ width: "56px", height: "56px", backgroundColor: "rgba(252, 209, 22, 0.15)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FCD116" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={pillar.icon}></path>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: "24px", fontWeight: "700", color: "#FFFFFF", margin: "0 0 16px 0" }}>{pillar.title}</h3>
                  <p style={{ fontSize: "16px", color: "#CBD5E1", lineHeight: "1.6", margin: 0 }}>{pillar.desc}</p>
                </div>
              </ZoomReveal>
            ))}
          </div>

        </div>
      </section>

      {/* 3. INSTITUTIONAL CTA */}
      <section style={{ backgroundColor: "#F4F5F0", padding: "100px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "60px", alignItems: "center" }}>
          
          <ZoomReveal>
            <div style={{ position: "relative", height: "500px", borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
              <img src="/about-bg.jpg" alt="Ghana Infrastructure" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to right, transparent, rgba(244,245,240,1))" }} />
            </div>
          </ZoomReveal>

          <ZoomReveal delay={0.2}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <div style={{ width: "30px", height: "2px", backgroundColor: "#8B7355" }}></div>
                <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "1.5px", color: "#8B7355", textTransform: "uppercase" }}>
                  Institutional Stewardship
                </span>
              </div>
              
              <h2 style={{ fontSize: "42px", fontWeight: "800", color: "#0F172A", margin: "0 0 24px 0", lineHeight: "1.1" }}>
                Safeguarding Ghana's Development Capital.
              </h2>
              
              <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#475569", marginBottom: "40px" }}>
                We are dedicated to ensuring that every government contract, infrastructure project, and public investment delivers maximum benefit to the citizens of Ghana. By enforcing strict cost benchmarks, we eliminate waste and prevent contract inflation.
              </p>

              <Link to="/about" style={{ 
                display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#001F3F", color: "#FFFFFF", padding: "16px 32px", 
                borderRadius: "4px", fontSize: "16px", fontWeight: "700", textDecoration: "none", transition: "background-color 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0A2E4D"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#001F3F"}
              >
                Learn About Our Mandate
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
            </div>
          </ZoomReveal>

        </div>
      </section>

      {/* 4. LATEST NEWS PREVIEW */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "100px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <ZoomReveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "24px" }}>
              <div>
                <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#001F3F", margin: "0 0 12px 0" }}>
                  Latest Insights & Updates
                </h2>
                <p style={{ color: "#666666", fontSize: "16px", margin: 0 }}>
                  Policy briefs, symposium coverage, and institutional announcements.
                </p>
              </div>
              <Link to="/news" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#001F3F", fontWeight: "700", fontSize: "15px", textDecoration: "none", borderBottom: "2px solid #001F3F", paddingBottom: "4px" }}>
                View All News
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
            </div>
          </ZoomReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px" }}>
            
            {/* CARD 1: Uses boardroom.jpg */}
            <ZoomReveal delay={0.1}>
              <div style={{ borderRadius: "12px", overflow: "hidden", backgroundColor: "#F8F9FA", border: "1px solid #E2E8F0", transition: "transform 0.3s ease", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ position: "relative", height: "220px" }}>
                  <img src="/boardroom.jpg" alt="Symposium" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(to top, #F8F9FA, transparent)" }} />
                </div>
                <div style={{ padding: "24px", flex: 1 }}>
                  <span style={{ fontSize: "12px", fontWeight: "700", color: "#8B7355", textTransform: "uppercase", letterSpacing: "1px" }}>Symposium Brief</span>
                  <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: "12px 0 16px 0", lineHeight: "1.4" }}>
                    VFM Office Convenes Multi-Agency Symposium on Capital Project Cost
                  </h3>
                  <p style={{ fontSize: "14px", color: "#64748B", margin: 0 }}>November 18, 2024</p>
                </div>
              </div>
            </ZoomReveal>

            {/* CARD 2: Uses building-bg.jpg */}
            <ZoomReveal delay={0.2}>
              <div style={{ borderRadius: "12px", overflow: "hidden", backgroundColor: "#F8F9FA", border: "1px solid #E2E8F0", transition: "transform 0.3s ease", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ position: "relative", height: "220px" }}>
                  <img src="/building-bg.jpg" alt="Technical Advisory" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(to top, #F8F9FA, transparent)" }} />
                </div>
                <div style={{ padding: "24px", flex: 1 }}>
                  <span style={{ fontSize: "12px", fontWeight: "700", color: "#8B7355", textTransform: "uppercase", letterSpacing: "1px" }}>Technical Advisory</span>
                  <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: "12px 0 16px 0", lineHeight: "1.4" }}>
                    Standardising Unit Costs in Healthcare Facility Infrastructure
                  </h3>
                  <p style={{ fontSize: "14px", color: "#64748B", margin: 0 }}>October 28, 2024</p>
                </div>
              </div>
            </ZoomReveal>

            {/* CARD 3: Uses about-bg.jpg */}
            <ZoomReveal delay={0.3}>
              <div style={{ borderRadius: "12px", overflow: "hidden", backgroundColor: "#F8F9FA", border: "1px solid #E2E8F0", transition: "transform 0.3s ease", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ position: "relative", height: "220px" }}>
                  <img src="/about-bg.jpg" alt="Quarterly Bulletin" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(to top, #F8F9FA, transparent)" }} />
                </div>
                <div style={{ padding: "24px", flex: 1 }}>
                  <span style={{ fontSize: "12px", fontWeight: "700", color: "#8B7355", textTransform: "uppercase", letterSpacing: "1px" }}>Quarterly Bulletin</span>
                  <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: "12px 0 16px 0", lineHeight: "1.4" }}>
                    Strengthening Oversight Mechanisms Across Metropolitan Assemblies
                  </h3>
                  <p style={{ fontSize: "14px", color: "#64748B", margin: 0 }}>September 14, 2024</p>
                </div>
              </div>
            </ZoomReveal>

          </div>
        </div>
      </section>

      {/* 5. PORTAL CTA */}
      <section style={{ position: "relative", backgroundColor: "#001F3F", padding: "100px 40px", overflow: "hidden" }}>
        
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "url(/building-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.15, zIndex: 0
        }} />
        
        <ZoomReveal>
          <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
            <h2 style={{ fontSize: "42px", fontWeight: "800", color: "#FFFFFF", marginBottom: "24px", lineHeight: "1.1" }}>
              Access the VfM Internal Portal
            </h2>
            <p style={{ fontSize: "18px", color: "#CBD5E1", marginBottom: "40px", lineHeight: "1.6" }}>
              Authorized government agencies and VfM staff can log in to manage assessments, upload procurement documents, and track project evaluations in real-time.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/portal" style={{ 
                backgroundColor: "#FCD116", color: "#001F3F", border: "none", padding: "16px 40px", borderRadius: "4px", fontSize: "16px", 
                fontWeight: "800", cursor: "pointer", textDecoration: "none", transition: "transform 0.2s ease", display: "inline-block"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                Portal Login
              </Link>
              <Link to="/contact" style={{ 
                backgroundColor: "rgba(255,255,255,0.1)", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.3)", 
                padding: "16px 40px", borderRadius: "4px", fontSize: "16px", fontWeight: "700", cursor: "pointer", textDecoration: "none",
                transition: "background-color 0.2s ease", display: "inline-block"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"}
              >
                Request Access
              </Link>
            </div>
          </div>
        </ZoomReveal>
      </section>

      {/* CSS for the hover accent line */}
      <style>
        {`
          div:hover > .card-accent {
            opacity: 1 !important;
          }
        `}
      </style>
    </div>
  );
}