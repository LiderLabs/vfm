import { useState } from "react";

export default function OpenData() {
  const [searchQuery, setSearchQuery] = useState("");

  const projectStatuses = [
    { project: "Tema Interchange Phase 2", entity: "Ministry of Roads", status: "Under Review", statusColor: "#FCD116", lastUpdated: "Oct 26, 2026" },
    { project: "Regional Hospital Equipment", entity: "Ghana Health Service", status: "Clarification Requested", statusColor: "#EF4444", lastUpdated: "Oct 24, 2026" },
    { project: "STEM School Construction", entity: "Ministry of Education", status: "Assessment Complete", statusColor: "#10B981", lastUpdated: "Oct 20, 2026" },
    { project: "Pipeline Expansion", entity: "Ghana Water Co.", status: "Certificate Issued", statusColor: "#001F3F", lastUpdated: "Oct 15, 2026" },
  ];

  const filteredProjects = projectStatuses.filter(
    (p) => p.project.toLowerCase().includes(searchQuery.toLowerCase()) || p.entity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const publishedSummaries = [
    {
      date: "Oct 24, 2026",
      entity: "Ministry of Health",
      title: "Assessment of Medical Equipment Procurement",
      summary: "The VfM Office found that the quoted prices for secondary hospital equipment were 15% above regional market rates. The Ministry was advised to renegotiate, resulting in savings of GH₵ 4.2 Million.",
      savings: "GH₵ 4.2M"
    },
    {
      date: "Oct 18, 2026",
      entity: "Ministry of Roads",
      title: "Review of Tema Interchange Phase 2 Cost Estimates",
      summary: "A pre-award assessment identified unnecessary variations in the bill of quantities. The contractor was instructed to revise the scope, preventing an unjustified cost inflation of GH₵ 12.5 Million.",
      savings: "GH₵ 12.5M"
    },
    {
      date: "Oct 10, 2026",
      entity: "Ghana Education Trust Fund",
      title: "Audit of School Furniture Procurement",
      summary: "Post-award assessment revealed that the delivered furniture did not meet the required durability standards. Sanctions have been initiated against the supplier, and recovery proceedings are underway.",
      savings: "Pending Recovery"
    }
  ];

  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ position: "relative", backgroundColor: "#001F3F", padding: "100px 24px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/building-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2, zIndex: 0 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(0,31,63,0.8) 0%, rgba(0,31,63,1) 100%)", zIndex: 1 }} />
        
        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "52px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 24px 0", lineHeight: "1.1" }}>
            Open Data & Transparency
          </h1>
          <p style={{ fontSize: "20px", color: "#CBD5E1", lineHeight: "1.6", margin: 0, maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}>
            Providing the public with real-time statistics, published findings, and the status of major capital projects across Ghana.
          </p>
        </div>
      </section>

      {/* 2. NATIONAL DASHBOARD (Big Numbers) */}
      <section style={{ padding: "60px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
          
          {/* Removed borderBottom from all cards */}
          <div style={{ backgroundColor: "#FFFFFF", padding: "32px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0" }}>
            <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px 0" }}>Total Savings Identified</h3>
            <div style={{ fontSize: "42px", fontWeight: "800", color: "#001F3F", margin: 0 }}>GH₵ 250M+</div>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", padding: "32px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0" }}>
            <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px 0" }}>Assessments Conducted</h3>
            <div style={{ fontSize: "42px", fontWeight: "800", color: "#10B981", margin: 0 }}>1,245</div>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", padding: "32px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0" }}>
            <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px 0" }}>Contracts Flagged</h3>
            <div style={{ fontSize: "42px", fontWeight: "800", color: "#EF4444", margin: 0 }}>86</div>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", padding: "32px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0" }}>
            <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px 0" }}>Active Investigations</h3>
            <div style={{ fontSize: "42px", fontWeight: "800", color: "#B8860B", margin: 0 }}>14</div>
          </div>

        </div>
      </section>

      {/* 3. PUBLISHED SUMMARIES */}
      <section style={{ padding: "60px 24px", backgroundColor: "#FFFFFF", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0F172A", margin: "0 0 8px 0" }}>Published Assessment Summaries</h2>
            <p style={{ color: "#475569", fontSize: "16px", margin: 0 }}>Published in accordance with Section 27(4)(a) of Act 1172.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {publishedSummaries.map((summary, index) => (
              <div key={index} style={{ padding: "32px", borderRadius: "12px", border: "1px solid #E2E8F0", backgroundColor: "#F8FAFC", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: "#001F3F", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "8px" }}>{summary.entity}</span>
                    <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: 0 }}>{summary.title}</h3>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "13px", color: "#64748B", display: "block", marginBottom: "4px" }}>{summary.date}</span>
                    <span style={{ fontSize: "14px", fontWeight: "800", color: "#10B981", backgroundColor: "#D1FAE5", padding: "4px 12px", borderRadius: "20px" }}>{summary.savings}</span>
                  </div>
                </div>
                <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.6", margin: 0 }}>{summary.summary}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. LIVE STATUS TRACKER */}
      <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "32px" }}>
          <div>
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0F172A", margin: "0 0 8px 0" }}>Live Project Status Tracker</h2>
            <p style={{ color: "#475569", fontSize: "16px", margin: 0 }}>Real-time updates on assessments and compliance milestones (Section 27(4)(b)).</p>
          </div>
          <div style={{ position: "relative", width: "100%", maxWidth: "300px" }}>
            <input 
              type="text" 
              placeholder="Search by project or entity..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", padding: "12px 16px 12px 40px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
            />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" style={{ position: "absolute", left: "12px", top: "13px" }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>

        <div style={{ overflowX: "auto", border: "1px solid #E2E8F0", borderRadius: "12px", backgroundColor: "#FFFFFF" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "800px" }}>
            <thead>
              <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Project Name</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Covered Entity</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Current Status</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((item, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #E2E8F0" }}>
                    <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "700", color: "#0F172A" }}>{item.project}</td>
                    <td style={{ padding: "16px 24px", fontSize: "14px", color: "#475569" }}>{item.entity}</td>
                    <td style={{ padding: "16px 24px" }}>
                      <span style={{ display: "inline-block", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", backgroundColor: `${item.statusColor}15`, color: item.statusColor }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: "16px 24px", fontSize: "14px", color: "#475569" }}>{item.lastUpdated}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ padding: "32px", textAlign: "center", color: "#64748B" }}>No projects found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", backgroundColor: "#F8FAFC", padding: "24px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: "0 0 4px 0" }}>Download Open Data</h3>
            <p style={{ fontSize: "14px", color: "#475569", margin: 0 }}>Access anonymized datasets of all VfM assessments (CSV/Excel).</p>
          </div>
          <button style={{ 
            display: "flex", alignItems: "center", gap: "8px", 
            backgroundColor: "#001F3F", color: "#FFFFFF", padding: "12px 24px", 
            borderRadius: "4px", fontSize: "14px", fontWeight: "700", cursor: "pointer", border: "none"
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download Dataset (CSV)
          </button>
        </div>

      </section>

    </div>
  );
}