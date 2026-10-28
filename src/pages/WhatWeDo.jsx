import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";

// --- SCROLL REVEAL ANIMATION COMPONENT ---
const ZoomReveal = ({ children, delay = 0 }) => {
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
        transform: isVisible ? "scale(1)" : "scale(0.95)",
        transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        width: "100%"
      }}
    >
      {children}
    </div>
  );
};

export default function WhatWeDo() {
  const { hash } = useLocation();
  const [activePillar, setActivePillar] = useState(0);

  // Auto-scroll to sections if navigating via hash
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const pillars = [
    {
      category: "Assessments",
      title: "Pre-Contract & Technical VfM Assessments",
      description: "Conducting mandatory ex-ante reviews of major capital projects to ensure proposed costs are reasonable and represent maximum value before public funds are committed.",
      tags: ["Cost Benchmarking", "Bid Evaluation", "Value Engineering"]
    },
    {
      category: "Evaluation",
      title: "Project Scrutiny & Impact Evaluation",
      description: "Continuous monitoring of ongoing infrastructure to prevent cost overruns and post-implementation audits to measure actual socio-economic impact.",
      tags: ["Compliance Audits", "Cost Overrun Prevention", "Impact Metrics"]
    },
    {
      category: "Utilisation",
      title: "Public Expenditure Utilisation Review",
      description: "Tracking the actual disbursement and utilisation of funds across Metropolitan, Municipal, and District Assemblies to ensure fiscal discipline.",
      tags: ["Fund Tracking", "Fiscal Discipline", "MMDA Oversight"]
    },
    {
      category: "Benchmarks",
      title: "Performance & Service Delivery Benchmarking",
      description: "Establishing rigorous public sector metrics to compare unit costs and service outputs against regional peer nations and international standards.",
      tags: ["Unit Cost Metrics", "Regional Comparison", "Delivery Standards"]
    },
    {
      category: "Standards",
      title: "Research, Standards & Technical Guidance",
      description: "Formulating national reference manuals, standardized costing guides, and econometric models to inform evidence-based public policy decisions.",
      tags: ["Standardized Costing Guides", "Econometric Lifecycle Models", "Gazetted Reference Manuals"]
    },
    {
      category: "Training",
      title: "Institutional Capacity Building & Training",
      description: "Equipping procurement officers, ministry executives, and local government leaders with the technical skills required to execute value-for-money protocols.",
      tags: ["Procurement Training", "Executive Seminars", "Technical Certification"]
    }
  ];

  // --- AUTOPLAY LOGIC ---
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePillar((prev) => (prev === pillars.length - 1 ? 0 : prev + 1));
    }, 5000); // Changes every 5 seconds
    return () => clearInterval(timer);
  }, [pillars.length]);

  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* 1. INTERACTIVE DARK SECTION */}
      <section style={{ 
        position: "relative", 
        backgroundColor: "#001F3F", 
        padding: "100px 24px 0", 
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }}>
        
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "url(/building-bg.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.65, zIndex: 0
        }} />
        
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(180deg, rgba(0,31,63,0.5) 0%, rgba(0,31,63,0.95) 100%)",
          zIndex: 1
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", position: "relative", zIndex: 2, flex: 1 }}>
          
          <div style={{ marginBottom: "60px" }}>
            {/* "FUNCTIONAL MANDATE" label removed */}
            <h1 style={{ fontSize: "52px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 16px 0", lineHeight: "1.1", maxWidth: "800px", textShadow: "0 4px 12px rgba(0,0,0,0.6)" }}>
              Operational Scope & Focus Areas
            </h1>
            <p style={{ fontSize: "20px", color: "#E2E8F0", maxWidth: "650px", margin: 0, lineHeight: "1.6", textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}>
              The Office deploys multidisciplinary technical teams to execute targeted evaluations across six primary institutional pillars.
            </p>
          </div>

          <div style={{ minHeight: "300px", marginBottom: "60px" }}>
            <div key={activePillar} style={{ animation: "fadeSlideIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards" }}>
              <style>{`
                @keyframes fadeSlideIn {
                  from { opacity: 0; transform: translateY(20px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>

              {/* Category label removed from here, only the title remains */}
              <h2 style={{ fontSize: "48px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 24px 0", lineHeight: "1.2", maxWidth: "900px", textShadow: "0 4px 12px rgba(0,0,0,0.6)" }}>
                {pillars[activePillar].title}
              </h2>
              
              <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#CBD5E1", maxWidth: "800px", marginBottom: "40px", textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}>
                {pillars[activePillar].description}
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "48px" }}>
                {pillars[activePillar].tags.map((tag, i) => (
                  <span key={i} style={{ 
                    backgroundColor: "rgba(0,31,63,0.6)", color: "#FFFFFF", padding: "8px 20px", borderRadius: "30px", 
                    fontSize: "14px", fontWeight: "600", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(10px)"
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <button style={{ 
                backgroundColor: "#FCD116", color: "#001F3F", border: "none", padding: "16px 40px", 
                borderRadius: "4px", fontSize: "16px", fontWeight: "800", cursor: "pointer", 
                transition: "transform 0.2s ease", boxShadow: "0 4px 15px rgba(252, 209, 22, 0.3)"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              >
                Explore Focus Area
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM NAVIGATION BAR */}
        <div style={{ 
          borderTop: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(0, 15, 30, 0.9)",
          backdropFilter: "blur(10px)", position: "relative", zIndex: 2 
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1px" }}>
            {pillars.map((pillar, index) => {
              const isActive = index === activePillar;
              return (
                <button
                  key={index}
                  onClick={() => setActivePillar(index)}
                  style={{
                    backgroundColor: isActive ? "rgba(252, 209, 22, 0.05)" : "transparent",
                    border: "none", borderTop: isActive ? "3px solid #FCD116" : "3px solid transparent",
                    padding: "24px 20px", textAlign: "left", cursor: "pointer", transition: "all 0.3s ease",
                    display: "flex", flexDirection: "column", gap: "8px"
                  }}
                  onMouseEnter={(e) => !isActive && (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")}
                  onMouseLeave={(e) => !isActive && (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <span style={{ fontSize: "12px", fontWeight: "700", color: isActive ? "#FCD116" : "#94A3B8", letterSpacing: "1px", textTransform: "uppercase" }}>
                    {pillar.category}
                  </span>
                  <span style={{ fontSize: "15px", fontWeight: isActive ? "700" : "500", color: isActive ? "#FFFFFF" : "#64748B" }}>
                    {pillar.title.split(" ")[0]} {pillar.title.split(" ")[1]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. DETAILED SECTIONS */}
      
      {/* VfM Assessments Section */}
      <section id="assessments" style={{ padding: "100px 24px", backgroundColor: "#F8F9FA" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "center" }}>
          <ZoomReveal>
            <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
              <img src="/site-review.jpg" alt="VfM Technical Team On Site" style={{ width: "100%", height: "100%", minHeight: "400px", objectFit: "cover", display: "block" }} />
            </div>
          </ZoomReveal>
          
          <ZoomReveal delay={0.2}>
            <div>
              <h2 style={{ fontSize: "42px", fontWeight: "800", color: "#0F172A", margin: "0 0 24px 0", lineHeight: "1.1" }}>
                Rigorous Scrutiny. Real-World Application.
              </h2>
              <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#475569", marginBottom: "32px" }}>
                Our assessments do not happen in isolation. Our multidisciplinary technical teams deploy directly to project sites across all 16 regions to physically verify claims, review bills of quantities, and ensure that what is being built matches what was approved.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px 0", display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  "Verification of site conditions against proposed designs",
                  "Review of contractor submissions and material quality",
                  "Engagement with local project managers and consultants"
                ].map((item, i) => (
                  <li key={i} style={{ fontSize: "16px", color: "#0F172A", fontWeight: "600" }}>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#001F3F", color: "#FFFFFF", padding: "16px 32px", borderRadius: "4px", fontSize: "16px", fontWeight: "700", textDecoration: "none", transition: "background-color 0.2s ease" }}>
                Request a Site Assessment
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
            </div>
          </ZoomReveal>
        </div>
      </section>

      {/* Project Evaluation Section */}
      <section id="evaluation" style={{ padding: "100px 24px", backgroundColor: "#FFFFFF" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "center" }}>
          <ZoomReveal>
            <div>
              <h2 style={{ fontSize: "42px", fontWeight: "800", color: "#0F172A", margin: "0 0 24px 0", lineHeight: "1.1" }}>
                Continuous Oversight & Impact Evaluation.
              </h2>
              <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#475569", marginBottom: "32px" }}>
                Signing a contract is only the beginning. The VfM Office tracks major infrastructure projects throughout their entire lifecycle to prevent abandonment, eliminate cost overruns, and measure the actual socio-economic benefits delivered to Ghanaians.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px 0", display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  "Real-time tracking of project milestones",
                  "Auditing of actual expenditures against approved budgets",
                  "Post-implementation evaluation of citizen impact"
                ].map((item, i) => (
                  <li key={i} style={{ fontSize: "16px", color: "#0F172A", fontWeight: "600" }}>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/publications" style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#001F3F", color: "#FFFFFF", padding: "16px 32px", borderRadius: "4px", fontSize: "16px", fontWeight: "700", textDecoration: "none", transition: "background-color 0.2s ease" }}>
                View Evaluation Reports
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
            </div>
          </ZoomReveal>

          <ZoomReveal delay={0.2}>
            <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
              <img src="/boardroom.jpg" alt="VfM Project Evaluation" style={{ width: "100%", height: "100%", minHeight: "400px", objectFit: "cover", display: "block" }} />
            </div>
          </ZoomReveal>
        </div>
      </section>

      {/* Standards & Capacity Section */}
      <section id="standards" style={{ padding: "100px 24px", backgroundColor: "#F8F9FA" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "center" }}>
          <ZoomReveal>
            <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
              <img src="/about-bg.jpg" alt="VfM Standards and Capacity" style={{ width: "100%", height: "100%", minHeight: "400px", objectFit: "cover", display: "block" }} />
            </div>
          </ZoomReveal>

          <ZoomReveal delay={0.2}>
            <div>
              <h2 style={{ fontSize: "42px", fontWeight: "800", color: "#0F172A", margin: "0 0 24px 0", lineHeight: "1.1" }}>
                Setting National Benchmarks & Building Capacity.
              </h2>
              <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#475569", marginBottom: "32px" }}>
                To create systemic change, we publish standard cost benchmarks and national reference manuals. We also equip procurement officers, ministry executives, and local government leaders with the technical skills required to execute value-for-money protocols.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px 0", display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  "Publishing standardized costing guides",
                  "Developing econometric lifecycle models",
                  "Training procurement officers across all 16 regions"
                ].map((item, i) => (
                  <li key={i} style={{ fontSize: "16px", color: "#0F172A", fontWeight: "600" }}>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/publications" style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#001F3F", color: "#FFFFFF", padding: "16px 32px", borderRadius: "4px", fontSize: "16px", fontWeight: "700", textDecoration: "none", transition: "background-color 0.2s ease" }}>
                Access Technical Guidelines
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
            </div>
          </ZoomReveal>
        </div>
      </section>

    </div>
  );
}