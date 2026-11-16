import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ========================================================
// HAND-DRAWN ICONS FOR THE PROCESS
// ========================================================
const HandDrawnDraft = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 6 C12 4.5, 13.5 4, 15 4 L33 4 L40 11 L40 42 C40 43.5, 38.5 44, 37 44 L15 44 C13.5 44, 12 43.5, 12 42 Z" />
    <path d="M30 4 L30 14 L40 14" />
    <path d="M18 20 L28 20" strokeWidth="2" />
    <path d="M18 28 L34 28" strokeWidth="2" />
    <path d="M18 36 L24 36" strokeWidth="2" />
  </svg>
);

const HandDrawnComplete = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="16" />
    <path d="M16 24 L22 30 L34 18" strokeWidth="3" />
  </svg>
);

const HandDrawnSubmit = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 40 L42 40" strokeWidth="2.5" />
    <path d="M6 40 L6 8" strokeWidth="2.5" />
    <path d="M10 30 L18 20 L26 25 L38 10" strokeWidth="2.8" />
    <path d="M29 10 L39 10 L39 20" strokeWidth="2.8" />
  </svg>
);

// ========================================================
// HAND-DRAWN ICONS FOR THE PANEL MEMBERS
// ========================================================
const HandDrawnGavel = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 6 L24 12" strokeWidth="2" />
    <path d="M14 14 L34 14 C35.5 14, 36 15.5, 36 16 L36 20 L12 20 L12 16 C12 15.5, 12.5 14, 14 14 Z" fill="rgba(0,31,63,0.05)" />
    <path d="M18 20 L18 28 L30 28 L30 20" strokeWidth="2" />
    <path d="M8 42 L40 42" strokeWidth="3" />
    <path d="M16 28 L16 42 M32 28 L32 42" strokeWidth="2" />
  </svg>
);

const HandDrawnLegal = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 8 L24 40" strokeWidth="2.6" />
    <path d="M16 41 L32 41" strokeWidth="3" />
    <circle cx="24" cy="7" r="2.5" fill="#001F3F" />
    <path d="M8 15 C16 13.5, 32 13.5, 40 15" strokeWidth="2.5" />
    <path d="M8 15 L4 25 M8 15 L14 25" strokeWidth="2" />
    <path d="M3 25 C4 30, 14 30, 15 25 Z" fill="rgba(0,31,63,0.06)" strokeWidth="2" />
    <path d="M40 15 L34 25 M40 15 L44 25" strokeWidth="2" />
    <path d="M33 25 C34 30, 44 30, 45 25 Z" fill="rgba(0,31,63,0.06)" strokeWidth="2" />
  </svg>
);

const HandDrawnFinance = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="10" y="14" width="28" height="24" rx="4" />
    <path d="M10 20 L38 20" />
    <path d="M16 32 L20 28 L24 32 L32 24" strokeWidth="2.8" />
    <path d="M26 24 L32 24 L32 30" strokeWidth="2.8" />
    <path d="M16 14 L16 8 L20 8" strokeWidth="2" />
  </svg>
);

const HandDrawnProcurement = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 38 L42 38" strokeWidth="2.5" />
    <path d="M8 38 L8 10" strokeWidth="2.5" />
    <path d="M12 28 L20 18 L28 24 L38 12" strokeWidth="2.8" />
    <path d="M29 12 L39 12 L39 22" strokeWidth="2.8" />
    <circle cx="24" cy="34" r="4" fill="rgba(0,31,63,0.1)" strokeWidth="2" />
  </svg>
);

const HandDrawnAudit = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 7 C10 5.5, 11.5 4, 13 4 L28 4 L38 14 L38 42 C38 43.5, 36.5 45, 35 45 L13 45 C11.5 45, 10 43.5, 10 42 Z" />
    <path d="M28 4 L28 14 L38 14" />
    <circle cx="21" cy="25" r="7.5" strokeWidth="2.5" />
    <path d="M26.5 30.5 L34 38" strokeWidth="3" />
    <path d="M16 13 L22 13" strokeWidth="2" />
    <path d="M16 37 L24 37" strokeWidth="2" />
  </svg>
);

export default function ReviewPanel() {
  const [fileName, setFileName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setTrackingCode(`VFM-RV-2026-${randomNum}`);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const processSteps = [
    {
      title: "Draft Your Grounds",
      desc: "Set out the decision you are complaining about and the grounds for your dissatisfaction. Attach any relevant documents or information you intend to rely on (Section 50(2)).",
      icon: HandDrawnDraft
    },
    {
      title: "Complete Online Form",
      desc: "Fill out the official Review Application Form below. You can upload all your supporting documents directly into the portal.",
      icon: HandDrawnComplete
    },
    {
      title: "Submit Application",
      desc: "Hit submit, and your application will be securely sent to the Secretary of the Review Panel with a tracking code.",
      icon: HandDrawnSubmit
    }
  ];

  const panelMembers = [
    { title: "Chairperson", desc: "A retired Justice of the Superior Court of Judicature or a lawyer with at least 15 years' experience in administrative law and public financial management.", icon: HandDrawnGavel },
    { title: "Legal Expert", desc: "A legal practitioner of not less than 10 years' standing with expertise in administrative law and the Public Financial Management Act, 2016 (Act 921).", icon: HandDrawnLegal },
    { title: "Financial Management Expert", desc: "An expert with demonstrable knowledge in the application of the Public Financial Management Act, 2016 (Act 921) and its Regulations.", icon: HandDrawnFinance },
    { title: "Procurement Expert", desc: "An expert in public procurement or value for money practice with knowledge of the Public Procurement Act, 2003 (Act 663).", icon: HandDrawnProcurement },
    { title: "Governance & Audit Expert", desc: "An expert in governance, audit, risk management, or public sector oversight from a relevant professional body.", icon: HandDrawnAudit }
  ];

  return (
    <div style={{ position: "relative", backgroundColor: "#F8F9FA", minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* FULL-PAGE SUBTLE VFMO LOGO BACKGROUND */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: "url(/vfm-logo.png)", backgroundRepeat: "no-repeat",
          backgroundPosition: "center center", backgroundSize: "min(85vw, 900px)",
          opacity: 0.04, filter: "grayscale(10%)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        
        {/* 1. HERO SECTION */}
        <section style={{ position: "relative", backgroundColor: "#001F3F", padding: "100px 24px", textAlign: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/building-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2, zIndex: 0 }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(0,31,63,0.8) 0%, rgba(0,31,63,1) 100%)", zIndex: 1 }} />
          
          <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: "800", color: "#FFFFFF", margin: "0 0 24px 0", lineHeight: "1.1" }}>
              Value for Money Review Panel
            </h1>
            <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#CBD5E1", lineHeight: "1.6", margin: 0, maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}>
              An independent body established under Section 49 of Act 1172 to hear appeals against decisions made by the VfM Office.
            </p>
          </div>
        </section>

        {/* 2. RIGHT OF APPEAL & 14-DAY WARNING */}
        <section style={{ padding: "60px 24px 20px", maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ backgroundColor: "#FFF7ED", border: "2px solid #F97316", borderRadius: "12px", padding: "32px", display: "flex", gap: "20px", alignItems: "flex-start", boxShadow: "0 10px 20px rgba(249, 115, 22, 0.1)" }}>
            <div style={{ width: "48px", height: "48px", backgroundColor: "#FFEDD5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <div>
              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#9A3412", margin: "0 0 8px 0" }}>Strict 14-Day Deadline</h3>
              <p style={{ fontSize: "16px", color: "#C2410C", margin: 0, lineHeight: "1.6" }}>
                Pursuant to <strong>Section 50(1) of Act 1172</strong>, any person or covered entity aggrieved by a decision of the VfM Office must apply to the Review Panel within <strong>fourteen (14) days</strong> after receiving the notice of the decision. 
              </p>
            </div>
          </div>
        </section>

        {/* 3. HOW TO APPLY (Borderless List with Icons) */}
        <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: "800", color: "#0F172A", margin: "0 0 16px 0" }}>Application Process</h2>
            <p style={{ color: "#475569", fontSize: "18px", margin: 0 }}>Follow these steps to file an application for review.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px 48px", marginBottom: "60px" }}>
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                    <div style={{ flexShrink: 0, width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <IconComponent />
                    </div>
                    <h3 style={{ fontSize: "19px", fontWeight: "900", color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.5px", lineHeight: "1.25", margin: 0 }}>
                      {step.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.65", margin: 0 }}>
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button to Reveal Form */}
          <motion.div 
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center" }}
          >
            <button 
              onClick={() => setIsFormOpen(!isFormOpen)} 
              style={{ 
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "12px",
                backgroundColor: "#001F3F", color: "#FFFFFF", padding: "16px 32px", borderRadius: "8px",
                fontSize: "16px", fontWeight: "800", cursor: "pointer", border: "none",
                boxShadow: "0 4px 15px rgba(0,31,63,0.2)", transition: "background-color 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0A2E4D"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#001F3F"}
            >
              {isFormOpen ? "Hide Application Form" : "Begin Review Application"}
              <motion.div
                animate={{ y: isFormOpen ? -4 : 4, rotate: isFormOpen ? 180 : 0 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8, ease: "easeInOut" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </motion.div>
            </button>
          </motion.div>
        </section>

        {/* 4. THE ONLINE APPLICATION FORM (Animated Reveal) */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.section 
              id="application-form" 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ padding: "0 24px 100px", maxWidth: "800px", margin: "0 auto", overflow: "hidden" }}
            >
              
              <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "40px", boxShadow: "0 20px 40px rgba(0,0,0,0.08)", border: "1px solid #E2E8F0" }}>
                
                {isSubmitted ? (
                  /* SUCCESS STATE */
                  <div style={{ textAlign: "center", padding: "20px 0" }}>
                    <div style={{ width: "80px", height: "80px", backgroundColor: "#F0FDF4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px auto" }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#0F172A", marginBottom: "16px" }}>Application Received</h2>
                    
                    <div style={{ backgroundColor: "#F8FAFC", border: "1px dashed #CBD5E1", padding: "24px", borderRadius: "8px", marginBottom: "24px" }}>
                      <p style={{ fontSize: "14px", color: "#64748B", margin: "0 0 8px 0", fontWeight: "600" }}>YOUR REVIEW TRACKING CODE</p>
                      <p style={{ fontSize: "28px", fontWeight: "800", color: "#001F3F", margin: 0, letterSpacing: "2px" }}>{trackingCode}</p>
                    </div>

                    <p style={{ fontSize: "16px", color: "#475569", marginBottom: "24px", lineHeight: "1.6" }}>
                      Your application has been submitted to the Value for Money Review Panel. Please save this code to track the outcome of your review.
                    </p>
                    
                    <button 
                      onClick={() => { setIsSubmitted(false); setIsFormOpen(false); }}
                      style={{ display: "inline-flex", padding: "14px 32px", backgroundColor: "#001F3F", color: "#FFFFFF", borderRadius: "8px", fontSize: "16px", fontWeight: "700", textDecoration: "none", border: "none", cursor: "pointer" }}
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  /* FORM STATE */
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                    
                    <div style={{ textAlign: "center", borderBottom: "2px solid #E2E8F0", paddingBottom: "24px" }}>
                      <h2 style={{ fontSize: "24px", fontWeight: "900", color: "#001F3F", margin: "0 0 8px 0" }}>Official Application Form</h2>
                      <p style={{ fontSize: "14px", color: "#475569", margin: 0 }}>Pursuant to Section 50 of Act 1172</p>
                    </div>

                    {/* Instructions Box */}
                    <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", padding: "20px", borderRadius: "8px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#001F3F" strokeWidth="2" style={{ flexShrink: 0, marginTop: "2px" }}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                      <div>
                        <h4 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: "800", color: "#001F3F" }}>Statutory Timeline Notice</h4>
                        <p style={{ margin: 0, fontSize: "13px", color: "#475569", lineHeight: "1.5" }}>
                          You must submit this form to the Review Panel within <strong>fourteen (14) days</strong> of receiving the decision of the Office.
                        </p>
                      </div>
                    </div>

                    {/* Section 1: Applicant Details */}
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#001F3F", borderBottom: "1px solid #E2E8F0", paddingBottom: "8px", marginBottom: "20px" }}>
                        1. APPLICANT DETAILS
                      </h3>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Full Name</label>
                          <input type="text" required style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "15px", outline: "none", boxSizing: "border-box" }} />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Entity / Organization</label>
                          <input type="text" required style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "15px", outline: "none", boxSizing: "border-box" }} />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Email Address</label>
                          <input type="email" required style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "15px", outline: "none", boxSizing: "border-box" }} />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Phone Number</label>
                          <input type="tel" required style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "15px", outline: "none", boxSizing: "border-box" }} />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Decision Details */}
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#001F3F", borderBottom: "1px solid #E2E8F0", paddingBottom: "8px", marginBottom: "20px" }}>
                        2. DECISION COMPLAINED OF
                      </h3>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "20px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Date of Decision</label>
                          <input type="date" required style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "15px", outline: "none", boxSizing: "border-box" }} />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Tracking / Reference Code</label>
                          <input type="text" required placeholder="e.g., VFM-WB-2026-4821" style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "15px", outline: "none", boxSizing: "border-box" }} />
                        </div>
                      </div>
                      
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "12px" }}>Nature of Decision</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                        {["Debarment", "Dismissal of Complaint", "Denial of Certificate", "Other"].map((option) => (
                          <label key={option} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#0F172A", cursor: "pointer" }}>
                            <input type="checkbox" style={{ width: "16px", height: "16px" }} /> {option}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Section 3: Grounds for Review */}
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#001F3F", borderBottom: "1px solid #E2E8F0", paddingBottom: "8px", marginBottom: "20px" }}>
                        3. GROUNDS FOR REVIEW
                      </h3>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Please state clearly why you disagree with the decision of the Office:</label>
                      <textarea required rows="6" placeholder="Provide detailed reasons and facts..." style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "15px", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                    </div>

                    {/* Section 4: Upload Supporting Documents */}
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#001F3F", borderBottom: "1px solid #E2E8F0", paddingBottom: "8px", marginBottom: "20px" }}>
                        4. UPLOAD SUPPORTING DOCUMENTS
                      </h3>
                      <p style={{ fontSize: "13px", color: "#475569", marginBottom: "12px" }}>Upload the VFMO Decision Notice, relevant contracts, or any other evidence.</p>
                      
                      <div style={{ border: "2px dashed #CBD5E1", borderRadius: "8px", padding: "32px", textAlign: "center", backgroundColor: "#F8FAFC", position: "relative", cursor: "pointer", width: "100%", boxSizing: "border-box" }}>
                        <input type="file" onChange={handleFileChange} multiple style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }} />
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "12px" }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        <p style={{ fontSize: "15px", fontWeight: "600", color: "#0F172A", margin: "0 0 4px 0" }}>
                          {fileName ? fileName : "Click to upload or drag and drop"}
                        </p>
                        <p style={{ fontSize: "12px", color: "#64748B", margin: 0 }}>PDF, DOCX, JPG (Max 25MB)</p>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      style={{ 
                        backgroundColor: "#001F3F", color: "#FFFFFF", border: "none", 
                        padding: "18px", borderRadius: "8px", fontSize: "16px", fontWeight: "800", 
                        cursor: "pointer", transition: "background-color 0.2s ease", marginTop: "12px",
                        display: "flex", justifyContent: "center", alignItems: "center", gap: "8px"
                      }}
                    >
                      Submit Application to Review Panel
                    </button>
                  </form>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* 5. PANEL COMPOSITION (Borderless List with Icons) */}
        <section style={{ padding: "80px 24px", backgroundColor: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 32px)", fontWeight: "800", color: "#0F172A", margin: "0 0 16px 0" }}>Composition of the Review Panel</h2>
              <p style={{ color: "#475569", fontSize: "16px", margin: 0, maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}>
                In accordance with Section 49(2) of Act 1172, the Review Panel consists of highly qualified professionals:
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px 48px" }}>
              {panelMembers.map((member, index) => {
                const IconComponent = member.icon;
                return (
                  <motion.div
                    key={index}
                    initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                      <div style={{ flexShrink: 0, width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <IconComponent />
                      </div>
                      <h3 style={{ fontSize: "19px", fontWeight: "900", color: "#001F3F", textTransform: "uppercase", letterSpacing: "0.5px", lineHeight: "1.25", margin: 0 }}>
                        {member.title}
                      </h3>
                    </div>
                    <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.65", margin: 0 }}>
                      {member.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 6. HEARING PROCESS */}
        <section style={{ padding: "80px 24px", maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ backgroundColor: "#001F3F", borderRadius: "16px", padding: "48px", color: "#FFFFFF", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
            <h2 style={{ fontSize: "28px", fontWeight: "800", margin: "0 0 24px 0" }}>What Happens After You Apply?</h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#FCD116", margin: "0 0 8px 0" }}>1. Hearing</h3>
                <p style={{ fontSize: "16px", color: "#CBD5E1", lineHeight: "1.6", margin: 0 }}>
                  Within 30 days of receiving a complete application, the Review Panel will give the VfM Office and any interested party a reasonable opportunity to be heard (Section 51(1)).
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#FCD116", margin: "0 0 8px 0" }}>2. Determination</h3>
                <p style={{ fontSize: "16px", color: "#CBD5E1", lineHeight: "1.6", margin: 0 }}>
                  The Panel will then confirm, vary, set aside the decision of the Office, or remit the matter to the Office with directions.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#FCD116", margin: "0 0 8px 0" }}>3. Effect of Application</h3>
                <p style={{ fontSize: "16px", color: "#CBD5E1", lineHeight: "1.6", margin: 0 }}>
                  Filing an application does not automatically suspend the decision of the Office. However, the Panel may order a stay of execution if it considers it just and equitable to do so (Section 52).
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}