import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

// ========================================================
// HAND-DRAWN ICONS
// ========================================================
const HandDrawnAlert = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 6 L42 39 C43 41, 41.5 42.5, 39.5 42.5 L8.5 42.5 C6.5 42.5, 5 41, 6 39 L24 6 Z" />
    <path d="M24 18 L24 28" strokeWidth="3" />
    <circle cx="24" cy="35" r="1.5" fill="#001F3F" />
    <path d="M11 19 L7 16" strokeWidth="1.8" />
    <path d="M37 19 L41 16" strokeWidth="1.8" />
  </svg>
);

const HandDrawnReview = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="22" cy="22" r="14" strokeWidth="2.5" />
    <path d="M33 33 L42 42" strokeWidth="3" />
    <path d="M15 22 L19 26 L29 16" strokeWidth="2.5" />
  </svg>
);

const HandDrawnTraining = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="10" y="14" width="28" height="24" rx="4" />
    <path d="M10 20 L38 20" />
    <path d="M16 14 L16 8 L20 8" strokeWidth="2" />
    <circle cx="24" cy="28" r="4" strokeWidth="2" />
    <path d="M18 36 L30 36" strokeWidth="2" />
  </svg>
);

const HandDrawnPetition = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 7 C10 5.5, 11.5 4, 13 4 L28 4 L38 14 L38 42 C38 43.5, 36.5 45, 35 45 L13 45 C11.5 45, 10 43.5, 10 42 Z" />
    <path d="M28 4 L28 14 L38 14" />
    <path d="M16 20 L28 20" strokeWidth="2" />
    <path d="M16 26 L32 26" strokeWidth="2" />
    <path d="M16 32 L24 32" strokeWidth="2" />
  </svg>
);

const HandDrawnDownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const HandDrawnArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// ========================================================
// MAIN PAGE
// ========================================================
export default function Forms() {
  const prefersReduced = useReducedMotion();

  // This opens a new window with the HTML form and triggers the print dialog.
  // The user can then "Save as PDF" and it will perfectly match the design.
  const handleDownloadReviewForm = () => {
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>VFMO Application for Review</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
            body {
              font-family: 'Inter', Arial, sans-serif;
              color: #0F172A;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
              background: #fff;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #001F3F;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 { margin: 0 0 4px 0; color: #001F3F; font-size: 24px; }
            .header h2 { margin: 0; color: #475569; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
            .title { text-align: center; margin-bottom: 20px; }
            .title h3 { margin: 0 0 4px 0; font-size: 18px; font-weight: 800; }
            .title p { margin: 0; font-size: 12px; color: #64748B; }
            .instruction { background: #F8FAFC; border: 1px solid #E2E8F0; padding: 15px; border-radius: 6px; font-size: 12px; margin-bottom: 30px; }
            .section { margin-bottom: 24px; }
            .section-title { font-size: 14px; font-weight: 800; border-bottom: 1px solid #CBD5E1; padding-bottom: 6px; margin-bottom: 16px; color: #001F3F; }
            .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
            .form-group { display: flex; flex-direction: column; }
            .form-group label { font-size: 11px; font-weight: 600; margin-bottom: 6px; color: #475569; }
            .form-group input[type="text"], .form-group input[type="date"], .form-group textarea {
              width: 100%; padding: 8px; border: 1px solid #CBD5E1; border-radius: 4px; font-family: 'Inter', sans-serif; font-size: 13px;
            }
            .form-group textarea { resize: vertical; min-height: 120px; }
            .checkbox-group { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 8px; }
            .checkbox-label { display: flex; align-items: center; gap: 8px; font-size: 13px; }
            .footer { margin-top: 40px; text-align: center; font-size: 10px; color: #94A3B8; border-top: 1px solid #E2E8F0; padding-top: 20px; }
            @media print {
              body { padding: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="no-print" style="background: #FCD116; padding: 12px; border-radius: 6px; text-align: center; margin-bottom: 20px; font-size: 14px; font-weight: 600;">
            Tip: Fill out the form below, then press <strong>Ctrl+P</strong> (or Cmd+P on Mac) and select <strong>"Save as PDF"</strong> to download your completed form.
          </div>
          
          <div class="header">
            <h1>VALUE FOR MONEY OFFICE</h1>
            <h2>Republic of Ghana - Official Statutory Form</h2>
          </div>

          <div class="title">
            <h3>APPLICATION FOR REVIEW OF A DECISION</h3>
            <p>Pursuant to Section 50 of the Value for Money Office Act, 2026 - Act 1172</p>
          </div>

          <div class="instruction">
            <strong>INSTRUCTIONS:</strong> You must submit this form to the Review Panel within fourteen (14) days of receiving the decision of the Office.
          </div>

          <div class="section">
            <div class="section-title">1. APPLICANT DETAILS</div>
            <div class="form-grid">
              <div class="form-group"><label>Full Name</label><input type="text" /></div>
              <div class="form-group"><label>Entity / Organization</label><input type="text" /></div>
              <div class="form-group"><label>Email Address</label><input type="text" /></div>
              <div class="form-group"><label>Phone Number</label><input type="text" /></div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">2. DECISION COMPLAINED OF</div>
            <div class="form-grid">
              <div class="form-group"><label>Date of Decision</label><input type="date" /></div>
              <div class="form-group"><label>Tracking / Reference Code</label><input type="text" /></div>
            </div>
            <div class="form-group" style="margin-top: 16px;">
              <label>Nature of Decision</label>
              <div class="checkbox-group">
                <label class="checkbox-label"><input type="checkbox" /> Debarment</label>
                <label class="checkbox-label"><input type="checkbox" /> Dismissal of Complaint</label>
                <label class="checkbox-label"><input type="checkbox" /> Denial of Certificate</label>
                <label class="checkbox-label"><input type="checkbox" /> Other</label>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">3. GROUNDS FOR REVIEW</div>
            <div class="form-group">
              <label>Please state clearly why you disagree with the decision of the Office:</label>
              <textarea></textarea>
            </div>
          </div>

          <div class="section">
            <div class="section-title">4. SUPPORTING DOCUMENTS ATTACHED</div>
            <div class="form-group">
              <label>Please tick the documents you are submitting alongside this form:</label>
              <div class="checkbox-group" style="flex-direction: column; align-items: flex-start; margin-top: 12px;">
                <label class="checkbox-label"><input type="checkbox" /> Copy of the VFMO Decision Notice</label>
                <label class="checkbox-label"><input type="checkbox" /> Relevant Contracts / Evidence of Procurement</label>
                <label class="checkbox-label"><input type="checkbox" /> Any other supporting documentation (Attach separately)</label>
              </div>
            </div>
          </div>

          <div class="footer">
            This form is generated automatically by the VFMO Digital Portal. Submit via email to review@vfmo.gov.gh or in person at the Ministry of Finance, Kanda-Accra.
          </div>
          
          <script>
            // Small delay to ensure fonts load before triggering print
            setTimeout(() => { window.print(); }, 500);
          </script>
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  const formsData = [
    {
      title: "Report a Concern (Whistleblower)",
      desc: "Submit a confidential, legally protected report regarding contract inflation or misuse of public funds.",
      icon: HandDrawnAlert,
      link: "/submit",
      btnText: "Fill Online Form",
      isExternal: false
    },
    {
      title: "Application for Review",
      desc: "If you are aggrieved by a VFMO decision (e.g., debarment or dismissal of a complaint), you have 14 days to apply to the Review Panel (Section 50).",
      icon: HandDrawnReview,
      action: handleDownloadReviewForm,
      btnText: "Open & Download Form",
      isExternal: true
    },
    {
      title: "Request Technical Assistance",
      desc: "Government agencies and MDAs can formally request statutory training and technical advice on VfM assessments (Section 42).",
      icon: HandDrawnTraining,
      link: "/contact",
      btnText: "Contact the Office",
      isExternal: false
    },
    {
      title: "Public Stakeholder Feedback",
      desc: "Submit your views or feedback on a high-value public project currently under assessment by the VFMO (Section 43).",
      icon: HandDrawnPetition,
      link: "/engagement",
      btnText: "Provide Feedback",
      isExternal: false
    }
  ];

  return (
    <div style={{ position: "relative", backgroundColor: "#F8F9FA", minHeight: "100vh", overflowX: "hidden" }}>
      
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: "url(/vfm-logo.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "min(85vw, 900px)",
          opacity: 0.04,
          filter: "grayscale(10%)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        
        <section style={{ backgroundColor: "#001F3F", padding: "100px 24px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/vfm-logo.png)", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", opacity: 0.08 }} />
          
          <motion.div 
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}
          >
            <h1 style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: "900", color: "#FFFFFF", margin: "0 0 16px 0", lineHeight: "1.1" }}>
              Public Forms & Applications
            </h1>
            <p style={{ fontSize: "18px", color: "#CBD5E1", margin: 0, lineHeight: "1.6" }}>
              Access official statutory forms, submit complaints, or apply for a review of a VFMO decision.
            </p>
          </motion.div>
        </section>

        <section style={{ padding: "100px 24px 120px", maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px 48px" }}>
            
            {formsData.map((form, index) => {
              const IconComponent = form.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                    <motion.div 
                      whileHover={prefersReduced ? {} : { scale: 1.1, rotate: 5 }}
                      style={{ flexShrink: 0, width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <IconComponent />
                    </motion.div>
                    <h3 style={{ fontSize: "19px", fontWeight: "900", color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.5px", lineHeight: "1.25", margin: 0 }}>
                      {form.title}
                    </h3>
                  </div>

                  <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.65", margin: "0 0 24px 0", flex: 1 }}>
                    {form.desc}
                  </p>

                  {form.isExternal ? (
                    <button
                      onClick={form.action}
                      style={{
                        background: "none", border: "none", padding: 0, cursor: "pointer",
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        color: "#001F3F", textDecoration: "none", fontSize: "15px", fontWeight: "700",
                        borderBottom: "1px solid transparent", paddingBottom: "2px",
                        alignSelf: "flex-start", transition: "border-color 0.2s ease"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = "#001F3F"}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = "transparent"}
                    >
                      <HandDrawnDownloadIcon />
                      {form.btnText}
                    </button>
                  ) : (
                    <Link
                      to={form.link}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        color: "#001F3F", textDecoration: "none", fontSize: "15px", fontWeight: "700",
                        borderBottom: "1px solid transparent", paddingBottom: "2px",
                        alignSelf: "flex-start", transition: "border-color 0.2s ease"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = "#001F3F"}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = "transparent"}
                    >
                      {form.btnText}
                      <HandDrawnArrow />
                    </Link>
                  )}
                  
                </motion.div>
              );
            })}

          </div>
        </section>
      </div>
    </div>
  );
}