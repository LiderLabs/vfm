import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, X, ChevronDown, ExternalLink, HelpCircle } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { helpArticles } from "../data/helpData";

// Conversational filler words
const STOP_WORDS = new Set([
  "how", "do", "i", "can", "we", "the", "a", "an", "is", "are", 
  "to", "for", "of", "in", "on", "what", "where", "when", "why", 
  "who", "which", "my", "our", "it", "with", "about", "at", "by", 
  "or", "and", "from", "be", "get", "need", "want"
]);

function getEditDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i - 1][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function isFuzzyMatch(word, target) {
  if (target.includes(word) || word.includes(target)) return true;
  if (word.length <= 3) return word === target;
  const maxDistance = word.length >= 6 ? 2 : 1;
  return getEditDistance(word, target) <= maxDistance;
}

function searchArticles(rawQuery, articles) {
  if (!rawQuery || !rawQuery.trim()) {
    return articles;
  }

  const cleanQuery = rawQuery.toLowerCase().trim();
  const rawTokens = cleanQuery.replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  const meaningfulTokens = rawTokens.filter((token) => !STOP_WORDS.has(token));
  const searchTokens = meaningfulTokens.length > 0 ? meaningfulTokens : rawTokens;

  const scoredArticles = articles.map((article) => {
    let score = 0;
    const titleLower = article.title.toLowerCase();
    const answerLower = article.answer.toLowerCase();
    const categoryLower = article.category.toLowerCase();
    const keywordsLower = article.keywords.map((k) => k.toLowerCase());

    if (titleLower.includes(cleanQuery)) score += 50;
    if (keywordsLower.some((k) => k.includes(cleanQuery))) score += 40;
    if (answerLower.includes(cleanQuery)) score += 15;

    searchTokens.forEach((token) => {
      if (titleLower.includes(token)) {
        score += 15;
      } else if (titleLower.split(/\s+/).some((w) => isFuzzyMatch(token, w))) {
        score += 8;
      }

      if (keywordsLower.some((k) => k === token)) {
        score += 20;
      } else if (keywordsLower.some((k) => k.includes(token))) {
        score += 12;
      } else if (keywordsLower.some((k) => isFuzzyMatch(token, k))) {
        score += 7;
      }

      if (categoryLower.includes(token)) {
        score += 8;
      }

      if (answerLower.includes(token)) {
        score += 4;
      }
    });

    return { article, score };
  });

  return scoredArticles
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.article);
}

export default function FloatingHelpButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openArticle, setOpenArticle] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Dynamic coordinates
  const anchorX = useMotionValue(0);
  const anchorY = useMotionValue(0);
  const dockX = useMotionValue(0);
  const dockY = useMotionValue(0);
  const baseSize = useMotionValue(42);

  // 1. SCROLL-INDUCED CONTROLLER (Starts immediately at 0px to 180px)
  const { scrollY } = useScroll();
  const rawFlight = useTransform(scrollY, [0, 180], [0, 1]);

  // CRITICALLY DAMPED SPRING (Zero bounce, zero overshoot past 0 or 1)
  const smoothFlight = useSpring(rawFlight, { 
    stiffness: 120, 
    damping: 26, 
    mass: 0.5,
    restDelta: 0.001 
  });

  // HARD CLAMP: Guarantees it can NEVER surpass the navbar slot (never < 0) or the edge (never > 1)
  const flight = useTransform(smoothFlight, (v) => Math.min(Math.max(v, 0), 1));

  // Trajectory with a subtle, graceful 18px arc
  const currentX = useTransform([flight, anchorX, dockX], ([p, ax, dx]) => ax + p * (dx - ax));
  const currentY = useTransform(
    [flight, anchorY, dockY],
    ([p, ay, dy]) => ay + p * (dy - ay) + Math.sin(p * Math.PI) * 18
  );

  // Smooth GPU transforms without state re-renders
  const buttonWidth = useTransform([flight, baseSize], ([p, bs]) => bs + p * (48 - bs));
  const buttonHeight = useTransform([flight, baseSize], ([p, bs]) => bs + p * (52 - bs));
  
  // Clean transition from 4px square in navbar to 26px rounded tab at edge
  const borderRadius = useTransform(flight, [0, 0.4, 1], [
    "4px 4px 4px 4px",
    "16px 16px 16px 16px",
    "26px 0px 0px 26px",
  ]);

  const backgroundColor = useTransform(flight, [0, 0.35, 1], ["#FFFFFF", "#FEEF85", "#FCD116"]);
  const borderStyle = useTransform(flight, (p) => (p < 0.15 ? "1px solid #CBD5E1" : "none"));
  const boxShadow = useTransform(
    flight,
    [0, 0.2, 1],
    ["0 0 0 rgba(0,0,0,0)", "0 6px 16px rgba(0,31,63,0.12)", "0 8px 25px rgba(0,31,63,0.22)"]
  );

  // Peeking offset: "-50%" in flight/navbar, tucks to "-65%" when arriving at the edge
  const xOffset = useTransform(flight, [0, 0.85, 1], ["-50%", "-50%", "-65%"]);

  // Measures exact slot position relative to scroll = 0 to prevent drift
  useEffect(() => {
    const updateCoordinates = () => {
      const isMob = window.innerWidth <= 1200;
      baseSize.set(isMob ? 38 : 42);

      const targetId = isMob ? "navbar-search-anchor-mobile" : "navbar-search-anchor";
      const navSlot = document.getElementById(targetId);

      if (navSlot) {
        const rect = navSlot.getBoundingClientRect();
        // Always calculate the slot's true coordinate relative to the top of the document
        const currentScroll = window.scrollY;
        const trueTop = rect.top + currentScroll;
        
        anchorX.set(rect.left + rect.width / 2);
        anchorY.set(trueTop + rect.height / 2);
      }

      dockX.set(window.innerWidth);
      dockY.set(window.innerHeight * 0.5);

      setIsReady(true);
    };

    updateCoordinates();
    window.addEventListener("resize", updateCoordinates);
    return () => window.removeEventListener("resize", updateCoordinates);
  }, [anchorX, anchorY, dockX, dockY, baseSize]);

  useEffect(() => {
    setIsOpen(false);
    setSearchQuery("");
    setOpenArticle(null);
  }, [location.pathname]);

  const filteredArticles = searchArticles(searchQuery, helpArticles);

  const groupedArticles = filteredArticles.reduce((acc, article) => {
    if (!acc[article.category]) acc[article.category] = [];
    acc[article.category].push(article);
    return acc;
  }, {});

  const quickPills = [
    "Clearance",
    "Track Complaint",
    "Inflation Penalty",
    "Debarred List",
    "Portal Login",
  ];

  const isExcludedRoute =
    location.pathname === "/faq" ||
    location.pathname === "/portal" ||
    location.pathname.startsWith("/dashboard");

  if (isExcludedRoute || !isReady) {
    return null;
  }

  return (
    <>
      {/* SCROLL-INDUCED FLYING ICON */}
      {!isOpen && (
        <motion.div
          onClick={() => {
            // If scrolled, open flyout. If resting in navbar, go to FAQ.
            if (flight.get() > 0.75) {
              setIsOpen(true);
            } else {
              navigate("/faq");
            }
          }}
          style={{
            position: "fixed",
            left: currentX,
            top: currentY,
            x: xOffset,
            y: "-50%",
            width: buttonWidth,
            height: buttonHeight,
            borderRadius: borderRadius,
            backgroundColor: backgroundColor,
            border: borderStyle,
            boxShadow: boxShadow,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 9990,
            overflow: "hidden",
          }}
          whileHover={{
            // Slides out smoothly when hovering while docked on the edge
            x: flight.get() > 0.75 ? "-100%" : "-50%",
            scale: flight.get() > 0.75 ? 1.05 : 1.02,
          }}
          whileTap={{ scale: 0.95 }}
          title="Search Help Center"
        >
          <Search size={19} color="#001F3F" strokeWidth={2.4} />
        </motion.div>
      )}

      {/* ASSISTANT DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 31, 63, 0.35)",
                backdropFilter: "blur(4px)",
                zIndex: 9998,
              }}
            />

            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              style={{
                position: "fixed",
                top: "16px",
                bottom: "16px",
                right: "16px",
                width: "calc(100vw - 32px)",
                maxWidth: "380px",
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                boxShadow: "0 25px 60px -15px rgba(0, 31, 63, 0.35)",
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                border: "1px solid #E2E8F0",
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: "20px 24px",
                  borderBottom: "1px solid #F1F5F9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#001F3F",
                  color: "#FFFFFF",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      backgroundColor: "#FCD116",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <HelpCircle size={18} color="#001F3F" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "800" }}>Help Center</h4>
                    <p style={{ margin: 0, fontSize: "12px", opacity: 0.8 }}>Ask anything or search</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "none",
                    color: "#FFFFFF",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Search Bar */}
              <div style={{ padding: "16px 20px 8px 20px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    backgroundColor: "#F8FAFC",
                    border: "1px solid #CBD5E1",
                  }}
                >
                  <Search size={18} color="#64748B" />
                  <input
                    type="text"
                    placeholder="Ask or search (e.g. 'track case', 'permit')..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                      width: "100%",
                      fontSize: "13px",
                      color: "#001F3F",
                    }}
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                    >
                      <X size={16} color="#94A3B8" />
                    </button>
                  )}
                </div>

                {/* Suggested Chips */}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px", marginTop: "10px" }}>
                  <span style={{ fontSize: "11px", color: "#64748B", fontWeight: "600" }}>
                    Suggested:
                  </span>
                  {quickPills.map((pill, i) => (
                    <button
                      key={i}
                      onClick={() => setSearchQuery(pill)}
                      style={{
                        backgroundColor: "#F1F5F9",
                        border: "1px solid #E2E8F0",
                        borderRadius: "12px",
                        padding: "3px 8px",
                        fontSize: "11px",
                        color: "#001F3F",
                        cursor: "pointer",
                        fontWeight: "600",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#E2E8F0")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F1F5F9")}
                    >
                      {pill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable Content */}
              <div style={{ flex: 1, overflowY: "auto", padding: "12px 20px 20px 20px" }}>
                {filteredArticles.length > 0 ? (
                  Object.entries(groupedArticles).map(([category, articles]) => (
                    <div key={category} style={{ marginBottom: "18px" }}>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: "800",
                          color: "#8B7355",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          display: "block",
                          marginBottom: "8px",
                        }}
                      >
                        {category}
                      </span>

                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {articles.map((article, index) => {
                          const articleId = `${category}-${index}`;
                          const isExpanded = openArticle === articleId;

                          return (
                            <div
                              key={articleId}
                              style={{
                                borderRadius: "8px",
                                border: "1px solid #F1F5F9",
                                backgroundColor: isExpanded ? "#F8FAFC" : "#FFFFFF",
                                overflow: "hidden",
                                transition: "all 0.2s ease",
                              }}
                            >
                              <div
                                onClick={() => setOpenArticle(isExpanded ? null : articleId)}
                                style={{
                                  padding: "10px 12px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  cursor: "pointer",
                                  gap: "12px",
                                }}
                              >
                                <span style={{ fontSize: "13px", fontWeight: "600", color: "#0F172A", lineHeight: "1.3" }}>
                                  {article.title}
                                </span>
                                <ChevronDown
                                  size={16}
                                  color="#94A3B8"
                                  style={{
                                    flexShrink: 0,
                                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                                    transition: "transform 0.2s ease",
                                  }}
                                />
                              </div>

                              <div
                                style={{
                                  maxHeight: isExpanded ? "300px" : "0px",
                                  opacity: isExpanded ? 1 : 0,
                                  overflow: "hidden",
                                  transition: "max-height 0.3s ease, opacity 0.3s ease",
                                }}
                              >
                                <div style={{ padding: "0 12px 12px 12px" }}>
                                  <p style={{ margin: "0 0 10px 0", fontSize: "12px", color: "#475569", lineHeight: "1.5" }}>
                                    {article.answer}
                                  </p>
                                  {article.link && (
                                    <Link
                                      to={article.link}
                                      onClick={() => setIsOpen(false)}
                                      style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        fontSize: "12px",
                                        fontWeight: "700",
                                        color: "#001F3F",
                                        textDecoration: "none",
                                        borderBottom: "1px solid #001F3F",
                                      }}
                                    >
                                      {article.linkText}
                                      <ExternalLink size={10} />
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: "30px 10px", textAlign: "center" }}>
                    <Search size={32} color="#94A3B8" style={{ marginBottom: "12px" }} />
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      No exact match for "{searchQuery}"
                    </div>
                    <p style={{ color: "#64748B", fontSize: "12px", margin: "0 0 16px 0" }}>
                      Try asking with simpler terms, or visit our primary services:
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <Link
                        to="/clearance"
                        onClick={() => setIsOpen(false)}
                        style={{ padding: "8px", backgroundColor: "#F8FAFC", borderRadius: "6px", fontSize: "12px", fontWeight: "600", color: "#001F3F", textDecoration: "none" }}
                      >
                        Apply for Clearance →
                      </Link>
                      <Link
                        to="/track"
                        onClick={() => setIsOpen(false)}
                        style={{ padding: "8px", backgroundColor: "#F8FAFC", borderRadius: "6px", fontSize: "12px", fontWeight: "600", color: "#001F3F", textDecoration: "none" }}
                      >
                        Track a Complaint →
                      </Link>
                      <Link
                        to="/sanctions"
                        onClick={() => setIsOpen(false)}
                        style={{ padding: "8px", backgroundColor: "#F8FAFC", borderRadius: "6px", fontSize: "12px", fontWeight: "600", color: "#001F3F", textDecoration: "none" }}
                      >
                        Debarred Contractors Register →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer CTA */}
              <div
                style={{
                  padding: "16px 20px",
                  borderTop: "1px solid #F1F5F9",
                  backgroundColor: "#FAFAFA",
                }}
              >
                <Link
                  to={searchQuery ? `/faq?q=${encodeURIComponent(searchQuery)}` : "/faq"}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "#001F3F",
                    color: "#FCD116",
                    textDecoration: "none",
                    fontWeight: "800",
                    fontSize: "14px",
                  }}
                >
                  <span>Explore Full FAQ Center</span>
                  <ExternalLink size={16} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}