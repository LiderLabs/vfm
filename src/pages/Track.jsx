import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// Extracted component for the timeline logic
const TimelineStage = ({ stage, index, totalStages, caseData, timelineProgress, prefersReduced }) => {
  const isCompleted = stage.id < caseData.stage || (caseData.stage === 5 && stage.id === 5);
  const isActive = stage.id === caseData.stage && caseData.stage !== 5;
  const isPending = stage.id > caseData.stage;

  const stageX = useTransform(
    timelineProgress, 
    [0, 0.1 + index * 0.1, 0.2 + index * 0.1], 
    prefersReduced ? [0, 0, 0] : [-30, 0, 0]
  );
  const stageOpacity = useTransform(
    timelineProgress, 
    [0, 0.1 + index * 0.1, 0.2 + index * 0.1], 
    prefersReduced ? [1, 1, 1] : [0, 1, 1]
  );

  return (
    <motion.div style={{ display: "flex", gap: "20px", x: stageX, opacity: stageOpacity }}>
      {/* Timeline Line & Icon */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ 
          width: "32px", height: "32px", borderRadius: "50%", 
          backgroundColor: isCompleted ? "#10B981" : isActive ? "#FCD116" : "#F1F5F9",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, flexShrink: 0
        }}>
          {isCompleted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
          ) : isActive ? (
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#001F3F" }}></div>
          ) : (
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#CBD5E1" }}></div>
          )}
        </div>
        {index !== totalStages - 1 && (
          <div style={{ width: "2px", flex: 1, backgroundColor: isCompleted ? "#10B981" : "#E2E8F0", minHeight: "60px" }} />
        )}
      </div>

      {/* Timeline Content */}
      <div style={{ paddingBottom: "40px", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "800", color: isPending ? "#94A3B8" : "#0F172A", margin: "0 0 4px 0" }}>{stage.title}</h3>
          <span style={{ fontSize: "13px", fontWeight: "600", color: isActive ? "#B8860B" : isCompleted ? "#10B981" : "#64748B" }}>{stage.date}</span>
        </div>
        <p style={{ fontSize: "15px", color: isPending ? "#CBD5E1" : "#475569", margin: 0, lineHeight: "1.5" }}>{stage.desc}</p>
      </div>
    </motion.div>
  );
};

export default function Track() {
  const [searchParams] = useSearchParams();
  const urlCode = searchParams.get("code") || "";
  
  const [trackingCode, setTrackingCode] = useState(urlCode);
  const [status, setStatus] = useState(null); 
  const [caseData, setCaseData] = useState(null);
  const prefersReduced = useReducedMotion();

  const handleTrack = (e) => {
    if (e) e.preventDefault();
    setStatus("loading");

    setTimeout(() => {
      if (trackingCode.trim().toUpperCase().startsWith("VFM-WB-")) {
        setCaseData({
          code: trackingCode.toUpperCase(),
          dateSubmitted: "October 20, 2026",
          stage: 3, 
          outcome: null, 
        });
        setStatus("success");
      } else {
        setStatus("error");
      }
    }, 1000);
  };

  useEffect(() => {
    if (urlCode) {
      setTrackingCode(urlCode);
      if (urlCode.trim().toUpperCase().startsWith("VFM-WB-")) {
        setCaseData({
          code: urlCode.toUpperCase(),
          dateSubmitted: "October 20, 2026",
          stage: 3,
          outcome: null,
        });
        setStatus("success");
      }
    }
  }, [urlCode]);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);
  const formY = useTransform(scrollYProgress, [0, 0.3], [0, -30]);
  const formScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const stages = [
    { id: 1, title: "Report Received", desc: "Your report has been securely logged in our system.", date: "Oct 20, 2026" },
    { id: 2, title: "Acknowledged", desc: "The VfM Office has formally acknowledged your complaint. (Within 7 days)", date: "Oct 25, 2026" },
    { id: 3, title: "Preliminary Assessment", desc: "We are currently reviewing the details to determine if an investigation is warranted. (Within 14 days)", date: "In Progress" },
    { id: 4, title: "Investigation / Referral", desc: "If valid, the case will be investigated or referred to the Auditor-General.", date: "Pending" },
    { id: 5, title: "Case Closed", desc: "The outcome of the assessment has been finalized.", date: "Pending" },
  ];

  const simulateStage2 = () => setCaseData(prev => ({ ...prev, stage: 2, outcome: null }));
  const simulateStage4 = () => setCaseData(prev => ({ ...prev, stage: 4, outcome: null }));
  const simulateFindings = () => setCaseData(prev => ({ ...prev, stage: 5, outcome: "findings" }));
  const simulateDismissed = () => setCaseData(prev => ({ ...prev, stage: 5, outcome: "dismissed" }));
  const resetSimulation = () => setCaseData(prev => ({ ...prev, stage: 3, outcome: null }));

  // --- GENERATE FINDINGS PDF ---
  const generateFindingsPDF = () => {
    const pdfContent = `
      %PDF-1.4
      1 0 obj
      << /Type /Catalog /Pages 2 0 R >>
      endobj
      2 0 obj
      << /Type /Pages /Kids [3 0 R] /Count 1 >>
      endobj
      3 0 obj
      << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
      endobj
      4 0 obj
      << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
      endobj
      5 0 obj
      << /Length 450 >>
      stream
      BT
      /F1 24 Tf
      50 700 Td
      (VALUE FOR MONEY OFFICE) Tj
      0 -30 Td
      (FINAL ASSESSMENT FINDINGS) Tj
      /F1 12 Tf
      0 -40 Td
      (Tracking Code: ${caseData.code}) Tj
      0 -20 Td
      (Date Closed: October 26, 2026) Tj
      0 -40 Td
      (Findings Summary:) Tj
      0 -20 Td
      (Pursuant to Section 38 of Act 1172, the VFMO has completed its) Tj
      0 -20 Td
      (investigation into this report. The contractor was found to have) Tj
      0 -20 Td
      (engaged in unjustified cost inflation.) Tj
      0 -30 Td
      (Statutory Action Taken:) Tj
      0 -20 Td
      (- The contractor has been debarred for 3 years under Section 38(2)(a).) Tj
      0 -20 Td
      (- Civil recovery proceedings initiated for GH 4.2M.) Tj
      0 -20 Td
      (- Referred to the Auditor-General for further audit.) Tj
      0 -40 Td
      (This document is automatically generated and is legally binding.) Tj
      ET
      endstream
      endobj
      xref
      0 6
      0000000000 65535 f 
      0000000010 00000 n 
      0000000079 00000 n 
      0000000173 00000 n 
      0000000301 00000 n 
      0000000380 00000 n 
      trailer
      << /Size 6 /Root 1 0 R >>
      startxref
      840
      %%EOF
    `;
    return `data:application/pdf;charset=utf-8,${encodeURIComponent(pdfContent)}`;
  };

  // --- GENERATE DISMISSAL PDF ---
  const generateDismissalPDF = () => {
    const pdfContent = `
      %PDF-1.4
      1 0 obj
      << /Type /Catalog /Pages 2 0 R >>
      endobj
      2 0 obj
      << /Type /Pages /Kids [3 0 R] /Count 1 >>
      endobj
      3 0 obj
      << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
      endobj
      4 0 obj
      << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
      endobj
      5 0 obj
      << /Length 400 >>
      stream
      BT
      /F1 24 Tf
      50 700 Td
      (VALUE FOR MONEY OFFICE) Tj
      0 -30 Td
      (NOTICE OF DISMISSAL) Tj
      /F1 12 Tf
      0 -40 Td
      (Tracking Code: ${caseData.code}) Tj
      0 -20 Td
      (Date Closed: October 26, 2026) Tj
      0 -40 Td
      (Reasons for Dismissal:) Tj
      0 -20 Td
      (Pursuant to Section 46(2) of the Value for Money Office Act,) Tj
      0 -20 Td
      (the Office has determined that your complaint is inadmissible) Tj
      0 -20 Td
      (or outside the mandate of the Office.) Tj
      0 -30 Td
      (Specifically, the preliminary assessment revealed that:) Tj
      0 -20 Td
      (1. The complaint did not provide sufficient evidence of a) Tj
      0 -20 Td
      (breach of Value for Money standards.) Tj
      0 -20 Td
      (2. The alleged incident occurred outside the statutory) Tj
      0 -20 Td
      (mandate of the Office.) Tj
      0 -40 Td
      (You may apply for a review of this decision under Section 50,) Tj
      0 -20 Td
      (within fourteen days of receipt of this notice.) Tj
      ET
      endstream
      endobj
      xref
      0 6
      0000000000 65535 f 
      0000000010 00000 n 
      0000000079 00000 n 
      0000000173 00000 n 
      0000000301 00000 n 
      0000000380 00000 n 
      trailer
      << /Size 6 /Root 1 0 R >>
      startxref
      840
      %%EOF
    `;
    return `data:application/pdf;charset=utf-8,${encodeURIComponent(pdfContent)}`;
  };

  return (
    <div style={{ position: "relative", backgroundColor: "#F4F5F0", minHeight: "100vh", padding: "80px 24px", overflowX: "hidden" }}>
      
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: "url(/vfm-logo.png)", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "min(85vw, 900px)", opacity: 0.05, filter: "grayscale(10%)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "700px", margin: "0 auto" }}>
        
        <motion.div style={{ textAlign: "center", marginBottom: "40px", y: prefersReduced ? 0 : headerY, opacity: prefersReduced ? 1 : headerOpacity }}>
          <div style={{ width: "64px", height: "64px", backgroundColor: "rgba(0,31,63,0.05)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px auto" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#001F3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 42px)", fontWeight: "800", color: "#0F172A", margin: "0 0 16px 0", lineHeight: "1.1" }}>
            Track Your Report
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "#475569", margin: 0, lineHeight: "1.6" }}>
            Enter the tracking code provided when you submitted your complaint to see its current status.
          </p>
        </motion.div>

        <motion.div style={{ y: prefersReduced ? 0 : formY, scale: prefersReduced ? 1 : formScale }}>
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
                  style={{ width: "100%", padding: "16px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "16px", fontWeight: "600", outline: "none", textTransform: "uppercase", boxSizing: "border-box" }}
                />
              </div>
            </form>

            <div style={{ display: "block", width: "100%", marginTop: "16px" }}>
              <button 
                type="button"
                onClick={handleTrack}
                style={{ 
                  backgroundColor: "#001F3F", color: "#FFFFFF", border: "none", 
                  padding: "16px", borderRadius: "8px", fontSize: "16px", fontWeight: "700", 
                  cursor: "pointer", transition: "background-color 0.2s ease",
                  display: "block", width: "100%", minWidth: "100%",
                  whiteSpace: "nowrap", boxSizing: "border-box", flexShrink: 0
                }}
              >
                {status === "loading" ? "Searching..." : "Check Status"}
              </button>
            </div>

            {status === "error" && (
              <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: "auto", marginTop: 24 }} style={{ padding: "16px", backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "8px", display: "flex", gap: "12px", alignItems: "flex-start", overflow: "hidden" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                <div>
                  <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#991B1B", margin: "0 0 4px 0" }}>Invalid Tracking Code</h4>
                  <p style={{ fontSize: "13px", color: "#B91C1C", margin: 0 }}>We could not find a report with this code. Please check the code and try again.</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {status === "success" && caseData && (
          <div ref={containerRef} style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "32px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0" }}>
            <div style={{ borderBottom: "1px solid #E2E8F0", paddingBottom: "24px", marginBottom: "32px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#001F3F", margin: "0 0 8px 0" }}>Report Status</h2>
              <p style={{ fontSize: "15px", color: "#64748B", margin: 0 }}>Tracking Code: <strong style={{ color: "#0F172A" }}>{caseData.code}</strong></p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {stages.map((stage, index) => (
                <TimelineStage key={stage.id} stage={stage} index={index} totalStages={stages.length} caseData={caseData} timelineProgress={timelineProgress} prefersReduced={prefersReduced} />
              ))}
            </div>

            {/* FINAL OUTCOME DISPLAY: FINDINGS */}
            {caseData.outcome === "findings" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "12px", padding: "24px", marginTop: "10px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#166534", marginBottom: "8px" }}>Investigation Concluded: Findings Published</h3>
                <p style={{ fontSize: "15px", color: "#14532D", lineHeight: "1.6", marginBottom: "16px" }}>
                  The VFMO has completed its assessment. The contractor was found to have engaged in unjustified cost inflation. A Sanction has been issued, and the matter has been referred to the Auditor-General for civil recovery.
                </p>
                <a href={generateFindingsPDF()} download={`VFMO_Findings_${caseData.code}.pdf`} style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#166534", color: "#FFFFFF", textDecoration: "none", padding: "12px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Download Assessment Report (PDF)
                </a>
              </motion.div>
            )}

            {/* FINAL OUTCOME DISPLAY: DISMISSED */}
            {caseData.outcome === "dismissed" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "12px", padding: "24px", marginTop: "10px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#991B1B", marginBottom: "8px" }}>Investigation Concluded: Dismissed</h3>
                <p style={{ fontSize: "15px", color: "#7F1D1D", lineHeight: "1.6", marginBottom: "16px" }}>
                  Pursuant to Section 46(2) of Act 1172, the VFMO has determined that this complaint is unsubstantiated, inadmissible, or does not fall within the mandate of the Office. No further action will be taken.
                </p>
                {/* Dismissal PDF Download */}
                <a href={generateDismissalPDF()} download={`VFMO_Dismissal_${caseData.code}.pdf`} style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#991B1B", color: "#FFFFFF", textDecoration: "none", padding: "12px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Download Dismissal Notice (PDF)
                </a>
              </motion.div>
            )}

            {/* SIMULATION CONTROLS FOR THE PANEL */}
            <div style={{ marginTop: "30px", paddingTop: "20px", borderTop: "1px dashed #CBD5E1" }}>
              <p style={{ fontSize: "12px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", marginBottom: "12px", textAlign: "center" }}>Presentation Demo Controls</p>
              
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
                
                {caseData.stage !== 2 && !caseData.outcome && (
                  <button onClick={simulateStage2} style={{ padding: "8px 12px", backgroundColor: "#F8FAFC", color: "#475569", border: "1px solid #CBD5E1", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
                    Simulate: Stage 2 (Acknowledged)
                  </button>
                )}
                {caseData.stage !== 4 && !caseData.outcome && (
                  <button onClick={simulateStage4} style={{ padding: "8px 12px", backgroundColor: "#F8FAFC", color: "#475569", border: "1px solid #CBD5E1", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
                    Simulate: Stage 4 (Investigating)
                  </button>
                )}

                {!caseData.outcome && (
                  <>
                    <button onClick={simulateFindings} style={{ padding: "8px 12px", backgroundColor: "#F0FDF4", color: "#166534", border: "1px solid #BBF7D0", borderRadius: "6px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
                      Simulate: Case Closed (Findings)
                    </button>
                    <button onClick={simulateDismissed} style={{ padding: "8px 12px", backgroundColor: "#FEF2F2", color: "#991B1B", border: "1px solid #FECACA", borderRadius: "6px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
                      Simulate: Deemed Not Worthy
                    </button>
                  </>
                )}

                {caseData.outcome && (
                  <button onClick={resetSimulation} style={{ padding: "8px 16px", backgroundColor: "#001F3F", color: "#FFFFFF", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
                    Reset to Stage 3
                  </button>
                )}

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}