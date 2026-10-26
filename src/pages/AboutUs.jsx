import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AboutUs() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const stats = [
    { value: "100%", label: "INDEPENDENT SCRUTINY", sub: "Statutory Technical Advisory" },
    { value: "3-Tier", label: "EVALUATION MODEL", sub: "Economy, Efficiency, Effectiveness", isGold: true },
    { value: "GH₵18.4B", label: "PIPELINE REVIEWED", sub: "Strategic Capital Portfolio" },
    { value: "16", label: "REGIONAL COVERAGE", sub: "Metropolitan & Municipal Assemblies", isGold: true },
  ];

  const pillars = [
    {
      number: "01",
      title: "Economy",
      desc: "Ensuring that public resources are acquired at appropriate cost and with due regard for quality, eliminating unjustified premiums and inflation in procurement.",
      tag1: "Benchmark Auditing",
      tag2: "Procurement Tier",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18"></path><path d="M3 9l9-6 9 6"></path><path d="M3 15h18"></path></svg>
      )
    },
    {
      number: "02",
      title: "Efficiency",
      desc: "Promoting the responsible use of human, capital, and material resources to maximise programmatic outputs and systematically eliminate systemic waste.",
      tag1: "Process Optimization",
      tag2: "Execution Tier",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path></svg>
      )
    },
    {
      number: "03",
      title: "Effectiveness",
      desc: "Evaluating whether public programmes and infrastructure actually achieve intended socio-economic objectives and yield durable, meaningful results.",
      tag1: "Outcome Realisation",
      tag2: "Impact Tier",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
      )
    }
  ];

  const leaders = [
    { name: "Dr. John Doe", title: "Director-General", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300&h=300" },
    { name: "Mrs. Jane Smith", title: "Deputy Director, Operations", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300" },
    { name: "Mr. Kwame Asante", title: "Head of Legal", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300" },
  ];

  const values = [
    { title: "Integrity", desc: "Upholding the highest standards of honesty and ethical conduct in all our evaluations." },
    { title: "Transparency", desc: "Ensuring our processes and findings are open, clear, and accessible to the public." },
    { title: "Accountability", desc: "Taking responsibility for our actions and holding public entities to the same standard." },
    { title: "Efficiency", desc: "Maximizing the impact of every Cedi spent to deliver the best outcomes for citizens." },
  ];

  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
      
      {/* 1. PAGE HEADER (With Accra Civic Complex Background) */}
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
          backgroundImage: "url(/about-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4, 
          zIndex: 0
        }} />

        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(180deg, rgba(0,31,63,0.6) 0%, rgba(0,31,63,0.95) 100%)",
          zIndex: 1
        }} />

        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "48px", fontWeight: "800", margin: "0 0 16px 0" }}>About Us</h1>
          <p style={{ fontSize: "18px", color: "#B0C4DE", maxWidth: "600px", margin: "0 auto" }}>
            Learn more about our mandate, our leadership, and the values that drive us to ensure value for every Cedi.
          </p>
        </div>
      </section>

      {/* 2. EXECUTIVE SUMMARY & THREE PILLARS */}
      <section style={{ 
        position: "relative", 
        padding: "100px 24px 60px", 
        overflow: "hidden",
        backgroundColor: "#F4F5F0",
        backgroundImage: "linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px"
      }}>
        
        <div style={{
          position: "absolute", right: "-5%", top: "10%", width: "600px", height: "600px",
          backgroundImage: "url('/vfm-logo.png')", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
          opacity: 0.03, zIndex: 0, pointerEvents: "none"
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          
          {/* EXECUTIVE SUMMARY SECTION (With Boardroom Image) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "60px", marginBottom: "80px", alignItems: "center" }}>
            
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <div style={{ width: "30px", height: "2px", backgroundColor: "#8B7355" }}></div>
                <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "1.5px", color: "#8B7355", textTransform: "uppercase" }}>
                  Independent Technical Stewardship
                </span>
              </div>
              <h1 style={{ fontSize: "48px", fontWeight: "800", color: "#0F172A", lineHeight: "1.1", margin: "0 0 24px 0" }}>
                Making Public Spending Work Better for Ghana.
              </h1>
              <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#334155", marginBottom: "20px" }}>
                Established to reinforce integrity in public expenditure, the Value for Money Office operates as an independent technical advisory body safeguarding Ghana's development capital.
              </p>
              <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#64748B", marginBottom: "32px" }}>
                We scrutinise major capital projects, establish benchmarks for public capital efficiency, and ensure every public investment translates into tangible, durable socio-economic benefits for Ghanaian citizens across all sixteen administrative regions.
              </p>
              <a href="#framework" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#0F172A", fontWeight: "700", fontSize: "15px", textDecoration: "none", borderBottom: "2px solid #0F172A", paddingBottom: "4px" }}>
                Learn More About Our Institutional Framework
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>

            {/* The Boardroom Image */}
            <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
              <img 
                src="/boardroom.jpg" 
                alt="VfM Boardroom" 
                style={{ width: "100%", height: "100%", minHeight: "400px", objectFit: "cover", display: "block" }} 
              />
            </div>
          </div>

          {/* STATS BAR */}
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "40px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", border: "1px solid #E2E8F0", marginBottom: "100px" }}>
            {stats.map((stat, index) => (
              <div key={index}>
                <h3 style={{ fontSize: "42px", fontWeight: "800", margin: "0 0 8px 0", color: stat.isGold ? "#B8860B" : "#0F172A" }}>{stat.value}</h3>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "#475569", letterSpacing: "1px", marginBottom: "4px" }}>{stat.label}</div>
                <div style={{ fontSize: "13px", color: "#94A3B8" }}>{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* THREE PILLARS */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "30px", height: "2px", backgroundColor: "#8B7355" }}></div>
              <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "1.5px", color: "#8B7355", textTransform: "uppercase" }}>
                The Tripartite Standard
              </span>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px" }}>
              <h2 style={{ fontSize: "42px", fontWeight: "800", color: "#0F172A", margin: 0, maxWidth: "500px", lineHeight: "1.1" }}>
                The Three Pillars of Public Value
              </h2>
              <p style={{ fontSize: "16px", color: "#64748B", maxWidth: "400px", margin: 0, lineHeight: "1.6" }}>
                A disciplined triad applied across all public procurement, infrastructure delivery, and ministerial capital expenditures.
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", marginBottom: "24px" }}>
            {pillars.map((pillar, index) => (
              <div key={index} style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "40px 32px", borderTop: "4px solid #8B7355", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column" }}>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
                  <span style={{ fontSize: "28px", fontWeight: "800", color: "#CBD5E1" }}>{pillar.number}</span>
                  <div style={{ width: "48px", height: "48px", backgroundColor: "#F1F5F9", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {pillar.icon}
                  </div>
                </div>

                <h3 style={{ fontSize: "24px", fontWeight: "700", color: "#0F172A", margin: "0 0 16px 0" }}>{pillar.title}</h3>
                <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", margin: "0 0 32px 0", flex: 1 }}>{pillar.desc}</p>

                <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", fontWeight: "600" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#0F172A", backgroundColor: "#F1F5F9", padding: "6px 12px", borderRadius: "4px" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#8B7355" }}></div>
                    {pillar.tag1}
                  </div>
                  <span style={{ color: "#64748B" }}>{pillar.tag2}</span>
                </div>

              </div>
            ))}
          </div>

          <p style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#64748B", margin: "0 0 40px 0" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            *Proposed institutional terminology subject to official Office charter verification and gazetted standards.
          </p>

        </div>
      </section>

      {/* 3. LEADERSHIP SECTION */}
      <section id="leadership" style={{ backgroundColor: "#FFFFFF", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#001F3F", margin: "0 0 12px 0" }}>Our Leadership</h2>
            <p style={{ color: "#666666", fontSize: "16px", margin: 0 }}>Meet the team steering the VfM Office.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "32px" }}>
            {leaders.map((leader, index) => (
              <div key={index} style={{ borderRadius: "12px", overflow: "hidden", backgroundColor: "#F8F9FA", border: "1px solid #E2E8F0", textAlign: "center", transition: "transform 0.3s ease", cursor: "pointer" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <img src={leader.img} alt={leader.name} style={{ width: "100%", height: "300px", objectFit: "cover", display: "block" }} />
                <div style={{ padding: "24px" }}>
                  <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#001F3F", margin: "0 0 8px 0" }}>{leader.name}</h3>
                  <p style={{ fontSize: "14px", color: "#B8860B", fontWeight: "700", margin: 0, letterSpacing: "1px", textTransform: "uppercase" }}>{leader.title}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. INSTITUTIONAL VALUES SECTION */}
      <section id="values" style={{ backgroundColor: "#F5F7FA", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#001F3F", margin: "0 0 12px 0" }}>Institutional Values</h2>
            <p style={{ color: "#666666", fontSize: "16px", margin: 0 }}>The principles that guide our operations every day.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {values.map((value, index) => (
              <div key={index} style={{ backgroundColor: "#FFFFFF", padding: "32px", borderRadius: "8px", borderTop: "4px solid #001F3F", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#001F3F", margin: "0 0 12px 0" }}>{value.title}</h3>
                <p style={{ fontSize: "15px", color: "#555555", lineHeight: "1.6", margin: 0 }}>{value.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}