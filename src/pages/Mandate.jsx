export default function Mandate() {
  const scopes = [
    {
      title: "Statutory Pre-Contract Reviews",
      desc: "Mandatory evaluation of all major capital projects and single-source procurements prior to the award of contract."
    },
    {
      title: "Compliance & Sanctions",
      desc: "Continuous oversight of project execution, with the statutory power to halt non-compliant processes and apply administrative penalties."
    },
    {
      title: "Institutional Standards",
      desc: "Setting national benchmarks for cost estimation, lifecycle maintenance, and value-for-money auditing across all MDAs."
    },
    {
      title: "Public Reporting",
      desc: "Publishing annual value-for-money registers and gazetted findings to ensure transparency and citizen accountability."
    }
  ];

  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ 
        position: "relative", 
        backgroundColor: "#001F3F", 
        padding: "120px 24px", 
        textAlign: "center", 
        color: "white",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "url(/building-bg.jpg)", 
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.2, zIndex: 0
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(180deg, rgba(0,31,63,0.6) 0%, rgba(0,31,63,1) 100%)",
          zIndex: 1
        }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "900px", margin: "0 auto" }}>
          {/* "STATUTORY FRAMEWORK" label removed */}
          <h1 style={{ fontSize: "56px", fontWeight: "800", margin: "0 0 24px 0", lineHeight: "1.1" }}>
            Our Mandate
          </h1>
          <p style={{ fontSize: "20px", color: "#CBD5E1", lineHeight: "1.6", margin: 0 }}>
            Established under the Value for Money Office Act, 2026 (Act 1172) to serve as the independent guardian of efficiency, accountability, and fiscal integrity in Ghana's public spending.
          </p>
        </div>
      </section>

      {/* 2. LEGAL FOUNDATION SECTION */}
      <section style={{ position: "relative", padding: "100px 24px", overflow: "hidden" }}>
        
        <div style={{
          position: "absolute", right: "-5%", top: "0%", width: "600px", height: "600px",
          backgroundImage: "url(/coat-of-arms.png)", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
          opacity: 0.03, zIndex: 0, pointerEvents: "none"
        }} />

        <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "center" }}>
            
            {/* Left Text */}
            <div>
              {/* "THE LEGAL FOUNDATION" label and dash removed */}
              <h2 style={{ fontSize: "42px", fontWeight: "800", color: "#0F172A", margin: "0 0 24px 0", lineHeight: "1.1" }}>
                A Statutory Mandate for Fiscal Integrity.
              </h2>
              <p style={{ fontSize: "17px", lineHeight: "1.8", color: "#475569", marginBottom: "24px" }}>
                The VfM Office is not merely an advisory body; it is a statutory authority. Under Act 1172, we have the legal standing to evaluate, monitor, and enforce value-for-money standards across every government ministry, department, and agency (MDA).
              </p>
              <p style={{ fontSize: "17px", lineHeight: "1.8", color: "#475569" }}>
                Our mandate extends across all phases of the public procurement lifecycle, from the earliest feasibility studies to the final project audit and impact evaluation.
              </p>
            </div>

            {/* Right Image (Document/Contract) */}
            <div style={{ 
              backgroundColor: "#FFFFFF", 
              borderRadius: "16px", 
              padding: "48px", 
              boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
              border: "1px solid #E2E8F0",
              position: "relative"
            }}>
              {/* "OFFICIAL GAZETTE / ACT 1172" bar removed */}
              <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#001F3F", margin: "0 0 16px 0" }}>Value for Money Office Act, 2026</h3>
              <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", marginBottom: "32px" }}>
                An Act to establish the Value for Money Office to provide for independent technical scrutiny of public expenditure, and to ensure maximum value in the procurement of public goods and infrastructure.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#001F3F", fontWeight: "700", fontSize: "14px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                Download Full Act (PDF)
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SCOPE OF AUTHORITY GRID */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "100px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#001F3F", margin: "0 0 16px 0" }}>Scope of Authority</h2>
            <p style={{ color: "#64748B", fontSize: "18px", margin: 0 }}>The statutory powers granted to the VfM Office to enforce fiscal discipline.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
            {scopes.map((scope, index) => (
              <div 
                key={index}
                style={{
                  backgroundColor: "#F8F9FA",
                  borderRadius: "12px",
                  padding: "40px",
                  border: "1px solid #E2E8F0",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.05)";
                  e.currentTarget.style.borderColor = "#FCD116";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#E2E8F0";
                }}
              >
                {/* Icon container removed */}
                <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#001F3F", margin: "0 0 16px 0" }}>{scope.title}</h3>
                <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.6", margin: 0 }}>{scope.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}