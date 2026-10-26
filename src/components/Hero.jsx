import { useState, useEffect } from "react";

export default function Hero() {
  const slides = [
    {
      tabName: "PURPOSE",
      headline1: "Every Cedi Counts.",
      headline2: "Every Outcome Matters.",
      subheadline: "Advancing a culture of responsible spending, measurable results, and value-driven public service delivery across national infrastructure.",
      btnText: "Our Purpose",
      bgPosition: "center 20%" 
    },
    {
      tabName: "ACTION",
      headline1: "Securing Value Before",
      headline2: "The First Cedi is Spent.",
      subheadline: "Conducting mandatory VfM certifications and enforcing strict cost benchmarks to prevent contract inflation and protect the public purse.",
      btnText: "Our Approach",
      bgPosition: "center 30%"
    },
    {
      tabName: "OUTCOMES",
      headline1: "Delivering Results.",
      headline2: "Ensuring Accountability.",
      subheadline: "Tracking major infrastructure projects across Ghana to eliminate cost overruns, prevent abandoned projects, and guarantee citizen value.",
      btnText: "View Impact",
      bgPosition: "center 40%"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section style={{ 
      position: "relative",
      backgroundColor: "#001F3F", 
      color: "#FFFFFF", 
      overflow: "hidden",
      minHeight: "700px",
      display: "flex",
      alignItems: "center"
    }}>
      
      {/* RESPONSIVE CSS */}
      <style>
        {`
          .hero-bg {
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background-image: url('/hero-bg.jpg');
            background-size: cover;
            opacity: 0.85;
            z-index: 0;
            transition: background-position 4s ease-in-out;
          }

          .hero-overlay {
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(90deg, rgba(0,31,63,0.98) 30%, rgba(0,31,63,0.6) 60%, rgba(0,31,63,0.1) 100%);
            z-index: 1;
          }

          .hero-container {
            max-width: 1200px; margin: 0 auto; position: relative; z-index: 2;
            width: 100%; padding: 0 40px;
          }

          .hero-mask {
            width: 100%; overflow: hidden;
          }

          .hero-track {
            display: flex;
            transition: transform 2s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .hero-slide {
            min-width: 100%; width: 100%; box-sizing: border-box; max-width: 850px;
          }

          .hero-heading {
            font-size: 56px; font-weight: 800; margin: 0 0 24px 0; line-height: 1.1; text-shadow: 0 2px 10px rgba(0,0,0,0.3);
          }

          .hero-subheadline {
            font-size: 20px; line-height: 1.6; color: #E2E8F0; margin-bottom: 40px; text-shadow: 0 1px 5px rgba(0,0,0,0.5);
          }

          /* --- MOBILE RESPONSIVENESS --- */
          @media (max-width: 768px) {
            .hero-bg {
              /* Zooms out slightly on mobile so the image isn't too tight */
              background-size: 150% auto; 
              background-position: center top !important;
              opacity: 0.6; /* Darken image slightly so text is readable */
            }
            .hero-overlay {
              /* Stronger gradient on mobile because the screen is narrow */
              background: linear-gradient(180deg, rgba(0,31,63,0.9) 0%, rgba(0,31,63,0.95) 100%);
            }
            .hero-container {
              padding: 0 24px;
            }
            .hero-heading {
              font-size: 38px; /* Much smaller for phones */
              margin-bottom: 16px;
            }
            .hero-subheadline {
              font-size: 16px; 
              line-height: 1.5;
              margin-bottom: 32px;
            }
            .hero-slide {
              /* Remove the width restriction on mobile so text uses full width */
              max-width: 100%;
            }
          }
        `}
      </style>

      {/* BACKGROUND IMAGE */}
      <div 
        className="hero-bg"
        style={{ backgroundPosition: slides[currentSlide].bgPosition }} 
      />

      {/* GRADIENT OVERLAY */}
      <div className="hero-overlay" />

      {/* MAIN CONTENT CONTAINER */}
      <div className="hero-container">
        
        {/* THE MASK */}
        <div className="hero-mask">
          
          {/* THE SLIDER TRACK */}
          <div 
            className="hero-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            
            {slides.map((slide, index) => (
              <div key={index} className="hero-slide">
                <div>
                  <div style={{ 
                    fontSize: "13px", fontWeight: "800", letterSpacing: "2px", 
                    marginBottom: "24px", color: "#FCD116" 
                  }}>
                    {slide.tabName}
                  </div>

                  <h1 className="hero-heading">
                    {slide.headline1} <br/> <span style={{ color: "#FFFFFF" }}>{slide.headline2}</span>
                  </h1>
                  
                  <p className="hero-subheadline">
                    {slide.subheadline}
                  </p>
                  
                  <button style={{ 
                    backgroundColor: "#FCD116", color: "#001F3F", border: "none", 
                    padding: "16px 32px", borderRadius: "6px", fontSize: "16px", 
                    fontWeight: "bold", cursor: "pointer", transition: "transform 0.2s ease"
                  }}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                  >
                    {slide.btnText}
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* BOTTOM CONTROLS (Dots) */}
        <div style={{ display: "flex", gap: "12px", marginTop: "60px" }}>
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: index === currentSlide ? "40px" : "12px",
                height: "12px",
                borderRadius: "6px",
                backgroundColor: index === currentSlide ? "#FCD116" : "rgba(255,255,255,0.3)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.4s ease",
                padding: 0
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}