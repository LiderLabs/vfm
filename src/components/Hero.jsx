export default function Hero() {
  const pageData = {
    badgeText: "ESTABLISHED UNDER ACT 1172",
    headlinePart1: "Ensuring Value for",
    headlinePart2: "Every Cedi",
    subheadline: "The independent guardian of efficiency, accountability, and fiscal integrity in Ghana's public spending.",
    primaryBtn: "Apply for VfM Certificate",
    secondaryBtn: "Learn More",
    backgroundImage: "/hero-bg.jpg" 
  };

  return (
    <section style={{ 
      position: "relative",
      backgroundColor: "#001F3F", 
      color: "#FFFFFF", 
      padding: "120px 40px",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      minHeight: "600px"
    }}>
      
      {/* BACKGROUND IMAGE */}
      <div style={{
        position: "absolute", 
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `url(${pageData.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.8, 
        zIndex: 0
      }} />

      {/* GRADIENT OVERLAY - Makes text readable while showing the image */}
      <div style={{
        position: "absolute", 
        top: 0, left: 0, right: 0, bottom: 0,
        background: "linear-gradient(90deg, rgba(0,31,63,0.95) 40%, rgba(0,31,63,0.3) 100%)",
        zIndex: 1
      }} />

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2, width: "100%" }}>
        
        <style>
          {`
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; }
            .delay-1 { animation-delay: 0.1s; opacity: 0; }
            .delay-2 { animation-delay: 0.2s; opacity: 0; }
            .delay-3 { animation-delay: 0.3s; opacity: 0; }
            .delay-4 { animation-delay: 0.4s; opacity: 0; }
          `}
        </style>

        <div className="animate-fade-up delay-1" style={{ 
          display: "inline-block", 
          border: "1px solid rgba(255,255,255,0.4)", 
          backgroundColor: "rgba(255,255,255,0.1)",
          padding: "6px 12px", 
          borderRadius: "4px", 
          fontSize: "12px", 
          fontWeight: "bold", 
          marginBottom: "24px", 
          letterSpacing: "1px",
          backdropFilter: "blur(4px)"
        }}>
          {pageData.badgeText}
        </div>

        <h1 className="animate-fade-up delay-2" style={{ fontSize: "56px", fontWeight: "bold", margin: "0 0 24px 0", lineHeight: "1.1", maxWidth: "800px" }}>
          {pageData.headlinePart1} <span style={{ color: "#FCD116" }}>{pageData.headlinePart2}</span>
        </h1>

        <p className="animate-fade-up delay-3" style={{ fontSize: "18px", lineHeight: "1.6", maxWidth: "600px", opacity: 0.9, marginBottom: "40px" }}>
          {pageData.subheadline}
        </p>

        <div className="animate-fade-up delay-4" style={{ display: "flex", gap: "16px" }}>
          <button style={{ 
            backgroundColor: "#FCD116", 
            color: "#001F3F", 
            border: "none", 
            padding: "14px 28px", 
            borderRadius: "6px", 
            fontSize: "16px", 
            fontWeight: "bold", 
            cursor: "pointer", 
            transition: "transform 0.2s ease"
          }}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            {pageData.primaryBtn}
          </button>
          
          <button style={{ 
            backgroundColor: "rgba(255,255,255,0.1)", 
            color: "#FFFFFF", 
            border: "1px solid rgba(255,255,255,0.5)", 
            padding: "14px 28px", 
            borderRadius: "6px", 
            fontSize: "16px", 
            fontWeight: "bold", 
            cursor: "pointer", 
            transition: "background-color 0.2s ease",
            backdropFilter: "blur(4px)"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255,255,255,0.2)"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(255,255,255,0.1)"}
          >
            {pageData.secondaryBtn}
          </button>
        </div>
      </div>
    </section>
  );
}