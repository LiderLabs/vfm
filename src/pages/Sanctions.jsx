import { useState } from "react";

export default function Sanctions() {
  const [searchQuery, setSearchQuery] = useState("");

  const debarredContractors = [
    { name: "Apex Construction Ltd.", regNo: "CS-49201", reason: "Contract Price Inflation", date: "Jan 15, 2026", expiry: "Jan 15, 2029", status: "Active Ban" },
    { name: "Delta Roads & Infrastructure", regNo: "CS-88123", reason: "Breach of Quality Standards", date: "Mar 10, 2026", expiry: "Mar 10, 2028", status: "Active Ban" },
    { name: "Omega Medical Supplies", regNo: "CS-11045", reason: "Cost Irregularity / Waste", date: "Nov 05, 2025", expiry: "Nov 05, 2027", status: "Active Ban" },
  ];

  const filteredContractors = debarredContractors.filter(
    (contractor) => contractor.name.toLowerCase().includes(searchQuery.toLowerCase()) || contractor.regNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ position: "relative", backgroundColor: "#001F3F", padding: "100px 24px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/building-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2, zIndex: 0 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(0,31,63,0.8) 0%, rgba(0,31,63,1) 100%)", zIndex: 1 }} />
        
        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "52px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 24px 0", lineHeight: "1.1" }}>
            Sanctions & Debarment
          </h1>
          <p style={{ fontSize: "20px", color: "#CBD5E1", lineHeight: "1.6", margin: 0 }}>
            Enforcing accountability and protecting public funds from contract inflation, waste, and abuse.
          </p>
        </div>
      </section>

      {/* 2. THE PENALTIES SECTION */}
      <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#0F172A", margin: "0 0 16px 0" }}>Consequences of Non-Compliance</h2>
          <p style={{ color: "#475569", fontSize: "18px", margin: 0, maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}>
            Under Section 38 of Act 1172, the VfM Office has the statutory power to impose severe penalties on contractors and suppliers who contribute to unjustified cost inflation.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {[
            { title: "Suspension", desc: "Immediate suspension of the contractor from ongoing public procurement processes under the Public Procurement Act, 2003 (Act 663)." },
            { title: "Debarment", desc: "A formal ban from participating in any future government contracts for a period of not less than two (2) years and not more than five (5) years." },
            { title: "Civil Recovery", desc: "The Office will initiate civil recovery proceedings to retrieve overpayments and unjustified costs from the contractor or supplier." }
          ].map((item, index) => (
            // Removed red top border and icon. Used a soft red background instead.
            <div key={index} style={{ backgroundColor: "#FEF2F2", padding: "40px 32px", borderRadius: "12px", border: "1px solid #FECACA" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#991B1B", margin: "0 0 12px 0" }}>{item.title}</h3>
              <p style={{ fontSize: "15px", color: "#7F1D1D", lineHeight: "1.6", margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PUBLIC DEBARMENT REGISTER */}
      <section style={{ padding: "80px 24px", backgroundColor: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "32px" }}>
            <div>
              <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0F172A", margin: "0 0 8px 0" }}>Public Debarment Register</h2>
              <p style={{ color: "#475569", fontSize: "16px", margin: 0, maxWidth: "600px" }}>
                Published in accordance with Section 38(2) of Act 1172. Covered entities are prohibited from awarding contracts to the entities listed below.
              </p>
            </div>
            <div style={{ position: "relative", width: "100%", maxWidth: "300px" }}>
              <input 
                type="text" 
                placeholder="Search by contractor name..." 
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
                  <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Contractor Name</th>
                  <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Reg. Number</th>
                  <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Reason for Debarment</th>
                  <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Date Issued</th>
                  <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Expiry Date</th>
                  <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredContractors.length > 0 ? (
                  filteredContractors.map((contractor, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid #E2E8F0" }}>
                      <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "700", color: "#0F172A" }}>{contractor.name}</td>
                      <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "600", color: "#475569" }}>{contractor.regNo}</td>
                      <td style={{ padding: "16px 24px", fontSize: "14px", color: "#B91C1C", fontWeight: "500" }}>{contractor.reason}</td>
                      <td style={{ padding: "16px 24px", fontSize: "14px", color: "#475569" }}>{contractor.date}</td>
                      <td style={{ padding: "16px 24px", fontSize: "14px", color: "#475569" }}>{contractor.expiry}</td>
                      <td style={{ padding: "16px 24px" }}>
                        <span style={{ display: "inline-block", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", backgroundColor: "#FEE2E2", color: "#991B1B" }}>
                          {contractor.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ padding: "32px", textAlign: "center", color: "#64748B" }}>No debarred contractors found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <p style={{ fontSize: "13px", color: "#64748B", marginTop: "16px", fontStyle: "italic" }}>
            *If you suspect a covered entity is engaging a debarred contractor, please report it immediately via our <a href="/submit" style={{ color: "#001F3F", fontWeight: "600" }}>Whistleblower Portal</a>.
          </p>

        </div>
      </section>

    </div>
  );
}