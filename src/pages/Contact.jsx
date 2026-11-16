import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "General Inquiry",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you. Your message has been routed to the appropriate department.");
    setFormData({ name: "", email: "", department: "General Inquiry", message: "" });
  };

  return (
    <div style={{ backgroundColor: "#F4F5F0", minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* GLOBAL CSS FIX FOR THE BUTTON */}
      <style>
        {`
          .submit-btn-fix {
            width: 100% !important;
            min-width: 100% !important;
            display: block !important;
            padding: 16px 20px !important;
            white-space: nowrap !important;
            box-sizing: border-box !important;
            background-color: #001F3F !important;
            color: #FFFFFF !important;
            border: none !important;
            border-radius: 8px !important;
            font-size: 16px !important;
            font-weight: 700 !important;
            cursor: pointer !important;
            margin-top: 8px !important;
          }
          .submit-btn-fix:hover {
            background-color: #0A2E4D !important;
          }
        `}
      </style>

      {/* HEADER SECTION WITH BACKGROUND IMAGE */}
      <section style={{ 
        position: "relative", 
        padding: "100px 24px 80px", 
        backgroundColor: "#001F3F", 
        overflow: "hidden",
        textAlign: "center"
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "url(/contact-bg.jpg)", 
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.2, zIndex: 0
        }} />
        
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(180deg, rgba(0,31,63,0.6) 0%, rgba(0,31,63,1) 100%)",
          zIndex: 1
        }} />

        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "52px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 16px 0", lineHeight: "1.1" }}>
            Contact the VFM Office
          </h1>
          <p style={{ fontSize: "18px", color: "#CBD5E1", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            Whether you are a government agency, a supplier, or a concerned citizen, our team is ready to assist you.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", alignItems: "start", width: "100%" }}>
          
          {/* LEFT: CONTACT FORM */}
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "40px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0", width: "100%", boxSizing: "border-box" }}>
            <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#001F3F", margin: "0 0 32px 0" }}>Send a Message</h2>
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
              
              <div style={{ width: "100%" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Full Name</label>
                <input 
                  type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe"
                  style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "16px", outline: "none", transition: "border 0.2s", boxSizing: "border-box" }}
                  onFocus={(e) => e.target.style.border = "1px solid #001F3F"}
                  onBlur={(e) => e.target.style.border = "1px solid #CBD5E1"}
                />
              </div>

              <div style={{ width: "100%" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Email Address</label>
                <input 
                  type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com"
                  style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "16px", outline: "none", transition: "border 0.2s", boxSizing: "border-box" }}
                  onFocus={(e) => e.target.style.border = "1px solid #001F3F"}
                  onBlur={(e) => e.target.style.border = "1px solid #CBD5E1"}
                />
              </div>

              <div style={{ width: "100%" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Department</label>
                <select 
                  name="department" value={formData.department} onChange={handleChange}
                  style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "16px", outline: "none", backgroundColor: "#FFFFFF", cursor: "pointer", boxSizing: "border-box" }}
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="VfM Assessments">VfM Assessments</option>
                  <option value="Compliance & Monitoring">Compliance & Monitoring</option>
                  <option value="Media & Press">Media & Press</option>
                  <option value="Portal Support">Portal Support</option>
                </select>
              </div>

              <div style={{ width: "100%" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Message</label>
                <textarea 
                  name="message" value={formData.message} onChange={handleChange} required rows="5" placeholder="How can we help you?"
                  style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "16px", outline: "none", resize: "vertical", transition: "border 0.2s", boxSizing: "border-box" }}
                  onFocus={(e) => e.target.style.border = "1px solid #001F3F"}
                  onBlur={(e) => e.target.style.border = "1px solid #CBD5E1"}
                />
              </div>

              {/* APPLIED THE CSS CLASS HERE */}
              <button type="submit" className="submit-btn-fix">
                Submit Message
              </button>
            </form>
          </div>

          {/* RIGHT: CONTACT INFO & LOCATION */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px", width: "100%" }}>
            
            <div style={{ backgroundColor: "#001F3F", borderRadius: "16px", padding: "40px", color: "#FFFFFF", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", boxSizing: "border-box" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "800", margin: "0 0 24px 0" }}>Head Office</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ width: "40px", height: "40px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FCD116" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: "700", marginBottom: "4px" }}>Location</div>
                    <div style={{ color: "#CBD5E1", lineHeight: "1.5" }}>Ministry of Finance, Accra, Ghana</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ width: "40px", height: "40px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FCD116" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: "700", marginBottom: "4px" }}>Email</div>
                    <div style={{ color: "#CBD5E1", lineHeight: "1.5", wordBreak: "break-all" }}>info@vfm.gov.gh<br/>support@vfm.gov.gh</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ width: "40px", height: "40px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FCD116" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: "700", marginBottom: "4px" }}>Phone</div>
                    <div style={{ color: "#CBD5E1", lineHeight: "1.5" }}>+233 30 XXX XXXX<br/>Mon - Fri, 8:00 AM - 5:00 PM</div>
                  </div>
                </div>

              </div>
            </div>

            <div style={{ borderRadius: "16px", overflow: "hidden", height: "300px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", width: "100%" }}>
              <img 
                src="/building-bg.jpg" 
                alt="VfM Office Location" 
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
              />
            </div>

          </div>
        </div>

      </section>
    </div>
  );
}