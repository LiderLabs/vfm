export default function MandateCards() {
  const mandates = [
    { title: "Pre-Contract Review", description: "Mandatory VfM certification for major government contracts before they are awarded." },
    { title: "Compliance Monitoring", description: "Real-time oversight of projects to prevent cost overruns and unnecessary delays." },
    { title: "Sanctions Enforcement", description: "Applying penalties for violations to ensure absolute accountability across all entities." },
    { title: "Cost Benchmarking", description: "Setting standard cost benchmarks to ensure uniform pricing and curb contract inflation." },
    { title: "Digital Integration", description: "Linking with GIFMIS and GHANEPS for automated, real-time financial and procurement data analysis." },
    { title: "Public Transparency", description: "Publishing annual reports and findings to keep citizens informed about the value of public spending." }
  ];

  return (
    <section style={{ backgroundColor: "#FFFFFF", padding: "80px 40px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "#001F3F", margin: "0 0 12px 0" }}>
            Our Core Mandate
          </h2>
          <p style={{ color: "#666666", fontSize: "16px", margin: 0 }}>
            Six pillars of value-for-money oversight across the public sector.
          </p>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "24px" 
        }}>
          {mandates.map((item, index) => (
            <div 
              key={index} 
              style={{ 
                backgroundColor: "#F8F9FA", 
                borderTop: "4px solid #001F3F",
                padding: "32px", 
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 20px rgba(0,0,0,0.1)";
                e.currentTarget.style.borderTop = "4px solid #FCD116"; 
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
                e.currentTarget.style.borderTop = "4px solid #001F3F";
              }}
            >
              <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#001F3F", margin: "0 0 16px 0" }}>
                {item.title}
              </h3>
              <p style={{ color: "#555555", lineHeight: "1.6", margin: 0 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}