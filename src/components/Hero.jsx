import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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

          @media (max-width: 768px) {
            .hero-btn {
              width: 100%;
              padding: 16px 24px;
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

              {/* TEXT CONTENT */}
              <div style={{ 
                maxWidth: "900px", 
                margin: "0 auto", 
                width: "100%", 
                // FIX 1: Increased bottom padding to push the button up away from the dots
                padding: "40px 24px 80px 24px", 
                position: "relative", 
                zIndex: 2,
                textAlign: "center", 
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                
                <div style={{ marginBottom: "16px" }}>
                  <span style={{ 
                    fontSize: "14px", 
                    fontWeight: "800", 
                    color: "#FCD116", 
                    textTransform: "uppercase", 
                    letterSpacing: "1.5px", 
                    textShadow: "0 2px 5px rgba(0,0,0,0.8)" 
                  }}>
                    Value For Money Office
                  </span>
                </div>

                <h1 style={{ 
                  fontSize: "clamp(42px, 6vw, 64px)", 
                  fontWeight: "800", 
                  color: "#FFFFFF", 
                  margin: "0 0 24px 0", 
                  lineHeight: "1.1", 
                  textShadow: "0 4px 12px rgba(0,0,0,0.8)" 
                }}>
                  {slide.headline1} <br/> 
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
        // FIX 2: Raised the dots slightly and added a subtle backdrop to separate them
        bottom: "24px", 
        left: "50%", 
        transform: "translateX(-50%)", 
        display: "flex", 
        gap: "12px", 
        zIndex: 10,
        padding: "8px 16px",
        borderRadius: "20px",
        backgroundColor: "rgba(0, 31, 63, 0.4)", // Gives them a tiny dark pill background so they stand out
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

    </section>
  );
}