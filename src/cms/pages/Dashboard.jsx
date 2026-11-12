import { useNavigate } from "react-router-dom";

export default function CMSDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: "Pending Complaints", value: "12", color: "#EF4444", icon: "📝" },
    { label: "Published Notices", value: "48", color: "#10B981", icon: "📰" },
    { label: "Active Projects", value: "24", color: "#FCD116", icon: "🏗️" },
    { label: "Debarred Contractors", value: "3", color: "#001F3F", icon: "⚖️" },
  ];

  const handleResetDemo = () => {
    if (window.confirm("This will clear all CMS data and restore the website to its default hardcoded state. Continue?")) {
      localStorage.removeItem("vfmo_publications");
      window.location.reload(); // Reloads the page to show the original data
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "800", color: "#0F172A" }}>Dashboard Overview</h1>
        
        {/* THE MAGIC BUTTON */}
        <button 
          onClick={handleResetDemo}
          style={{ 
            backgroundColor: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA", 
            padding: "10px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: "700", 
            cursor: "pointer", transition: "all 0.2s"
          }}
        >
          Reset Demo Data
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "40px" }}>
        {stats.map((stat, index) => (
          <div key={index} style={{ backgroundColor: "#FFFFFF", padding: "24px", borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ margin: "0 0 8px 0", fontSize: "13px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>{stat.label}</p>
                <h3 style={{ margin: 0, fontSize: "32px", fontWeight: "900", color: stat.color }}>{stat.value}</h3>
              </div>
              <span style={{ fontSize: "24px" }}>{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: "#FFFFFF", padding: "32px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
        <h2 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "800", color: "#0F172A" }}>Recent Activity</h2>
        <p style={{ color: "#64748B", fontSize: "14px" }}>Activity feed coming soon...</p>
      </div>
    </div>
  );
}