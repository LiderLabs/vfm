import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronDown, Send, Search, ExternalLink, HelpCircle, X } from "lucide-react";
import { helpArticles } from "../data/helpData";

// Conversational filler words to strip out so natural language queries match
const STOP_WORDS = new Set([
  "how", "do", "i", "can", "we", "the", "a", "an", "is", "are", 
  "to", "for", "of", "in", "on", "what", "where", "when", "why", 
  "who", "which", "my", "our", "it", "with", "about", "at", "by", 
  "or", "and", "from", "be", "get", "need", "want"
]);

// Fast Levenshtein distance for typo tolerance
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

export default function Faq() {
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [openFaq, setOpenFaq] = useState(null);
  const [formStatus, setFormStatus] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", question: "" });

  useEffect(() => {
    if (urlQuery) {
      setSearchQuery(urlQuery);
    }
  }, [urlQuery]);

  const filteredArticles = searchArticles(searchQuery, helpArticles);

  const groupedArticles = filteredArticles.reduce((acc, article) => {
    if (!acc[article.category]) acc[article.category] = [];
    acc[article.category].push(article);
    return acc;
  }, {});

  const popularPills = [
    "Certificate of Clearance",
    "Track Complaint",
    "Penalty for Inflation",
    "Debarred Contractors",
    "Portal Login",
    "Whistleblower Policy",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus(true);
    setFormData({ name: "", email: "", question: "" });
    setTimeout(() => setFormStatus(false), 6000);
  };

  return (
    <div style={{ backgroundColor: "#F4F5F0", minHeight: "100vh" }}>
      
      {/* HERO & SEARCH SECTION */}
      <section style={{ backgroundColor: "#001F3F", padding: "120px 24px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/building-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15, zIndex: 0 }} />
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          
          <div style={{ width: "64px", height: "64px", backgroundColor: "rgba(252, 209, 22, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px auto" }}>
            <HelpCircle size={32} color="#FCD116" />
          </div>

          <h1 style={{ fontSize: "48px", fontWeight: "800", color: "#FFFFFF", marginBottom: "20px", lineHeight: "1.1" }}>
            How Can We Help You?
          </h1>
          <p style={{ fontSize: "18px", color: "#CBD5E1", lineHeight: "1.6", marginBottom: "36px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
            Search our knowledge base for instant answers about VfM assessments, clearance, sanctions, or the Portal.
          </p>
          
          {/* SEARCH BAR */}
          <div style={{ position: "relative", maxWidth: "640px", margin: "0 auto 24px auto" }}>
            <Search size={22} color="#64748B" style={{ position: "absolute", left: "24px", top: "22px" }} />
            <input 
              type="text" 
              placeholder="Ask anything (e.g. 'how do i check if a company is banned?')..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%", padding: "22px 64px 22px 64px", borderRadius: "12px", border: "none",
                fontSize: "17px", outline: "none", boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
                boxSizing: "border-box", color: "#001F3F"
              }}
            />
            {searchQuery && (
              <div style={{ position: "absolute", right: "20px", top: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "13px", fontWeight: "800", color: "#001F3F", backgroundColor: "#FCD116", padding: "6px 14px", borderRadius: "20px" }}>
                  {filteredArticles.length} found
                </span>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8", display: "flex", alignItems: "center", padding: "4px" }}
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* POPULAR SEARCH PILLS (Star icon removed) */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "8px", maxWidth: "700px", margin: "0 auto" }}>
            <span style={{ fontSize: "13px", color: "#94A3B8", fontWeight: "600", marginRight: "4px" }}>
              Popular:
            </span>
            {popularPills.map((pill, i) => (
              <button
                key={i}
                onClick={() => setSearchQuery(pill)}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "#E2E8F0",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(252, 209, 22, 0.25)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
              >
                {pill}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* KNOWLEDGE BASE */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "60px 24px 100px" }}>
        {filteredArticles.length > 0 ? (
          Object.entries(groupedArticles).map(([category, articles]) => (
            <div key={category} style={{ marginBottom: "60px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "24px", borderBottom: "1px solid #E2E8F0", paddingBottom: "12px" }}>
                <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", margin: 0 }}>
                  {category}
                </h2>
                <span style={{ fontSize: "13px", color: "#64748B", fontWeight: "600", backgroundColor: "#E2E8F0", padding: "4px 10px", borderRadius: "20px" }}>
                  {articles.length} article{articles.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {articles.map((article, index) => {
                  const globalIndex = `${category}-${index}`;
                  const isOpen = openFaq === globalIndex;
                  
                  return (
                    <div 
                      key={globalIndex} 
                      style={{ 
                        backgroundColor: "#FFFFFF",
                        borderRadius: "10px", 
                        border: "1px solid #E2E8F0",
                        overflow: "hidden", 
                        transition: "all 0.2s ease",
                        boxShadow: isOpen ? "0 10px 25px rgba(0,0,0,0.05)" : "0 2px 4px rgba(0,0,0,0.02)"
                      }}
                    >
                      <div 
                        onClick={() => setOpenFaq(isOpen ? null : globalIndex)}
                        style={{ 
                          padding: "20px 28px", 
                          display: "flex", 
                          justifyContent: "space-between", 
                          alignItems: "center", 
                          cursor: "pointer", 
                        }}
                      >
                        <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0F172A", margin: 0, paddingRight: "24px" }}>
                          {article.title}
                        </h3>
                        <div style={{ 
                          width: "32px", 
                          height: "32px", 
                          borderRadius: "50%", 
                          backgroundColor: isOpen ? "#FCD116" : "#F1F5F9", 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center", 
                          transition: "all 0.3s ease",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          flexShrink: 0
                        }}>
                          <ChevronDown size={18} color={isOpen ? "#001F3F" : "#64748B"} strokeWidth={2.5} />
                        </div>
                      </div>
                      
                      <div style={{ 
                        maxHeight: isOpen ? "500px" : "0px", 
                        overflow: "hidden", 
                        transition: "max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1)" 
                      }}>
                        <div style={{ padding: "0 28px 24px 28px" }}>
                          <p style={{ margin: "0 0 16px 0", fontSize: "15px", color: "#475569", lineHeight: "1.7" }}>
                            {article.answer}
                          </p>
                          {article.link && (
                            <Link 
                              to={article.link} 
                              style={{ 
                                display: "inline-flex", 
                                alignItems: "center", 
                                gap: "6px", 
                                fontSize: "13px", 
                                fontWeight: "700", 
                                color: "#001F3F", 
                                textDecoration: "none", 
                                borderBottom: "2px solid #001F3F", 
                                paddingBottom: "2px" 
                              }}
                            >
                              {article.linkText} <ExternalLink size={13} />
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
          <div style={{ textAlign: "center", padding: "60px 20px", backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
            <Search size={44} color="#94A3B8" style={{ marginBottom: "16px" }} />
            <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0F172A", marginBottom: "8px" }}>
              No exact match for "{searchQuery}"
            </h3>
            <p style={{ color: "#64748B", margin: "0 auto 28px auto", maxWidth: "450px", fontSize: "15px" }}>
              Try searching a keyword like <em>"clearance"</em>, <em>"complaint"</em>, or <em>"penalty"</em>, or jump directly to our core statutory services:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
              <Link to="/clearance" style={{ padding: "10px 18px", backgroundColor: "#F1F5F9", color: "#001F3F", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "13px" }}>
                Apply for Clearance
              </Link>
              <Link to="/track" style={{ padding: "10px 18px", backgroundColor: "#F1F5F9", color: "#001F3F", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "13px" }}>
                Track a Complaint
              </Link>
              <Link to="/sanctions" style={{ padding: "10px 18px", backgroundColor: "#F1F5F9", color: "#001F3F", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "13px" }}>
                Debarred Contractors List
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* CONTACT FORM */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px 100px" }}>
        <div style={{ backgroundColor: "#001F3F", borderRadius: "16px", padding: "60px", color: "white", boxShadow: "0 20px 40px rgba(0,31,63,0.2)" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "16px" }}>Still Have Questions?</h2>
          <p style={{ fontSize: "18px", color: "#CBD5E1", marginBottom: "40px" }}>
            Submit your question directly to our team. We will respond within 2 business days.
          </p>

          {formStatus ? (
            <div style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", border: "1px solid #10B981", padding: "32px", borderRadius: "12px", textAlign: "center" }}>
              <h3 style={{ color: "#10B981", margin: "0 0 12px 0", fontSize: "24px" }}>Question Received</h3>
              <p style={{ color: "#CBD5E1", margin: 0, fontSize: "16px" }}>Thank you. Our team will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "700", marginBottom: "8px" }}>Full Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: "100%", padding: "16px", borderRadius: "8px", border: "none", outline: "none", boxSizing: "border-box", fontSize: "16px" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "700", marginBottom: "8px" }}>Email Address</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: "100%", padding: "16px", borderRadius: "8px", border: "none", outline: "none", boxSizing: "border-box", fontSize: "16px" }} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "700", marginBottom: "8px" }}>Your Question</label>
                <textarea required rows="5" placeholder="Type your question here..." value={formData.question} onChange={(e) => setFormData({...formData, question: e.target.value})} style={{ width: "100%", padding: "16px", borderRadius: "8px", border: "none", outline: "none", resize: "vertical", boxSizing: "border-box", fontSize: "16px" }} />
              </div>
              <button type="submit" style={{ 
                backgroundColor: "#FCD116", color: "#001F3F", border: "none", padding: "18px 40px", 
                borderRadius: "8px", fontSize: "16px", fontWeight: "800", cursor: "pointer", 
                display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                alignSelf: "flex-start"
              }}>
                <Send size={18} /> Submit Question
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}