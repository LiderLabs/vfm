import { useState } from "react";
import { getHomepageData, saveHomepageData, resetHomepageData } from "../services/mockData";

export default function ManageHomepage() {
  const [data, setData] = useState(() => getHomepageData());
  const [activeTab, setActiveTab] = useState("slides");
  const [statusMsg, setStatusMsg] = useState("");

  // 1. HERO ROUTES (Informational + Transactional)
  const heroRoutes = [
    { label: "About Us (Overview)", value: "/about", desc: "The main About page detailing our legal foundation and leadership." },
    { label: "Our Institutional Values", value: "/about#values", desc: "Scrolls directly to the Integrity, Transparency, and Accountability section." },
    { label: "What We Do (Our Mandate)", value: "/what-we-do", desc: "The interactive page breaking down the six core statutory pillars." },
    { label: "Verify a Certificate of Clearance", value: "/clearance", desc: "The public register to verify if a contract has a valid VfM clearance." },
    { label: "View Sanctions & Debarments", value: "/sanctions", desc: "The public register of contractors banned from public procurement." },
    { label: "Report a Concern (Whistleblower)", value: "/submit", desc: "The secure form to report contract inflation or misuse of funds." },
    { label: "Open Data & Project Tracker", value: "/open-data", desc: "The live dashboard showing national savings and project statuses." },
    { label: "News & Publications", value: "/publications", desc: "Press releases, annual reports, and official VfM frameworks." },
  ];

  // 2. ACTION ROUTES (Strictly Transactional - No About Us or Publications)
  const actionRoutes = [
    { label: "Report a Concern (Whistleblower)", value: "/submit", desc: "The secure form to report contract inflation or misuse of funds." },
    { label: "Verify a Certificate of Clearance", value: "/clearance", desc: "The public register to verify if a contract has a valid VfM clearance." },
    { label: "View Sanctions & Debarments", value: "/sanctions", desc: "The public register of contractors banned from public procurement." },
    { label: "Open Data & Project Tracker", value: "/open-data", desc: "The live dashboard showing national savings and project statuses." },
    { label: "Track a Complaint", value: "/track", desc: "Enter a tracking code to see the status of a submitted report." },
    { label: "Public Engagement & Hearings", value: "/engagement", desc: "Register for public hearings or submit citizen feedback." },
    { label: "Contact the Office", value: "/contact", desc: "Direct communication form for inquiries." },
  ];

  // --- SAVE HANDLER ---
  const handleSave = () => {
    saveHomepageData(data);
    setStatusMsg("Homepage updated successfully!");
    setTimeout(() => setStatusMsg(""), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the homepage to its original text? This will overwrite your current changes.")) {
      resetHomepageData();
      setData(getHomepageData());
      setStatusMsg("Homepage reset to default.");
      setTimeout(() => setStatusMsg(""), 3000);
    }
  };

  // --- HERO SLIDES HANDLERS ---
  const updateSlide = (index, field, value) => {
    const newSlides = [...data.heroSlides];
    newSlides[index][field] = value;
    setData({ ...data, heroSlides: newSlides });
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => updateSlide(index, "bgImage", reader.result);
    reader.readAsDataURL(file);
  };

  // --- STATS HANDLERS ---
  const updateStat = (index, field, value) => {
    const newStats = [...data.stats];
    newStats[index][field] = value;
    setData({ ...data, stats: newStats });
  };

  // --- PUBLIC ACTIONS HANDLERS ---
  const updateAction = (index, field, value) => {
    const newActions = [...data.publicActions];
    newActions[index][field] = value;
    setData({ ...data, publicActions: newActions });
  };

  // --- UI COMPONENTS ---
  const inputStyle = { width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "14px", outline: "none", boxSizing: "border-box", marginBottom: "16px" };
  const labelStyle = { display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", fontFamily: "'Inter', sans-serif" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h2 style={{ margin: "0 0 8px 0", fontSize: "24px", fontWeight: "800", color: "#0F172A" }}>Manage Homepage</h2>
          <p style={{ margin: 0, color: "#64748B", fontSize: "14px" }}>Update the hero carousel, live statistics, and public action tiles.</p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {statusMsg && <span style={{ color: "#10B981", fontWeight: "700", fontSize: "14px" }}>{statusMsg}</span>}
          <button onClick={handleReset} style={{ backgroundColor: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA", padding: "10px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>
            Reset to Default
          </button>
          <button onClick={handleSave} style={{ backgroundColor: "#001F3F", color: "#FFFFFF", border: "none", padding: "10px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: "700", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,31,63,0.15)" }}>
            Save Changes
          </button>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid #E2E8F0", paddingBottom: "0" }}>
        {["slides", "stats", "actions"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "12px 24px",
              backgroundColor: "transparent",
              border: "none",
              borderBottom: activeTab === tab ? "3px solid #001F3F" : "3px solid transparent",
              color: activeTab === tab ? "#001F3F" : "#64748B",
              fontWeight: activeTab === tab ? "800" : "600",
              fontSize: "15px",
              cursor: "pointer",
              textTransform: "capitalize"
            }}
          >
            {tab === "slides" ? "Hero Carousel" : tab === "stats" ? "Live Statistics" : "Public Actions"}
          </button>
        ))}
      </div>

      {/* TAB CONTENT: HERO SLIDES */}
      {activeTab === "slides" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
          {data.heroSlides.map((slide, index) => {
            const selectedRouteInfo = heroRoutes.find(r => r.value === slide.btnLink);

            return (
              <div key={slide.id} style={{ backgroundColor: "#FFFFFF", padding: "24px", borderRadius: "12px", border: "1px solid #E2E8F0", display: "flex", gap: "24px", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 300px" }}>
                  <label style={labelStyle}>Background Image (Slide {index + 1})</label>
                  <div style={{ border: "2px dashed #CBD5E1", borderRadius: "8px", padding: "16px", textAlign: "center", backgroundColor: "#F8FAFC", position: "relative", cursor: "pointer", height: "150px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {slide.bgImage ? (
                      <img src={slide.bgImage} alt="Slide Preview" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                    ) : (
                      <span style={{ color: "#64748B", fontSize: "14px" }}>Click to upload image</span>
                    )}
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, index)} style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }} />
                  </div>
                </div>
                
                <div style={{ flex: "2 1 400px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={labelStyle}>Headline (White)</label>
                      <input type="text" value={slide.headline1} onChange={(e) => updateSlide(index, "headline1", e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Headline (Gold)</label>
                      <input type="text" value={slide.headline2} onChange={(e) => updateSlide(index, "headline2", e.target.value)} style={inputStyle} />
                    </div>
                  </div>
                  
                  <label style={labelStyle}>Subheadline</label>
                  <textarea value={slide.subheadline} onChange={(e) => updateSlide(index, "subheadline", e.target.value)} rows="3" style={{ ...inputStyle, resize: "vertical" }} />

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={labelStyle}>Button Text</label>
                      <input type="text" value={slide.btnText} onChange={(e) => updateSlide(index, "btnText", e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Button Link (Destination)</label>
                      <select 
                        value={slide.btnLink} 
                        onChange={(e) => updateSlide(index, "btnLink", e.target.value)} 
                        style={{ ...inputStyle, marginBottom: "8px" }}
                      >
                        {heroRoutes.map((route) => (
                          <option key={route.value} value={route.value}>
                            {route.label}
                          </option>
                        ))}
                        {!selectedRouteInfo && (
                          <option value={slide.btnLink}>{slide.btnLink} (Custom)</option>
                        )}
                      </select>
                      
                      {selectedRouteInfo && (
                        <p style={{ margin: "0 0 16px 0", fontSize: "12px", color: "#10B981", display: "flex", gap: "6px", alignItems: "flex-start", lineHeight: "1.4" }}>
                          <span style={{ fontWeight: "800" }}>ℹ️</span>
                          {selectedRouteInfo.desc}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB CONTENT: STATS */}
      {activeTab === "stats" && (
        <div style={{ backgroundColor: "#FFFFFF", padding: "32px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <p style={{ margin: "0 0 24px 0", color: "#475569", fontSize: "15px" }}>Update the numbers shown in the scrolling marquee at the bottom of the hero section.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {data.stats.map((stat, index) => (
              <div key={stat.id} style={{ padding: "20px", backgroundColor: "#F8FAFC", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                <div>
                  <label style={labelStyle}>Label</label>
                  <input type="text" value={stat.label} onChange={(e) => updateStat(index, "label", e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Value (Number / Text)</label>
                  <input type="text" value={stat.value} onChange={(e) => updateStat(index, "value", e.target.value)} style={{ ...inputStyle, marginBottom: 0 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: PUBLIC ACTIONS */}
      {activeTab === "actions" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
          {data.publicActions.map((action, index) => {
            const selectedRouteInfo = actionRoutes.find(r => r.value === action.link);

            return (
              <div key={action.id} style={{ backgroundColor: "#FFFFFF", padding: "24px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>Action Title</label>
                  <input type="text" value={action.title} onChange={(e) => updateAction(index, "title", e.target.value)} style={inputStyle} />
                </div>
                
                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>Description (Shows when tile is clicked)</label>
                  <textarea value={action.desc} onChange={(e) => updateAction(index, "desc", e.target.value)} rows="3" style={{ ...inputStyle, marginBottom: 0, resize: "vertical" }} />
                </div>

                <div>
                  <label style={labelStyle}>Destination Link</label>
                  <select 
                    value={action.link} 
                    onChange={(e) => updateAction(index, "link", e.target.value)} 
                    style={{ ...inputStyle, marginBottom: "8px" }}
                  >
                    {actionRoutes.map((route) => (
                      <option key={route.value} value={route.value}>
                        {route.label}
                      </option>
                    ))}
                    {!selectedRouteInfo && (
                      <option value={action.link}>{action.link} (Custom)</option>
                    )}
                  </select>
                  
                  {selectedRouteInfo && (
                    <p style={{ margin: "0", fontSize: "12px", color: "#10B981", display: "flex", gap: "6px", alignItems: "flex-start", lineHeight: "1.4" }}>
                      <span style={{ fontWeight: "800" }}>ℹ️</span>
                      {selectedRouteInfo.desc}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}