import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// --- FIXED SCROLL ANIMATION HOOK ---
function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isVisible];
}

const Reveal = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        width: "100%"
      }}
    >
      {children}
    </div>
  );
};

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
      title: "Economy",
      desc: "Ensuring that public resources are acquired at appropriate cost and with due regard for quality, eliminating unjustified premiums and inflation in procurement.",
      tag1: "Benchmark Auditing",
      tag2: "Procurement Tier"
    },
    {
      title: "Efficiency",
      desc: "Promoting the responsible use of human, capital, and material resources to maximise programmatic outputs and systematically eliminate systemic waste.",
      tag1: "Process Optimization",
      tag2: "Execution Tier"
    },
    {
      title: "Effectiveness",
      desc: "Evaluating whether public programmes and infrastructure actually achieve intended socio-economic objectives and yield durable, meaningful results.",
      tag1: "Outcome Realisation",
      tag2: "Impact Tier"
    }
  ];

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

  const values = [
    { title: "Integrity", desc: "Upholding the highest standards of honesty and ethical conduct in all our evaluations." },
    { title: "Transparency", desc: "Ensuring our processes and findings are open, clear, and accessible to the public." },
    { title: "Accountability", desc: "Taking responsibility for our actions and holding public entities to the same standard." },
    { title: "Efficiency", desc: "Maximizing the impact of every Cedi spent to deliver the best outcomes for citizens." },
  ];

  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* 1. PAGE HEADER */}
      <section style={{ position: "relative", backgroundColor: "#001F3F", padding: "140px 24px", textAlign: "center", color: "white", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/about-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.7, zIndex: 0 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(0,31,63,0.2) 0%, rgba(0,31,63,0.95) 100%)", zIndex: 1 }} />
        
        <Reveal>
          <div style={{ position: "relative", zIndex: 2 }}>
            <h1 style={{ fontSize: "56px", fontWeight: "900", margin: "0 0 16px 0", letterSpacing: "-1px", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>About Us</h1>
            <p style={{ fontSize: "20px", color: "#FFFFFF", maxWidth: "650px", margin: "0 auto", fontWeight: "600", lineHeight: "1.6", textShadow: "0 1px 5px rgba(0,0,0,0.8)" }}>
              Learn more about our mandate, our leadership, and the values that drive us to ensure value for every Cedi.
            </p>
          </div>
        </Reveal>
      </section>

      {/* 2. EXECUTIVE SUMMARY */}
      <section style={{ position: "relative", padding: "100px 24px 60px", overflow: "hidden", backgroundColor: "#F4F5F0" }}>
        
        <div style={{ position: "absolute", right: "-5%", top: "10%", width: "600px", height: "600px", backgroundImage: "url('/vfm-logo.png')", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", opacity: 0.03, zIndex: 0, pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "60px", marginBottom: "100px", alignItems: "center" }}>
            <Reveal>
              <div>
                <div style={{ marginBottom: "24px" }}>
                  <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "1.5px", color: "#8B7355", textTransform: "uppercase" }}>
                    Independent Technical Stewardship
                  </span>
                </div>
                <h1 style={{ fontSize: "52px", fontWeight: "800", color: "#0F172A", lineHeight: "1.1", margin: "0 0 24px 0" }}>Making Public Spending Work Better for Ghana.</h1>
                <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#334155", marginBottom: "20px", fontWeight: "500" }}>Established to reinforce integrity in public expenditure, the Value for Money Office operates as an independent technical advisory body safeguarding Ghana's development capital.</p>
                <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#64748B", marginBottom: "32px" }}>We scrutinise major capital projects, establish benchmarks for public capital efficiency, and ensure every public investment translates into tangible, durable socio-economic benefits for Ghanaian citizens across all sixteen administrative regions.</p>
                <a href="#framework" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#0F172A", fontWeight: "700", fontSize: "15px", textDecoration: "none", borderBottom: "2px solid #0F172A", paddingBottom: "4px" }}>
                  Learn More About Our Institutional Framework
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}>
                <img src="/boardroom.jpg" alt="VfM Boardroom" style={{ width: "100%", height: "100%", minHeight: "400px", objectFit: "cover", display: "block" }} />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "40px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", border: "1px solid #E2E8F0", marginBottom: "100px" }}>
              {stats.map((stat, index) => (
                <div key={index}>
                  <h3 style={{ fontSize: "42px", fontWeight: "800", margin: "0 0 8px 0", color: stat.isGold ? "#B8860B" : "#0F172A" }}>{stat.value}</h3>
                  <div style={{ fontSize: "12px", fontWeight: "700", color: "#475569", letterSpacing: "1px", marginBottom: "4px" }}>{stat.label}</div>
                  <div style={{ fontSize: "13px", color: "#94A3B8" }}>{stat.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. NEW MERGED SECTION: STATUTORY MANDATE */}
      <section style={{ position: "relative", padding: "100px 24px", overflow: "hidden", backgroundColor: "#FFFFFF" }}>
        
        <div style={{ position: "absolute", right: "-5%", top: "0%", width: "600px", height: "600px", backgroundImage: "url(/coat-of-arms.png)", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", opacity: 0.03, zIndex: 0, pointerEvents: "none" }} />

        <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "center" }}>
            <Reveal>
              <div>
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
            </Reveal>

            <Reveal delay={0.2}>
              <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "48px", boxShadow: "0 20px 40px rgba(0,0,0,0.08)", border: "1px solid #E2E8F0" }}>
                <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#001F3F", margin: "0 0 16px 0" }}>Value for Money Office Act, 2026</h3>
                <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", marginBottom: "32px" }}>
                  An Act to establish the Value for Money Office to provide for independent technical scrutiny of public expenditure, and to ensure maximum value in the procurement of public goods and infrastructure.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#001F3F", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  Download Full Act (PDF)
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. THREE PILLARS & SCOPE OF AUTHORITY */}
      <section style={{ position: "relative", padding: "100px 24px 60px", overflow: "hidden", backgroundColor: "#F4F5F0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          
          <Reveal>
            <div style={{ marginBottom: "40px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px" }}>
                <h2 style={{ fontSize: "42px", fontWeight: "800", color: "#0F172A", margin: 0, maxWidth: "500px", lineHeight: "1.1" }}>The Three Pillars of Public Value</h2>
                <p style={{ fontSize: "16px", color: "#64748B", maxWidth: "400px", margin: 0, lineHeight: "1.6" }}>A disciplined triad applied across all public procurement, infrastructure delivery, and ministerial capital expenditures.</p>
              </div>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", marginBottom: "100px" }}>
            {pillars.map((pillar, index) => (
              <Reveal key={index} delay={index * 0.15}>
                <div style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "40px 32px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", height: "100%" }}>
                  <h3 style={{ fontSize: "24px", fontWeight: "700", color: "#0F172A", margin: "0 0 16px 0" }}>{pillar.title}</h3>
                  <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", margin: "0 0 32px 0", flex: 1 }}>{pillar.desc}</p>
                  <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", fontWeight: "600" }}>
                    <div style={{ color: "#0F172A", backgroundColor: "#F1F5F9", padding: "6px 12px", borderRadius: "4px" }}>{pillar.tag1}</div>
                    <span style={{ color: "#64748B" }}>{pillar.tag2}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#001F3F", margin: "0 0 16px 0" }}>Scope of Authority</h2>
              <p style={{ color: "#64748B", fontSize: "18px", margin: 0 }}>The statutory powers granted to the VfM Office to enforce fiscal discipline.</p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
            {scopes.map((scope, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "40px", border: "1px solid #E2E8F0", transition: "all 0.3s ease", height: "100%" }}
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
                  <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#001F3F", margin: "0 0 16px 0" }}>{scope.title}</h3>
                  <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.6", margin: 0 }}>{scope.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* 5. LEADERSHIP SECTION */}
      <section id="leadership" style={{ backgroundColor: "#FFFFFF", padding: "100px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#001F3F", margin: "0 0 12px 0" }}>Executive Leadership</h2>
              <p style={{ color: "#666666", fontSize: "16px", margin: 0 }}>Guiding the strategic direction of the Value for Money Office.</p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "40px", justifyContent: "center" }}>
            
            <Reveal delay={0.1}>
              <div style={{ borderRadius: "16px", overflow: "hidden", backgroundColor: "#F8F9FA", border: "1px solid #E2E8F0", transition: "transform 0.3s ease", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", height: "100%" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <img src="/dg-aziz-bamba.jpg" alt="Dr. Abdul-Baasit Aziz-Bamba" style={{ width: "100%", height: "450px", objectFit: "cover", objectPosition: "top", display: "block" }} />
                <div style={{ padding: "32px" }}>
                  <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#001F3F", margin: "0 0 8px 0" }}>Dr. Abdul-Baasit Aziz-Bamba</h3>
                  <p style={{ fontSize: "15px", color: "#B8860B", fontWeight: "700", margin: 0, letterSpacing: "1px", textTransform: "uppercase" }}>Acting Director-General</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div style={{ borderRadius: "16px", backgroundColor: "#001F3F", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "48px", textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", height: "100%" }}>
                <div style={{ width: "80px", height: "80px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FCD116" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 16px 0" }}>Governing Board</h3>
                <p style={{ fontSize: "16px", color: "#B0C4DE", lineHeight: "1.6", margin: 0, maxWidth: "300px" }}>
                  Members of the Governing Board are appointed in accordance with the Value for Money Office Act, 2026 (Act 1172).
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* 6. INSTITUTIONAL VALUES SECTION */}
      <section id="values" style={{ backgroundColor: "#F5F7FA", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#001F3F", margin: "0 0 12px 0" }}>Institutional Values</h2>
              <p style={{ color: "#666666", fontSize: "16px", margin: 0 }}>The principles that guide our operations every day.</p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {values.map((value, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div style={{ backgroundColor: "#FFFFFF", padding: "32px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", height: "100%" }}>
                  <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#001F3F", margin: "0 0 12px 0" }}>{value.title}</h3>
                  <p style={{ fontSize: "15px", color: "#555555", lineHeight: "1.6", margin: 0 }}>{value.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}