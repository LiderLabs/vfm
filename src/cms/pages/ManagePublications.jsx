// src/cms/pages/ManagePublications.jsx
import { useState } from "react";
import {
  categories,
  getPublications,
  savePublications,
} from "../services/mockData";

export default function ManagePublications() {
  // Reads from localStorage if the CMS has saved anything, otherwise the original site data.
  // Nothing is written until the admin publishes or deletes something.
  const [publications, setPublications] = useState(() => getPublications());
  const [isCreating, setIsCreating] = useState(false);

  // Form state
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newTag, setNewTag] = useState(categories[0]);
  const [newImage, setNewImage] = useState(null);

  // Convert uploaded image to base64 so it survives reloads
  // (blob: URLs die the moment you refresh or navigate)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setNewImage(reader.result);
    reader.readAsDataURL(file);
  };

  // Central save helper. Writes to localStorage and notifies the website.
  // State only updates after a successful write. Returns true if saved.
  const persist = (updatedPubs) => {
    try {
      savePublications(updatedPubs);
      setPublications(updatedPubs);
      return true;
    } catch (err) {
      alert(
        "Failed to save. Storage is likely full (5MB limit). " +
          "Try a smaller image or delete some publications."
      );
      console.error(err);
      return false;
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newPub = {
      id: `pub-${Date.now()}`,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      tag: newTag,
      title: newTitle,
      desc: newDesc,
      image: newImage || "/about-bg.jpg",
    };

    // New items go to the FRONT so the Publications page shows them first
    if (!persist([newPub, ...publications])) return;

    // Reset form
    setIsCreating(false);
    setNewTitle("");
    setNewDesc("");
    setNewTag(categories[0]);
    setNewImage(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this publication?")) return;
    persist(publications.filter((p) => p.id !== id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* HEADER ACTION BAR */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "#0F172A" }}>
          {isCreating ? "Create New Publication" : "All Publications"}
        </h2>
        <button
          onClick={() => setIsCreating(!isCreating)}
          style={{
            backgroundColor: isCreating ? "#E2E8F0" : "#001F3F",
            color: isCreating ? "#0F172A" : "#FFFFFF",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          {isCreating ? "Cancel" : "+ Add Publication"}
        </button>
      </div>

      {/* CREATE FORM */}
      {isCreating && (
        <div style={{ backgroundColor: "#FFFFFF", padding: "32px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Title</label>
                <input
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #CBD5E1", outline: "none" }}
                  placeholder="e.g., New Procurement Guidelines Issued"
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Category Tag</label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #CBD5E1", outline: "none", backgroundColor: "#FFF" }}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Cover Image</label>
              <div
                style={{
                  border: "2px dashed #CBD5E1",
                  borderRadius: "8px",
                  padding: "24px",
                  textAlign: "center",
                  backgroundColor: "#F8FAFC",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
                />
                {newImage ? (
                  <div>
                    <img src={newImage} alt="Preview" style={{ maxHeight: "100px", borderRadius: "4px", marginBottom: "8px" }} />
                    <p style={{ margin: 0, fontSize: "13px", color: "#10B981", fontWeight: "600" }}>Image selected! Click to change.</p>
                  </div>
                ) : (
                  <div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" style={{ marginBottom: "8px" }}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <p style={{ margin: 0, fontSize: "14px", color: "#475569", fontWeight: "600" }}>Click to upload or drag and drop</p>
                    <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#64748B" }}>JPG, PNG (Max ~1MB recommended for demo)</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Description</label>
              <textarea
                required
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                rows="4"
                style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #CBD5E1", outline: "none", resize: "vertical" }}
                placeholder="Write the summary of the press release..."
              />
            </div>

            <div style={{ marginTop: "16px", padding: "24px", backgroundColor: "#F8FAFC", border: "1px dashed #CBD5E1", borderRadius: "8px" }}>
              <p style={{ margin: "0 0 12px 0", fontSize: "12px", fontWeight: "800", color: "#64748B", textTransform: "uppercase" }}>Live Preview</p>
              <div style={{ backgroundColor: "#0A2E4D", borderRadius: "12px", padding: "24px", maxWidth: "400px", overflow: "hidden" }}>
                {newImage && <img src={newImage} alt="" style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "8px", marginBottom: "16px" }} />}
                <span style={{ fontSize: "11px", fontWeight: "800", color: "#FCD116", textTransform: "uppercase" }}>{newTag || "TAG"}</span>
                <h3 style={{ color: "#FFFFFF", margin: "8px 0", fontSize: "18px" }}>{newTitle || "Publication Title Here"}</h3>
                <p style={{ color: "#CBD5E1", fontSize: "14px", margin: 0 }}>{newDesc || "Description will appear here..."}</p>
              </div>
            </div>

            <button
              type="submit"
              style={{ backgroundColor: "#10B981", color: "#FFFFFF", border: "none", padding: "16px", borderRadius: "8px", fontSize: "16px", fontWeight: "700", cursor: "pointer", marginTop: "16px" }}
            >
              Publish to Website
            </button>
          </form>
        </div>
      )}

      {/* LIST OF PUBLICATIONS */}
      {!isCreating && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
          {publications.length === 0 && (
            <div style={{ backgroundColor: "#FFFFFF", padding: "32px", borderRadius: "12px", border: "1px solid #E2E8F0", textAlign: "center", color: "#64748B", fontSize: "14px" }}>
              No publications. Use "Reset Demo Data" on the dashboard to restore the original content.
            </div>
          )}
          {publications.map((pub) => (
            <div
              key={pub.id}
              style={{
                backgroundColor: "#FFFFFF",
                padding: "24px",
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {pub.image && (
                <img
                  src={pub.image}
                  alt=""
                  style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "6px", flexShrink: 0 }}
                />
              )}
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: "11px", fontWeight: "800", color: "#001F3F", backgroundColor: "#FCD116", padding: "4px 8px", borderRadius: "4px", textTransform: "uppercase" }}>{pub.tag}</span>
                <span style={{ fontSize: "13px", color: "#64748B", marginLeft: "12px", fontWeight: "600" }}>{pub.date}</span>
                <h3 style={{ margin: "8px 0 4px 0", fontSize: "18px", fontWeight: "800", color: "#0F172A" }}>{pub.title}</h3>
                <p style={{ margin: 0, fontSize: "14px", color: "#475569", maxWidth: "600px" }}>{pub.desc}</p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => handleDelete(pub.id)}
                  style={{ padding: "8px 16px", backgroundColor: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA", borderRadius: "6px", fontWeight: "700", cursor: "pointer" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}