import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// ========================================================
// 1. HAND-DRAWN ICONS FOR PENALTIES (Warning Red Theme)
// ========================================================
const HandDrawnSuspension = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="17" strokeWidth="2.6" />
    <path d="M15 15 L33 33" strokeWidth="3" />
    <path d="M33 15 L15 33" strokeWidth="3" />
    <circle cx="24" cy="24" r="13" strokeWidth="1.4" strokeDasharray="3 3" opacity="0.4" />
  </svg>
);

const HandDrawnDebarment = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 6 C12 4.5, 13.5 4, 15 4 L33 4 L40 11 L40 42 C40 43.5, 38.5 44, 37 44 L15 44 C13.5 44, 12 43.5, 12 42 Z" />
    <path d="M30 4 L30 14 L40 14" />
    <path d="M20 20 L32 32" strokeWidth="3" />
    <path d="M32 20 L20 32" strokeWidth="3" />
  </svg>
);

const HandDrawnRecovery = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 40 L42 40" strokeWidth="2.5" />
    <path d="M6 40 L6 8" strokeWidth="2.5" />
    <path d="M10 28 L20 18 L28 24 L40 12" strokeWidth="2.8" />
    <path d="M30 12 L40 12 L40 22" strokeWidth="2.8" />
    <circle cx="24" cy="34" r="4" fill="rgba(153,27,27,0.1)" strokeWidth="2" />
  </svg>
);

// ========================================================
// 2. REVEAL HELPERS (Work on all screen sizes)
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
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      style={{
        opacity: prefersReduced ? 1 : inView ? 1 : 0,
        transform: prefersReduced
          ? "none"
          : inView
          ? "translateY(0)"
          : `translateY(${y}px)`,
        transition: `opacity 0.8s ease-out ${delay}s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: "opacity, transform",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};

const RevealText = ({ text, as: Tag = "span", style = {}, delay = 0, wordDelay = 0.06 }) => {
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

export default function Sanctions() {
  const [searchQuery, setSearchQuery] = useState("");
  const prefersReduced = useReducedMotion();

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const debarredContractors = [
    { name: "Apex Construction Ltd.", regNo: "CS-49201", reason: "Contract Price Inflation", date: "Jan 15, 2026", expiry: "Jan 15, 2029", status: "Active Ban" },
    { name: "Delta Roads & Infrastructure", regNo: "CS-88123", reason: "Breach of Quality Standards", date: "Mar 10, 2026", expiry: "Mar 10, 2028", status: "Active Ban" },
    { name: "Omega Medical Supplies", regNo: "CS-11045", reason: "Cost Irregularity / Waste", date: "Nov 05, 2025", expiry: "Nov 05, 2027", status: "Active Ban" },
  ];

  const filteredContractors = debarredContractors.filter(
    (contractor) =>
      contractor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contractor.regNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const penalties = [
    { 
      title: "Suspension", 
      desc: "Immediate suspension of the contractor from ongoing public procurement processes under the Public Procurement Act, 2003 (Act 663).",
      icon: HandDrawnSuspension
    },
    { 
      title: "Debarment", 
      desc: "A formal ban from participating in any future government contracts for a period of not less than two (2) years and not more than five (5) years.",
      icon: HandDrawnDebarment
    },
    { 
      title: "Civil Recovery", 
      desc: "The Office will initiate civil recovery proceedings to retrieve overpayments and unjustified costs from the contractor or supplier.",
      icon: HandDrawnRecovery
    }
  ];

  return (
    <div style={{ position: "relative", backgroundColor: "#F8F9FA", minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* FULL-PAGE SUBTLE VFMO LOGO BACKGROUND */}
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
          opacity: 0.05,
          filter: "grayscale(10%)",
        }}
      />

      {/* ALL CONTENT ABOVE LOGO */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* 1. HERO SECTION */}
        <section
          ref={heroRef}
          style={{
            position: "relative",
            backgroundColor: "#001F3F",
            padding: "120px 24px 110px",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: "-15%",
              backgroundImage: "url(/building-bg.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.2,
              zIndex: 0,
              y: prefersReduced ? 0 : heroBgY,
              scale: prefersReduced ? 1 : heroScale,
            }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,31,63,0.8) 0%, rgba(0,31,63,1) 100%)", zIndex: 1 }} />

          <motion.div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              position: "relative",
              zIndex: 2,
              y: prefersReduced ? 0 : heroContentY,
              opacity: prefersReduced ? 1 : heroOpacity,
            }}
          >
            <h1 style={{ fontSize: "clamp(34px, 6vw, 52px)", fontWeight: "800", color: "#FFFFFF", margin: "0 0 24px 0", lineHeight: "1.1" }}>
              <RevealText text="Sanctions & Debarment" delay={0.1} />
            </h1>
            <p style={{ fontSize: "clamp(17px, 2.4vw, 20px)", color: "#CBD5E1", lineHeight: "1.6", margin: 0 }}>
              <RevealText text="Enforcing accountability and protecting public funds from contract inflation, waste, and abuse." delay={0.35} wordDelay={0.035} />
            </p>
          </motion.div>
        </section>

        {/* 2. THE PENALTIES SECTION (Red Warning Theme, Borderless Layout) */}
        <section style={{ padding: "100px 24px 110px", maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
          
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "70px" }}>
              <h2 style={{ fontSize: "clamp(28px, 4.5vw, 36px)", fontWeight: "800", color: "#991B1B", margin: "0 0 16px 0" }}>
                <RevealText text="Consequences of Non-Compliance" delay={0.05} />
              </h2>
              <p style={{ color: "#7F1D1D", fontSize: "clamp(16px, 2.2vw, 18px)", margin: 0, maxWidth: "700px", marginLeft: "auto", marginRight: "auto", lineHeight: "1.6" }}>
                <RevealText text="Under Section 38 of Act 1172, the VfM Office has the statutory power to impose severe penalties on contractors and suppliers who contribute to unjustified cost inflation." delay={0.2} wordDelay={0.02} />
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px 48px" }}>
            {penalties.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Reveal key={index} delay={index * 0.15} y={40}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    
                    {/* Side-by-Side: Hand-drawn icon on left + Bold Uppercase Title on right */}
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "14px" }}>
                      <div style={{ flexShrink: 0, width: "52px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <IconComponent />
                      </div>
                      <h3 style={{ fontSize: "19px", fontWeight: "900", color: "#991B1B", textTransform: "uppercase", letterSpacing: "0.5px", lineHeight: "1.25", margin: 0 }}>
                        {item.title}
                      </h3>
                    </div>

                    <p style={{ color: "#7F1D1D", fontSize: "15px", lineHeight: "1.65", margin: 0, fontWeight: "400" }}>
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* 3. PUBLIC DEBARMENT REGISTER */}
        <section style={{ padding: "80px 24px", backgroundColor: "rgba(255,255,255,0.94)", borderTop: "1px solid #E2E8F0", position: "relative" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            
            <Reveal>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "32px" }}>
                <div>
                  <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: "800", color: "#0F172A", margin: "0 0 8px 0" }}>
                    <RevealText text="Public Debarment Register" delay={0.05} />
                  </h2>
                  <p style={{ color: "#475569", fontSize: "16px", margin: 0, maxWidth: "600px" }}>
                    <RevealText text="Published in accordance with Section 38(2) of Act 1172. Covered entities are prohibited from awarding contracts to the entities listed below." delay={0.15} wordDelay={0.015} />
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
                    placeholder="Search by contractor name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: "100%", padding: "12px 16px 12px 40px", borderRadius: "8px", border: "1px solid #CBD5E1",
                      fontSize: "15px", outline: "none", boxSizing: "border-box", backgroundColor: "#FFFFFF",
                      transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#001F3F";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,31,63,0.12)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#CBD5E1";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" style={{ position: "absolute", left: "12px", top: "13px" }}>
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </motion.div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div style={{ overflowX: "auto", border: "1px solid #E2E8F0", borderRadius: "12px", backgroundColor: "#FFFFFF" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "800px" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                      {["Contractor Name", "Reg. Number", "Reason for Debarment", "Date Issued", "Expiry Date", "Status"].map((h) => (
                        <th key={h} style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContractors.length > 0 ? (
                      filteredContractors.map((contractor, index) => (
                        <motion.tr
                          key={contractor.regNo}
                          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                          style={{ borderBottom: "1px solid #E2E8F0" }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F8FAFC"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                        >
                          <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "700", color: "#0F172A" }}>{contractor.name}</td>
                          <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "600", color: "#475569" }}>{contractor.regNo}</td>
                          <td style={{ padding: "16px 24px", fontSize: "14px", color: "#B91C1C", fontWeight: "500" }}>{contractor.reason}</td>
                          <td style={{ padding: "16px 24px", fontSize: "14px", color: "#475569" }}>{contractor.date}</td>
                          <td style={{ padding: "16px 24px", fontSize: "14px", color: "#475569" }}>{contractor.expiry}</td>
                          <td style={{ padding: "16px 24px" }}>
                            <motion.span
                              initial={prefersReduced ? { scale: 1 } : { scale: 0.85, opacity: 0 }}
                              whileInView={{ scale: 1, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                              style={{ display: "inline-block", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", backgroundColor: "#FEE2E2", color: "#991B1B" }}
                            >
                              {contractor.status}
                            </motion.span>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ padding: "32px", textAlign: "center", color: "#64748B" }}>
                          No debarred contractors found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p style={{ fontSize: "13px", color: "#64748B", marginTop: "16px", fontStyle: "italic" }}>
                *If you suspect a covered entity is engaging a debarred contractor, please report it immediately via our{" "}
                <a href="/submit" style={{ color: "#001F3F", fontWeight: "600" }}>Whistleblower Portal</a>.
              </p>
            </Reveal>
          </div>
        </section>
      </div>
    </div>
  );
}