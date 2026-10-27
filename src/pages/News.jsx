export default function News() {
  return (
    <div style={{ backgroundColor: "#F4F5F0", minHeight: "100vh", padding: "100px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* HEADER SECTION */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "60px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "30px", height: "2px", backgroundColor: "#8B7355" }}></div>
              <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "1.5px", color: "#8B7355", textTransform: "uppercase" }}>
                Policy & Engagements
              </span>
            </div>
            <h1 style={{ fontSize: "52px", fontWeight: "800", color: "#0F172A", margin: 0, lineHeight: "1.1" }}>
              News & Institutional<br/>Insights
            </h1>
          </div>
          
          <a href="#all-news" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#0F172A", fontWeight: "700", fontSize: "15px", textDecoration: "none", borderBottom: "2px solid #0F172A", paddingBottom: "4px" }}>
            View All Policy News
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>

        {/* 2-COLUMN GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "32px", alignItems: "start" }}>
          
          {/* LEFT COLUMN: FEATURED ARTICLE */}
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0" }}>
            
            {/* Image Area with Gradient Fade */}
            <div style={{ position: "relative", height: "350px" }}>
              <div style={{ 
                position: "absolute", top: 0, left: 0, right: 0, bottom: 0, 
                backgroundColor: "#E2E8F0", // Placeholder color if image fails
                backgroundImage: "url(/symposium.jpg)", // Replace with your image in public folder
                backgroundSize: "cover", 
                backgroundPosition: "center" 
              }} />
              {/* The gradient fade from the image into the white card */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "150px", background: "linear-gradient(to top, #FFFFFF, transparent)" }} />
              
              {/* Tag positioned on the image */}
              <div style={{ position: "absolute", bottom: "24px", left: "32px", backgroundColor: "#8B7355", color: "#FFFFFF", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", fontWeight: "800", letterSpacing: "1px", textTransform: "uppercase" }}>
                Symposium Brief
              </div>
            </div>

            {/* Text Content */}
            <div style={{ padding: "0 32px 40px" }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "13px", color: "#64748B", fontWeight: "600", marginBottom: "16px" }}>
                <span>Accra, Ghana</span>
                <span style={{ fontSize: "8px" }}>●</span>
                <span>November 18, 2024</span>
                <span style={{ fontSize: "8px" }}>●</span>
                <span>5 min read</span>
              </div>

              <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#8B7355", margin: "0 0 16px 0", lineHeight: "1.3" }}>
                VFM Office Convenes Multi-Agency Symposium on Capital Project Cost Optimization in Accra
              </h2>

              <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.6", marginBottom: "32px" }}>
                Senior leadership from the Ministry of Finance, the Ministry of Roads and Highways, and regional development authorities gathered to establish harmonized unit costing models aimed at preventing capital variance in public infrastructure delivery.
              </p>

              <a href="#read" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#8B7355", fontWeight: "700", fontSize: "15px", textDecoration: "none" }}>
                Read Full Coverage
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: SECONDARY ARTICLES */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* Article 1 */}
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "32px", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", border: "1px solid #E2E8F0", transition: "transform 0.2s ease" }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span style={{ backgroundColor: "#F1F5F9", color: "#0F172A", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", fontWeight: "700" }}>
                  Technical Advisory
                </span>
                <span style={{ fontSize: "13px", color: "#64748B", fontWeight: "600" }}>Oct 28, 2024</span>
              </div>

              <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0F172A", margin: "0 0 12px 0", lineHeight: "1.3" }}>
                Standardising Unit Costs in Healthcare Facility Infrastructure
              </h3>

              <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", marginBottom: "24px" }}>
                An analysis of medical procurement indices, revealing critical insights for standardizing secondary hospital construction schedules and technical installations.
              </p>

              <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "20px" }}>
                <a href="#read" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#001F3F", fontWeight: "700", fontSize: "14px", textDecoration: "none" }}>
                  Read Dispatch
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </div>
            </div>

            {/* Article 2 */}
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "32px", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", border: "1px solid #E2E8F0", transition: "transform 0.2s ease" }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span style={{ backgroundColor: "#F1F5F9", color: "#0F172A", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", fontWeight: "700" }}>
                  Quarterly Bulletin
                </span>
                <span style={{ fontSize: "13px", color: "#64748B", fontWeight: "600" }}>Sep 14, 2024</span>
              </div>

              <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0F172A", margin: "0 0 12px 0", lineHeight: "1.3" }}>
                Quarterly Briefing: Strengthening Oversight Mechanisms Across Metropolitan Assemblies
              </h3>

              <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", marginBottom: "24px" }}>
                Guidance directed at Municipal and District Assemblies (MMDAs) outlining newly gazetted procedural checks for high-frequency civic works tenders.
              </p>

              <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "20px" }}>
                <a href="#read" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#001F3F", fontWeight: "700", fontSize: "14px", textDecoration: "none" }}>
                  Read Dispatch
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}