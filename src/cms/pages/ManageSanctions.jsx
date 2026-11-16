// src/cms/pages/ManageSanctions.jsx
import { useState } from "react";
import { getSanctions, saveSanctions, initialSanctions, resetSanctions } from "../services/mockData";

export default function ManageSanctions() {
  const [sanctions, setSanctions] = useState(() => getSanctions());
  const [isAdding, setIsAdding] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    company: "",
    tin: "",
    reason: "",
    duration: "1 Year",
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newSanction = { id: `san-${Date.now()}`, ...formData };
    const updated = [newSanction, ...sanctions];
    saveSanctions(updated);
    setSanctions(updated);
    setIsAdding(false);
    // Reset form
    setFormData({ 
      company: "", 
      tin: "", 
      reason: "", 
      duration: "1 Year", 
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) 
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Remove this contractor from the debarment list?")) return;
    const updated = sanctions.filter((s) => s.id !== id);
    saveSanctions(updated);
    setSanctions(updated);
  };

  const handleReset = () => {
    if (window.confirm("Reset sanctions list to original data?")) {
      resetSanctions();
      setSanctions(initialSanctions);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* HEADER ACTION BAR */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "#0F172A" }}>
          {isAdding ? "Add Debarred Contractor" : "Active Sanctions & Debarments"}
        </h2>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={handleReset} style={{ backgroundColor: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA", padding: "10px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>
            Reset to Default
          </button>
          <button onClick={() => setIsAdding(!isAdding)} style={{ backgroundColor: isAdding ? "#E2E8F0" : "#001F3F", color: isAdding ? "#0F172A" : "#FFFFFF", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>
            {isAdding ? "Cancel" : "+ Add Sanction"}
          </button>
        </div>
      </div>

      {/* ADD FORM */}
      {isAdding && (
        <div style={{ backgroundColor: "#FFFFFF", padding: "32px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px", display: "block" }}>Company Name</label>
                <input name="company" value={formData.company} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #CBD5E1" }} required />
              </div>
              <div>
                <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px", display: "block" }}>TIN (Tax ID)</label>
                <input name="tin" value={formData.tin} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #CBD5E1" }} required />
              </div>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px", display: "block" }}>Duration</label>
                <select name="duration" value={formData.duration} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #CBD5E1", backgroundColor: "#FFF" }}>
                  <option value="6 Months">6 Months</option>
                  <option value="1 Year">1 Year</option>
                  <option value="2 Years">2 Years</option>
                  <option value="5 Years">5 Years</option>
                  <option value="Permanent">Permanent</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px", display: "block" }}>Date of Sanction</label>
                <input name="date" value={formData.date} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #CBD5E1" }} required />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px", display: "block" }}>Reason for Debarment</label>
              <textarea name="reason" value={formData.reason} onChange={handleChange} rows="3" style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #CBD5E1" }} required />
            </div>

            <button type="submit" style={{ backgroundColor: "#10B981", color: "#FFF", border: "none", padding: "14px", borderRadius: "8px", fontSize: "15px", fontWeight: "700", cursor: "pointer", marginTop: "8px" }}>
              Publish to Public Register
            </button>
          </form>
        </div>
      )}

      {/* LIST TABLE */}
      {!isAdding && (
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E2E8F0", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
              <tr>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "800", color: "#64748B", textTransform: "uppercase" }}>Company</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "800", color: "#64748B", textTransform: "uppercase" }}>Reason</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "800", color: "#64748B", textTransform: "uppercase" }}>Duration</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "800", color: "#64748B", textTransform: "uppercase" }}>Date</th>
                <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "800", color: "#64748B", textTransform: "uppercase", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sanctions.map((sanction) => (
                <tr key={sanction.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <td style={{ padding: "16px 24px" }}>
                    <p style={{ margin: 0, fontWeight: "800", color: "#0F172A" }}>{sanction.company}</p>
                    <p style={{ margin: 0, fontSize: "13px", color: "#64748B" }}>TIN: {sanction.tin}</p>
                  </td>
                  <td style={{ padding: "16px 24px", fontSize: "14px", color: "#475569", maxWidth: "300px" }}>{sanction.reason}</td>
                  <td style={{ padding: "16px 24px" }}>
                    <span style={{ backgroundColor: "#FEF2F2", color: "#B91C1C", padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "700" }}>
                      {sanction.duration}
                    </span>
                  </td>
                  <td style={{ padding: "16px 24px", fontSize: "14px", color: "#475569" }}>{sanction.date}</td>
                  <td style={{ padding: "16px 24px", textAlign: "right" }}>
                    <button onClick={() => handleDelete(sanction.id)} style={{ backgroundColor: "transparent", color: "#EF4444", border: "1px solid #FECACA", padding: "6px 12px", borderRadius: "6px", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {sanctions.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: "32px", textAlign: "center", color: "#64748B" }}>No active sanctions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}