import { useState, useEffect } from "react";

export default function Publications() {
  const [activeFilter, setActiveFilter] = useState("Annual Reviews");
  const [isHovered, setIsHovered] = useState(false);

  const filters = [
    "Annual Reviews",
    "Methodology Frameworks",
    "VfM Evaluation Guidelines",
    "Advisory Briefs"
  ];

  const notices = [
    {
      date: "May 11, 2026",
      tag: "PRESIDENTIAL ASSENT",
      title: "Value for Money Office Act, 2026 (Act 1172) Becomes Law",
      desc: "The President of the Republic of Ghana has formally assented to the Value for Money Office Act, 2026 (Act 1172), establishing the Office as an independent statutory body corporate.",
      image: "/utilisation-bg.jpg"
    },
    {
      date: "May 11, 2026",
      tag: "MINISTERIAL DIRECTIVE",
      title: "Interim Monetary Thresholds for Mandatory VfM Assessments",
      desc: "Pursuant to Section 30(2) of Act 1172, the Minister for Finance, on the advice of the Board, will prescribe interim monetary thresholds for public sector projects.",
      image: "/boardroom.jpg"
    },
    {
      date: "May 11, 2026",
      tag: "INSTITUTIONAL NOTICE",
      title: "Establishment of Value for Money Units in Covered Entities",
      desc: "All covered entities are required to establish internal Value for Money Units over a five-year phased implementation, prioritising infrastructure, education, and health (Section 28).",
      image: "/about-bg.jpg"
    }
  ];

  const documents = [
    {
      date: "Jan 2027",
      category: "Annual Reviews",
      title: "2026 Annual Report to Parliament",
      desc: "The Office's inaugural annual report on the activities, operations, and financial performance of the VfM Office, including a summary of public savings realised. (Section 26)",
      fileSize: "3.2 MB"
    },
    {
      date: "Dec 2026",
      category: "Annual Reviews",
      title: "Q4 2026 VfM Assessment Findings",
      desc: "A quarterly publication summarising systemic inefficiencies identified during value for money assessments and policy recommendations arising from them. (Section 39)",
      fileSize: "1.9 MB"
    },
    {
      date: "Nov 2026",
      category: "Methodology Frameworks",
      title: "National Cost Benchmarks for Civil Works (2026)",
      desc: "Standardised cost benchmarks for commonly procured goods, works, and services to be used by covered entities in planning and budgeting. (Section 36)",
      fileSize: "4.5 MB"
    },
    {
      date: "Oct 2026",
      category: "VfM Evaluation Guidelines",
      title: "Standard Operating Procedures for Pre-Award Assessments",
      desc: "Technical guidelines detailing the methodology for independent evaluation of cost estimates, technical specifications, and value justification prior to contract execution. (Section 34)",
      fileSize: "2.1 MB"
    },
    {
      date: "Sep 2026",
      category: "Advisory Briefs",
      title: "Guidelines for Public Stakeholder Engagement",
      desc: "Procedural guidelines for facilitating public participation, citizen feedback, and stakeholder consultations in high-value public sector projects. (Section 43)",
      fileSize: "1.4 MB"
    },
    {
      date: "Aug 2026",
      category: "Methodology Frameworks",
      title: "Administrative Penalties Schedule",
      desc: "The official schedule specifying indicative penalty bands for different categories of contraventions and non-compliance under the Act. (Section 59)",
      fileSize: "1.1 MB"
    }
  ];

  const filteredDocuments = documents.filter(doc => doc.category === activeFilter);

  // --- TAB AUTOPLAY LOGIC ---
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveFilter((current) => {
        const currentIndex = filters.indexOf(current);
        const nextIndex = (currentIndex + 1) % filters.length;
        return filters[nextIndex];
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div style={{ backgroundColor: "#F4F5F0", minHeight: "100vh", overflowX: "hidden" }}>
      
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      {/* SECTION 1: NEWS / STATUTORY NOTICES */}
      <section style={{ backgroundColor: "#001F3F", padding: "80px 24px 100px", position: "relative" }}>
        
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/coat-of-arms.png)", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "right -100px center", opacity: 0.03, pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          
          <div style={{ marginBottom: "48px", textAlign: "center" }}>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: "800", color: "#FFFFFF", margin: "0 0 16px 0", lineHeight: "1.1" }}>
              News & Publications
            </h1>
            <p style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "#CBD5E1", maxWidth: "700px", lineHeight: "1.6", margin: "0 auto" }}>
              Official statutory notices, annual reports, guidelines, and frameworks issued by the Value for Money Office in accordance with Act 1172.
            </p>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: "800", color: "#FFFFFF", margin: 0 }}>
              Latest Statutory Notices
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "24px" }}>
            {notices.map((notice, index) => (
              <div key={index} style={{ 
                backgroundColor: "#0A2E4D", borderRadius: "12px", overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column",
                transition: "transform 0.3s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ position: "relative", height: "200px", overflow: "hidden", backgroundColor: "#0A2E4D" }}>
                  <img 
                    src={notice.image} 
                    alt="" 
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} 
                  />
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(10,46,77,0) 0%, rgba(10,46,77,1) 100%)" }} />
                  <div style={{ position: "absolute", bottom: "20px", left: "20px", color: "#FFFFFF", fontSize: "13px", fontWeight: "600" }}>
                    {notice.date}
                  </div>
                </div>

                <div style={{ padding: "32px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <span style={{ fontSize: "11px", fontWeight: "800", color: "#FCD116", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px", display: "block" }}>
                    {notice.tag}
                  </span>
                  <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 16px 0", lineHeight: "1.4" }}>
                    {notice.title}
                  </h3>
                  <p style={{ fontSize: "15px", color: "#CBD5E1", lineHeight: "1.6", margin: "0 0 24px 0", flex: 1 }}>
                    {notice.desc}
                  </p>
                  <button style={{ 
                    backgroundColor: "transparent", color: "#FFFFFF", border: "none", 
                    fontSize: "14px", fontWeight: "800", cursor: "pointer", 
                    textDecoration: "underline", padding: 0, textAlign: "left",
                    display: "inline-flex", alignItems: "center"
                  }}>
                    Read Full Notice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: PUBLICATIONS */}
      <section style={{ backgroundColor: "#F4F5F0", padding: "80px 24px", position: "relative", zIndex: 2 }}>
        <div style={{ position: "absolute", top: "-40px", left: 0, right: 0, height: "80px", backgroundColor: "#F4F5F0", borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 3 }}>
          
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: "800", color: "#001F3F", margin: 0 }}>
              Official Publications Repository
            </h2>
          </div>

          {/* Filter Tabs - Horizontal Scroll */}
          <div 
            className="hide-scrollbar"
            style={{ 
              display: "flex", 
              gap: "12px", 
              marginBottom: "32px",
              overflowX: "auto", 
              paddingBottom: "8px", 
              flexWrap: "nowrap",
              maskImage: "linear-gradient(to right, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, black 90%, transparent 100%)"
            }}
          >
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "4px",
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: "pointer",
                    border: "none",
                    backgroundColor: isActive ? "#001F3F" : "#E2E8F0",
                    color: isActive ? "#FFFFFF" : "#475569",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                    whiteSpace: "nowrap"
                  }}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* ACTIVE CATEGORY DISPLAY (Static Grid) */}
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
            style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", 
              gap: "24px",
              minHeight: "350px" 
            }}
          >
            {filteredDocuments.map((doc, index) => (
              <div key={index} style={{ 
                backgroundColor: "#FFFFFF", 
                borderRadius: "12px", 
                padding: "24px", 
                display: "flex", 
                flexDirection: "column", 
                boxShadow: "0 4px 6px rgba(0,0,0,0.02)", 
                border: "1px solid #E2E8F0", 
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer" 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.02)";
              }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "10px", fontWeight: "700", color: "#8B7355", textTransform: "uppercase", letterSpacing: "1px" }}>
                    {doc.category}
                  </span>
                  <span style={{ fontSize: "12px", color: "#64748B", fontWeight: "600" }}>
                    {doc.date}
                  </span>
                </div>

                <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: "0 0 12px 0", lineHeight: "1.4" }}>
                  {doc.title}
                </h3>

                <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", margin: "0 0 24px 0", flex: 1 }}>
                  {doc.desc}
                </p>

                <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                  <button style={{ 
                    backgroundColor: "#001F3F", color: "#FFFFFF", border: "none", 
                    padding: "12px 16px", borderRadius: "4px", fontSize: "13px", 
                    fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
                    flex: 1, justifyContent: "center", minWidth: "120px"
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    Download ({doc.fileSize})
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 24px", backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px dashed #CBD5E1" }}>
              <p style={{ fontSize: "16px", color: "#64748B", margin: 0 }}>No documents found in this category yet.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}