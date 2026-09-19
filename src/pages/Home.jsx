import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    fetch("/data/advertisements.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load advertisements");
        }

        return response.json();
      })
      .then((data) => {
        const activeAds = data.filter((ad) => ad.active === true);
        setAdvertisements(activeAds);
      })
      .catch((error) => {
        console.error("Advertisement loading error:", error);
      });
  }, []);

  return (
    <div className="home">

      {/* =========================
          HERO SECTION
      ========================== */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-subtitle">
            Welcome to Our Community
          </p>

          <h1>
            Connecting Our
            <span> Community & Families</span>
          </h1>

          <p className="hero-description">
            A community platform connecting families, individuals,
            businesses and community members through useful services.
          </p>

          <div className="hero-buttons">

            <Link
              to="/services/matrimony"
              className="primary-btn"
            >
              Explore Matrimony
            </Link>

            <Link
              to="/services"
              className="secondary-btn"
            >
              Our Services
            </Link>

          </div>

        </div>

      </section>


      {/* =========================
          ADVERTISEMENT SCROLL
      ========================== */}

      <section className="advertisement-section">

        <div className="section-container">

          <div className="section-heading">

            <span className="heading-icon">
              📢
            </span>

            <div>
              <p className="small-title">
                Community Updates
              </p>

              <h2>
                Advertisements
              </h2>
            </div>

          </div>


          {/* Scrolling advertisements */}

          <div className="advertisement-wrapper">

            <div className="advertisement-track">

              {advertisements.length > 0 ? (

                advertisements.map((ad) => (

                  <div
                    className="advertisement-card"
                    key={ad.id}
                  >

                    {ad.image && (
                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="advertisement-image"
                      />
                    )}

                    <div className="advertisement-content">

                      <h3>
                        {ad.title}
                      </h3>

                      <p>
                        {ad.description}
                      </p>

                      {ad.phone && (
                        <p className="advertisement-phone">
                          📞 {ad.phone}
                        </p>
                      )}

                    </div>

                  </div>

                ))

              ) : (

                <div className="no-advertisement">
                  No advertisements available.
                </div>

              )}

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          SERVICES
      ========================== */}

      <section className="services-section">

        <div className="section-container">

          <div className="section-title">

            <p className="small-title">
              What We Provide
            </p>

            <h2>
              Our Services
            </h2>

            <p>
              Explore our community services designed to
              connect people and support the community.
            </p>

          </div>


          <div className="services-grid">


            {/* MATRIMONY */}

            <Link
              to="/services/matrimony"
              className="service-card"
            >

              <div className="service-icon">
                💍
              </div>

              <h3>
                Matrimony
              </h3>

              <p>
                Find suitable matrimonial profiles and
                connect families within the community.
              </p>

              <span className="service-link">
                View Matrimony →
              </span>

            </Link>


            {/* ADVERTISEMENT */}

            <Link
              to="/services/advertisement"
              className="service-card"
            >

              <div className="service-icon">
                📢
              </div>

              <h3>
                Advertisement
              </h3>

              <p>
                Discover community announcements,
                businesses, services, events and opportunities.
              </p>

              <span className="service-link">
                View Advertisements →
              </span>

            </Link>


          </div>

        </div>

      </section>


      {/* =========================
          ABOUT COMMUNITY
      ========================== */}

      <section className="community-section">

        <div className="section-container">

          <div className="community-content">

            <div className="community-icon">
              🌙
            </div>

            <div>

              <p className="small-title">
                About Our Community
              </p>

              <h2>
                Together as a Community
              </h2>

              <p>
                Our platform is created to bring community
                members together and provide useful information,
                services and opportunities in one place.
              </p>

              <Link
                to="/about"
                className="read-more"
              >
                Learn More →
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          CONTACT CTA
      ========================== */}

      <section className="contact-cta">

        <div className="section-container">

          <h2>
            Have an Enquiry?
          </h2>

          <p>
            Get in touch with our community team.
          </p>

          <Link
            to="/contact"
            className="primary-btn"
          >
            Contact Us
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;