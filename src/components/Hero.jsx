import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const slides = [
    {
      headline1: "Every Cedi Counts.",
      headline2: "Every Outcome Matters.",
      subheadline: "The Value for Money Office is an independent statutory authority established under Act 1172 to regulate, monitor, and conduct value for money assessments across Ghana's public sector.",
      btnText: "Learn About Our Mandate",
      btnLink: "/about",
      bgPosition: "center 20%" 
    },
    {
      headline1: "Statutory Independence.",
      headline2: "Unwavering Fiscal Integrity.",
      subheadline: "Except as otherwise provided by law, the Office is not subject to the direction or control of any person or authority in the performance of its statutory functions. (Section 12)",
      btnText: "Read Our Institutional Values",
      btnLink: "/about#values",
      bgPosition: "center 30%"
    },
    {
      headline1: "Protecting the Public Purse.",
      headline2: "Guaranteeing Citizen Value.",
      subheadline: "We provide a confidential, legally protected mechanism for citizens and entities to report contract inflation, cost irregularities, and the abuse of public resources.",
      btnText: "Report a Concern",
      btnLink: "/submit",
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
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 100vh;
            padding: 100px 0 60px 0;
            overflow: hidden;
            isolation: isolate;
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

          .hero-mask { 
            width: 100%; 
            overflow: hidden; 
            position: relative;
          }

          .hero-track {
            display: flex;
            transition: transform 2s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .hero-slide {
            min-width: 100%; 
            width: 100%; 
            box-sizing: border-box; 
            max-width: 850px;
            display: flex;
            flex-direction: column;
          }

          .hero-heading {
            font-size: 64px; font-weight: 800; margin: 0 0 24px 0; line-height: 1.1; text-shadow: 0 2px 10px rgba(0,0,0,0.3);
          }

          .hero-subheadline {
            font-size: 20px; line-height: 1.6; color: #E2E8F0; margin-bottom: 48px; text-shadow: 0 1px 5px rgba(0,0,0,0.5);
          }

          .hero-btn {
            background-color: #FCD116; 
            color: #001F3F; 
            border: none; 
            padding: 16px 32px; 
            border-radius: 6px; 
            font-size: 16px; 
            font-weight: bold; 
            cursor: pointer; 
            transition: transform 0.2s ease;
            display: inline-block !important;
            width: auto !important;
            min-width: 160px !important;
            white-space: nowrap !important;
            box-sizing: border-box !important;
            text-decoration: none;
            text-align: center;
          }

          /* MOBILE STYLES */
          @media (max-width: 768px) {
            .hero-section {
              min-height: auto; 
              height: auto;
              padding: 120px 0 60px 0;
              justify-content: flex-start;
            }
            .hero-bg {
              background-position: center top !important;
            }
            .hero-overlay {
              background: linear-gradient(180deg, rgba(0,31,63,0.8) 0%, rgba(0,31,63,1) 100%);
            }
            .hero-container {
              padding: 0 24px;
            }
            .hero-heading {
              font-size: 42px;
              margin-bottom: 20px;
            }
            .hero-subheadline {
              font-size: 17px; 
              line-height: 1.6;
              margin-bottom: 32px;
            }
            .hero-slide {
              max-width: 100%;
              padding-right: 24px; 
            }
            .hero-btn {
              width: 100% !important;
              display: block !important;
              margin-bottom: 20px;
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
                  <h1 className="hero-heading">
                    {slide.headline1} <br/> <span style={{ color: "#FFFFFF" }}>{slide.headline2}</span>
                  </h1>
                  
                  <p className="hero-subheadline">
                    {slide.subheadline}
                  </p>
                  
                  <Link 
                    to={slide.btnLink}
                    className="hero-btn"
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                    {slide.btnText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
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