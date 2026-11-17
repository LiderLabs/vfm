import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { getPublications, LS_PUBLICATIONS_EVENT } from "../cms/services/mockData";

// ---------- NEWS SETTINGS ----------
const LIST_SPEED = 28;
const LIST_RESUME_MS = 3000;
const ROTATE_MS = 7000;
const ROTATE_RESUME_MS = 15000;

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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const HandDrawnClose = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
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
        height: "100%",
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
  const [isMobile, setIsMobile] = useState(false);

  const [activeNoticeIndex, setActiveNoticeIndex] = useState(0);
  const [activeDocIndex, setActiveDocIndex] = useState(null);
  const [isFullScreenNotice, setIsFullScreenNotice] = useState(false);

  const prefersReduced = useReducedMotion();

  const mobileNewsRef = useRef(null);
  const mobileDocsRef = useRef(null);
  const playlistRef = useRef(null);

  const [isNewsInteracting, setIsNewsInteracting] = useState(false);
  const [isDocsInteracting, setIsDocsInteracting] = useState(false);

  const newsTimerRef = useRef(null);
  const docsTimerRef = useRef(null);

  const listHoverRef = useRef(false);
  const featHoverRef = useRef(false);
  const lastUserRef = useRef(0);
  const holdUntilRef = useRef(0);
  const pickedAtRef = useRef(-1e9);
  const fullRef = useRef(false);
  const pushedRef = useRef(false);

  const [notices, setNotices] = useState(() => getPublications());

  useEffect(() => {
    const refresh = () => setNotices(getPublications());
    window.addEventListener(LS_PUBLICATIONS_EVENT, refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener(LS_PUBLICATIONS_EVENT, refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 992px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    "Advisory Briefs",
  ];

  const documents = [
    { date: "Jan 2027", category: "Annual Reviews", title: "2026 Annual Report to Parliament", desc: "The Office's inaugural annual report on the activities, operations, and financial performance of the VFMO Office, including a summary of public savings realised. (Section 26)", fileSize: "3.2 MB" },
    { date: "Dec 2026", category: "Annual Reviews", title: "Q4 2026 VFMO Assessment Findings", desc: "A quarterly publication summarising systemic inefficiencies identified during value for money assessments and policy recommendations arising from them. (Section 39)", fileSize: "1.9 MB" },
    { date: "Nov 2026", category: "Methodology Frameworks", title: "National Cost Benchmarks for Civil Works (2026)", desc: "Standardised cost benchmarks for commonly procured goods, works, and services to be used by covered entities in planning and budgeting. (Section 36)", fileSize: "4.5 MB" },
    { date: "Oct 2026", category: "VFMO Evaluation Guidelines", title: "Standard Operating Procedures for Pre-Award Assessments", desc: "Technical guidelines detailing the methodology for independent evaluation of cost estimates, technical specifications, and value justification prior to contract execution. (Section 34)", fileSize: "2.1 MB" },
    { date: "Sep 2026", category: "Advisory Briefs", title: "Guidelines for Public Stakeholder Engagement", desc: "Procedural guidelines for facilitating public participation, citizen feedback, and stakeholder consultations in high-value public sector projects. (Section 43)", fileSize: "1.4 MB" },
    { date: "Aug 2026", category: "Methodology Frameworks", title: "Administrative Penalties Schedule", desc: "The official schedule specifying indicative penalty bands for different categories of contraventions and non-compliance under the Act. (Section 59)", fileSize: "1.1 MB" },
  ];

  const desktopFilteredDocuments = documents.filter((doc) => doc.category === activeFilter);
  const mobileDisplayedDocuments = documents;

  const safeIndex = notices.length ? Math.min(activeNoticeIndex, notices.length - 1) : 0;
  const featuredNotice = notices[safeIndex];
  const activeNotice = isFullScreenNotice ? featuredNotice : null;
  fullRef.current = isFullScreenNotice;

  const pickNotice = useCallback((index) => {
    setActiveNoticeIndex(index);
    pickedAtRef.current = performance.now();
    lastUserRef.current = performance.now();
  }, []);

  const openFull = useCallback(() => {
    setIsFullScreenNotice(true);
    try {
      window.history.pushState({ ...(window.history.state || {}), vfmNews: true }, "");
      pushedRef.current = true;
    } catch (e) {
      pushedRef.current = false;
    }
  }, []);

  const closeFull = useCallback(() => {
    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back();
    } else {
      setIsFullScreenNotice(false);
    }
  }, []);

  useEffect(() => {
    if (!isFullScreenNotice) return;
    const onPop = () => {
      pushedRef.current = false;
      setIsFullScreenNotice(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") closeFull();
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isFullScreenNotice, closeFull]);

  useEffect(() => {
    if (notices.length < 2 || prefersReduced || isMobile) return;
    const id = setInterval(() => {
      const now = performance.now();
      if (featHoverRef.current || listHoverRef.current || fullRef.current) return;
      if (now - pickedAtRef.current < ROTATE_RESUME_MS) return;
      setActiveNoticeIndex((p) => (p + 1) % notices.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [notices.length, prefersReduced, isMobile]);

  useEffect(() => {
    const list = playlistRef.current;
    if (isMobile || !list) return;
    const card = list.querySelector(`[data-news-index="${safeIndex}"]`);
    if (!card) return;
    const top = card.offsetTop, bottom = top + card.offsetHeight;
    if (top < list.scrollTop || bottom > list.scrollTop + list.clientHeight) {
      holdUntilRef.current = performance.now() + 1000;
      list.scrollTo({ top: Math.max(0, top - 8), behavior: "smooth" });
    }
  }, [safeIndex, isMobile]);

  useEffect(() => {
    if (isMobile || prefersReduced) return;
    const el = playlistRef.current;
    if (!el) return;
    let raf, last = performance.now(), pos = el.scrollTop, dir = 1, hold = 0;
    const tick = (now) => {
      const dt = Math.min(now - last, 50);
      last = now;
      const max = el.scrollHeight - el.clientHeight;
      const paused = listHoverRef.current || now < Math.max(lastUserRef.current + LIST_RESUME_MS, holdUntilRef.current);
      if (max > 4 && !paused) {
        if (Math.abs(el.scrollTop - pos) > 2) pos = el.scrollTop;
        if (hold > 0) {
          hold -= dt;
        } else {
          pos += dir * (dir > 0 ? LIST_SPEED : LIST_SPEED * 3) * (dt / 1000);
          if (pos >= max) { pos = max; dir = -1; hold = 1500; }
          else if (pos <= 0) { pos = 0; dir = 1; hold = 1500; }
          el.scrollTop = pos;
        }
      } else {
        pos = el.scrollTop;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isMobile, prefersReduced, notices.length]);

  const touchList = () => { lastUserRef.current = performance.now(); };

  useEffect(() => {
    if (!isMobile || isNewsInteracting || prefersReduced) return;
    const startAutoScroll = () => {
      if (newsTimerRef.current) clearInterval(newsTimerRef.current);
      newsTimerRef.current = setInterval(() => {
        if (mobileNewsRef.current && !isNewsInteracting) {
          const container = mobileNewsRef.current;
          const maxScroll = container.scrollWidth - container.clientWidth;
          if (container.scrollLeft >= maxScroll - 10) {
            container.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            container.scrollBy({ left: 280, behavior: "smooth" });
          }
        }
      }, 3500);
    };
    startAutoScroll();
    return () => { if (newsTimerRef.current) clearInterval(newsTimerRef.current); };
  }, [isMobile, isNewsInteracting, prefersReduced]);

  const handleNewsTouchStart = () => {
    setIsNewsInteracting(true);
    if (newsTimerRef.current) clearInterval(newsTimerRef.current);
  };
  const handleNewsTouchEnd = () => {
    setTimeout(() => setIsNewsInteracting(false), 4000);
  };

  useEffect(() => {
    if (!isMobile || isDocsInteracting || prefersReduced) return;
    const startAutoScroll = () => {
      if (docsTimerRef.current) clearInterval(docsTimerRef.current);
      docsTimerRef.current = setInterval(() => {
        if (mobileDocsRef.current && !isDocsInteracting) {
          const container = mobileDocsRef.current;
          const maxScroll = container.scrollWidth - container.clientWidth;
          if (container.scrollLeft >= maxScroll - 10) {
            container.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            container.scrollBy({ left: 300, behavior: "smooth" });
          }
        }
      }, 4500);
    };
    startAutoScroll();
    return () => { if (docsTimerRef.current) clearInterval(docsTimerRef.current); };
  }, [isMobile, isDocsInteracting, prefersReduced]);

  const handleDocsTouchStart = () => {
    setIsDocsInteracting(true);
    if (docsTimerRef.current) clearInterval(docsTimerRef.current);
  };
  const handleDocsTouchEnd = () => {
    setTimeout(() => setIsDocsInteracting(false), 4000);
  };

  const fullText = activeNotice ? String(activeNotice.body || activeNotice.content || activeNotice.fullText || activeNotice.desc || "") : "";
  const paragraphs = fullText.split(/\n+/).filter((p) => p.trim());

  return (
    <div style={{ position: "relative", backgroundColor: "#F4F5F0", minHeight: "100vh", overflowX: "hidden", fontFamily: "'Inter', sans-serif" }}>
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

          .playlist-container {
            position: relative;
            height: 520px;
            overflow-y: auto;
            padding-right: 16px;
            overscroll-behavior: contain;
            scrollbar-width: thin;
            scrollbar-color: #FCD116 rgba(255,255,255,0.08);
          }
          .playlist-container::-webkit-scrollbar { width: 8px; }
          .playlist-container::-webkit-scrollbar-track { background: rgba(255,255,255,0.08); border-radius: 8px; }
          .playlist-container::-webkit-scrollbar-thumb { background: #FCD116; border-radius: 8px; }
          .playlist-container::-webkit-scrollbar-thumb:hover { background: #FFDE45; }

          .mobile-scroll-container {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            -ms-overflow-style: none;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 10px;
          }
          .mobile-scroll-container::-webkit-scrollbar { display: none; }
          
          .mobile-scroll-container::after {
            content: '';
            flex: 0 0 24px;
          }

          .mobile-news-card {
            scroll-snap-align: start;
            flex: 0 0 85%;
            max-width: 300px;
          }

          .mobile-doc-card {
            scroll-snap-align: start;
            flex: 0 0 85%;
            max-width: 320px;
            background-color: #FFFFFF;
            border-radius: 16px;
            border: 1px solid #E2E8F0;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }
        `}
      </style>

      <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: "url(/vfm-logo.png)", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "min(85vw, 900px)", opacity: 0.03, filter: "grayscale(10%)" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <section ref={heroRef} style={{ backgroundColor: "rgba(0,31,63,0.98)", padding: "100px 24px 120px", position: "relative", overflow: "hidden" }}>
          {/* VFM logo as the watermark in the news/hero section */}
          <motion.div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: "-15%", backgroundImage: "url(/vfm-logo.png)", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "right -100px center", opacity: 0.05, zIndex: 0, y: prefersReduced ? 0 : heroBgY, scale: prefersReduced ? 1 : heroScale }} />

          <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <motion.div style={{ marginBottom: "50px", textAlign: "center", y: prefersReduced ? 0 : heroContentY, opacity: prefersReduced ? 1 : heroOpacity }}>
              <h1 style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: "800", color: "#FFFFFF", margin: "0 0 16px 0", lineHeight: "1.1" }}>
                <RevealText text="News & Publications" delay={0.1} />
              </h1>
              <p style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "#CBD5E1", maxWidth: "700px", lineHeight: "1.6", margin: "0 auto" }}>
                <RevealText text="Official statutory notices, annual reports, guidelines, and frameworks issued by the Value for Money Office in accordance with Act 1172." delay={0.3} wordDelay={0.02} />
              </p>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px" }}>
              <style>{`@media (min-width: 992px) { .theater-grid { grid-template-columns: 2fr 1fr !important; } }`}</style>

              <div className="theater-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px" }}>
                
                {!isMobile && featuredNotice && (
                  <Reveal delay={0.1} y={30}>
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={featuredNotice.id || featuredNotice.title} 
                        initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.98 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={prefersReduced ? { opacity: 1 } : { opacity: 0 }} 
                        transition={{ duration: 0.4, ease: "easeOut" }} 
                        onClick={openFull}
                        onMouseEnter={() => { featHoverRef.current = true; }}
                        onMouseLeave={() => { featHoverRef.current = false; }}
                        role="button"
                        tabIndex={0}
                        aria-label={`Read the full news: ${featuredNotice.title}`}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openFull(); } }}
                        style={{ 
                          backgroundColor: "#0A2E4D", 
                          borderRadius: "16px", 
                          overflow: "hidden", 
                          border: "1px solid rgba(255,255,255,0.1)", 
                          display: "flex", 
                          flexDirection: "column", 
                          height: "100%", 
                          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                          cursor: "pointer",
                          outline: "none"
                        }}
                        whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0,0,0,0.4)" }}
                      >
                        <div style={{ position: "relative", height: "300px", overflow: "hidden" }}>
                          <img src={featuredNotice.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,46,77,0) 20%, rgba(10,46,77,1) 100%)" }} />
                          {featuredNotice.tag && (
                            <span style={{ position: "absolute", top: "30px", left: "30px", backgroundColor: "#FCD116", color: "#001F3F", fontSize: "12px", fontWeight: "800", letterSpacing: "2px", textTransform: "uppercase", padding: "8px 18px", borderRadius: "4px", zIndex: 2 }}>{featuredNotice.tag}</span>
                          )}
                        </div>
                        <div style={{ padding: "0 24px 32px", display: "flex", flexDirection: "column", flex: 1, marginTop: "-20px", position: "relative", zIndex: 2 }}>
                          <span style={{ fontSize: "13px", color: "#94A3B8", fontWeight: "600", marginBottom: "12px", display: "block" }}>{featuredNotice.date}</span>
                          <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: "800", color: "#FFFFFF", margin: "0 0 16px 0", lineHeight: "1.2" }}>{featuredNotice.title}</h2>
                          <p style={{ fontSize: "15px", color: "#CBD5E1", lineHeight: "1.7", margin: "0 0 24px 0", flex: 1 }}>{featuredNotice.desc}</p>
                          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "13px", color: "#64748B" }}>Value for Money Office</span>
                            <span style={{ fontSize: "13px", fontWeight: "700", color: "#FCD116" }}>Read Full Article →</span>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </Reveal>
                )}

                <div>
                  <div style={{ marginBottom: "16px", paddingLeft: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#FFFFFF", margin: 0 }}>{isMobile ? "Live Statutory Updates" : "Up Next"}</h3>
                  </div>

                  {!isMobile ? (
                    <div 
                      ref={playlistRef}
                      className="playlist-container"
                      onPointerEnter={() => { listHoverRef.current = true; }}
                      onPointerLeave={() => { listHoverRef.current = false; touchList(); }}
                      onWheel={touchList}
                      onPointerDown={touchList}
                      onTouchStart={touchList}
                      onTouchMove={touchList}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {notices.map((notice, index) => {
                          const isActive = safeIndex === index;
                          return (
                            <div key={notice.id ?? index} className="playlist-card-wrapper" data-news-index={index} onClick={() => pickNotice(index)}>
                              <motion.div whileHover={prefersReduced ? {} : { backgroundColor: isActive ? "#133E66" : "#1A426B" }} style={{ backgroundColor: isActive ? "#133E66" : "#0A2E4D", borderRadius: "12px", padding: "16px", border: isActive ? "1px solid #FCD116" : "1px solid rgba(255,255,255,0.1)", display: "flex", gap: "16px", cursor: "pointer", transition: "background-color 0.2s ease, border-color 0.2s ease" }}>
                                <div style={{ width: "100px", height: "70px", borderRadius: "6px", overflow: "hidden", flexShrink: 0 }}><img src={notice.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                  <span style={{ fontSize: "10px", fontWeight: "800", color: isActive ? "#FCD116" : "#94A3B8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>{notice.tag}</span>
                                  <h4 style={{ fontSize: "13px", fontWeight: "700", color: isActive ? "#FFFFFF" : "#CBD5E1", margin: 0, lineHeight: "1.4", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{notice.title}</h4>
                                </div>
                              </motion.div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div ref={mobileNewsRef} className="mobile-scroll-container" onTouchStart={handleNewsTouchStart} onTouchEnd={handleNewsTouchEnd}>
                      {notices.map((notice, index) => (
                        <div key={notice.id ?? index} className="mobile-news-card" onClick={() => { setActiveNoticeIndex(index); openFull(); }} style={{ backgroundColor: "#0A2E4D", borderRadius: "12px", padding: "14px", border: "1px solid rgba(255,255,255,0.12)", display: "flex", flexDirection: "column", gap: "14px", cursor: "pointer", flexShrink: 0, boxShadow: "0 8px 20px rgba(0,0,0,0.25)" }}>
                          <div style={{ width: "100%", height: "140px", borderRadius: "8px", overflow: "hidden" }}><img src={notice.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: "10px", fontWeight: "800", color: "#FCD116", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>{notice.tag}</span>
                            <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#FFFFFF", margin: 0, lineHeight: "1.4", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{notice.title}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: "#F4F5F0", padding: "80px 24px 100px", position: "relative", zIndex: 2 }}>
          <div style={{ position: "absolute", top: "-40px", left: 0, right: 0, height: "80px", backgroundColor: "#F4F5F0", borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }} />

          <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 3 }}>
            <Reveal>
              <div style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: "800", color: "#001F3F", margin: 0 }}>
                  <RevealText text="Official Publications Repository" delay={0.05} />
                </h2>
                {isMobile && <p style={{ fontSize: "13px", color: "#64748B", margin: "8px 0 0 0" }}>Swipe horizontally to browse all publications. Tap to read.</p>}
              </div>
            </Reveal>

            {!isMobile && (
              <Reveal delay={0.1}>
                <div className="tabs-container" style={{ display: "flex", gap: "12px", marginBottom: "40px", flexWrap: "nowrap" }}>
                  {filters.map((filter, index) => {
                    const isActive = activeFilter === filter;
                    return (
                      <button key={`${filter}-${index}`} onClick={() => setActiveFilter(filter)} style={{ padding: "12px 24px", borderRadius: "6px", fontSize: "14px", fontWeight: "700", cursor: "pointer", border: isActive ? "1px solid #001F3F" : "1px solid #CBD5E1", backgroundColor: isActive ? "#001F3F" : "#FFFFFF", color: isActive ? "#FFFFFF" : "#475569", transition: "all 0.2s ease", flexShrink: 0, whiteSpace: "nowrap", boxShadow: isActive ? "0 4px 12px rgba(0,31,63,0.15)" : "none", minWidth: "max-content" }}>
                        {filter}
                      </button>
                    );
                  })}
                </div>
              </Reveal>
            )}

            <div style={{ minHeight: "350px" }}>
              {!isMobile ? (
                <AnimatePresence mode="wait">
                  <motion.div key={activeFilter} initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "24px" }}>
                    {desktopFilteredDocuments.map((doc, index) => (
                      <motion.div key={index} whileHover={prefersReduced ? {} : { y: -4, boxShadow: "0 20px 40px -10px rgba(0,31,63,0.08)", borderColor: "#CBD5E1" }} style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", border: "1px solid #E2E8F0", transition: "border-color 0.3s ease, box-shadow 0.3s ease", position: "relative", overflow: "hidden" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                          <div style={{ width: "56px", height: "56px", borderRadius: "16px", backgroundColor: "#F0F4F8", display: "flex", alignItems: "center", justifyContent: "center" }}><HandDrawnDocument /></div>
                          <span style={{ fontSize: "13px", color: "#64748B", fontWeight: "600", backgroundColor: "#F8FAFC", padding: "4px 10px", borderRadius: "4px" }}>{doc.date}</span>
                        </div>
                        <span style={{ fontSize: "11px", fontWeight: "800", color: "#8B7355", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px", display: "block" }}>{doc.category}</span>
                        <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: "0 0 16px 0", lineHeight: "1.4" }}>{doc.title}</h3>
                        <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", margin: "0 0 32px 0", flex: 1 }}>{doc.desc}</p>
                        <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: "24px", display: "flex", justifyContent: "flex-end" }}>
                          <button style={{ backgroundColor: "#001F3F", color: "#FFFFFF", border: "none", padding: "12px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: "700", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", transition: "background-color 0.2s ease, transform 0.1s ease", whiteSpace: "nowrap" }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#0A2E4D"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#001F3F"; }} onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")} onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                            <HandDrawnDownloadIcon /> Download <span style={{ opacity: 0.7, fontWeight: "500", fontSize: "13px" }}>({doc.fileSize})</span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div ref={mobileDocsRef} className="mobile-scroll-container" onTouchStart={handleDocsTouchStart} onTouchEnd={handleDocsTouchEnd}>
                  {mobileDisplayedDocuments.map((doc, index) => (
                    <div key={index} className="mobile-doc-card" onClick={() => setActiveDocIndex(index)} style={{ cursor: "pointer" }}>
                      <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                          <div style={{ width: "46px", height: "46px", borderRadius: "12px", backgroundColor: "#F0F4F8", display: "flex", alignItems: "center", justifyContent: "center" }}><HandDrawnDocument /></div>
                          <span style={{ fontSize: "11px", color: "#64748B", fontWeight: "600", backgroundColor: "#F8FAFC", padding: "4px 8px", borderRadius: "4px" }}>{doc.date}</span>
                        </div>
                        <span style={{ fontSize: "10px", fontWeight: "800", color: "#8B7355", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px", display: "block" }}>{doc.category}</span>
                        <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#0F172A", margin: "0 0 12px 0", lineHeight: "1.35", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{doc.title}</h3>
                        <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.5", margin: "0 0 20px 0", flex: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{doc.desc}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: "700", color: "#001F3F", marginTop: "auto" }}>
                          Read & Download <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {activeNotice && (
          <motion.div initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#001F3F", zIndex: 9999, display: "flex", flexDirection: "column", overflowY: "auto" }}>
            <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, backgroundColor: "rgba(0,31,63,0.95)", backdropFilter: "blur(10px)", zIndex: 10 }}>
              <span style={{ color: "#FCD116", fontWeight: "800", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}>{activeNotice.tag}</span>
              <button onClick={closeFull} aria-label="Close" style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", cursor: "pointer" }}><HandDrawnClose /></button>
            </div>
            <div style={{ padding: "0 24px 40px", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
              <div style={{ borderRadius: "12px", overflow: "hidden", marginBottom: "24px", marginTop: "8px" }}><img src={activeNotice.image} alt="" style={{ width: "100%", height: "auto", maxHeight: "500px", objectFit: "cover", display: "block" }} /></div>
              <span style={{ fontSize: "13px", color: "#94A3B8", fontWeight: "600", marginBottom: "12px", display: "block" }}>{activeNotice.date}</span>
              <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: "800", color: "#FFFFFF", margin: "0 0 20px 0", lineHeight: "1.3" }}>{activeNotice.title}</h2>
              {paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: "18px", color: "#CBD5E1", lineHeight: "1.8", margin: "0 0 20px 0" }}>{p}</p>
              ))}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px", marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: "13px", color: "#64748B" }}>Value for Money Office</span></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeDocIndex !== null && (
          <motion.div initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#F4F5F0", zIndex: 9999, display: "flex", flexDirection: "column", overflowY: "auto" }}>
            <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, backgroundColor: "rgba(244,245,240,0.95)", backdropFilter: "blur(10px)", zIndex: 10, borderBottom: "1px solid #E2E8F0" }}>
              <span style={{ color: "#8B7355", fontWeight: "800", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}>{mobileDisplayedDocuments[activeDocIndex].category}</span>
              <button onClick={() => setActiveDocIndex(null)} style={{ background: "rgba(0,0,0,0.05)", border: "none", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", color: "#001F3F", cursor: "pointer" }}><HandDrawnClose /></button>
            </div>
            
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1, maxWidth: "900px", margin: "0 auto", width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "16px", backgroundColor: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}><HandDrawnDocument /></div>
                <div>
                  <span style={{ fontSize: "13px", color: "#64748B", fontWeight: "600", display: "block", marginBottom: "4px" }}>{mobileDisplayedDocuments[activeDocIndex].date}</span>
                  <span style={{ fontSize: "13px", color: "#001F3F", fontWeight: "700" }}>Size: {mobileDisplayedDocuments[activeDocIndex].fileSize}</span>
                </div>
              </div>
              <h2 style={{ fontSize: "26px", fontWeight: "800", color: "#0F172A", margin: "0 0 20px 0", lineHeight: "1.3" }}>{mobileDisplayedDocuments[activeDocIndex].title}</h2>
              <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.8", margin: "0 0 32px 0", flex: 1 }}>{mobileDisplayedDocuments[activeDocIndex].desc}</p>
            </div>

            <div style={{ padding: "24px", paddingBottom: "40px", backgroundColor: "#F4F5F0", position: "sticky", bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column" }}>
              <button 
                style={{ 
                  backgroundColor: "#001F3F", 
                  color: "#FFFFFF", 
                  border: "none", 
                  width: "100%", 
                  minWidth: "100%",
                  padding: "16px 20px", 
                  borderRadius: "8px", 
                  fontSize: "16px", 
                  fontWeight: "700", 
                  cursor: "pointer", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  gap: "10px",
                  boxSizing: "border-box",
                  boxShadow: "0 8px 20px rgba(0,31,63,0.2)",
                  marginBottom: "10px"
                }}
                onClick={() => setActiveDocIndex(null)}
              >
                <HandDrawnDownloadIcon />
                Download Official PDF
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}