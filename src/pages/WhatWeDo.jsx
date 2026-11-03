import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";

// --- SCROLL REVEAL ANIMATION COMPONENT ---
const ZoomReveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { setIsVisible(entry.isIntersecting); },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.95)",
        transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        width: "100%"
      }}
    >
      {children}
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
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const pillars = [
    {
      id: "assessments",
      category: "Assessments",
      title: "Pre-Contract & Technical VfM Assessments",
      description: "Conducting mandatory ex-ante reviews of major capital projects to ensure proposed costs are reasonable and represent maximum value before public funds are committed.",
      detailText: "Our technical teams examine the intricacies of every proposal, from conducting detailed bid evaluations to applying value engineering principles. We work to establish accurate cost benchmarks, ensuring that the government is not paying inflated prices before a single contract is signed.",
      image: "/site-review.jpg"
    },
    {
      id: "evaluation",
      category: "Evaluation",
      title: "Project Scrutiny & Impact Evaluation",
      description: "Continuous monitoring of ongoing infrastructure to prevent cost overruns and post-implementation audits to measure actual socio-economic impact.",
      detailText: "A contract award is not the finish line; it is the starting block. We deploy compliance audits and rigorous impact metrics to track progress on the ground, proactively identifying risks and preventing the costly delays that derail public projects.",
      image: "/boardroom.jpg"
    },
    {
      id: "utilisation",
      category: "Utilisation",
      title: "Public Expenditure Utilisation Review",
      description: "Tracking the actual disbursement and utilisation of funds across Metropolitan, Municipal, and District Assemblies to ensure fiscal discipline.",
      detailText: "By auditing how funds are actually disbursed to the MMDAs, we ensure that fiscal discipline is maintained at the local level. Our review process tracks the journey of every Cedi from the national treasury to its intended project site.",
      image: "/building-bg.jpg"
    },
    {
      id: "benchmarks",
      category: "Benchmarks",
      title: "Performance & Service Delivery Benchmarking",
      description: "Establishing rigorous public sector metrics to compare unit costs and service outputs against regional peer nations and international standards.",
      detailText: "We develop comprehensive unit cost metrics and delivery standards that allow us to compare Ghana's public projects against regional peers. This data-driven approach ensures that our procurement practices remain competitive and efficient on a global scale.",
      image: "/about-bg.jpg"
    },
    {
      id: "standards",
      category: "Standards",
      title: "Research, Standards & Technical Guidance",
      description: "Formulating national reference manuals, standardized costing guides, and econometric models to inform evidence-based public policy decisions.",
      detailText: "To institutionalize value for money, we publish gazetted reference manuals and standardized costing guides. Our econometric lifecycle models provide policymakers with the evidence-based tools they need to make informed decisions on major capital expenditures.",
      image: "/site-review.jpg"
    },
    {
      id: "training",
      category: "Training",
      title: "Institutional Capacity Building & Training",
      description: "Equipping procurement officers, ministry executives, and local government leaders with the technical skills required to execute value-for-money protocols.",
      detailText: "We believe that sustainable change requires empowered people. Through executive seminars and technical certification programs, we equip procurement officers and local government leaders with the skills necessary to enforce value-for-money protocols in their daily operations.",
      image: "/boardroom.jpg"
    }
  ];

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

  const handleExploreClick = () => {
    const targetId = pillars[activePillar].id;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh", overflowX: "hidden" }}>
      
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
        `}
      </style>

      {/* 1. INTERACTIVE DARK SECTION */}
      <section style={{ position: "relative", backgroundColor: "#001F3F", padding: "100px 24px 80px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/building-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.65, zIndex: 0 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(0,31,63,0.5) 0%, rgba(0,31,63,0.95) 100%)", zIndex: 1 }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", position: "relative", zIndex: 2, flex: 1 }}>
          
          <div style={{ marginBottom: "60px" }}>
            <h1 style={{ fontSize: "52px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 16px 0", lineHeight: "1.1", maxWidth: "800px", textShadow: "0 4px 12px rgba(0,0,0,0.6)" }}>
              Operational Scope & Focus Areas
            </h1>
            <p style={{ fontSize: "20px", color: "#E2E8F0", maxWidth: "650px", margin: 0, lineHeight: "1.6", textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}>
              The Office deploys multidisciplinary technical teams to execute targeted evaluations across six primary institutional pillars.
            </p>
          </div>

          <div style={{ minHeight: "300px" }} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <div key={activePillar} style={{ animation: "fadeSlideIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards" }}>
              <style>{`
                @keyframes fadeSlideIn {
                  from { opacity: 0; transform: translateY(20px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>

              <div style={{ marginBottom: "16px" }}>
                <span style={{ fontSize: "14px", fontWeight: "700", color: "#FCD116", textTransform: "uppercase", letterSpacing: "1.5px" }}>
                  {pillars[activePillar].category}
                </span>
              </div>

              <h2 style={{ fontSize: "48px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 24px 0", lineHeight: "1.2", maxWidth: "900px", textShadow: "0 4px 12px rgba(0,0,0,0.6)" }}>
                {pillars[activePillar].title}
              </h2>
              
              <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#CBD5E1", maxWidth: "800px", marginBottom: "40px", textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}>
                {pillars[activePillar].description}
              </p>

              <button onClick={handleExploreClick} className="explore-btn-fix" style={{ backgroundColor: "#FCD116", color: "#001F3F", border: "none", padding: "16px 40px", borderRadius: "4px", fontSize: "16px", fontWeight: "800", cursor: "pointer", transition: "transform 0.2s ease", boxShadow: "0 4px 15px rgba(252, 209, 22, 0.3)" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                Explore Focus Area
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "60px", justifyContent: "flex-start" }}>
            {pillars.map((_, index) => (
              <div key={index} onClick={() => setActivePillar(index)} style={{ width: index === activePillar ? "40px" : "12px", height: "12px", borderRadius: "6px", backgroundColor: index === activePillar ? "#FCD116" : "rgba(255,255,255,0.3)", transition: "all 0.4s ease", cursor: "pointer" }} />
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE 6 DETAILED SECTIONS */}
      {pillars.map((pillar, index) => (
        <section 
          key={pillar.id} 
          id={pillar.id} 
          style={{ 
            padding: "100px 24px", 
            backgroundColor: index % 2 === 0 ? "#F8F9FA" : "#FFFFFF" 
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "center" }}>
            
            <ZoomReveal style={{ order: index % 2 === 0 ? 1 : 2 }}>
              <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
                <img src={pillar.image} alt={pillar.title} style={{ width: "100%", height: "100%", minHeight: "400px", objectFit: "cover", display: "block" }} />
              </div>
            </ZoomReveal>
            
            <ZoomReveal delay={0.2} style={{ order: index % 2 === 0 ? 2 : 1 }}>
              <div>
                <span style={{ fontSize: "13px", fontWeight: "800", color: "#8B7355", textTransform: "uppercase", letterSpacing: "1.5px", display: "block", marginBottom: "16px" }}>
                  {pillar.category}
                </span>
                <h2 style={{ fontSize: "42px", fontWeight: "800", color: "#0F172A", margin: "0 0 24px 0", lineHeight: "1.1" }}>
                  {pillar.title}
                </h2>
                <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#475569", marginBottom: "24px" }}>
                  {pillar.description}
                </p>
                
                {/* NEW: DYNAMIC HUMAN-LIKE TEXT INSTEAD OF BULLET POINTS */}
                <p style={{ fontSize: "17px", lineHeight: "1.7", color: "#475569", marginBottom: "40px" }}>
                  {pillar.detailText}
                </p>

                <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#001F3F", color: "#FFFFFF", padding: "16px 32px", borderRadius: "4px", fontSize: "16px", fontWeight: "700", textDecoration: "none", transition: "background-color 0.2s ease" }}>
                  Request a Consultation
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Link>
              </div>
            </ZoomReveal>

          </div>
        </section>
      ))}

    </div>
  );
}