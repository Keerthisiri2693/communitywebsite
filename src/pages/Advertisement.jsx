import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Advertisement.css";

function Advertisement() {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/advertisements.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load advertisements");
        }

        return response.json();
      })
      .then((data) => {
        const activeAds = data.filter(
          (ad) => ad.active === true
        );

        setAdvertisements(activeAds);
      })
      .catch((error) => {
        console.error("Advertisement error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="advertisement-page">

      {/* =========================
          PAGE HERO
      ========================== */}

      <section className="advertisement-hero">

        <div className="advertisement-hero-content">

          <p className="advertisement-label">
            Community Service
          </p>

          <h1>
            Community
            <span>Advertisements</span>
          </h1>

          <p>
            Discover businesses, services, announcements,
            opportunities and useful information shared
            with our community.
          </p>

        </div>

      </section>


      {/* =========================
          ADVERTISEMENT LIST
      ========================== */}

      <section className="advertisement-list-section">

        <div className="advertisement-container">

          <div className="advertisement-heading">

            <div>

              <p className="section-label">
                Latest Updates
              </p>

              <h2>
                Advertisements
              </h2>

              <p>
                Explore the latest advertisements and
                announcements from our community.
              </p>

            </div>

            <div className="advertisement-count">
              {advertisements.length}
              <span> Active Ads</span>
            </div>

          </div>


          {/* Loading */}

          {loading && (
            <div className="advertisement-message">
              <div className="loader"></div>
              <p>Loading advertisements...</p>
            </div>
          )}


          {/* No advertisements */}

          {!loading && advertisements.length === 0 && (
            <div className="advertisement-message">

              <div className="empty-icon">
                📢
              </div>

              <h3>
                No Advertisements Available
              </h3>

              <p>
                There are currently no active advertisements.
                Please check again later.
              </p>

            </div>
          )}


          {/* Advertisement cards */}

          {!loading && advertisements.length > 0 && (

            <div className="advertisement-grid">

              {advertisements.map((ad) => (

                <article
                  className="advertisement-item"
                  key={ad.id}
                >

                  {/* Image */}

                  <div className="advertisement-item-image">

                    {ad.image ? (

                      <img
                        src={ad.image}
                        alt={ad.title}
                      />

                    ) : (

                      <div className="advertisement-placeholder">
                        📢
                      </div>

                    )}

                  </div>


                  {/* Content */}

                  <div className="advertisement-item-content">

                    <span className="ad-badge">
                      Advertisement
                    </span>

                    <h3>
                      {ad.title}
                    </h3>

                    <p>
                      {ad.description}
                    </p>


                    {/* Contact */}

                    {ad.phone && (

                      <div className="ad-contact">

                        <span className="contact-icon">
                          📞
                        </span>

                        <div>

                          <small>
                            Contact
                          </small>

                          <strong>
                            {ad.phone}
                          </strong>

                        </div>

                      </div>

                    )}


                    {/* Location */}

                    {ad.location && (

                      <div className="ad-location">
                        📍 {ad.location}
                      </div>

                    )}

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>

      </section>


      {/* =========================
          ADVERTISEMENT INFORMATION
      ========================== */}

      <section className="advertisement-info">

        <div className="advertisement-container">

          <div className="advertisement-info-box">

            <div className="info-icon">
              📢
            </div>

            <div>

              <h2>
                Want to Share an Advertisement?
              </h2>

              <p>
                If you have a business, service, event,
                job opportunity or community announcement,
                you can contact us to share it with the
                community.
              </p>

              <Link
                to="/contact"
                className="advertisement-contact-btn"
              >
                Contact Us →
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Advertisement;
