import axios from "axios";

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
