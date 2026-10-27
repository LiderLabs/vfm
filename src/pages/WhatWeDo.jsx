import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function WhatWeDo() {
  const { hash } = useLocation();
  const [activePillar, setActivePillar] = useState(0);

  // Auto-scroll to sections if navigating via hash
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

  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
      
      {/* 1. INTERACTIVE DARK SECTION */}
      <section style={{ 
        position: "relative", 
        backgroundColor: "#001F3F", 
        padding: "100px 24px 0", 
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }}>
        
        {/* BACKGROUND IMAGE - Now showing much more clearly */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "url(/building-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.65, // Increased from 0.4 so the building shows
          zIndex: 0
        }} />
        
        {/* SOFTER GRADIENT OVERLAY - Fades top-to-bottom to keep the building visible at the top */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(180deg, rgba(0,31,63,0.5) 0%, rgba(0,31,63,0.95) 100%)",
          zIndex: 1
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", position: "relative", zIndex: 2, flex: 1 }}>
          
          {/* TOP HEADER */}
          <div style={{ marginBottom: "60px" }}>
            <span style={{ fontSize: "13px", fontWeight: "800", letterSpacing: "2px", color: "#FCD116", textTransform: "uppercase", display: "block", marginBottom: "16px", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
              Functional Mandate
            </span>
            <h1 style={{ fontSize: "52px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 16px 0", lineHeight: "1.1", maxWidth: "800px", textShadow: "0 4px 12px rgba(0,0,0,0.6)" }}>
              Operational Scope & Focus Areas
            </h1>
            <p style={{ fontSize: "20px", color: "#E2E8F0", maxWidth: "650px", margin: 0, lineHeight: "1.6", textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}>
              The Office deploys multidisciplinary technical teams to execute targeted evaluations across six primary institutional pillars.
            </p>
          </div>

          {/* MAIN CONTENT AREA (Fade & Slide Animation) */}
          <div style={{ minHeight: "300px", marginBottom: "60px" }}>
            <div 
              key={activePillar} // The key triggers the animation
              style={{ animation: "fadeSlideIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards" }}
            >
              <style>
                {`
                  @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                `}
              </style>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#FCD116" }} />
                <span style={{ fontSize: "14px", fontWeight: "700", color: "#FCD116", textTransform: "uppercase", letterSpacing: "1.5px", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                  {pillars[activePillar].category}
                </span>
              </div>

              <h2 style={{ fontSize: "48px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 24px 0", lineHeight: "1.2", maxWidth: "900px", textShadow: "0 4px 12px rgba(0,0,0,0.6)" }}>
                {pillars[activePillar].title}
              </h2>
              
              <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#CBD5E1", maxWidth: "800px", marginBottom: "40px", textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}>
                {pillars[activePillar].description}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "48px" }}>
                {pillars[activePillar].tags.map((tag, i) => (
                  <span key={i} style={{ 
                    backgroundColor: "rgba(0,31,63,0.6)", // Darker background for better contrast over the image
                    color: "#FFFFFF", 
                    padding: "8px 20px", 
                    borderRadius: "30px", 
                    fontSize: "14px", 
                    fontWeight: "600", 
                    border: "1px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)"
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Button */}
              <button style={{ 
                backgroundColor: "#FCD116", color: "#001F3F", border: "none", 
                padding: "16px 40px", borderRadius: "4px", fontSize: "16px", 
                fontWeight: "800", cursor: "pointer", transition: "transform 0.2s ease",
                boxShadow: "0 4px 15px rgba(252, 209, 22, 0.3)"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              >
                Explore Focus Area
              </button>

            </div>
          </div>
        </div>

        {/* 2. BOTTOM NAVIGATION BAR (6 Tabs) */}
        <div style={{ 
          borderTop: "1px solid rgba(255,255,255,0.1)", 
          backgroundColor: "rgba(0, 15, 30, 0.9)", // Very dark bottom bar to anchor the page
          backdropFilter: "blur(10px)",
          position: "relative", 
          zIndex: 2 
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
                    border: "none",
                    borderTop: isActive ? "3px solid #FCD116" : "3px solid transparent",
                    padding: "24px 20px",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px"
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

      {/* REMAINING PAGE CONTENT */}
      <section style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#001F3F", marginBottom: "24px" }}>Enforcing Fiscal Integrity</h2>
        <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#4A5568" }}>
          Beyond the six core pillars, the Value for Money Office works tirelessly to ensure that public resources are managed efficiently. Through continuous monitoring, strict compliance checks, and public reporting, we hold public entities accountable to the citizens of Ghana.
        </p>
      </section>

    </div>
  );
}