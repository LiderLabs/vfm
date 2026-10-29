import { useState } from "react";
import { Link } from "react-router-dom";

export default function Clearance() {
  const [searchQuery, setSearchQuery] = useState("");

  const issuedCertificates = [
    { id: "VFM-CLR-2026-0891", project: "Tema Interchange Phase 2", entity: "Ministry of Roads", date: "Oct 24, 2026", value: "GH₵ 48.2M", status: "Issued" },
    { id: "VFM-CLR-2026-0890", project: "Regional Hospital Equipment", entity: "Ghana Health Service", date: "Oct 20, 2026", value: "GH₵ 12.7M", status: "Issued" },
    { id: "VFM-CLR-2026-0889", project: "STEM School Construction", entity: "Ministry of Education", date: "Oct 15, 2026", value: "GH₵ 86.4M", status: "Issued" },
    { id: "VFM-CLR-2026-0888", project: "Pipeline Expansion", entity: "Ghana Water Co.", date: "Oct 10, 2026", value: "GH₵ 31.5M", status: "Issued" },
  ];

  const filteredCertificates = issuedCertificates.filter(
    (cert) => cert.project.toLowerCase().includes(searchQuery.toLowerCase()) || cert.entity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ position: "relative", backgroundColor: "#001F3F", padding: "100px 24px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/building-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2, zIndex: 0 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(0,31,63,0.8) 0%, rgba(0,31,63,1) 100%)", zIndex: 1 }} />
        
        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          {/* "STATUTORY REQUIREMENT" label removed */}
          <h1 style={{ fontSize: "52px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 24px 0", lineHeight: "1.1" }}>
            VfM Certificate of Clearance
          </h1>
          <p style={{ fontSize: "20px", color: "#CBD5E1", lineHeight: "1.6", margin: 0 }}>
            No public entity shall award a contract above the prescribed threshold without a Value for Money Certificate of Clearance issued by this Office.
          </p>
        </div>
      </section>

      {/* 2. LEGAL WARNING BOX */}
      <section style={{ padding: "60px 24px 20px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "#FEF2F2", border: "2px solid #EF4444", borderRadius: "12px", padding: "32px", display: "flex", gap: "20px", alignItems: "flex-start", boxShadow: "0 10px 20px rgba(239, 68, 68, 0.1)" }}>
          <div style={{ width: "48px", height: "48px", backgroundColor: "#FEE2E2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <div>
            <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#991B1B", margin: "0 0 8px 0" }}>Legal Consequence of Non-Compliance</h3>
            <p style={{ fontSize: "16px", color: "#B91C1C", margin: 0, lineHeight: "1.6" }}>
              Pursuant to <strong>Section 31(5) of the Value for Money Office Act, 2026 (Act 1172)</strong>, a contract executed in contravention of this requirement is <strong>null and void</strong> and unenforceable against the Republic or the covered entity.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW TO APPLY */}
      <section style={{ padding: "60px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#0F172A", margin: "0 0 16px 0" }}>Application Process</h2>
          <p style={{ color: "#475569", fontSize: "18px", margin: 0 }}>All covered entities must follow this three-step statutory procedure.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {[
            { title: "Submit Application", desc: "The covered entity submits a formal request via the VfM Digital Portal, including cost estimates, technical specifications, and procurement plans (Section 34)." },
            { title: "VfM Assessment", desc: "The VfM Office conducts a rigorous pre-award assessment to verify costs against benchmarks and ensure value justification (Section 34)." },
            { title: "Certificate Issued", desc: "If the assessment is satisfactory, the Office issues the Certificate of Clearance. Only then can the contract be awarded (Section 31)." }
          ].map((item, index) => (
            // Removed gold top border and the numbers
            <div key={index} style={{ backgroundColor: "#FFFFFF", padding: "40px 32px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: "0 0 12px 0" }}>{item.title}</h3>
              <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link to="/portal" style={{ 
            display: "inline-flex", alignItems: "center", gap: "8px", 
            backgroundColor: "#001F3F", color: "#FFFFFF", padding: "16px 40px", 
            borderRadius: "4px", fontSize: "16px", fontWeight: "800", textDecoration: "none",
            transition: "background-color 0.2s ease"
          }}>
            Access the VfM Digital Portal to Apply
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        </div>
      </section>

      {/* 4. PUBLIC REGISTER (Transparency) */}
      <section style={{ padding: "80px 24px", backgroundColor: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "32px" }}>
            <div>
              <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0F172A", margin: "0 0 8px 0" }}>Public Register of Issued Certificates</h2>
              <p style={{ color: "#475569", fontSize: "16px", margin: 0 }}>Published in accordance with Section 27(4)(d) of Act 1172.</p>
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

          <div style={{ overflowX: "auto", border: "1px solid #E2E8F0", borderRadius: "12px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "800px" }}>
              <thead>
                <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                  <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Certificate ID</th>
                  <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Project Name</th>
                  <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Covered Entity</th>
                  <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Value</th>
                  <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Date Issued</th>
                  <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCertificates.length > 0 ? (
                  filteredCertificates.map((cert, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid #E2E8F0" }}>
                      <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "700", color: "#001F3F" }}>{cert.id}</td>
                      <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "600", color: "#0F172A" }}>{cert.project}</td>
                      <td style={{ padding: "16px 24px", fontSize: "14px", color: "#475569" }}>{cert.entity}</td>
                      <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "700", color: "#0F172A" }}>{cert.value}</td>
                      <td style={{ padding: "16px 24px", fontSize: "14px", color: "#475569" }}>{cert.date}</td>
                      <td style={{ padding: "16px 24px" }}>
                        <span style={{ display: "inline-block", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", backgroundColor: "#D1FAE5", color: "#065F46" }}>
                          {cert.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ padding: "32px", textAlign: "center", color: "#64748B" }}>No certificates found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
}