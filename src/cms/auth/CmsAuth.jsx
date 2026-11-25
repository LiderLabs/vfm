import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, useClerk } from "@clerk/react";

const API = import.meta.env.VITE_API_URL;
const CmsAuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useCmsAuth = () => useContext(CmsAuthContext);

// Wraps the CMS routes. After Clerk sign-in it asks our API who the user is
// (GET /auth/me) and keeps the role and permissions in context.
export function CmsAuthProvider({ children }) {
  const { isLoaded, isSignedIn, userId, getToken } = useAuth();
  const { signOut } = useClerk();
  // Result of the last /auth/me call, tagged with the Clerk user it belongs to.
  const [result, setResult] = useState({ userId: null, status: "idle", me: null });

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    let cancelled = false;
    (async () => {
      let next;
      try {
        const token = await getToken();
        const res = await fetch(`${API}/api/v1/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) next = { status: "ready", me: await res.json() };
        else if (res.status === 401 || res.status === 403) next = { status: "denied", me: null };
        else next = { status: "error", me: null };
      } catch {
        next = { status: "error", me: null };
      }
      if (!cancelled) setResult({ userId, ...next });
    })();
    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, userId, getToken]);

  // Derive the status so a previous user's result is never reused for a new session.
  let status;
  let me = null;
  if (!isLoaded) status = "loading";
  else if (!isSignedIn) status = "signed_out";
  else if (result.userId !== userId) status = "loading";
  else {
    status = result.status;
    me = result.me;
  }

  // Audited logout: tell the API first, then end the Clerk session.
  const logout = useCallback(async () => {
    try {
      const token = await getToken();
      await fetch(`${API}/api/v1/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      /* still sign out locally even if the API is unreachable */
    }
    await signOut({ redirectUrl: "/cms/login" });
  }, [getToken, signOut]);

  const hasPermission = (permission) => !!me?.permissions?.includes(permission);

  return (
    <CmsAuthContext.Provider value={{ status, me, logout, hasPermission }}>
      {children}
    </CmsAuthContext.Provider>
  );
}

// Route guard: only renders children for a signed-in, provisioned, active user.
export function RequireCmsAuth({ children }) {
  const { status, logout } = useCmsAuth();

  if (status === "loading") return <p style={{ padding: 32 }}>Loading…</p>;
  if (status === "signed_out") return <Navigate to="/cms/login" replace />;

  if (status !== "ready") {
    const denied = status === "denied";
    return (
      <div style={{ padding: 48, textAlign: "center", fontFamily: "'Inter', sans-serif" }}>
        <h2>{denied ? "Not authorised" : "Something went wrong"}</h2>
        <p>
          {denied
            ? "Your account isn't set up for the CMS, or it's inactive. Contact an administrator."
            : "We couldn't reach the server. Please try again shortly."}
        </p>
        <button onClick={logout}>Sign out</button>
      </div>
    );
  }
  return children;
}
