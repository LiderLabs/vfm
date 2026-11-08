import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";

// ========================================================
// 1. HAND-DRAWN ICONS
// ========================================================
const HandDrawnDocument = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" stroke="#001F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 6 C12 4.5, 13.5 4, 15 4 L33 4 L40 11 L40 42 C40 43.5, 38.5 44, 37 44 L15 44 C13.5 44, 12 43.5, 12 42 Z" />
    <path d="M30 4 L30 14 L40 14" />
    <path d="M18 20 L28 20" strokeWidth="2" />
    <path d="M18 28 L34 28" strokeWidth="2" />
    <path d="M18 36 L24 36" strokeWidth="2" />
  </svg>
);

const HandDrawnDownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
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
export default function Publications() {
  const [activeFilter, setActiveFilter] = useState("Annual Reviews");
  const [isHovered, setIsHovered] = useState(false);
  const [activeNoticeIndex, setActiveNoticeIndex] = useState(0);
  const prefersReduced = useReducedMotion();

  // Hero Scroll Parallax
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const filters = [
    "Annual Reviews",
    "Methodology Frameworks",
    "VFMO Evaluation Guidelines",
    "Advisory Briefs"
  ];

  const notices = [
    {
      date: "May 11, 2026",
      tag: "PRESIDENTIAL ASSENT",
      title: "Value for Money Office Act, 2026 (Act 1172) Becomes Law",
      desc: "The President of the Republic of Ghana has formally assented to the Value for Money Office Act, 2026 (Act 1172), establishing the Office as an independent statutory body corporate. This landmark legislation empowers the Office to enforce strict cost benchmarking across all public sector projects.",
      image: "/utilisation-bg.jpg"
    },
    {
      date: "May 11, 2026",
      tag: "MINISTERIAL DIRECTIVE",
      title: "Interim Monetary Thresholds for Mandatory VFMO Assessments",
      desc: "Pursuant to Section 30(2) of Act 1172, the Minister for Finance, on the advice of the Board, will prescribe interim monetary thresholds for public sector projects. Any project exceeding these thresholds must undergo a mandatory pre-award assessment.",
      image: "/boardroom.jpg"
    },
    {
      date: "May 11, 2026",
      tag: "INSTITUTIONAL NOTICE",
      title: "Establishment of Value for Money Units in Covered Entities",
      desc: "All covered entities are required to establish internal Value for Money Units over a five-year phased implementation. These units will prioritise infrastructure, education, and health sectors, ensuring internal compliance before contracts reach the national Office. (Section 28)",
      image: "/about-bg.jpg"
    }
  ];

  // Infinite scrolling playlist loop
  const playlistNotices = [...notices, ...notices, ...notices];

  const documents = [
    {
      date: "Jan 2027",
      category: "Annual Reviews",
      title: "2026 Annual Report to Parliament",
      desc: "The Office's inaugural annual report on the activities, operations, and financial performance of the VFMO Office, including a summary of public savings realised. (Section 26)",
      fileSize: "3.2 MB"
    },
    {
      date: "Dec 2026",
      category: "Annual Reviews",
      title: "Q4 2026 VFMO Assessment Findings",
      desc: "A quarterly publication summarising systemic inefficiencies identified during value for money assessments and policy recommendations arising from them. (Section 39)",
      fileSize: "1.9 MB"
    },
    {
      date: "Nov 2026",
      category: "Methodology Frameworks",
      title: "National Cost Benchmarks for Civil Works (2026)",
      desc: "Standardised cost benchmarks for commonly procured goods, works, and services to be used by covered entities in planning and budgeting. (Section 36)",
      fileSize: "4.5 MB"
    },
    {
      date: "Oct 2026",
      category: "VFMO Evaluation Guidelines",
      title: "Standard Operating Procedures for Pre-Award Assessments",
      desc: "Technical guidelines detailing the methodology for independent evaluation of cost estimates, technical specifications, and value justification prior to contract execution. (Section 34)",
      fileSize: "2.1 MB"
    },
    {
      date: "Sep 2026",
      category: "Advisory Briefs",
      title: "Guidelines for Public Stakeholder Engagement",
      desc: "Procedural guidelines for facilitating public participation, citizen feedback, and stakeholder consultations in high-value public sector projects. (Section 43)",
      fileSize: "1.4 MB"
    },
    {
      date: "Aug 2026",
      category: "Methodology Frameworks",
      title: "Administrative Penalties Schedule",
      desc: "The official schedule specifying indicative penalty bands for different categories of contraventions and non-compliance under the Act. (Section 59)",
      fileSize: "1.1 MB"
    }
  ];

  const filteredDocuments = documents.filter(doc => doc.category === activeFilter);

  // --- TAB AUTOPLAY LOGIC ---
  useEffect(() => {
    if (isHovered || prefersReduced) return;

    const interval = setInterval(() => {
      setActiveFilter((current) => {
        const currentIndex = filters.indexOf(current);
        const nextIndex = (currentIndex + 1) % filters.length;
        return filters[nextIndex];
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [isHovered, prefersReduced]);

  return (
    <div style={{ position: "relative", backgroundColor: "#F4F5F0", minHeight: "100vh", overflowX: "hidden" }}>
      
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          /* YOUTUBE PLAYLIST MARQUEE */
          @keyframes scrollPlaylist {
            0% { transform: translateY(0); }
            100% { transform: translateY(-33.3333%); } /* Shift by one full set of 3 items */
          }

          .playlist-container {
            overflow: hidden;
            position: relative;
            height: 520px; /* Fixed height to match main viewer */
            mask-image: linear-gradient(to bottom, transparent, black 5%, black 95%, transparent);
            -webkit-mask-image: linear-gradient(to bottom, transparent, black 5%, black 95%, transparent);
          }

          .playlist-track {
            display: flex;
            flex-direction: column;
            gap: 16px;
            animation: scrollPlaylist 30s linear infinite;
          }

          /* Pause on hover */
          .playlist-container:hover .playlist-track {
            animation-play-state: paused;
          }

          /* On mobile, turn vertical playlist into horizontal swipeable row */
          @media (max-width: 992px) {
            .playlist-container {
              height: auto;
              overflow-x: auto;
              scroll-snap-type: x mandatory;
              mask-image: none;
              -webkit-mask-image: none;
              padding-bottom: 16px;
            }
            .playlist-track {
              flex-direction: row;
              animation: none;
            }
            .playlist-card-wrapper {
              scroll-snap-align: start;
              width: 280px;
              flex-shrink: 0;
            }
          }

          /* FIX FOR DOWNLOAD BUTTON ON MOBILE */
          @media (max-width: 480px) {
            .download-btn-mobile-fix {
              width: 100% !important;
              display: flex !important;
              justify-content: center !important;
              align-items: center !important;
            }
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
          opacity: 0.03, filter: "grayscale(10%)",
        }}
      />

      {/* CONTENT ABOVE LOGO */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* SECTION 1: YOUTUBE STYLE NEWS PLAYER */}
        <section ref={heroRef} style={{ backgroundColor: "rgba(0,31,63,0.98)", padding: "100px 24px 120px", position: "relative", overflow: "hidden" }}>
          
          <motion.div style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: "-15%",
            backgroundImage: "url(/coat-of-arms.png)", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "right -100px center", 
            opacity: 0.05, zIndex: 0, y: prefersReduced ? 0 : heroBgY, scale: prefersReduced ? 1 : heroScale,
          }} />

          <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            
            <motion.div style={{ marginBottom: "50px", textAlign: "center", y: prefersReduced ? 0 : heroContentY, opacity: prefersReduced ? 1 : heroOpacity }}>
              <h1 style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: "800", color: "#FFFFFF", margin: "0 0 16px 0", lineHeight: "1.1" }}>
                <RevealText text="News & Publications" delay={0.1} />
              </h1>
              <p style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "#CBD5E1", maxWidth: "700px", lineHeight: "1.6", margin: "0 auto" }}>
                <RevealText text="Official statutory notices, annual reports, guidelines, and frameworks issued by the Value for Money Office in accordance with Act 1172." delay={0.3} wordDelay={0.02} />
              </p>
            </motion.div>

            {/* YOUTUBE THEATER MODE GRID */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px" }}>
              
              {/* Custom CSS Grid that responds to desktop */}
              <style>{`
                @media (min-width: 992px) {
                  .theater-grid { grid-template-columns: 2fr 1fr !important; }
                }
              `}</style>

              <div className="theater-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px" }}>
                
                {/* LEFT: MAIN VIEWER */}
                <Reveal delay={0.1} y={30}>
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeNoticeIndex}
                      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={prefersReduced ? { opacity: 1 } : { opacity: 0, position: "absolute" }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      style={{ 
                        backgroundColor: "#0A2E4D", borderRadius: "16px", overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column",
                        height: "100%", boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                      }}
                    >
                      {/* Main Image */}
                      <div style={{ position: "relative", height: "300px", overflow: "hidden" }}>
                        <img 
                          src={notices[activeNoticeIndex].image} 
                          alt="" 
                          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                        />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,46,77,0) 20%, rgba(10,46,77,1) 100%)" }} />
                        <div style={{ position: "absolute", top: "24px", left: "24px", backgroundColor: "#FCD116", color: "#001F3F", padding: "6px 14px", borderRadius: "4px", fontSize: "12px", fontWeight: "800", letterSpacing: "1px", textTransform: "uppercase" }}>
                          {notices[activeNoticeIndex].tag}
                        </div>
                      </div>

                      {/* Main Content */}
                      <div style={{ padding: "0 24px 32px", display: "flex", flexDirection: "column", flex: 1, marginTop: "-20px", position: "relative", zIndex: 2 }}>
                        <span style={{ fontSize: "13px", color: "#94A3B8", fontWeight: "600", marginBottom: "12px", display: "block" }}>
                          {notices[activeNoticeIndex].date}
                        </span>
                        <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: "800", color: "#FFFFFF", margin: "0 0 16px 0", lineHeight: "1.2" }}>
                          {notices[activeNoticeIndex].title}
                        </h2>
                        <p style={{ fontSize: "15px", color: "#CBD5E1", lineHeight: "1.7", margin: "0 0 24px 0", flex: 1 }}>
                          {notices[activeNoticeIndex].desc}
                        </p>
                        
                        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "13px", color: "#64748B" }}>Value for Money Office</span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </Reveal>

                {/* RIGHT: VERTICAL PLAYLIST (Marquee) */}
                <div>
                  <div style={{ marginBottom: "16px", paddingLeft: "8px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#FFFFFF", margin: 0 }}>Up Next</h3>
                  </div>
                  <div className="playlist-container hide-scrollbar">
                    <div className="playlist-track">
                      {playlistNotices.map((notice, index) => {
                        const originalIndex = index % notices.length;
                        const isActive = activeNoticeIndex === originalIndex;
                        
                        return (
                          <div 
                            key={index} 
                            className="playlist-card-wrapper"
                            onClick={() => setActiveNoticeIndex(originalIndex)}
                          >
                            <motion.div 
                              whileHover={prefersReduced ? {} : { backgroundColor: isActive ? "#133E66" : "#1A426B" }}
                              style={{ 
                                backgroundColor: isActive ? "#133E66" : "#0A2E4D", 
                                borderRadius: "12px", padding: "16px",
                                border: isActive ? "1px solid #FCD116" : "1px solid rgba(255,255,255,0.1)", 
                                display: "flex", gap: "16px", cursor: "pointer",
                                transition: "background-color 0.2s ease, border-color 0.2s ease"
                              }}
                            >
                              {/* Thumbnail */}
                              <div style={{ width: "100px", height: "70px", borderRadius: "6px", overflow: "hidden", flexShrink: 0 }}>
                                <img src={notice.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              </div>
                              
                              {/* Text */}
                              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <span style={{ fontSize: "10px", fontWeight: "800", color: isActive ? "#FCD116" : "#94A3B8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
                                  {notice.tag}
                                </span>
                                <h4 style={{ fontSize: "13px", fontWeight: "700", color: isActive ? "#FFFFFF" : "#CBD5E1", margin: 0, lineHeight: "1.4", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                  {notice.title}
                                </h4>
                              </div>
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PUBLICATIONS */}
        <section style={{ backgroundColor: "#F4F5F0", padding: "80px 24px 100px", position: "relative", zIndex: 2 }}>
          <div style={{ position: "absolute", top: "-40px", left: 0, right: 0, height: "80px", backgroundColor: "#F4F5F0", borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }} />

          <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 3 }}>
            
            <Reveal>
              <div style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: "800", color: "#001F3F", margin: 0 }}>
                  <RevealText text="Official Publications Repository" delay={0.05} />
                </h2>
              </div>
            </Reveal>

            {/* Filter Tabs - Fixed for Mobile with minWidth */}
            <Reveal delay={0.1}>
              <div 
                className="hide-scrollbar"
                style={{ 
                  display: "flex", 
                  gap: "12px", 
                  marginBottom: "40px",
                  overflowX: "auto", 
                  paddingBottom: "12px", 
                  flexWrap: "nowrap",
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  width: "100%",
                  minWidth: 0 /* Crucial for flex children to allow scrolling instead of squishing */
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={() => setIsHovered(true)}
                onTouchEnd={() => setIsHovered(false)}
              >
                {filters.map((filter) => {
                  const isActive = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      style={{
                        padding: "12px 24px", 
                        borderRadius: "6px", 
                        fontSize: "14px", 
                        fontWeight: "700", 
                        cursor: "pointer",
                        border: isActive ? "1px solid #001F3F" : "1px solid #CBD5E1",
                        backgroundColor: isActive ? "#001F3F" : "#FFFFFF",
                        color: isActive ? "#FFFFFF" : "#475569",
                        transition: "all 0.2s ease", 
                        flexShrink: 0, 
                        whiteSpace: "nowrap",
                        boxShadow: isActive ? "0 4px 12px rgba(0,31,63,0.15)" : "none",
                        scrollSnapAlign: "start",
                        minWidth: "max-content" /* Force button to fit its text without wrapping */
                      }}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* ACTIVE CATEGORY DISPLAY */}
            <div style={{ minHeight: "350px" }}>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeFilter}
                  initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{ 
                    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", 
                    gap: "24px"
                  }}
                >
                  {filteredDocuments.map((doc, index) => (
                    <motion.div 
                      key={index} 
                      whileHover={prefersReduced ? {} : { y: -4, boxShadow: "0 20px 40px -10px rgba(0,31,63,0.08)", borderColor: "#CBD5E1" }}
                      style={{ 
                        backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "32px", 
                        display: "flex", flexDirection: "column", 
                        boxShadow: "0 4px 6px rgba(0,0,0,0.02)", border: "1px solid #E2E8F0", 
                        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                        cursor: "pointer",
                        position: "relative",
                        overflow: "hidden"
                      }}
                    >
                      {/* Top row: Hand-drawn Icon and Date */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                        <div style={{ 
                          width: "56px", height: "56px", borderRadius: "16px", backgroundColor: "#F0F4F8", 
                          display: "flex", alignItems: "center", justifyContent: "center" 
                        }}>
                          <HandDrawnDocument />
                        </div>
                        <span style={{ fontSize: "13px", color: "#64748B", fontWeight: "600", backgroundColor: "#F8FAFC", padding: "4px 10px", borderRadius: "4px" }}>
                          {doc.date}
                        </span>
                      </div>

                      {/* Title & Category */}
                      <span style={{ fontSize: "11px", fontWeight: "800", color: "#8B7355", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px", display: "block" }}>
                        {doc.category}
                      </span>
                      <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: "0 0 16px 0", lineHeight: "1.4" }}>
                        {doc.title}
                      </h3>

                      {/* Description */}
                      <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", margin: "0 0 32px 0", flex: 1 }}>
                        {doc.desc}
                      </p>

                      {/* Action Area - Fixed Mobile Layout */}
                      <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: "24px", display: "flex", justifyContent: "flex-end" }}>
                        <button 
                          className="download-btn-mobile-fix"
                          style={{ 
                            backgroundColor: "#001F3F", color: "#FFFFFF", border: "none", 
                            padding: "12px 24px", borderRadius: "8px", fontSize: "14px", 
                            fontWeight: "700", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px",
                            transition: "background-color 0.2s ease, transform 0.1s ease",
                            whiteSpace: "nowrap" /* Prevents text from wrapping inside the button */
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#0A2E4D"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#001F3F"; }}
                          onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.97)"}
                          onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                          <HandDrawnDownloadIcon />
                          Download
                          <span style={{ opacity: 0.7, fontWeight: "500", fontSize: "13px" }}>({doc.fileSize})</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {filteredDocuments.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 24px", backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px dashed #CBD5E1" }}>
                <p style={{ fontSize: "16px", color: "#64748B", margin: 0 }}>No documents found in this category yet.</p>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}