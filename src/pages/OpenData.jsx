import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// ========================================================
// 1. HAND-DRAWN ICONS FOR DASHBOARD
// ========================================================
const HandDrawnSavings = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="10" y="14" width="28" height="24" rx="4" />
    <path d="M10 20 L38 20" />
    <path d="M16 32 L20 28 L24 32 L32 24" strokeWidth="2.8" />
    <path d="M26 24 L32 24 L32 30" strokeWidth="2.8" />
    <path d="M16 14 L16 8 L20 8" strokeWidth="2" />
  </svg>
);

const HandDrawnAssessment = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 7 C10 5.5, 11.5 4, 13 4 L28 4 L38 14 L38 42 C38 43.5, 36.5 45, 35 45 L13 45 C11.5 45, 10 43.5, 10 42 Z" />
    <path d="M28 4 L28 14 L38 14" />
    <circle cx="21" cy="25" r="7.5" strokeWidth="2.5" />
    <path d="M26.5 30.5 L34 38" strokeWidth="3" />
    <path d="M16 13 L22 13" strokeWidth="2" />
  </svg>
);

const HandDrawnFlagged = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 42 L12 6" strokeWidth="3" />
    <path d="M12 8 L34 12 L12 24 Z" fill="rgba(185,28,28,0.05)" strokeWidth="2.5" />
    <circle cx="12" cy="42" r="2" fill="#B91C1C" />
  </svg>
);

const HandDrawnInvestigation = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="22" cy="22" r="14" strokeWidth="2.5" />
    <path d="M33 33 L42 42" strokeWidth="3" />
    <path d="M15 22 L19 26 L29 16" strokeWidth="2.5" />
    <path d="M22 4 L22 8" strokeWidth="2" />
    <path d="M6 22 L10 22" strokeWidth="2" />
    <path d="M22 36 L22 40" strokeWidth="2" />
  </svg>
);

// ========================================================
// 2. REVEAL HELPERS
// ========================================================
const Reveal = ({ children, delay = 0, y = 40, once = true }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      style={{
        opacity: prefersReduced ? 1 : inView ? 1 : 0,
        transform: prefersReduced ? "none" : inView ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.8s ease-out ${delay}s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: "opacity, transform",
        width: "100%",
        height: "100%"
      }}
    >
      {children}
    </div>
  );
};

const RevealText = ({ text, as: Tag = "span", style = {}, delay = 0, wordDelay = 0.05 }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = String(text).split(" ");

  return (
    <Tag ref={ref} style={{ ...style, display: "inline" }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
          <motion.span
            initial={prefersReduced ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : prefersReduced ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: delay + i * wordDelay }}
            style={{ display: "inline-block", willChange: "transform" }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
};

// ========================================================
// 3. MAIN PAGE
// ========================================================
export default function OpenData() {
  const [searchQuery, setSearchQuery] = useState("");
  const prefersReduced = useReducedMotion();

  // Hero Scroll Parallax
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const projectStatuses = [
    { project: "Tema Interchange Phase 2", entity: "Ministry of Roads", status: "Under Review", statusColor: "#FCD116", lastUpdated: "Oct 26, 2026" },
    { project: "Regional Hospital Equipment", entity: "Ghana Health Service", status: "Clarification Requested", statusColor: "#EF4444", lastUpdated: "Oct 24, 2026" },
    { project: "STEM School Construction", entity: "Ministry of Education", status: "Assessment Complete", statusColor: "#10B981", lastUpdated: "Oct 20, 2026" },
    { project: "Pipeline Expansion", entity: "Ghana Water Co.", status: "Certificate Issued", statusColor: "#001F3F", lastUpdated: "Oct 15, 2026" },
  ];

  const filteredProjects = projectStatuses.filter(
    (p) => p.project.toLowerCase().includes(searchQuery.toLowerCase()) || p.entity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const publishedSummaries = [
    {
      date: "Oct 24, 2026",
      entity: "Ministry of Health",
      title: "Assessment of Medical Equipment Procurement",
      summary: "The VfM Office found that the quoted prices for secondary hospital equipment were 15% above regional market rates. The Ministry was advised to renegotiate, resulting in savings of GH₵ 4.2 Million.",
      savings: "GH₵ 4.2M"
    },
    {
      date: "Oct 18, 2026",
      entity: "Ministry of Roads",
      title: "Review of Tema Interchange Phase 2 Cost Estimates",
      summary: "A pre-award assessment identified unnecessary variations in the bill of quantities. The contractor was instructed to revise the scope, preventing an unjustified cost inflation of GH₵ 12.5 Million.",
      savings: "GH₵ 12.5M"
    },
    {
      date: "Oct 10, 2026",
      entity: "Ghana Education Trust Fund",
      title: "Audit of School Furniture Procurement",
      summary: "Post-award assessment revealed that the delivered furniture did not meet the required durability standards. Sanctions have been initiated against the supplier, and recovery proceedings are underway.",
      savings: "Pending Recovery"
    }
  ];

  const dashboardStats = [
    { label: "Total Savings Identified", value: "GH₵ 250M+", icon: HandDrawnSavings, color: "#1E3A8A" },
    { label: "Assessments Conducted", value: "1,245", icon: HandDrawnAssessment, color: "#047857" },
    { label: "Contracts Flagged", value: "86", icon: HandDrawnFlagged, color: "#B91C1C" },
    { label: "Active Investigations", value: "14", icon: HandDrawnInvestigation, color: "#B45309" }
  ];

  // Double the stats to create a seamless infinite loop
  const marqueeStats = [...dashboardStats, ...dashboardStats];

  return (
    <div style={{ position: "relative", backgroundColor: "#F8F9FA", minHeight: "100vh", overflowX: "hidden" }}>
      
      <style>
        {`
          .download-btn-force {
            width: 100% !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            padding: 14px 28px !important;
            white-space: nowrap !important;
            box-sizing: border-box !important;
            border: none !important;
            border-radius: 6px !important;
            font-size: 15px !important;
            font-weight: 700 !important;
            cursor: pointer !important;
            gap: 10px !important;
            transition: background-color 0.2s ease !important;
          }
          .download-btn-force:hover {
            background-color: #0A2E4D !important;
          }
          @media (min-width: 768px) {
            .download-btn-force {
              width: auto !important;
            }
          }

          /* INFINITE MARQUEE ANIMATION */
          @keyframes scrollMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } 
          }

          .marquee-container {
            overflow: hidden;
            width: 100%;
            position: relative;
            padding: 40px 0;
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          }

          .marquee-track {
            display: flex;
            align-items: center;
            gap: 40px;
            width: max-content;
            animation: scrollMarquee 35s linear infinite;
          }

          /* Pause on hover */
          .marquee-track:hover {
            animation-play-state: paused;
          }

          .marquee-item {
            display: flex;
            align-items: center;
            gap: 20px;
            flex-shrink: 0;
            padding-right: 40px;
            border-right: 1px solid rgba(0, 31, 63, 0.15);
          }
        `}
      </style>

      {/* SUBTLE VFMO LOGO BACKGROUND */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: "url(/vfm-logo.png)", backgroundRepeat: "no-repeat",
          backgroundPosition: "center center", backgroundSize: "min(85vw, 900px)",
          opacity: 0.04, filter: "grayscale(10%)",
        }}
      />

      {/* CONTENT */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* 1. HERO SECTION */}
        <section ref={heroRef} style={{ position: "relative", backgroundColor: "#001F3F", padding: "120px 24px 110px", textAlign: "center", overflow: "hidden" }}>
          <motion.div
            style={{
              position: "absolute", top: 0, left: 0, right: 0, bottom: "-15%",
              backgroundImage: "url(/building-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center",
              opacity: 0.2, zIndex: 0, y: prefersReduced ? 0 : heroBgY, scale: prefersReduced ? 1 : heroScale,
            }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,31,63,0.8) 0%, rgba(0,31,63,1) 100%)", zIndex: 1 }} />
          
          <motion.div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 2, y: prefersReduced ? 0 : heroContentY, opacity: prefersReduced ? 1 : heroOpacity }}>
            <h1 style={{ fontSize: "clamp(34px, 6vw, 52px)", fontWeight: "800", color: "#FFFFFF", margin: "0 0 24px 0", lineHeight: "1.1" }}>
              <RevealText text="Open Data & Transparency" delay={0.1} />
            </h1>
            <p style={{ fontSize: "clamp(17px, 2.4vw, 20px)", color: "#CBD5E1", lineHeight: "1.6", margin: 0, maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}>
              <RevealText text="Providing the public with real-time statistics, published findings, and the status of major capital projects across Ghana." delay={0.3} wordDelay={0.02} />
            </p>
          </motion.div>
        </section>

        {/* 2. NATIONAL DASHBOARD (Borderless Marquee Ticker) */}
        <section style={{ padding: "40px 0", backgroundColor: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
          <div className="marquee-container">
            <div className="marquee-track">
              {marqueeStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="marquee-item">
                    <div style={{ flexShrink: 0 }}>
                      <IconComponent />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ fontSize: "38px", fontWeight: "900", color: stat.color, margin: "0 0 4px 0", lineHeight: "1" }}>
                        {stat.value}
                      </div>
                      <h3 style={{ fontSize: "13px", fontWeight: "800", color: "#64748B", textTransform: "uppercase", letterSpacing: "1.5px", margin: 0 }}>
                        {stat.label}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. PUBLISHED SUMMARIES */}
        <section style={{ padding: "80px 24px", backgroundColor: "rgba(255,255,255,0.94)", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            
            <Reveal>
              <div style={{ marginBottom: "50px" }}>
                <h2 style={{ fontSize: "clamp(28px, 4.5vw, 36px)", fontWeight: "800", color: "#0F172A", margin: "0 0 12px 0" }}>
                  <RevealText text="Published Assessment Summaries" delay={0.05} />
                </h2>
                <p style={{ color: "#475569", fontSize: "17px", margin: 0 }}>
                  <RevealText text="Published in accordance with Section 27(4)(a) of Act 1172." delay={0.15} wordDelay={0.02} />
                </p>
              </div>
            </Reveal>

            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {publishedSummaries.map((summary, index) => (
                <motion.div 
                  key={index}
                  initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
                >
                  <motion.div 
                    whileHover={prefersReduced ? {} : { backgroundColor: "#F1F5F9", borderColor: "#CBD5E1", boxShadow: "0 10px 30px -10px rgba(0,31,63,0.08)" }}
                    style={{ 
                      display: "flex", flexDirection: "column", gap: "16px", padding: "32px", 
                      backgroundColor: "#F8FAFC", borderRadius: "12px", border: "1px solid #E2E8F0",
                      transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
                      <div>
                        <span style={{ fontSize: "12px", fontWeight: "800", color: "#001F3F", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "6px" }}>
                          {summary.entity}
                        </span>
                        <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0F172A", margin: 0, lineHeight: "1.3" }}>
                          {summary.title}
                        </h3>
                      </div>
                      <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                        <span style={{ fontSize: "13px", color: "#64748B", fontWeight: "500" }}>{summary.date}</span>
                        <span style={{ fontSize: "14px", fontWeight: "800", color: "#001F3F", backgroundColor: "#FCD116", padding: "6px 14px", borderRadius: "4px" }}>
                          {summary.savings}
                        </span>
                      </div>
                    </div>
                    <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.7", margin: 0 }}>{summary.summary}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. LIVE STATUS TRACKER */}
        <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "40px" }}>
              <div>
                <h2 style={{ fontSize: "clamp(28px, 4.5vw, 36px)", fontWeight: "800", color: "#0F172A", margin: "0 0 12px 0" }}>
                  <RevealText text="Live Project Status Tracker" delay={0.05} />
                </h2>
                <p style={{ color: "#475569", fontSize: "17px", margin: 0 }}>
                  <RevealText text="Real-time updates on assessments and compliance milestones (Section 27(4)(b))." delay={0.15} wordDelay={0.02} />
                </p>
              </div>
              <motion.div
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                style={{ position: "relative", width: "100%", maxWidth: "300px" }}
              >
                <input 
                  type="text" 
                  placeholder="Search by project or entity..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ 
                    width: "100%", padding: "14px 16px 14px 44px", borderRadius: "8px", border: "1px solid #CBD5E1", 
                    fontSize: "15px", outline: "none", boxSizing: "border-box", backgroundColor: "#FFFFFF",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease"
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#001F3F"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,31,63,0.12)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#CBD5E1"; e.currentTarget.style.boxShadow = "none"; }}
                />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" style={{ position: "absolute", left: "14px", top: "15px" }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </motion.div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ overflowX: "auto", border: "1px solid #E2E8F0", borderRadius: "12px", backgroundColor: "#FFFFFF" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "800px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                    {["Project Name", "Covered Entity", "Current Status", "Last Updated"].map((h) => (
                      <th key={h} style={{ padding: "18px 24px", fontSize: "13px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((item, index) => (
                      <motion.tr 
                        key={index} 
                        initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
                        style={{ borderBottom: "1px solid #E2E8F0" }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F8FAFC"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                      >
                        <td style={{ padding: "18px 24px", fontSize: "15px", fontWeight: "700", color: "#0F172A" }}>{item.project}</td>
                        <td style={{ padding: "18px 24px", fontSize: "15px", color: "#475569" }}>{item.entity}</td>
                        <td style={{ padding: "18px 24px" }}>
                          <span style={{ display: "inline-block", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "700", backgroundColor: `${item.statusColor}15`, color: item.statusColor }}>
                            {item.status}
                          </span>
                        </td>
                        <td style={{ padding: "18px 24px", fontSize: "15px", color: "#475569" }}>{item.lastUpdated}</td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ padding: "40px", textAlign: "center", color: "#64748B" }}>No projects found matching your search.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div style={{ marginTop: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px", backgroundColor: "#F8FAFC", padding: "32px", borderRadius: "12px", border: "1px solid #E2E8F0", width: "100%", boxSizing: "border-box" }}>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: "0 0 6px 0" }}>Download Open Data</h3>
                <p style={{ fontSize: "15px", color: "#475569", margin: 0 }}>Access anonymized datasets of all VfM assessments (CSV/Excel).</p>
              </div>
              <button className="download-btn-force" style={{ backgroundColor: "#001F3F", color: "#FFFFFF" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download Dataset (CSV)
              </button>
            </div>
          </Reveal>

        </section>
      </div>
    </div>
  );
}