import PortalLayout from "../components/PortalLayout";

export default function Dashboard() {
  const stats = [
    { label: "Pending Assessments", value: "8", color: "#FCD116", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Approved This Month", value: "24", color: "#10B981", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Flagged Contracts", value: "3", color: "#EF4444", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
    { label: "Savings Identified", value: "GH₵142M", color: "#001F3F", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" }
  ];

  const recentAssessments = [
    { id: "VFM-2026-0142", entity: "Ministry of Roads", value: "₵48.2M", status: "Under Review", statusColor: "#FCD116" },
    { id: "VFM-2026-0141", entity: "Ghana Health Service", value: "₵12.7M", status: "Clarification", statusColor: "#EF4444" },
    { id: "VFM-2026-0140", entity: "Ministry of Education", value: "₵86.4M", status: "Under Review", statusColor: "#FCD116" },
    { id: "VFM-2026-0139", entity: "Ghana Water Co.", value: "₵31.5M", status: "Approved", statusColor: "#10B981" },
  ];

  return (
    <PortalLayout pageTitle="Good morning, Kwame" pageSubtitle="Here is what is happening with your assessments today.">
      
      {/* STATS CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "40px" }}>
        {stats.map((stat, index) => (
          <div key={index} style={{ backgroundColor: "#FFFFFF", padding: "24px", borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: `${stat.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stat.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={stat.icon}></path></svg>
              </div>
            </div>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#64748B", marginBottom: "4px" }}>{stat.label}</div>
            <div style={{ fontSize: "28px", fontWeight: "800", color: "#0F172A" }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* RECENT ASSESSMENTS TABLE */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 2px 4px rgba(0,0,0,0.02)", overflow: "hidden" }}>
        <div style={{ padding: "24px", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: 0 }}>My Assessment Queue</h2>
          <a href="/dashboard/assessments" style={{ fontSize: "14px", fontWeight: "700", color: "#001F3F", textDecoration: "none" }}>View All →</a>
        </div>
        
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px" }}>Reference</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px" }}>Procuring Entity</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px" }}>Contract Value</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAssessments.map((row, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #E2E8F0", cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#F8FAFC"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "700", color: "#001F3F" }}>{row.id}</td>
                  <td style={{ padding: "16px 24px", fontSize: "14px", color: "#334155", fontWeight: "500" }}>{row.entity}</td>
                  <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "700", color: "#0F172A" }}>{row.value}</td>
                  <td style={{ padding: "16px 24px" }}>
                    <span style={{ display: "inline-block", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", backgroundColor: `${row.statusColor}15`, color: row.statusColor }}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </PortalLayout>
  );
}