import { SignIn, useAuth } from "@clerk/react";
import { Navigate } from "react-router-dom";

export default function CMSLogin() {
  const { isLoaded, isSignedIn } = useAuth();

  // Already signed in: go to the dashboard (the route guard checks /auth/me there).
  if (isLoaded && isSignedIn) return <Navigate to="/cms/dashboard" replace />;

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px", backgroundColor: "#F1F5F9", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "900", color: "#001F3F", margin: "0 0 8px 0" }}>VFMO CMS</h1>
        <p style={{ fontSize: "14px", color: "#64748B", margin: 0 }}>Sign in to manage website content</p>
      </div>
      <SignIn routing="path" path="/cms/login" forceRedirectUrl="/cms/dashboard" />
    </div>
  );
}