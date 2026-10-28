import { useState } from "react";

export default function Publications() {
  const [activeFilter, setActiveFilter] = useState("All Documents");

  const filters = [
    "All Documents",
    "VfM Evaluation Guidelines",
    "Methodology Frameworks",
    "Annual Reviews",
    "Advisory Briefs"
  ];

  const documents = [
    {
      date: "Jan 2025",
      docNo: "GH-VFM-2025-01",
      title: "National Infrastructure VfM Assessment Framework (2025 Draft)",
      desc: "Standardized methodology for pre-tender economic validation, appraisal thresholds, and multi-criteria risk mitigation across major civil works.",
      fileSize: "2.4 MB"
    },
    {
      date: "Nov 2024",
      docNo: "GH-VFM-2024-09",
      title: "Public Capital Expenditure Appraisal Manual — Vol. II",
      desc: "Comprehensive reference manual instructing evaluating officers on lifecycle discounting, opportunity cost formulas, and environmental durability indices.",
      fileSize: "4.1 MB"
    },
    {
      date: "Oct 2024",
      docNo: "GH-VFM-2024-04",
      title: "Civic Dividend Report: Enhancing Public Procurement Efficacy",
      desc: "Empirical investigation into public bidding competitiveness, early value capture mechanisms, and price discrepancy patterns across sub-national contracts.",
      fileSize: "1.8 MB"
    }
  ];

  return (
    <div style={{ backgroundColor: "#F4F5F0", minHeight: "100vh", padding: "100px 24px", overflowX: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* HEADER SECTION */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "48px" }}>
          <div>
            <h1 style={{ fontSize: "52px", fontWeight: "800", color: "#0F172A", margin: 0, lineHeight: "1.1" }}>
              Publications & Technical<br/>Repository
            </h1>
          </div>
          
          <a href="#archive" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#0F172A", fontWeight: "700", fontSize: "15px", textDecoration: "none", borderBottom: "2px solid #0F172A", paddingBottom: "4px" }}>
            Complete Archive (42 Documents)
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>

        {/* FILTER TABS */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "48px" }}>
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: isActive ? "#001F3F" : "#E2E8F0",
                  color: isActive ? "#FFFFFF" : "#475569",
                  transition: "all 0.2s ease"
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* DOCUMENTS GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {documents.map((doc, index) => (
            <div key={index} style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "32px", display: "flex", flexDirection: "column", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", border: "1px solid #E2E8F0", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.02)";
              }}
            >
              {/* Card Header - Only Date remains */}
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "16px" }}>
                <span style={{ fontSize: "13px", color: "#64748B", fontWeight: "600" }}>
                  {doc.date}
                </span>
              </div>

              {/* Document No text REMOVED here */}

              {/* Title */}
              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: "0 0 16px 0", lineHeight: "1.4" }}>
                {doc.title}
              </h3>

              {/* Description */}
              <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", margin: "0 0 32px 0", flex: 1 }}>
                {doc.desc}
              </p>

              {/* Card Footer (Buttons) */}
              <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <button style={{ 
                  backgroundColor: "#001F3F", color: "#FFFFFF", border: "none", 
                  padding: "12px 20px", borderRadius: "4px", fontSize: "14px", 
                  fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
                  flex: 1, justifyContent: "center", minWidth: "150px"
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Download PDF ({doc.fileSize})
                </button>
                <button style={{ 
                  backgroundColor: "transparent", color: "#0F172A", border: "none", 
                  fontSize: "14px", fontWeight: "700", cursor: "pointer", 
                  textDecoration: "underline", padding: 0
                }}>
                  Read Summary
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}