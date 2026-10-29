import { useState } from "react";

export default function Track() {
  const [trackingCode, setTrackingCode] = useState("");
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'error'
  const [caseData, setCaseData] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate a network request to a backend database
    setTimeout(() => {
      // For the prototype, any code starting with 'VFM-WB-' is considered valid
      if (trackingCode.trim().toUpperCase().startsWith("VFM-WB-")) {
        setCaseData({
          code: trackingCode.toUpperCase(),
          dateSubmitted: "October 20, 2026",
          stage: 3, // 1=Received, 2=Acknowledged, 3=Assessment, 4=Investigation, 5=Closed
        });
        setStatus("success");
      } else {
        setStatus("error");
      }
    }, 1000);
  };

  const stages = [
    { id: 1, title: "Report Received", desc: "Your report has been securely logged in our system.", date: "Oct 20, 2026" },
    { id: 2, title: "Acknowledged", desc: "The VfM Office has formally acknowledged your complaint. (Within 7 days)", date: "Oct 25, 2026" },
    { id: 3, title: "Preliminary Assessment", desc: "We are currently reviewing the details to determine if an investigation is warranted. (Within 14 days)", date: "In Progress" },
    { id: 4, title: "Investigation / Referral", desc: "If valid, the case will be investigated or referred to the Auditor-General.", date: "Pending" },
    { id: 5, title: "Case Closed", desc: "The outcome of the assessment has been finalized.", date: "Pending" },
  ];

  return (
    <div style={{ backgroundColor: "#F4F5F0", minHeight: "100vh", padding: "80px 24px" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ width: "64px", height: "64px", backgroundColor: "rgba(0,31,63,0.05)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px auto" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#001F3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <h1 style={{ fontSize: "42px", fontWeight: "800", color: "#0F172A", margin: "0 0 16px 0", lineHeight: "1.1" }}>
            Track Your Report
          </h1>
          <p style={{ fontSize: "18px", color: "#475569", margin: 0, lineHeight: "1.6" }}>
            Enter the tracking code provided when you submitted your complaint to see its current status.
          </p>
        </div>

        {/* SEARCH FORM */}
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "32px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0", marginBottom: "40px" }}>
          <form onSubmit={handleTrack} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Tracking Code</label>
              <input 
                type="text" 
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="e.g., VFM-WB-2026-4821"
                required
                style={{ width: "100%", padding: "16px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "18px", fontWeight: "600", outline: "none", textTransform: "uppercase", boxSizing: "border-box" }}
              />
            </div>
            <button type="submit" style={{ 
              backgroundColor: "#001F3F", color: "#FFFFFF", border: "none", padding: "16px", borderRadius: "8px", 
              fontSize: "16px", fontWeight: "700", cursor: "pointer", transition: "background-color 0.2s ease" 
            }}>
              {status === "loading" ? "Searching..." : "Check Status"}
            </button>
          </form>

          {/* ERROR MESSAGE */}
          {status === "error" && (
            <div style={{ marginTop: "24px", padding: "16px", backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "8px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <div>
                <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#991B1B", margin: "0 0 4px 0" }}>Invalid Tracking Code</h4>
                <p style={{ fontSize: "13px", color: "#B91C1C", margin: 0 }}>We could not find a report with this code. Please check the code and try again. (For this prototype, use a code starting with VFM-WB-)</p>
              </div>
            </div>
          )}
        </div>

        {/* SUCCESS TIMELINE */}
        {status === "success" && caseData && (
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "40px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0" }}>
            <div style={{ borderBottom: "1px solid #E2E8F0", paddingBottom: "24px", marginBottom: "32px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#001F3F", margin: "0 0 8px 0" }}>Report Status</h2>
              <p style={{ fontSize: "15px", color: "#64748B", margin: 0 }}>Tracking Code: <strong style={{ color: "#0F172A" }}>{caseData.code}</strong></p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {stages.map((stage, index) => {
                const isCompleted = stage.id < caseData.stage;
                const isActive = stage.id === caseData.stage;
                const isPending = stage.id > caseData.stage;

                return (
                  <div key={stage.id} style={{ display: "flex", gap: "20px" }}>
                    {/* Timeline Line & Icon */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ 
                        width: "32px", height: "32px", borderRadius: "50%", 
                        backgroundColor: isCompleted ? "#10B981" : isActive ? "#FCD116" : "#F1F5F9",
                        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1
                      }}>
                        {isCompleted ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        ) : isActive ? (
                          <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#001F3F" }}></div>
                        ) : (
                          <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#CBD5E1" }}></div>
                        )}
                      </div>
                      {index !== stages.length - 1 && (
                        <div style={{ width: "2px", flex: 1, backgroundColor: isCompleted ? "#10B981" : "#E2E8F0", minHeight: "60px" }} />
                      )}
                    </div>

                    {/* Timeline Content */}
                    <div style={{ paddingBottom: "40px", flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
                        <h3 style={{ fontSize: "18px", fontWeight: "800", color: isPending ? "#94A3B8" : "#0F172A", margin: "0 0 4px 0" }}>{stage.title}</h3>
                        <span style={{ fontSize: "13px", fontWeight: "600", color: isActive ? "#B8860B" : "#64748B" }}>{stage.date}</span>
                      </div>
                      <p style={{ fontSize: "15px", color: isPending ? "#CBD5E1" : "#475569", margin: 0, lineHeight: "1.5" }}>{stage.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}