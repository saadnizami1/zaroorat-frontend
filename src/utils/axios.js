import axios from "axios";

// On zaroorat.xyz the API lives on its own subdomain (api.zaroorat.xyz), so
// every request must carry the login cookie explicitly. Harmless when the API
// is same-origin (dev proxy / vercel.app).
axios.defaults.withCredentials = true;

// Global response handling. A 401 on an *authenticated* request means the
// session expired → clear it and send the user home. We deliberately ignore
// 401s from the auth routes themselves (wrong password, weak password, etc.)
// so those pages can show their own inline error, and we only redirect when a
// logged-in user was actually present (no redirect loops for anonymous users).
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || "";
    const isAuthRoute = url.includes("/api/auth/");
    if (error.response?.status === 401 && !isAuthRoute) {
      const hadSession = localStorage.getItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (hadSession) window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

/** Human-readable message for a failed API call — prefers the server's own
 *  explanation ("Image too large…", "Password not matched", …). */
export const errorMessage = (error, fallback = "Something went wrong. Please try again.") => {
  const data = error?.response?.data;
  if (data && typeof data === "object") return data.msg || data.message || data.error || fallback;
  if (typeof data === "string" && data.trim() && data.length < 200 && !data.trim().startsWith("<")) {
    return data;
  }
  if (error?.response?.status === 413) return "That image is too large. Please choose a smaller one.";
  if (!error?.response) {
    return "Can't reach Zaroorat right now. Please check your internet connection and try again.";
  }
  return fallback;
};
