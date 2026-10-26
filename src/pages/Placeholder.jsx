import { useLocation } from "react-router-dom";

export default function Placeholder() {
  const location = useLocation();
  const pageName = location.pathname.replace("/", "").replace("-", " ");

  return (
    <div style={{ padding: "100px 24px", textAlign: "center", minHeight: "60vh" }}>
      <h1 style={{ fontSize: "48px", color: "#001F3F", textTransform: "capitalize" }}>
        {pageName}
      </h1>
      <p style={{ color: "#666", fontSize: "18px" }}>
        This page is currently under construction.
      </p>
    </div>
  );
}