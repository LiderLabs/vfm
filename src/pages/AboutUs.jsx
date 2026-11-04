import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import InteractiveVfmWall from "../components/InteractiveVfmWall";

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

const Reveal = ({ children, delay = 0, width = "100%" }) => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        width: width
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
    { value: "Act 1172", label: "LEGAL FRAMEWORK", sub: "Value for Money Office Act, 2026" },
    { value: "3 Pillars", label: "EVALUATION MODEL", sub: "Economy, Efficiency, Effectiveness", isGold: true },
    { value: "14 Days", label: "COMPLAINT ASSESSMENT", sub: "Statutory Timeline (Section 45)" },
    { value: "2 - 5 Years", label: "DEBARMENT PENALTY", sub: "For Cost Inflation (Section 38)", isGold: true },
  ];

  const pillars = [
    {
      title: "Economy",
      desc: "Ensuring that public resources are acquired at appropriate cost and with due regard for quality, eliminating unjustified premiums and inflation in procurement."
    },
    {
      title: "Efficiency",
      desc: "Promoting the responsible use of human, capital, and material resources to maximise programmatic outputs and systematically eliminate systemic waste."
    },
    {
      title: "Effectiveness",
      desc: "Evaluating whether public programmes and infrastructure actually achieve intended socio-economic objectives and yield durable, meaningful results."
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

  const boardMembers = [
    { title: "Director-General", desc: "Dr. Abdul-Baasit Aziz-Bamba", isDG: true, image: "/dg-aziz-bamba.jpg" },
    { title: "Attorney-General's Rep", desc: "Chief State Attorney or above" },
    { title: "Ministry of Finance Rep", desc: "Legal Affairs Directorate" },
    { title: "Gender & Equity Expert", desc: "Presidential Nominee" },
    { title: "Audit Service Rep", desc: "Director level or above" },
    { title: "ICAG Rep", desc: "Institute of Chartered Accountants" },
    { title: "Architects Rep", desc: "Ghana Institute of Architects" },
    { title: "PPA Rep", desc: "Public Procurement Authority" },
    { title: "Surveyors Rep", desc: "Ghana Institution of Surveyors" },
    { title: "Engineers Rep", desc: "Ghana Institution of Engineering" }
  ];

  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* 1. PAGE HEADER - FULL UNCROPPED IMAGE */}
      <section style={{ position: "relative", backgroundColor: "#F8F9FA", width: "100%" }}>
        
        {/* The Image - 100% width, auto height to show everything */}
        <div style={{ 
          width: "100%",
          height: "clamp(300px, 50vw, 600px)", // Adjusts height based on screen width
          backgroundImage: "url(/about-bg.jpg)", 
          backgroundSize: "cover", // Will now cover properly without extreme zoom because height is relative to width
          backgroundPosition: "center 60%", // Focuses on the building and grass
          position: "relative"
        }} />

        {/* Floating Text Card overlapping the bottom of the image */}
        <div style={{ 
          position: "relative",
          marginTop: "-80px", // Pulls the card up into the image
          display: "flex",
          justifyContent: "center",
          padding: "0 24px"
        }}>
          <Reveal>
            <div style={{ 
              backgroundColor: "#001F3F", 
              borderRadius: "16px", 
              padding: "40px 60px", 
              textAlign: "center", 
              color: "white",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              maxWidth: "800px"
            }}>
              <h1 style={{ fontSize: "48px", fontWeight: "900", margin: "0 0 16px 0", letterSpacing: "-1px" }}>About Us</h1>
              <p style={{ fontSize: "18px", color: "#E2E8F0", margin: "0 auto", fontWeight: "500", lineHeight: "1.6" }}>
                Learn more about our mandate, our leadership, and the values that drive us to ensure value for every Cedi.
              </p>
            </div>
          </Reveal>
        </div>
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
                    The Object of the Office
                  </span>
                </div>
                <h1 style={{ fontSize: "42px", fontWeight: "800", color: "#0F172A", lineHeight: "1.2", margin: "0 0 24px 0" }}>
                  To regulate, monitor, coordinate, promote, develop and conduct value for money assessments.
                </h1>
                <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#334155", marginBottom: "20px", fontWeight: "500" }}>
                  Established under Act 1172, our core object is to review procurement practices—including cost estimation methodologies, contract management processes, and expenditure control mechanisms—to ensure efficiency in public expenditure.
                </p>
                <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#64748B", marginBottom: "32px" }}>
                  We scrutinise major capital projects, establish benchmarks for public capital efficiency, and ensure every public investment translates into tangible, durable socio-economic benefits for Ghanaian citizens across all sixteen administrative regions.
                </p>
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

      {/* 3. STATUTORY INDEPENDENCE */}
      <section style={{ position: "relative", padding: "80px 24px", backgroundColor: "#001F3F", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/building-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2, zIndex: 0 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(90deg, rgba(0,31,63,1) 40%, rgba(0,31,63,0.8) 100%)", zIndex: 1 }} />
        
        <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", backgroundColor: "rgba(252, 209, 22, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FCD116" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#FFFFFF", marginBottom: "16px" }}>Statutory Independence</h2>
              <p style={{ fontSize: "20px", color: "#E2E8F0", lineHeight: "1.6", maxWidth: "800px", margin: "0 auto" }}>
                "Except as otherwise provided in the Constitution or by any other enactment, the Office is <strong>not subject to the direction or control of a person or an authority</strong> in the performance of the functions of the Office."
              </p>
              <p style={{ fontSize: "14px", fontWeight: "700", color: "#FCD116", marginTop: "16px", letterSpacing: "1px" }}>— SECTION 12, ACT 1172</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. INTERACTIVE VFM WALL */}
      <InteractiveVfmWall />

      {/* 5. STATUTORY MANDATE */}
      <section style={{ position: "relative", padding: "100px 24px", overflow: "hidden", backgroundColor: "#FFFFFF" }}>
        
        <div style={{ position: "absolute", right: "-5%", top: "0%", width: "600px", height: "600px", backgroundImage: "url(/coat-of-arms.png)", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", opacity: 0.03, zIndex: 0, pointerEvents: "none" }} />

        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
          
          <Reveal>
            <div>
              <h2 style={{ fontSize: "42px", fontWeight: "800", color: "#0F172A", margin: "0 0 32px 0", lineHeight: "1.2" }}>
                A Statutory Mandate for Fiscal Integrity.
              </h2>
              <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#334155", marginBottom: "24px", fontWeight: "500" }}>
                The VfM Office is not merely an advisory body; it is a statutory authority. Under Section 1 of Act 1172, the Office is established as a body corporate with the power to acquire and hold property, enter into contracts, and perform its functions independently.
              </p>
              <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#475569" }}>
                Our mandate extends across all phases of the public procurement lifecycle, from the earliest feasibility studies to the final project audit and impact evaluation.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* 6. THREE PILLARS & SCOPE OF AUTHORITY */}
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", marginBottom: "100px", alignItems: "start" }}>
            {pillars.map((pillar, index) => (
              <Reveal key={index} delay={index * 0.15}>
                <div style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "40px 32px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontSize: "24px", fontWeight: "700", color: "#0F172A", margin: "0 0 16px 0" }}>{pillar.title}</h3>
                  <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", margin: 0 }}>{pillar.desc}</p>
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

      {/* 7. THE GOVERNING BOARD (COMMITTEE LAYOUT) */}
      <section id="leadership" style={{ backgroundColor: "#F8F9FA", padding: "100px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#001F3F", margin: "0 0 12px 0" }}>The Governing Board</h2>
              <p style={{ color: "#666666", fontSize: "16px", margin: 0, maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
                The Office is governed by a multidisciplinary Board appointed in accordance with Section 4 of Act 1172. The Board is led by the Chairperson, with the Director-General serving as the chief executive.
              </p>
            </div>
          </Reveal>

          {/* TIER 1: The Chairperson */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "60px" }}>
            <Reveal width="auto">
              <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "40px", border: "2px solid #001F3F", boxShadow: "0 20px 40px rgba(0,31,63,0.15)", textAlign: "center", width: "320px" }}>
                <div style={{ width: "80px", height: "80px", backgroundColor: "#F1F5F9", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto" }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#001F3F" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#001F3F", margin: "0 0 4px 0" }}>Board Chairperson</h3>
                <p style={{ fontSize: "13px", color: "#64748B", fontWeight: "700", margin: 0, letterSpacing: "1px", textTransform: "uppercase" }}>Nominated by the Minister</p>
              </div>
            </Reveal>
          </div>

          {/* CONNECTOR */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
            <div style={{ width: "2px", height: "40px", backgroundColor: "#CBD5E1" }} />
          </div>

          {/* TIER 2: The Board Members Grid */}
          <Reveal delay={0.1}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <span style={{ fontSize: "12px", fontWeight: "800", color: "#8B7355", textTransform: "uppercase", letterSpacing: "1.5px" }}>Statutory Members of the Board</span>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {boardMembers.map((member, index) => (
              <Reveal key={index} delay={index * 0.05} width="100%">
                <div style={{ 
                  backgroundColor: member.isDG ? "#001F3F" : "#FFFFFF", 
                  borderRadius: "12px", 
                  padding: "24px", 
                  border: member.isDG ? "none" : "1px solid #E2E8F0", 
                  textAlign: "center", 
                  height: "100%", 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  justifyContent: "center",
                  boxShadow: member.isDG ? "0 10px 20px rgba(0,31,63,0.2)" : "0 4px 6px rgba(0,0,0,0.02)"
                }}>
                  
                  {member.image ? (
                    <img src={member.image} alt={member.title} style={{ width: "70px", height: "70px", borderRadius: "50%", objectFit: "cover", objectPosition: "top", marginBottom: "16px", border: "2px solid #FCD116" }} />
                  ) : (
                    <div style={{ width: "56px", height: "56px", backgroundColor: member.isDG ? "rgba(255,255,255,0.1)" : "#F8FAFC", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", border: member.isDG ? "1px solid rgba(255,255,255,0.2)" : "1px solid #E2E8F0" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={member.isDG ? "#FCD116" : "#94A3B8"} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                  )}

                  <h4 style={{ fontSize: "16px", fontWeight: "800", color: member.isDG ? "#FFFFFF" : "#001F3F", margin: "0 0 4px 0" }}>{member.title}</h4>
                  <p style={{ fontSize: "13px", color: member.isDG ? "#CBD5E1" : "#64748B", margin: 0, lineHeight: "1.4" }}>{member.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* 8. INSTITUTIONAL VALUES SECTION */}
      <section id="values" style={{ backgroundColor: "#FFFFFF", padding: "80px 24px" }}>
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
                <div style={{ backgroundColor: "#F8F9FA", padding: "32px", borderRadius: "8px", border: "1px solid #E2E8F0", height: "100%" }}>
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