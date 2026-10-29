import { useState } from "react";

export default function Engagement() {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    setIsRegistered(true);
    // Reset after 3 seconds so they can see the success message
    setTimeout(() => {
      setSelectedEvent(null);
      setIsRegistered(false);
    }, 3000);
  };

  const upcomingHearings = [
    {
      title: "Public Hearing: Tema Interchange Phase 2",
      date: "November 15, 2026",
      time: "10:00 AM - 1:00 PM",
      location: "Tema Community Center, Greater Accra",
      status: "Registration Open"
    },
    {
      title: "Stakeholder Forum: Regional Hospital Equipment",
      date: "November 22, 2026",
      time: "9:00 AM - 12:00 PM",
      location: "Ghana Health Service Auditorium, Accra",
      status: "Registration Open"
    },
    {
      title: "Public Consultation: STEM School Construction",
      date: "December 05, 2026",
      time: "2:00 PM - 5:00 PM",
      location: "Ministry of Education Conference Hall, Accra",
      status: "Save the Date"
    }
  ];

  const pastMeetings = [
    {
      title: "Public Hearing: Pipeline Expansion Project",
      date: "October 10, 2026",
      keyIssues: "Community concerns regarding environmental impact and water supply disruption.",
      officeResponse: "The VfM Office mandated a revised Environmental Impact Assessment before approving the contract. The contractor must now provide a water restoration plan."
    },
    {
      title: "Stakeholder Meeting: School Furniture Procurement",
      date: "September 18, 2026",
      keyIssues: "Suppliers raised concerns about delayed payments and unclear quality specifications.",
      officeResponse: "Clear quality standards were published, and the Ministry of Education was directed to streamline payment processes for verified deliveries."
    }
  ];

  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ position: "relative", backgroundColor: "#001F3F", padding: "100px 24px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/building-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2, zIndex: 0 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(0,31,63,0.8) 0%, rgba(0,31,63,1) 100%)", zIndex: 1 }} />
        
        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "52px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 24px 0", lineHeight: "1.1" }}>
            Public Engagement & Fora
          </h1>
          <p style={{ fontSize: "20px", color: "#CBD5E1", lineHeight: "1.6", margin: 0, maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}>
            Ensuring that the voices of citizens and stakeholders are heard in the evaluation of major public projects (Section 43).
          </p>
        </div>
      </section>

      {/* 2. UPCOMING HEARINGS */}
      <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0F172A", margin: "0 0 8px 0" }}>Upcoming Public Hearings</h2>
          <p style={{ color: "#475569", fontSize: "16px", margin: 0 }}>The VfM Office invites the public to participate in these upcoming sessions.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {upcomingHearings.map((hearing, index) => (
            <div key={index} style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "32px", border: "1px solid #E2E8F0", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
              <div style={{ flex: 1, minWidth: "250px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: "0 0 12px 0" }}>{hearing.title}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", color: "#475569", fontSize: "15px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#001F3F" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    {hearing.date} | {hearing.time}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#001F3F" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {hearing.location}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px" }}>
                <span style={{ fontSize: "13px", fontWeight: "700", color: hearing.status === "Registration Open" ? "#10B981" : "#FCD116", backgroundColor: hearing.status === "Registration Open" ? "#D1FAE5" : "#FEF3C7", padding: "6px 12px", borderRadius: "20px" }}>
                  {hearing.status}
                </span>
                <button 
                  onClick={() => hearing.status === "Registration Open" && setSelectedEvent(hearing)}
                  style={{ 
                    backgroundColor: hearing.status === "Registration Open" ? "#001F3F" : "#E2E8F0", 
                    color: hearing.status === "Registration Open" ? "#FFFFFF" : "#64748B", 
                    border: "none", padding: "10px 24px", borderRadius: "4px", fontSize: "14px", fontWeight: "700", 
                    cursor: hearing.status === "Registration Open" ? "pointer" : "not-allowed" 
                  }}
                >
                  {hearing.status === "Registration Open" ? "Register to Attend" : "Details Coming Soon"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CITIZEN FEEDBACK FORM */}
      <section style={{ padding: "80px 24px", backgroundColor: "#FFFFFF", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0F172A", margin: "0 0 8px 0" }}>Submit Citizen Feedback</h2>
            <p style={{ color: "#475569", fontSize: "16px", margin: 0 }}>Cannot attend a hearing? Submit your comments on any ongoing public project directly to the VfM Office.</p>
          </div>

          {feedbackSubmitted ? (
            <div style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "12px", padding: "48px 32px", textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", backgroundColor: "#DCFCE7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px auto" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#166534", margin: "0 0 12px 0" }}>Feedback Received</h3>
              <p style={{ fontSize: "16px", color: "#15803D", margin: 0, lineHeight: "1.6" }}>Thank you for your contribution. Your feedback has been securely routed to the relevant assessment team and will be considered in our evaluation.</p>
              <button onClick={() => setFeedbackSubmitted(false)} style={{ marginTop: "24px", backgroundColor: "#001F3F", color: "#FFFFFF", border: "none", padding: "12px 24px", borderRadius: "6px", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>Submit Another Feedback</button>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Project Name</label>
                <input type="text" required placeholder="e.g., Tema Interchange Phase 2" style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "16px", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Your Feedback / Concern</label>
                <textarea required rows="5" placeholder="Describe your concern regarding this project. Please be as specific as possible." style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "16px", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
              </div>
              <button type="submit" style={{ backgroundColor: "#001F3F", color: "#FFFFFF", border: "none", padding: "16px", borderRadius: "8px", fontSize: "16px", fontWeight: "700", cursor: "pointer", width: "100%", boxSizing: "border-box" }}>
                Submit Feedback
              </button>
            </form>
          )}

        </div>
      </section>

      {/* 4. PAST MEETINGS ARCHIVE */}
      <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0F172A", margin: "0 0 8px 0" }}>Past Meetings & Outcomes</h2>
          <p style={{ color: "#475569", fontSize: "16px", margin: 0 }}>Summaries of issues raised by the public and the corresponding responses from the VfM Office (Section 43(4)(b)).</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {pastMeetings.map((meeting, index) => (
            <div key={index} style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "32px", border: "1px solid #E2E8F0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: 0 }}>{meeting.title}</h3>
                <span style={{ fontSize: "14px", color: "#64748B", fontWeight: "600" }}>{meeting.date}</span>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
                <div>
                  <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#EF4444", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.5px" }}>Key Issues Raised</h4>
                  <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", margin: 0 }}>{meeting.keyIssues}</p>
                </div>
                <div>
                  <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#10B981", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.5px" }}>Office Response</h4>
                  <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", margin: 0 }}>{meeting.officeResponse}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REGISTRATION MODAL */}
      {selectedEvent && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,31,63,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "24px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "40px", maxWidth: "500px", width: "100%", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            
            {isRegistered ? (
              <div style={{ textAlign: "center" }}>
                <div style={{ width: "64px", height: "64px", backgroundColor: "#D1FAE5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px auto" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", margin: "0 0 12px 0" }}>Registration Confirmed</h3>
                <p style={{ fontSize: "16px", color: "#475569", margin: 0, lineHeight: "1.6" }}>You have successfully registered for <strong>{selectedEvent.title}</strong>. A confirmation email has been sent to you.</p>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                  <div>
                    <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", margin: "0 0 4px 0" }}>Register to Attend</h3>
                    <p style={{ fontSize: "14px", color: "#64748B", margin: 0 }}>{selectedEvent.title}</p>
                  </div>
                  <button onClick={() => setSelectedEvent(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>

                <form onSubmit={handleRegistrationSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Full Name</label>
                    <input type="text" required style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "15px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Email Address</label>
                    <input type="email" required style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "15px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Organization (Optional)</label>
                    <input type="text" style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "15px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <button type="submit" style={{ backgroundColor: "#001F3F", color: "#FFFFFF", border: "none", padding: "14px", borderRadius: "8px", fontSize: "16px", fontWeight: "700", cursor: "pointer", marginTop: "8px" }}>
                    Confirm Registration
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}