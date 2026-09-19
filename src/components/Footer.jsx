
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">

      {/* =========================
          MAIN FOOTER
      ========================== */}

      <div className="footer-main">

        <div className="footer-container">

          <div className="footer-grid">

            {/* =====================
                COMMUNITY
            ====================== */}

            <div className="footer-about">

              <Link
                to="/"
                className="footer-logo"
              >
                <span className="footer-logo-icon">
                  🌙
                </span>

                <span>
                  Our Community
                </span>
              </Link>

              <p>
                A community platform connecting families,
                individuals, businesses and community members
                through useful services and information.
              </p>

              <div className="footer-location">
                📍 Tamil Nadu, India
              </div>

            </div>


            {/* =====================
                QUICK LINKS
            ====================== */}

            <div className="footer-column">

              <h3>
                Quick Links
              </h3>

              <ul>

                <li>
                  <Link to="/">
                    Home
                  </Link>
                </li>

                <li>
                  <Link to="/about">
                    About
                  </Link>
                </li>

                <li>
                  <Link to="/services">
                    Services
                  </Link>
                </li>

                <li>
                  <Link to="/contact">
                    Contact
                  </Link>
                </li>

              </ul>

            </div>


            {/* =====================
                SERVICES
            ====================== */}

            <div className="footer-column">

              <h3>
                Services
              </h3>

              <ul>

                <li>
                  <Link to="/services/matrimony">
                    Matrimony
                  </Link>
                </li>

                <li>
                  <Link to="/services/advertisement">
                    Advertisement
                  </Link>
                </li>

              </ul>

            </div>


            {/* =====================
                CONTACT
            ====================== */}

            <div className="footer-column footer-contact">

              <h3>
                Contact
              </h3>

              <a href="tel:+919876543210">
                📞 +91 98765 43210
              </a>

              <a href="mailto:yourcommunity@email.com">
                ✉️ yourcommunity@email.com
              </a>

              <span>
                📍 Sivakasi, Tamil Nadu
              </span>

            </div>

          </div>

        </div>

      </div>


      {/* =========================
          BOTTOM FOOTER
      ========================== */}

      <div className="footer-bottom">

        <div className="footer-container">

          <div className="footer-bottom-content">

            <p>
              © {currentYear} Our Community.
              All rights reserved.
            </p>

            <div className="footer-bottom-links">

              <Link to="/about">
                About
              </Link>

              <Link to="/contact">
                Contact
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;

