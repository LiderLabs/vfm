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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="hero-section">
      
      <style>
        {`
          /* DESKTOP STYLES */
          .hero-section {
            position: relative;
            background-color: #001F3F; 
            color: #FFFFFF; 
            overflow: hidden;
            display: flex;
            align-items: center;
            min-height: 100vh; /* Takes full screen height on desktop */
            padding: 100px 0;
          }

          .hero-bg {
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background-image: url('/hero-bg.jpg');
            background-size: cover;
            background-position: center;
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

          .hero-mask { width: 100%; overflow: hidden; }

          .hero-track {
            display: flex;
            transition: transform 2s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .hero-slide {
            min-width: 100%; width: 100%; box-sizing: border-box; max-width: 850px;
          }

          .hero-heading {
            font-size: 64px; font-weight: 800; margin: 0 0 24px 0; line-height: 1.1; text-shadow: 0 2px 10px rgba(0,0,0,0.3);
          }

          .hero-subheadline {
            font-size: 20px; line-height: 1.6; color: #E2E8F0; margin-bottom: 48px; text-shadow: 0 1px 5px rgba(0,0,0,0.5);
          }

          /* MOBILE STYLES */
          @media (max-width: 768px) {
            .hero-section {
              min-height: 100vh;
              padding: 120px 0 60px 0; /* Extra padding at top to clear the navbar */
              align-items: flex-start; /* Pushes content up on mobile */
            }
            .hero-bg {
              background-position: center top !important; /* Shows the engineers' faces */
            }
            .hero-overlay {
              /* Strong solid gradient on mobile for readability */
              background: linear-gradient(180deg, rgba(0,31,63,0.8) 0%, rgba(0,31,63,1) 80%);
            }
            .hero-container {
              padding: 0 24px;
            }
            .hero-heading {
              font-size: 42px; /* Slightly larger than before for better balance */
              margin-bottom: 20px;
            }
            .hero-subheadline {
              font-size: 17px; 
              line-height: 1.6;
              margin-bottom: 40px;
            }
            .hero-slide {
              max-width: 100%;
            }
          }
        `}
      </style>

      <div 
        className="hero-bg"
        style={{ backgroundPosition: slides[currentSlide].bgPosition }} 
      />

      <div className="hero-overlay" />

      <div className="hero-container">
        <div className="hero-mask">
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