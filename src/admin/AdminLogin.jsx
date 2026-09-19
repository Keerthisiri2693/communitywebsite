import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    // Demo admin credentials
    const ADMIN_EMAIL = "keerthanasiriyalu@gmail.com";
    const ADMIN_PASSWORD = "admin123";

    if (
      email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
      password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("community_admin_logged_in", "true");

      navigate("/admin/dashboard");
      return;
    }

    setError("Invalid email or password.");
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        {/* Logo */}

        <div className="admin-login-logo">
          🌙
        </div>

        <h1>
          Muslim Community
        </h1>

        <p className="admin-login-subtitle">
          Admin Panel
        </p>


        {/* Welcome */}

        <div className="admin-login-heading">
          <h2>
            Welcome Back
          </h2>

          <p>
            Sign in to manage the community website.
          </p>
        </div>


        {/* Error */}

        {error && (
          <div className="admin-login-error">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}


        {/* Form */}

        <form onSubmit={handleSubmit}>

          {/* Email */}

          <div className="admin-form-group">

            <label htmlFor="admin-email">
              Email Address
            </label>

            <div className="admin-input-wrapper">

              <span className="admin-input-icon">
                ✉️
              </span>

              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                autoComplete="username"
                required
              />

            </div>

          </div>


          {/* Password */}

          <div className="admin-form-group">

            <label htmlFor="admin-password">
              Password
            </label>

            <div className="admin-input-wrapper">

              <span className="admin-input-icon">
                🔒
              </span>

              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="admin-password-toggle"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

            </div>

          </div>


          {/* Login */}

          <button
            type="submit"
            className="admin-login-button"
          >
            Sign In
            <span>→</span>
          </button>

        </form>


        {/* Back Website */}

        <button
          type="button"
          className="admin-back-button"
          onClick={() => navigate("/")}
        >
          ← Back to Website
        </button>


        {/* Security */}

        <div className="admin-login-security">
          🔐 Admin access only
        </div>

      </div>

    </div>
  );
}

export default AdminLogin;