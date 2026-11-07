import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ========================================================
// 3 CUSTOM HAND-DRAWN ICONS
// ========================================================

const HandDrawnSubmitDoc = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 7 C12 5.5, 13.5 4, 15 4 L30 4 L40 14 L40 42 C40 43.5, 38.5 45, 37 45 L15 45 C13.5 45, 12 43.5, 12 42 Z" />
    <path d="M30 4 L30 14 L40 14" />
    <path d="M18 25 L28 25" strokeWidth="2" />
    <path d="M18 31 L32 31" strokeWidth="2" />
    <path d="M26 19 L26 11 M22 15 L26 11 L30 15" strokeWidth="2.6" stroke="#B8860B" />
  </svg>
);

const HandDrawnAssessLens = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="21" cy="21" r="12" strokeWidth="2.5" />
    <circle cx="21" cy="21" r="8" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.35" />
    <path d="M30 30 L41 41" strokeWidth="3" />
    <path d="M16 21 L19.5 24.5 L26.5 17.5" strokeWidth="2.6" stroke="#B8860B" />
  </svg>
);

const HandDrawnCertStamp = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 6 C10 4.5, 11.5 4, 13 4 L29 4 L39 14 L39 42 C39 43.5, 37.5 44, 36 44 L13 44 C11.5 44, 10 42.5, 10 41 Z" />
    <path d="M29 4 L29 14 L39 14" />
    <circle cx="24" cy="27" r="7.5" strokeWidth="2.2" fill="rgba(252,209,22,0.25)" />
    <path d="M20 27 L23 30 L28 24" strokeWidth="2.6" stroke="#001F3F" />
    <path d="M20 34 L17 41 L22 39 L26 41 L24 34" strokeWidth="1.8" fill="rgba(252,209,22,0.35)" />
  </svg>
);

export default function Clearance() {
  const [searchQuery, setSearchQuery] = useState("");

  // Real-time scroll physics
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  // Whole-page watermark parallax
  const bgParallaxY = useTransform(smoothProgress, [0, 1], [-50, 100]);
  const bgRotate = useTransform(smoothProgress, [0, 1], [0, 12]);

  const issuedCertificates = [
    { id: "VFMO-CLR-2026-0891", project: "Tema Interchange Phase 2", entity: "Ministry of Roads", date: "Oct 24, 2026", value: "GH₵ 48.2M", status: "Issued" },
    { id: "VFMO-CLR-2026-0890", project: "Regional Hospital Equipment", entity: "Ghana Health Service", date: "Oct 20, 2026", value: "GH₵ 12.7M", status: "Issued" },
    { id: "VFMO-CLR-2026-0889", project: "STEM School Construction", entity: "Ministry of Education", date: "Oct 15, 2026", value: "GH₵ 86.4M", status: "Issued" },
    { id: "VFMO-CLR-2026-0888", project: "Pipeline Expansion", entity: "Ghana Water Co.", date: "Oct 10, 2026", value: "GH₵ 31.5M", status: "Issued" },
  ];

  const filteredCertificates = issuedCertificates.filter(
    (cert) =>
      cert.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh", position: "relative", overflowX: "hidden", fontFamily: "'Inter', sans-serif" }}>
      
      {/* 1. SCROLL PROGRESS INDICATOR (Gold top line) */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          backgroundColor: "#FCD116",
          transformOrigin: "0%",
          scaleX: smoothProgress,
          zIndex: 9999,
        }}
      />

      {/* 2. WHOLE-PAGE FIXED WATERMARK BACKGROUND (Visible across entire scroll) */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            width: "min(85vw, 750px)",
            height: "min(85vw, 750px)",
            backgroundImage: "url('/vfm-logo.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.038, // Subtle, permanent official watermark
            y: bgParallaxY,
            rotate: bgRotate,
          }}
        />
      </div>

      {/* 3. HERO SECTION */}
      <section style={{ position: "relative", backgroundColor: "#001F3F", padding: "120px 24px 95px", textAlign: "center", overflow: "hidden", zIndex: 1 }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/building-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.16, zIndex: 0 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(0,31,63,0.88) 0%, rgba(0,31,63,1) 100%)", zIndex: 1 }} />

        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 style={{ fontSize: "clamp(34px, 5vw, 52px)", fontWeight: "900", color: "#FFFFFF", margin: "0 0 20px 0", lineHeight: "1.15", letterSpacing: "-0.5px" }}>
              VFMO Certificate of Clearance
            </h1>
            <p style={{ fontSize: "19px", color: "#CBD5E1", lineHeight: "1.65", margin: 0, maxWidth: "750px", marginLeft: "auto", marginRight: "auto" }}>
              No public entity shall award a contract above the prescribed statutory threshold without an authentic Value for Money Certificate of Clearance issued by the VFMO.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. LEGAL WARNING BOX (Smooth Entrance as you scroll) */}
      <section style={{ position: "relative", padding: "60px 24px 20px", maxWidth: "1000px", margin: "0 auto", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          style={{ 
            backgroundColor: "rgba(254, 242, 242, 0.95)", 
            backdropFilter: "blur(6px)",
            border: "2px solid #EF4444", 
            borderRadius: "16px", 
            padding: "32px", 
            display: "flex", 
            gap: "20px", 
            alignItems: "flex-start", 
            boxShadow: "0 15px 35px -5px rgba(239, 68, 68, 0.12)",
          }}
        >
          <div style={{ width: "48px", height: "48px", backgroundColor: "#FEE2E2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div>
            <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#991B1B", margin: "0 0 8px 0" }}>
              Legal Consequence of Non-Compliance
            </h3>
            <p style={{ fontSize: "15px", color: "#B91C1C", margin: 0, lineHeight: "1.65" }}>
              Pursuant to <strong>Section 31(5) of the Value for Money Office Act, 2026 (Act 1172)</strong>, a contract executed in contravention of this requirement is <strong>null and void</strong> and completely unenforceable against the Republic or the covered entity.
            </p>
          </div>
        </motion.div>
      </section>

      {/* 5. APPLICATION PROCESS WITH STAGGERED ENTRANCES */}
      <section style={{ position: "relative", padding: "80px 24px", maxWidth: "1200px", margin: "0 auto", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "50px" }}
        >
          <span style={{ fontSize: "12px", fontWeight: "800", color: "#8B7355", textTransform: "uppercase", letterSpacing: "1.5px", display: "block", marginBottom: "8px" }}>
            Statutory Steps
          </span>
          <h2 style={{ fontSize: "36px", fontWeight: "900", color: "#0F172A", margin: "0 0 14px 0", letterSpacing: "-0.5px" }}>
            Application Process
          </h2>
          <p style={{ color: "#475569", fontSize: "17px", margin: 0 }}>
            All covered entities must follow this three-step statutory procedure.
          </p>
        </motion.div>

        {/* 3 Cascade Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "28px" }}>
          {[
            { 
              title: "Submit Application", 
              desc: "The covered entity submits a formal request via the VFMO Digital Portal, including cost estimates, technical specifications, and procurement plans (Section 34).",
              icon: HandDrawnSubmitDoc
            },
            { 
              title: "VFMO Assessment", 
              desc: "The VFMO conducts a rigorous pre-award assessment to verify costs against benchmarks and ensure value justification (Section 34).",
              icon: HandDrawnAssessLens
            },
            { 
              title: "Certificate Issued", 
              desc: "If the assessment is satisfactory, the Office issues the Certificate of Clearance. Only then can the contract be awarded (Section 31).",
              icon: HandDrawnCertStamp
            }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                  delay: index * 0.15, // Sequential cascade
                }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 25px 45px -10px rgba(0, 31, 63, 0.14)",
                  borderColor: "#CBD5E1",
                }}
                style={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.9)", 
                  backdropFilter: "blur(6px)",
                  padding: "36px 30px", 
                  borderRadius: "16px", 
                  boxShadow: "0 10px 30px -5px rgba(0, 31, 63, 0.05)", 
                  border: "1px solid #E2E8F0",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
              >
                <div style={{ 
                  width: "64px", 
                  height: "64px", 
                  borderRadius: "14px", 
                  backgroundColor: "rgba(0, 31, 63, 0.04)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  marginBottom: "20px",
                  border: "1px solid rgba(0, 31, 63, 0.06)"
                }}>
                  <Icon />
                </div>

                <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#001F3F", margin: "0 0 12px 0", letterSpacing: "-0.3px" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.65", margin: 0, flex: 1, fontWeight: "400" }}>
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Portal Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ textAlign: "center", marginTop: "55px" }}
        >
          <Link 
            to="/portal" 
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "10px", 
              backgroundColor: "#001F3F", 
              color: "#FFFFFF", 
              padding: "16px 36px", 
              borderRadius: "6px", 
              fontSize: "15px", 
              fontWeight: "800", 
              textDecoration: "none",
              boxShadow: "0 4px 15px rgba(0, 31, 63, 0.15)",
              transition: "transform 0.2s ease, background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#0A2E4D";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#001F3F";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Access the VFMO Digital Portal to Apply
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* 6. PUBLIC REGISTER */}
      <section style={{ position: "relative", padding: "80px 24px 110px", backgroundColor: "rgba(255, 255, 255, 0.92)", backdropFilter: "blur(8px)", borderTop: "1px solid #E2E8F0", zIndex: 1 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "32px" }}
          >
            <div>
              <span style={{ fontSize: "11px", fontWeight: "800", color: "#8B7355", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "4px" }}>
                Transparency Record
              </span>
              <h2 style={{ fontSize: "32px", fontWeight: "900", color: "#0F172A", margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>
                Public Register of Issued Certificates
              </h2>
              <p style={{ color: "#475569", fontSize: "15px", margin: 0 }}>
                Published in accordance with Section 27(4)(d) of Act 1172.
              </p>
            </div>

            {/* Live Filter Input */}
            <div style={{ position: "relative", width: "100%", maxWidth: "320px" }}>
              <input 
                type="text" 
                placeholder="Search by ID, project or entity..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  width: "100%", 
                  padding: "12px 16px 12px 42px", 
                  borderRadius: "8px", 
                  border: "1px solid #CBD5E1", 
                  fontSize: "14px", 
                  outline: "none", 
                  boxSizing: "border-box",
                  backgroundColor: "#F8FAFC",
                  color: "#001F3F"
                }}
              />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" style={{ position: "absolute", left: "14px", top: "13px" }}>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </motion.div>

          {/* Table with Rising Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflowX: "auto", border: "1px solid #E2E8F0", borderRadius: "14px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", backgroundColor: "#FFFFFF" }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "800px" }}>
              <thead>
                <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                  <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "800", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>Certificate ID</th>
                  <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "800", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>Project Name</th>
                  <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "800", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>Covered Entity</th>
                  <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "800", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>Value</th>
                  <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "800", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>Date Issued</th>
                  <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "800", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCertificates.length > 0 ? (
                  filteredCertificates.map((cert, index) => (
                    <tr 
                      key={index} 
                      style={{ borderBottom: "1px solid #F1F5F9", transition: "background-color 0.15s ease" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F8FAFC")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "800", color: "#001F3F" }}>{cert.id}</td>
                      <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "600", color: "#0F172A" }}>{cert.project}</td>
                      <td style={{ padding: "16px 24px", fontSize: "14px", color: "#475569" }}>{cert.entity}</td>
                      <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "800", color: "#0F172A" }}>{cert.value}</td>
                      <td style={{ padding: "16px 24px", fontSize: "14px", color: "#64748B" }}>{cert.date}</td>
                      <td style={{ padding: "16px 24px" }}>
                        <span style={{ display: "inline-block", padding: "5px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "800", backgroundColor: "#D1FAE5", color: "#065F46" }}>
                          {cert.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ padding: "40px", textAlign: "center", color: "#64748B", fontSize: "14px" }}>
                      No certificates found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

    </div>
  );
}