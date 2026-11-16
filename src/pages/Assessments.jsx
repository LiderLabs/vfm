import PortalLayout from "../components/PortalLayout";

export default function Assessments() {
  const allAssessments = [
    { id: "VFM-2026-0142", entity: "Ministry of Roads", project: "Tema Interchange Phase 2", value: "₵48.2M", status: "Under Review", statusColor: "#FCD116" },
    { id: "VFM-2026-0141", entity: "Ghana Health Service", project: "Regional Hospital Equipment", value: "₵12.7M", status: "Clarification", statusColor: "#EF4444" },
    { id: "VFM-2026-0140", entity: "Ministry of Education", project: "STEM School Construction", value: "₵86.4M", status: "Under Review", statusColor: "#FCD116" },
    { id: "VFM-2026-0139", entity: "Ghana Water Co.", project: "Pipeline Expansion", value: "₵31.5M", status: "Approved", statusColor: "#10B981" },
    { id: "VFM-2026-0138", entity: "Ministry of Defence", project: "Barracks Renovation", value: "₵105.3M", status: "Under Review", statusColor: "#FCD116" },
  ];

  return (
    <PortalLayout pageTitle="Assessments" pageSubtitle="Manage and review all VfM assessment requests.">
      
      {/* FILTERS */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <button style={{ padding: "8px 16px", backgroundColor: "#001F3F", color: "#FFFFFF", border: "none", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>All</button>
        <button style={{ padding: "8px 16px", backgroundColor: "#FFFFFF", color: "#475569", border: "1px solid #E2E8F0", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>Under Review</button>
        <button style={{ padding: "8px 16px", backgroundColor: "#FFFFFF", color: "#475569", border: "1px solid #E2E8F0", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>Clarification</button>
        <button style={{ padding: "8px 16px", backgroundColor: "#FFFFFF", color: "#475569", border: "1px solid #E2E8F0", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>Approved</button>
      </div>

      {/* FULL TABLE */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 2px 4px rgba(0,0,0,0.02)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px" }}>Reference</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px" }}>Entity & Project</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px" }}>Value</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px" }}>Status</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {allAssessments.map((row, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #E2E8F0" }}>
                  <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "700", color: "#001F3F" }}>{row.id}</td>
                  <td style={{ padding: "16px 24px" }}>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#0F172A" }}>{row.entity}</div>
                    <div style={{ fontSize: "13px", color: "#64748B", marginTop: "4px" }}>{row.project}</div>
                  </td>
                  <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "700", color: "#0F172A" }}>{row.value}</td>
                  <td style={{ padding: "16px 24px" }}>
                    <span style={{ display: "inline-block", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", backgroundColor: `${row.statusColor}15`, color: row.statusColor }}>
                      {row.status}
                    </span>
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    <button style={{ padding: "6px 12px", backgroundColor: "transparent", border: "1px solid #CBD5E1", borderRadius: "4px", fontSize: "13px", fontWeight: "600", color: "#001F3F", cursor: "pointer" }}>Review</button>
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