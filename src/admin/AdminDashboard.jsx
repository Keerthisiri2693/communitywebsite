import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("community_admin_logged_in");

    navigate("/admin");
  };

  return (
    <div className="admin-dashboard">

      {/* =========================
          TOP BAR
      ========================== */}

      <header className="admin-dashboard-header">

        <div className="admin-brand">

          <div className="admin-brand-logo">
            🌙
          </div>

          <div>
            <h1>
              Muslim Community
            </h1>

            <span>
              Admin Panel
            </span>
          </div>

        </div>


        <button
          className="admin-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </header>


      {/* =========================
          CONTENT
      ========================== */}

      <main className="admin-dashboard-content">

        <div className="admin-welcome">

          <p className="admin-small-label">
            ADMIN DASHBOARD
          </p>

          <h2>
            Welcome back 👋
          </h2>

          <p>
            Manage your Muslim Community website
            from this dashboard.
          </p>

        </div>


        {/* =========================
            DASHBOARD CARDS
        ========================== */}

        <div className="admin-dashboard-grid">

          {/* MATRIMONY */}

          <button
            className="admin-dashboard-card"
            onClick={() =>
              navigate("/admin/matrimony")
            }
          >

            <div className="admin-card-icon">
              💍
            </div>

            <div className="admin-card-content">

              <h3>
                Matrimony
              </h3>

              <p>
                Add, edit and manage matrimonial
                profiles.
              </p>

            </div>

            <span className="admin-card-arrow">
              →
            </span>

          </button>


          {/* ADVERTISEMENTS */}

          <button
            className="admin-dashboard-card"
            onClick={() =>
              navigate("/admin/advertisements")
            }
          >

            <div className="admin-card-icon">
              📢
            </div>

            <div className="admin-card-content">

              <h3>
                Advertisements
              </h3>

              <p>
                Add, edit and manage community
                advertisements.
              </p>

            </div>

            <span className="admin-card-arrow">
              →
            </span>

          </button>


          {/* WEBSITE */}

          <button
            className="admin-dashboard-card"
            onClick={() =>
              navigate("/")
            }
          >

            <div className="admin-card-icon">
              🌐
            </div>

            <div className="admin-card-content">

              <h3>
                View Website
              </h3>

              <p>
                Open the public Muslim Community
                website.
              </p>

            </div>

            <span className="admin-card-arrow">
              →
            </span>

          </button>

        </div>


        {/* =========================
            WORKFLOW
        ========================== */}

        <section className="admin-workflow">

          <div className="admin-workflow-icon">
            📁
          </div>

          <div>

            <h3>
              Your File-Based Workflow
            </h3>

            <p>
              Make changes in the admin panel,
              export the updated JSON file, review
              the file, then copy it to
              <strong> public/data/ </strong>
              before deploying the website.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;