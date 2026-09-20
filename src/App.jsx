import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

// ===============================
// PUBLIC COMPONENTS
// ===============================

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ===============================
// PUBLIC PAGES
// ===============================

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Matrimony from "./pages/Matrimony";
import Advertisement from "./pages/Advertisement";
import Contact from "./pages/Contact";
import MatrimonyApply from "./pages/MatrimonyApply";

// ===============================
// ADMIN
// ===============================

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import MatrimonyManager from "./admin/MatrimonyManager";
import AdvertisementManager from "./admin/AdvertisementManager";

// ===============================
// PUBLIC LAYOUT
// ===============================

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>

      <Footer />
    </>
  );
}

// ===============================
// 404 PAGE
// ===============================

function NotFound() {
  return (
    <PublicLayout>
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: "60px",
            marginBottom: "15px",
          }}
        >
          🌙
        </div>

        <h1
          style={{
            margin: "0 0 10px",
            color: "#111",
          }}
        >
          Page Not Found
        </h1>

        <p
          style={{
            color: "#777",
            marginBottom: "20px",
          }}
        >
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          style={{
            display: "inline-block",
            padding: "12px 22px",
            background: "#0a654b",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          ← Go Home
        </Link>
      </div>
    </PublicLayout>
  );
}

// ===============================
// APP
// ===============================

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =================================
            PUBLIC WEBSITE
        ================================== */}

        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        {/* =================================
            ABOUT
        ================================== */}

        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />

        {/* =================================
            SERVICES
        ================================== */}

        <Route
          path="/services"
          element={
            <PublicLayout>
              <Services />
            </PublicLayout>
          }
        />

        {/* =================================
            MATRIMONY
        ================================== */}

        <Route
          path="/services/matrimony"
          element={
            <PublicLayout>
              <Matrimony />
            </PublicLayout>
          }
        />

        {/* =================================
            MATRIMONY APPLICATION
        ================================== */}

        <Route
          path="/matrimony/apply"
          element={
            <PublicLayout>
              <MatrimonyApply />
            </PublicLayout>
          }
        />

        {/* =================================
            ADVERTISEMENT
        ================================== */}

        <Route
          path="/services/advertisement"
          element={
            <PublicLayout>
              <Advertisement />
            </PublicLayout>
          }
        />

        {/* =================================
            CONTACT
        ================================== */}

        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />

        {/* =================================
            CONTACT ALIAS
            /contact/admin also opens Contact
        ================================== */}

        <Route
          path="/contact/admin"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />

        {/* =================================
            ADMIN LOGIN
        ================================== */}

        <Route
          path="/admin"
          element={
            <AdminLogin />
          }
        />

        {/* =================================
            ADMIN DASHBOARD
        ================================== */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminDashboard />
          }
        />

        {/* =================================
            ADMIN MATRIMONY
        ================================== */}

        <Route
          path="/admin/matrimony"
          element={
            <MatrimonyManager />
          }
        />

        {/* =================================
            ADMIN ADVERTISEMENTS
        ================================== */}

        <Route
          path="/admin/advertisements"
          element={
            <AdvertisementManager />
          }
        />

        {/* =================================
            404
        ================================== */}

        <Route
          path="*"
          element={
            <NotFound />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;