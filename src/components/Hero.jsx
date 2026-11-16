import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ========================================================
// 1. COLORFUL HAND-DRAWN ICONS (From OpenData)
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

export default function Hero() {
  const slides = [
    {
      headline1: "Every Cedi Counts.",
      headline2: "Every Outcome Matters.",
      subheadline: "The Value for Money Office is an independent statutory authority established under Act 1172 to regulate, monitor, and conduct value for money assessments across Ghana's public sector.",
      btnText: "Learn About Our Mandate",
      btnLink: "/about",
      bgImage: "/hero-bg.jpg", 
    },
    {
      headline1: "Statutory Independence.",
      headline2: "Unwavering Fiscal Integrity.",
      subheadline: "Except as otherwise provided by law, the Office is not subject to the direction or control of any person or authority in the performance of its statutory functions. (Section 12)",
      btnText: "Read Our Institutional Values",
      btnLink: "/about#values",
      bgImage: "/hero-slide-2.jpg", 
    },
    {
      headline1: "Protecting the Public Purse.",
      headline2: "Guaranteeing Citizen Value.",
      subheadline: "We provide a confidential, legally protected mechanism for citizens and entities to report contract inflation, cost irregularities, and the abuse of public resources.",
      btnText: "Report a Concern",
      btnLink: "/submit",
      bgImage: "/hero-slide-3.jpg", 
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

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
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }

    touchStart.current = null;
    touchEnd.current = null;
  };

  const dashboardStats = [
    { label: "Assessments Conducted", value: "1,245", icon: HandDrawnAssessment, color: "#047857" },
    { label: "Contracts Flagged", value: "86", icon: HandDrawnFlagged, color: "#B91C1C" },
    { label: "Active Investigations", value: "14", icon: HandDrawnInvestigation, color: "#B45309" },
    { label: "Total Savings Identified", value: "GH₵ 250M+", icon: HandDrawnSavings, color: "#1E3A8A" }
  ];

  const marqueeStats = [...dashboardStats, ...dashboardStats];

  return (
    <section style={{ 
      position: "relative", 
      backgroundColor: "#001F3F", 
      overflow: "hidden", 
      display: "flex", 
      flexDirection: "column", 
      height: "80vh", 
      minHeight: "600px" 
    }}>
      
      <style>
        {`
          .hero-track {
            display: flex;
            height: 100%;
            transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .hero-btn {
            background-color: #FCD116; 
            color: #001F3F; 
            border: none; 
            padding: 16px 40px; 
            border-radius: 4px; 
            font-size: 16px; 
            font-weight: 800; 
            cursor: pointer; 
            transition: transform 0.2s ease, background-color 0.2s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            box-shadow: 0 4px 15px rgba(252, 209, 22, 0.4);
          }

          .hero-btn:hover {
            transform: scale(1.05);
            background-color: #FFDE45;
          }

          @keyframes scrollMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } 
          }

          .marquee-container {
            overflow: hidden;
            width: 100%;
            position: relative;
            padding: 20px 0;
            background: #FFFFFF;
            border-top: 1px solid #E2E8F0;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
            /* REMOVED: mask-image lines */
          }

          .marquee-track {
            display: flex;
            align-items: center;
            gap: 60px;
            width: max-content;
            animation: scrollMarquee 35s linear infinite;
          }

          .marquee-track:hover {
            animation-play-state: paused;
          }

          .marquee-item {
            display: flex;
            align-items: center;
            gap: 20px;
            flex-shrink: 0;
            padding-right: 60px;
            border-right: 1px solid rgba(0, 0, 0, 0.1);
          }
          .marquee-item:last-child {
            border-right: none;
          }

          @media (max-width: 768px) {
            .hero-btn {
              width: 100%;
              padding: 16px 24px;
            }
            .marquee-item {
              gap: 12px;
              padding-right: 30px;
            }
            .marquee-track {
              gap: 30px;
            }
          }
        `}
      </style>

      <div 
        style={{ position: "relative", flex: 1, overflow: "hidden", width: "100%" }}
        onTouchStart={handleTouchStart} 
        onTouchMove={handleTouchMove} 
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="hero-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div 
              key={index} 
              style={{ 
                minWidth: "100%", 
                width: "100%", 
                position: "relative", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center" 
              }}
            >
              
              <div style={{ 
                position: "absolute", top: 0, left: 0, right: 0, bottom: 0, 
                backgroundImage: `url(${slide.bgImage})`, 
                backgroundSize: "cover", 
                backgroundPosition: "center", 
                opacity: 0.85, 
                zIndex: 0 
              }} />
              
              <div style={{ 
                position: "absolute", top: 0, left: 0, right: 0, bottom: 0, 
                background: "rgba(0, 31, 63, 0.75)", 
                zIndex: 1 
              }} />

              <div style={{ 
                maxWidth: "1000px", 
                margin: "0 auto", 
                width: "100%", 
                padding: "20px 24px 110px 24px", 
                position: "relative", 
                zIndex: 2,
                textAlign: "center", 
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                
                <h1 style={{ 
                  fontSize: "clamp(42px, 6vw, 64px)", 
                  fontWeight: "800", 
                  color: "#FFFFFF", 
                  margin: "0 0 24px 0", 
                  lineHeight: "1.1", 
                  textShadow: "0 4px 12px rgba(0,0,0,0.8)" 
                }}>
                  {slide.headline1}{" "} 
                  <span style={{ color: "#FCD116" }}>{slide.headline2}</span>
                </h1>
                
                <p style={{ 
                  fontSize: "18px", 
                  lineHeight: "1.8", 
                  color: "#CBD5E1", 
                  marginBottom: "40px", 
                  textShadow: "0 2px 6px rgba(0,0,0,0.8)" 
                }}>
                  {slide.subheadline}
                </p>

                <Link 
                  to={slide.btnLink}
                  className="hero-btn"
                >
                  {slide.btnText}
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* DOTS */}
      <div style={{ 
        position: "absolute", 
        bottom: "105px", 
        left: "50%", 
        transform: "translateX(-50%)", 
        display: "flex", 
        gap: "12px", 
        zIndex: 20,
        padding: "8px 16px",
        borderRadius: "20px",
        backgroundColor: "rgba(0, 31, 63, 0.4)", 
        backdropFilter: "blur(4px)" 
      }}>
        {slides.map((_, index) => (
          <div 
            key={index} 
            onClick={() => setCurrentSlide(index)} 
            style={{ 
              width: index === currentSlide ? "40px" : "12px", 
              height: "12px", 
              borderRadius: "6px", 
              backgroundColor: index === currentSlide ? "#FCD116" : "rgba(255,255,255,0.6)", 
              transition: "all 0.4s ease", 
              cursor: "pointer", 
            }} 
          />
        ))}
      </div>

      {/* INFINITE MARQUEE STATS BAR */}
      <div className="marquee-container" style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10 }}>
        <div className="marquee-track">
          {marqueeStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="marquee-item">
                <div style={{ flexShrink: 0 }}>
                  <IconComponent />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "32px", fontWeight: "900", color: stat.color, margin: "0 0 4px 0", lineHeight: "1" }}>
                    {stat.value}
                  </div>
                  <h3 style={{ fontSize: "12px", fontWeight: "800", color: "#64748B", textTransform: "uppercase", letterSpacing: "1.5px", margin: 0 }}>
                    {stat.label}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}