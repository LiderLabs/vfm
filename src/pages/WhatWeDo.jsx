import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

// --- SERIOUS.BUSINESS STYLE STACKING CARD WRAPPER ---
const StackCard = ({ children, index, id, total }) => {
  const cardRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 900px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  // Background card scales down subtly as the next card slides over it
  const scale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1 : 0.95]);

  return (
    <div
      ref={cardRef}
      id={id}
      style={{
        position: isMobile ? "relative" : "sticky",
        // Incremental sticky offset creates the visible tabbed stack like in the video
        top: isMobile ? "auto" : `calc(80px + ${index * 16}px)`,
        zIndex: index + 1,
        width: "100%",
        marginBottom: isMobile ? "32px" : `${(total - index) * 10}px`,
      }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: "top center",
          borderRadius: "28px",
          // Deep upward shadow so the incoming card visibly casts a shadow onto the previous card
          boxShadow: isMobile ? "0 10px 25px rgba(0,0,0,0.06)" : "0 -18px 45px rgba(0, 0, 0, 0.16)",
          overflow: "hidden",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default function WhatWeDo() {
  const { hash } = useLocation();
  const [activePillar, setActivePillar] = useState(0);

  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  // Alternating card themes (Light vs Navy) to maximize visual overlap contrast
  const pillars = [
    {
      id: "assessments",
      category: "Assessments",
      title: "Pre-Contract & Technical VfM Assessments",
      description: "Conducting mandatory ex-ante reviews of major capital projects to ensure proposed costs are reasonable and represent maximum value before public funds are committed.",
      detailText: "Our technical teams examine the intricacies of every proposal, from conducting detailed bid evaluations to applying value engineering principles. We work to establish accurate cost benchmarks, ensuring that the government is not paying inflated prices before a single contract is signed.",
      image: "/site-review.jpg",
      isDark: false,
      bgColor: "#FFFFFF",
      textColor: "#0F172A",
      subColor: "#475569",
    },
    {
      id: "evaluation",
      category: "Evaluation",
      title: "Project Scrutiny & Impact Evaluation",
      description: "Continuous monitoring of ongoing infrastructure to prevent cost overruns and post-implementation audits to measure actual socio-economic impact.",
      detailText: "A contract award is not the finish line; it is the starting block. We deploy compliance audits and rigorous impact metrics to track progress on the ground, proactively identifying risks and preventing the costly delays that derail public projects.",
      image: "/boardroom.jpg",
      isDark: true,
      bgColor: "#001F3F", // Deep Navy Card
      textColor: "#FFFFFF",
      subColor: "#CBD5E1",
    },
    {
      id: "utilisation",
      category: "Utilisation",
      title: "Public Expenditure Utilisation Review",
      description: "Tracking the actual disbursement and utilisation of funds across Metropolitan, Municipal, and District Assemblies to ensure fiscal discipline.",
      detailText: "By auditing how funds are actually disbursed to the MMDAs, we ensure that fiscal discipline is maintained at the local level. Our review process tracks the journey of every Cedi from the national treasury to its intended project site.",
      image: "/utilisation-bg.jpg",
      isDark: false,
      bgColor: "#F8F9FA", // Crisp Warm Pearl
      textColor: "#0F172A",
      subColor: "#475569",
    },
    {
      id: "benchmarks",
      category: "Benchmarks",
      title: "Performance & Service Delivery Benchmarking",
      description: "Establishing rigorous public sector metrics to compare unit costs and service outputs against regional peer nations and international standards.",
      detailText: "We develop comprehensive unit cost metrics and delivery standards that allow us to compare Ghana's public projects against regional peers. This data-driven approach ensures that our procurement practices remain competitive and efficient on a global scale.",
      image: "/about-bg.jpg",
      isDark: false,
      bgColor: "#FFFFFF",
      textColor: "#0F172A",
      subColor: "#475569",
    },
    {
      id: "standards",
      category: "Standards",
      title: "Research, Standards & Technical Guidance",
      description: "Formulating national reference manuals, standardized costing guides, and econometric models to inform evidence-based public policy decisions.",
      detailText: "To institutionalize value for money, we publish gazetted reference manuals and standardized costing guides. Our econometric lifecycle models provide policymakers with the evidence-based tools they need to make informed decisions on major capital expenditures.",
      image: "/site-review.jpg",
      isDark: true,
      bgColor: "#0F172A", // Slate Charcoal Card
      textColor: "#FFFFFF",
      subColor: "#CBD5E1",
    },
    {
      id: "training",
      category: "Training",
      title: "Institutional Capacity Building & Training",
      description: "Equipping procurement officers, ministry executives, and local government leaders with the technical skills required to execute value-for-money protocols.",
      detailText: "We believe that sustainable change requires empowered people. Through executive seminars and technical certification programs, we equip procurement officers and local government leaders with the skills necessary to enforce value-for-money protocols in their daily operations.",
      image: "/boardroom.jpg",
      isDark: false,
      bgColor: "#FFFFFF",
      textColor: "#0F172A",
      subColor: "#475569",
    }
  ];

  // Auto-slide hero
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePillar((prev) => (prev === pillars.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [pillars.length]);

  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setActivePillar((prev) => (prev === pillars.length - 1 ? 0 : prev + 1));
    }
    if (isRightSwipe) {
      setActivePillar((prev) => (prev === 0 ? pillars.length - 1 : prev - 1));
    }

    touchStart.current = null;
    touchEnd.current = null;
  };

  const handleExploreClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ backgroundColor: "#F4F5F0", minHeight: "100vh", overflowX: "hidden", fontFamily: "'Inter', sans-serif" }}>
      <style>
        {`
          .explore-btn-fix {
            width: 100% !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            white-space: nowrap !important;
            box-sizing: border-box !important;
          }
          @media (min-width: 768px) {
            .explore-btn-fix {
              width: auto !important;
              display: inline-flex !important;
            }
          }
          .hero-track {
            display: flex;
            height: 100%;
            transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1);
          }
        `}
      </style>

      {/* 1. CINEMATIC SLIDESHOW HERO */}
      <section style={{ position: "relative", backgroundColor: "#001F3F", overflow: "hidden", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <div style={{ position: "relative", zIndex: 10, padding: "40px 24px 24px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          <h1 style={{ fontSize: "42px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 12px 0", lineHeight: "1.1", maxWidth: "800px", textShadow: "0 4px 12px rgba(0,0,0,0.8)" }}>
            Operational Scope & Focus Areas
          </h1>
          <p style={{ fontSize: "18px", color: "#E2E8F0", maxWidth: "650px", margin: 0, lineHeight: "1.6", textShadow: "0 2px 6px rgba(0,0,0,0.8)" }}>
            The Office deploys multidisciplinary technical teams to execute targeted evaluations across six primary institutional areas.
          </p>
        </div>

        <div 
          style={{ position: "relative", flex: 1, overflow: "hidden", width: "100%" }}
          onTouchStart={handleTouchStart} 
          onTouchMove={handleTouchMove} 
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="hero-track"
            style={{ transform: `translateX(-${activePillar * 100}%)` }}
          >
            {pillars.map((pillar) => (
              <div 
                key={pillar.id} 
                style={{ 
                  minWidth: "100%", width: "100%", position: "relative", display: "flex", alignItems: "center"
                }}
              >
                <div style={{ 
                  position: "absolute", top: 0, left: 0, right: 0, bottom: 0, 
                  backgroundImage: `url(${pillar.image})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.65, zIndex: 0 
                }} />
                
                <div style={{ 
                  position: "absolute", top: 0, left: 0, right: 0, bottom: 0, 
                  background: "linear-gradient(180deg, rgba(0,31,63,0.2) 0%, rgba(0,31,63,0.95) 100%)", zIndex: 1 
                }} />

                <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "40px 24px 100px", position: "relative", zIndex: 2 }}>
                  <div style={{ marginBottom: "16px" }}>
                    <span style={{ fontSize: "14px", fontWeight: "800", color: "#FCD116", textTransform: "uppercase", letterSpacing: "1.5px", textShadow: "0 2px 5px rgba(0,0,0,0.8)" }}>
                      {pillar.category}
                    </span>
                  </div>

                  <h2 style={{ fontSize: "48px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 24px 0", lineHeight: "1.2", maxWidth: "900px", textShadow: "0 4px 12px rgba(0,0,0,0.8)" }}>
                    {pillar.title}
                  </h2>
                  
                  <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#CBD5E1", maxWidth: "800px", marginBottom: "40px", textShadow: "0 2px 6px rgba(0,0,0,0.8)" }}>
                    {pillar.description}
                  </p>

                  <button 
                    onClick={() => handleExploreClick(pillar.id)} 
                    className="explore-btn-fix" 
                    style={{ 
                      backgroundColor: "#FCD116", color: "#001F3F", border: "none", padding: "16px 40px", 
                      borderRadius: "4px", fontSize: "16px", fontWeight: "800", cursor: "pointer", 
                      transition: "transform 0.2s ease", boxShadow: "0 4px 15px rgba(252, 209, 22, 0.4)" 
                    }} 
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} 
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                    Explore Focus Area
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "12px", zIndex: 10 }}>
            {pillars.map((_, index) => (
              <div 
                key={index} 
                onClick={() => setActivePillar(index)} 
                style={{ 
                  width: index === activePillar ? "40px" : "12px", height: "12px", borderRadius: "6px", 
                  backgroundColor: index === activePillar ? "#FCD116" : "rgba(255,255,255,0.4)", 
                  transition: "all 0.4s ease", cursor: "pointer", boxShadow: "0 2px 5px rgba(0,0,0,0.5)"
                }} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE STACKING CARDS DECK (SERIOUS.BUSINESS STYLE OVERLAPPING ANIMATION) */}
      <div style={{ backgroundColor: "#F4F5F0", padding: "80px 24px 160px" }}>
        
        {/* Intro Headline */}
        <div style={{ maxWidth: "1200px", margin: "0 auto 60px", textAlign: "center" }}>
          <span style={{ fontSize: "12px", fontWeight: "800", color: "#8B7355", textTransform: "uppercase", letterSpacing: "1.5px", display: "block", marginBottom: "12px" }}>
            Statutory Focus
          </span>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: "900", color: "#001F3F", margin: "0 0 16px 0", letterSpacing: "-0.5px" }}>
            Statutory Methodology & Areas
          </h2>
          <p style={{ color: "#475569", fontSize: "18px", margin: "0 auto", maxWidth: "600px", lineHeight: "1.6" }}>
            Detailed breakdown of our evaluations from early pre-contract reviews to lifecycle audit.
          </p>
        </div>

        {/* Stack Container */}
        <div style={{ maxWidth: "1300px", margin: "0 auto", position: "relative" }}>
          {pillars.map((pillar, index) => (
            <StackCard 
              key={pillar.id} 
              index={index} 
              id={pillar.id} 
              total={pillars.length}
            >
              <div 
                style={{ 
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 500px), 1fr))",
                  backgroundColor: pillar.bgColor,
                  alignItems: "stretch",
                  minHeight: "560px",
                  borderRadius: "28px",
                  overflow: "hidden",
                  border: pillar.isDark ? "none" : "1px solid #E2E8F0"
                }}
              >
                {/* Image Side */}
                <div style={{ order: index % 2 === 0 ? 1 : 2, position: "relative", width: "100%", height: "100%", minHeight: "360px" }}>
                  <img 
                    src={pillar.image} 
                    alt={pillar.title} 
                    style={{ 
                      position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                      objectFit: "cover", objectPosition: "center", display: "block" 
                    }} 
                  />
                  <div style={{ position: "absolute", inset: 0, background: pillar.isDark ? "linear-gradient(to top, rgba(0,31,63,0.5) 0%, transparent 60%)" : "linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 60%)" }} />
                </div>
                
                {/* Content Side */}
                <div style={{ 
                  order: index % 2 === 0 ? 2 : 1, 
                  padding: "60px 48px", 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "center" 
                }}>
                  {/* Category Tag (Pure category, no 'Pillar 01/02') */}
                  <div style={{ marginBottom: "16px" }}>
                    <span style={{ 
                      fontSize: "12px", 
                      fontWeight: "800", 
                      color: pillar.isDark ? "#FCD116" : "#8B7355", 
                      backgroundColor: pillar.isDark ? "rgba(252, 209, 22, 0.12)" : "rgba(139, 115, 85, 0.08)",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      textTransform: "uppercase", 
                      letterSpacing: "1.5px",
                      display: "inline-block"
                    }}>
                      {pillar.category}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: "900", color: pillar.textColor, margin: "0 0 20px 0", lineHeight: "1.2", letterSpacing: "-0.5px" }}>
                    {pillar.title}
                  </h3>

                  <p style={{ fontSize: "17px", lineHeight: "1.7", color: pillar.subColor, marginBottom: "18px", fontWeight: "500" }}>
                    {pillar.description}
                  </p>
                  
                  <p style={{ fontSize: "15px", lineHeight: "1.7", color: pillar.subColor, opacity: 0.9, marginBottom: "36px" }}>
                    {pillar.detailText}
                  </p>

                  {/* AUTHORITATIVE ACTION BUTTON */}
                  <Link 
                    to="/contact" 
                    style={{ 
                      display: "inline-flex", 
                      alignItems: "center", 
                      gap: "10px", 
                      backgroundColor: pillar.isDark ? "#FCD116" : "#001F3F", 
                      color: pillar.isDark ? "#001F3F" : "#FFFFFF", 
                      padding: "16px 32px", 
                      borderRadius: "6px", 
                      fontSize: "15px", 
                      fontWeight: "800", 
                      textDecoration: "none", 
                      transition: "all 0.2s ease", 
                      alignSelf: "flex-start",
                      boxShadow: pillar.isDark ? "0 4px 15px rgba(252, 209, 22, 0.3)" : "0 4px 15px rgba(0, 31, 63, 0.15)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.backgroundColor = pillar.isDark ? "#FFDE45" : "#0A2E4D";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.backgroundColor = pillar.isDark ? "#FCD116" : "#001F3F";
                    }}
                  >
                    Engage Our Technical Team
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </div>
              </div>
            </StackCard>
          ))}
        </div>
      </div>
    </div>
  );
}