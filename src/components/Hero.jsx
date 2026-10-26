export default function Hero() {
  return (
    <section style={{ backgroundColor: "#001F3F", color: "#FFFFFF", padding: "80px 40px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Small tag */}
        <div style={{ 
          display: "inline-block", 
          border: "1px solid rgba(255,255,255,0.3)", 
          padding: "6px 12px", 
          borderRadius: "4px", 
          fontSize: "12px", 
          fontWeight: "bold", 
          marginBottom: "24px",
          letterSpacing: "1px"
        }}>
          ESTABLISHED UNDER ACT 1172
        </div>

        {/* Main Headline */}
        <h1 style={{ fontSize: "56px", fontWeight: "bold", margin: "0 0 24px 0", lineHeight: "1.1", maxWidth: "800px" }}>
          Ensuring Value for <span style={{ color: "#FCD116" }}>Every Cedi</span>
        </h1>

        {/* Subheadline */}
        <p style={{ fontSize: "18px", lineHeight: "1.6", maxWidth: "600px", opacity: 0.9, marginBottom: "40px" }}>
          The independent guardian of efficiency, accountability, and fiscal integrity in Ghana's public spending.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "16px" }}>
          <button style={{ 
            backgroundColor: "#FCD116", 
            color: "#001F3F", 
            border: "none", 
            padding: "14px 28px", 
            borderRadius: "6px", 
            fontSize: "16px", 
            fontWeight: "bold", 
            cursor: "pointer" 
          }}>
            Apply for VfM Certificate
          </button>
          
          <button style={{ 
            backgroundColor: "transparent", 
            color: "#FFFFFF", 
            border: "1px solid rgba(255,255,255,0.4)", 
            padding: "14px 28px", 
            borderRadius: "6px", 
            fontSize: "16px", 
            fontWeight: "bold", 
            cursor: "pointer" 
          }}>
            Learn More
          </button>
        </div>

      </div>
    </section>
  );
}