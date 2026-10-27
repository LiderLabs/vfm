import { useState } from "react";

export default function Submit() {
  const [fileName, setFileName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: "#F4F5F0", minHeight: "100vh", padding: "100px 24px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* HEADER - Text and dashes removed */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1 style={{ fontSize: "52px", fontWeight: "800", color: "#0F172A", margin: "0 0 16px 0", lineHeight: "1.1" }}>
            Document Submission Portal
          </h1>
          <p style={{ fontSize: "18px", color: "#475569", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            Submit evidence of contract inflation, abandoned projects, or request a public expenditure review. 
          </p>
        </div>

        {/* FORM CARD */}
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "48px", boxShadow: "0 20px 40px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0" }}>
          
          {isSubmitted ? (
            // SUCCESS STATE
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ width: "80px", height: "80px", backgroundColor: "#10B98120", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px auto" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0F172A", marginBottom: "16px" }}>Submission Received</h2>
              <p style={{ fontSize: "18px", color: "#475569", marginBottom: "32px", lineHeight: "1.6" }}>
                Your document has been securely routed to our assessment team. A reference number will be sent to your email if provided.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                style={{ padding: "14px 32px", backgroundColor: "#001F3F", color: "#FFFFFF", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}
              >
                Submit Another Document
              </button>
            </div>
          ) : (
            // FORM STATE
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Full Name (Optional)</label>
                  <input type="text" placeholder="Leave blank to remain anonymous" style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "16px", outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Email Address (Optional)</label>
                  <input type="email" placeholder="For follow-up purposes" style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "16px", outline: "none" }} />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Subject / Project Name</label>
                <input type="text" required placeholder="e.g., Tema Interchange Phase 2" style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "16px", outline: "none" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Type of Submission</label>
                <select style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "16px", outline: "none", backgroundColor: "#FFFFFF", cursor: "pointer" }}>
                  <option>Select a category...</option>
                  <option>Evidence of Contract Inflation</option>
                  <option>Abandoned Government Project</option>
                  <option>Unjustified Cost Variance</option>
                  <option>Request for Expenditure Review</option>
                  <option>General Public Inquiry</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Description of Issue</label>
                <textarea required rows="5" placeholder="Provide details about the project, the procuring entity, and the issue you are reporting." style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "16px", outline: "none", resize: "vertical" }} />
              </div>

              {/* FILE UPLOAD */}
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>Upload Supporting Documents</label>
                <div style={{ border: "2px dashed #CBD5E1", borderRadius: "12px", padding: "32px", textAlign: "center", backgroundColor: "#F8FAFC", position: "relative", cursor: "pointer" }}>
                  <input type="file" onChange={handleFileChange} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }} />
                  
                  <div style={{ width: "48px", height: "48px", backgroundColor: "#E2E8F0", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  </div>
                  
                  <p style={{ fontSize: "16px", fontWeight: "600", color: "#0F172A", margin: "0 0 4px 0" }}>
                    {fileName ? fileName : "Click to upload or drag and drop"}
                  </p>
                  <p style={{ fontSize: "13px", color: "#64748B", margin: 0 }}>PDF, DOCX, XLSX, or Images (Max 25MB)</p>
                </div>
              </div>

              {/* SECURITY NOTICE */}
              <div style={{ display: "flex", gap: "12px", backgroundColor: "#F0FDF4", padding: "16px", borderRadius: "8px", border: "1px solid #BBF7D0" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" style={{ flexShrink: 0 }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <p style={{ fontSize: "13px", color: "#166534", margin: 0, lineHeight: "1.5" }}>
                  <strong>Privacy Guarantee:</strong> All submissions are encrypted. If you leave the name and email fields blank, your submission will remain completely anonymous.
                </p>
              </div>

              {/* BUTTON - Now just "Submit" */}
              <button type="submit" style={{ backgroundColor: "#001F3F", color: "#FFFFFF", border: "none", padding: "18px", borderRadius: "8px", fontSize: "16px", fontWeight: "800", cursor: "pointer", marginTop: "8px", transition: "background-color 0.2s ease" }}>
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}