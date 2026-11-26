import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getPublications,
  resetPublications,
  LS_PUBLICATIONS_EVENT,
} from "../services/mockData";

// ========================================================
// HAND-DRAWN ICONS (Optimized for Dark Executive Theme)
// ========================================================
const HandDrawnPage = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" stroke="#FCD116" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 7 C10 5.5, 11.5 4, 13 4 L28 4 L38 14 L38 42 C38 43.5, 36.5 45, 35 45 L13 45 C11.5 45, 10 43.5, 10 42 Z" />
    <path d="M28 4 L28 14 L38 14" />
    <path d="M16 24 L32 24" strokeWidth="2" />
    <path d="M16 32 L24 32" strokeWidth="2" />
  </svg>
);

const HandDrawnNotice = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" stroke="#10B981" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 7 C10 5.5, 11.5 4, 13 4 L28 4 L38 14 L38 42 C38 43.5, 36.5 45, 35 45 L13 45 C11.5 45, 10 43.5, 10 42 Z" />
    <path d="M28 4 L28 14 L38 14" />
    <path d="M16 24 L20 28 L32 16" strokeWidth="2.5" />
  </svg>
);

const HandDrawnImage = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" stroke="#38BDF8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="10" width="36" height="28" rx="3" />
    <circle cx="16" cy="20" r="3" />
    <path d="M6 32 L18 22 L28 32 L34 26 L42 34" />
  </svg>
);

const HandDrawnDraft = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" stroke="#FB7185" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 6 L42 39 C43 41, 41.5 42.5, 39.5 42.5 L8.5 42.5 C6.5 42.5, 5 41, 6 39 L24 6 Z" />
    <path d="M24 18 L24 28" strokeWidth="3" />
    <circle cx="24" cy="35" r="1.5" fill="#FB7185" />
  </svg>
);

export default function CMSDashboard() {
  const [pubCount, setPubCount] = useState(() => getPublications().length);
  
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  const [todos, setTodos] = useState([
    { id: 1, text: "Review Tema Interchange press release", completed: false },
    { id: 2, text: "Update About Us page with new Board member", completed: false },
    { id: 3, text: "Upload Q4 2026 Annual Report", completed: true },
    { id: 4, text: "Fix typo on What We Do page", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  // Updated Hero Text to reflect the VfM mandate
  const heroSlides = [
    {
      headline: "Value for Money Oversight",
      sub: "Ensuring efficiency, accountability, and fiscal integrity across all public spending."
    },
    {
      headline: "Mandatory Certifications",
      sub: "Review and certify major government contracts before award to prevent inflated costs."
    },
    {
      headline: "Protecting Public Funds",
      sub: "Monitoring national infrastructure projects to eliminate waste and ensure every Cedi delivers value."
    }
  ];

  // Auto-rotate hero text
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const update = () => setPubCount(getPublications().length);
    window.addEventListener(LS_PUBLICATIONS_EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(LS_PUBLICATIONS_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const stats = [
    { label: "Active Pages", value: "6", trend: "All systems online", isUp: true, color: "#FCD116", icon: <HandDrawnPage />, bg: "rgba(252, 209, 22, 0.12)" },
    { label: "Published Notices", value: String(pubCount), trend: "+1 this month", isUp: true, color: "#10B981", icon: <HandDrawnNotice />, bg: "rgba(16, 185, 129, 0.12)" },
    { label: "Media Assets", value: "24", trend: "3 pending review", isUp: null, color: "#38BDF8", icon: <HandDrawnImage />, bg: "rgba(56, 189, 248, 0.12)" },
    { label: "Draft Content", value: "2", trend: "Needs approval", isUp: false, color: "#FB7185", icon: <HandDrawnDraft />, bg: "rgba(251, 113, 133, 0.12)" },
  ];

  const recentPubs = getPublications().slice(0, 4);

  const recentlyUpdatedPages = [
    { name: "Homepage", updated: "2 hours ago", editor: "Admin", link: "/cms/homepage" },
    { name: "About Us", updated: "Yesterday", editor: "Admin", link: "/cms/about" },
    { name: "What We Do", updated: "2 days ago", editor: "Admin", link: "/cms/what-we-do" },
    { name: "Contact Us", updated: "1 week ago", editor: "Admin", link: "/cms/contact" },
  ];

  const handleResetDemo = () => {
    if (window.confirm("This will remove custom demo changes and restore the original content. Continue?")) {
      resetPublications();
    }
  };

  return (
    // FULL-BLEED ZERO-WHITE-SPACE WRAPPER
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        backgroundColor: "#00172E", // Seamless Deep Navy
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        padding: "36px 40px",
        boxSizing: "border-box",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* 1. HERO CAROUSEL (Full Video Background with Gradient Overlay) */}
      <div
        style={{
          borderRadius: "14px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.4)",
          position: "relative",
          overflow: "hidden",
          height: "320px", // Increased height to show the people
        }}
      >
        {/* Full-bleed Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%", // Shifts the focus up so heads/vests are visible
            zIndex: 0,
          }}
        >
          <source src="/vfm-banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Gradient Overlay for Text Readability */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          // Adjusted gradient to let the center/right breathe more so the vests show clearly
          background: "linear-gradient(90deg, rgba(0, 31, 63, 0.95) 0%, rgba(0, 31, 63, 0.6) 45%, rgba(0, 31, 63, 0.1) 100%)",
          zIndex: 1
        }} />

        {/* Top Section: Text & Button */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
          <div style={{ maxWidth: "600px" }}>
            <h1 style={{ margin: "0 0 8px 0", fontSize: "28px", fontWeight: "900", color: "#FFFFFF", letterSpacing: "-0.5px", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
              {heroSlides[currentSlide].headline}
            </h1>
            <p style={{ margin: 0, fontSize: "15px", color: "#E2E8F0", lineHeight: "1.5", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
              {heroSlides[currentSlide].sub}
            </p>
          </div>
          
          <button
            onClick={handleResetDemo}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(4px)",
              color: "#FFFFFF",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "8px 16px",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "13px",
              transition: "all 0.2s ease",
              flexShrink: 0,
              marginLeft: "20px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(251, 113, 133, 0.2)";
              e.currentTarget.style.color = "#FB7185";
              e.currentTarget.style.borderColor = "#FB7185";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.color = "#FFFFFF";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
            }}
          >
            Reset Demo Content
          </button>
        </div>

        {/* Bottom Section: Slide Indicators */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", gap: "8px" }}>
          {heroSlides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentSlide(i)}
              style={{
                width: currentSlide === i ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: currentSlide === i ? "#FCD116" : "rgba(255,255,255,0.3)",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            />
          ))}
        </div>
      </div>

      {/* 2. STATS OVERVIEW CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#0A2540",
              padding: "24px",
              borderRadius: "14px",
              border: "1px solid rgba(255, 255, 255, 0.07)",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "transform 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.borderColor = "rgba(252, 209, 22, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.07)";
            }}
          >
            <div>
              <p style={{ margin: "0 0 8px 0", fontSize: "12px", fontWeight: "800", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "1px" }}>
                {stat.label}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                <h3 style={{ margin: 0, fontSize: "34px", fontWeight: "900", color: "#FFFFFF", letterSpacing: "-1px" }}>
                  {stat.value}
                </h3>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: stat.isUp === true ? "#10B981" : stat.isUp === false ? "#FB7185" : "#94A3B8",
                  }}
                >
                  {stat.trend}
                </span>
              </div>
            </div>

            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "12px",
                backgroundColor: stat.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                flexShrink: 0,
              }}
            >
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* 3. MIDDLE ROW: RECENT PAGES & TASK MANAGER */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))", gap: "24px" }}>
        
        {/* Left: Recently Updated Pages Table */}
        <div
          style={{
            backgroundColor: "#0A2540",
            borderRadius: "14px",
            border: "1px solid rgba(255, 255, 255, 0.07)",
            padding: "26px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
            overflowX: "auto",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "800", color: "#FFFFFF" }}>Recently Updated Pages</h3>
              <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#94A3B8" }}>Direct shortcuts to page content editors</p>
            </div>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "500px" }}>
            <thead>
              <tr style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
                {["Page Name", "Editor", "Last Modified", "Action"].map((h) => (
                  <th key={h} style={{ padding: "12px 14px", fontSize: "11px", fontWeight: "800", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentlyUpdatedPages.map((page, i) => (
                <tr
                  key={i}
                  style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)", transition: "background-color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <td style={{ padding: "14px", fontSize: "14px", fontWeight: "800", color: "#FCD116" }}>{page.name}</td>
                  <td style={{ padding: "14px", fontSize: "13px", color: "#CBD5E1" }}>{page.editor}</td>
                  <td style={{ padding: "14px", fontSize: "13px", color: "#94A3B8" }}>{page.updated}</td>
                  <td style={{ padding: "14px" }}>
                    <Link
                      to={page.link}
                      style={{
                        padding: "6px 14px",
                        backgroundColor: "rgba(252, 209, 22, 0.12)",
                        color: "#FCD116",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "700",
                        textDecoration: "none",
                        border: "1px solid rgba(252, 209, 22, 0.25)",
                        transition: "all 0.15s ease",
                        display: "inline-block",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#FCD116";
                        e.currentTarget.style.color = "#001F3F";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(252, 209, 22, 0.12)";
                        e.currentTarget.style.color = "#FCD116";
                      }}
                    >
                      Edit Page →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: To-Do Task Manager */}
        <div
          style={{
            backgroundColor: "#0A2540",
            borderRadius: "14px",
            border: "1px solid rgba(255, 255, 255, 0.07)",
            padding: "26px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
          }}
        >
          <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: "800", color: "#FFFFFF" }}>Action Items & Tasks</h3>
          <p style={{ margin: "0 0 20px 0", fontSize: "13px", color: "#94A3B8" }}>Internal notes for editorial team</p>

          <form onSubmit={handleAddTodo} style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Add new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              style={{
                flex: 1,
                padding: "11px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "rgba(0, 20, 46, 0.6)",
                color: "#FFFFFF",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#FCD116",
                color: "#001F3F",
                border: "none",
                padding: "11px 18px",
                borderRadius: "8px",
                fontWeight: "800",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              Add
            </button>
          </form>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {todos.map((todo) => (
              <div
                key={todo.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.04)",
                }}
              >
                <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", flex: 1 }}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    style={{ width: "17px", height: "17px", cursor: "pointer", accentColor: "#FCD116" }}
                  />
                  <span
                    style={{
                      fontSize: "13px",
                      color: todo.completed ? "#64748B" : "#CBD5E1",
                      textDecoration: todo.completed ? "line-through" : "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {todo.text}
                  </span>
                </label>
                <button
                  onClick={() => removeTodo(todo.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#94A3B8",
                    cursor: "pointer",
                    fontSize: "14px",
                    padding: "4px 8px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FB7185")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#94A3B8")}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. BOTTOM ROW: RECENT PUBLICATIONS */}
      <div
        style={{
          backgroundColor: "#0A2540",
          borderRadius: "14px",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          padding: "26px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "800", color: "#FFFFFF" }}>Recently Published Notices & Acts</h3>
            <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#94A3B8" }}>Official public items currently live on the repository</p>
          </div>
          <Link
            to="/cms/publications"
            style={{
              fontSize: "13px",
              color: "#FCD116",
              fontWeight: "700",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            Manage All Notices →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {recentPubs.map((pub) => (
            <div
              key={pub.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                backgroundColor: "rgba(0, 20, 46, 0.4)",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                gap: "14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(16, 185, 129, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <HandDrawnNotice />
                </div>
                <div>
                  <h4 style={{ margin: "0 0 3px 0", fontSize: "14px", fontWeight: "700", color: "#FFFFFF", lineHeight: "1.3" }}>
                    {pub.title}
                  </h4>
                  <span style={{ fontSize: "11px", fontWeight: "700", color: "#FCD116", textTransform: "uppercase" }}>
                    {pub.tag}
                  </span>
                </div>
              </div>
              <span style={{ fontSize: "12px", color: "#64748B", whiteSpace: "nowrap" }}>{pub.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}