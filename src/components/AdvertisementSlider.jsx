import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdvertisementSlider.css";

function AdvertisementSlider() {
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
        console.error(
          "Advertisement slider error:",
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="ad-slider-section">

        <div className="ad-slider-container">

          <div className="ad-slider-heading">
            <div>
              <p className="ad-slider-label">
                Community Updates
              </p>

              <h2>
                Advertisements
              </h2>
            </div>
          </div>

          <div className="ad-slider-loading">
            Loading advertisements...
          </div>

        </div>

      </section>
    );
  }

  if (advertisements.length === 0) {
    return (
      <section className="ad-slider-section">

        <div className="ad-slider-container">

          <div className="ad-slider-heading">
            <div>
              <p className="ad-slider-label">
                Community Updates
              </p>

              <h2>
                Advertisements
              </h2>
            </div>
          </div>

          <div className="ad-slider-empty">
            No advertisements available.
          </div>

        </div>

      </section>
    );
  }

  /*
    Duplicate the advertisements so the animation
    can create a continuous scrolling effect.
  */
  const scrollingAds = [
    ...advertisements,
    ...advertisements,
  ];

  return (
    <section className="ad-slider-section">

      <div className="ad-slider-container">

        {/* =========================
            HEADING
        ========================== */}

        <div className="ad-slider-heading">

          <div>

            <p className="ad-slider-label">
              Community Updates
            </p>

            <h2>
              Latest Advertisements
            </h2>

          </div>

          <Link
            to="/services/advertisement"
            className="view-all-ads"
          >
            View All →
          </Link>

        </div>


        {/* =========================
            SCROLLING AREA
        ========================== */}

        <div className="ad-slider-wrapper">

          <div className="ad-slider-track">

            {scrollingAds.map((ad, index) => (

              <Link
                to="/services/advertisement"
                className="ad-slider-card"
                key={`${ad.id}-${index}`}
              >

                {/* IMAGE */}

                <div className="ad-slider-image">

                  {ad.image ? (

                    <img
                      src={ad.image}
                      alt={ad.title}
                    />

                  ) : (

                    <div className="ad-slider-placeholder">
                      📢
                    </div>

                  )}

                </div>


                {/* CONTENT */}

                <div className="ad-slider-content">

                  <span className="ad-slider-badge">
                    Advertisement
                  </span>

                  <h3>
                    {ad.title}
                  </h3>

                  <p>
                    {ad.description}
                  </p>


                  {ad.location && (

                    <span className="ad-slider-location">
                      📍 {ad.location}
                    </span>

                  )}

                </div>

              </Link>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}

export default AdvertisementSlider;



