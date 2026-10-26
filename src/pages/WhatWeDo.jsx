import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function WhatWeDo() {
  const { hash } = useLocation();

  // Auto-scroll to sections if a hash is in the URL (e.g. /what-we-do#evaluation)
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

  return (
    <div style={{ backgroundColor: "#F5F7FA", minHeight: "100vh" }}>
      
      {/* 1. THE HERO SECTION */}
      <section style={{ padding: "60px 24px", maxWidth: "1300px", margin: "0 auto" }}>
        
        {/* Dark Navy Container */}
        <div style={{ 
          backgroundColor: "#001F3F", 
          background: "linear-gradient(135deg, #001F3F 0%, #0A2E4D 100%)", 
          borderRadius: "24px", 
          padding: "64px", 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", 
          gap: "60px", 
          alignItems: "center",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
        }}>
          
          {/* LEFT: Text & Buttons */}
          <div>
            <div style={{ 
              display: "inline-flex", alignItems: "center", gap: "8px",
              backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
              padding: "8px 16px", borderRadius: "30px", marginBottom: "24px"
            }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#FCD116" }} />
              <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px", color: "#FCD116", textTransform: "uppercase" }}>
                Our Core Operations
              </span>
            </div>

            <h1 style={{ fontSize: "48px", fontWeight: "800", color: "#FFFFFF", lineHeight: "1.1", marginBottom: "24px" }}>
              Ensuring Every Public Investment Delivers Maximum Value.
            </h1>

            <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#CBD5E1", marginBottom: "20px" }}>
              The Value for Money Office operates through a rigorous framework of assessments, continuous evaluation, and capacity building to safeguard Ghana's public resources.
            </p>

            <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#CBD5E1", marginBottom: "40px" }}>
              From pre-contract technical reviews to post-implementation impact evaluations, we ensure that public spending translates into tangible, durable socio-economic benefits for all citizens.
            </p>

            <div style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
              <button style={{ 
                backgroundColor: "#FFFFFF", color: "#001F3F", border: "none", 
                padding: "16px 32px", borderRadius: "4px", fontSize: "15px", 
                fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px"
              }}>
                View Methodology
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#94A3B8", fontSize: "13px", fontWeight: "600" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FCD116" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                Enforcing Fiscal Integrity
              </div>
            </div>
          </div>

          {/* RIGHT: Floating Cards (Matching the Dropdown Links) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            
            {/* Card 1: Assessments */}
            <div style={{ backgroundColor: "#F8F9FA", borderRadius: "12px", padding: "24px", display: "flex", gap: "20px", alignItems: "flex-start", boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}>
              <div style={{ width: "48px", height: "48px", backgroundColor: "#001F3F", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: "0 0 4px 0" }}>VfM Assessments</h3>
                <p style={{ fontSize: "14px", color: "#64748B", margin: 0, lineHeight: "1.5" }}>Mandatory pre-contract reviews to ensure cost efficiency before public funds are committed.</p>
              </div>
            </div>

            {/* Card 2: Evaluation */}
            <div style={{ backgroundColor: "#F8F9FA", borderRadius: "12px", padding: "24px", display: "flex", gap: "20px", alignItems: "flex-start", boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}>
              <div style={{ width: "48px", height: "48px", backgroundColor: "#B8860B", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: "0 0 4px 0" }}>Project Evaluation</h3>
                <p style={{ fontSize: "14px", color: "#64748B", margin: 0, lineHeight: "1.5" }}>Continuous monitoring and post-implementation audits to measure actual socio-economic impact.</p>
              </div>
            </div>

            {/* Card 3: Standards */}
            <div style={{ backgroundColor: "#F8F9FA", borderRadius: "12px", padding: "24px", display: "flex", gap: "20px", alignItems: "flex-start", boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}>
              <div style={{ width: "48px", height: "48px", backgroundColor: "#001F3F", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: "0 0 4px 0" }}>Standards & Capacity</h3>
                <p style={{ fontSize: "14px", color: "#64748B", margin: 0, lineHeight: "1.5" }}>Setting cost benchmarks and training public entities on value-for-money procurement protocols.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. DETAILED SECTIONS (Anchored for the Navbar) */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 24px 100px" }}>
        
        {/* VfM Assessments */}
        <div id="assessments" style={{ marginBottom: "80px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#001F3F", margin: "0 0 24px 0" }}>VfM Assessments</h2>
          <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#4A5568" }}>
            Before any major government contract is awarded, the VfM Office conducts a rigorous assessment to ensure the proposed cost is reasonable. We evaluate Bills of Quantities, benchmark against historical data, and issue the mandatory VfM Certificate required for procurement to proceed.
          </p>
        </div>

        {/* Project Evaluation */}
        <div id="evaluation" style={{ marginBottom: "80px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#001F3F", margin: "0 0 24px 0" }}>Project Evaluation</h2>
          <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#4A5568" }}>
            We don't just look at the numbers before a contract is signed; we monitor projects during execution to prevent cost overruns. Our post-implementation evaluations ensure that the infrastructure built (hospitals, roads, schools) actually delivers the intended benefits to the community.
          </p>
        </div>

        {/* Standards & Capacity */}
        <div id="standards">
          <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#001F3F", margin: "0 0 24px 0" }}>Standards & Capacity</h2>
          <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#4A5568" }}>
            To create systemic change, we publish standard cost benchmarks for common public projects. This prevents contract inflation. We also provide technical training to procurement officers across all 16 regions to build a culture of value-for-money across the entire public service.
          </p>
        </div>

      </section>

    </div>
  );
}