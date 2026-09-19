import { Link } from "react-router-dom";
import "./Services.css";

function Services() {
  return (
    <div className="services-page">

      {/* =========================
          HERO
      ========================== */}

      <section className="services-hero">

        <div className="services-hero-content">

          <p className="services-label">
            Our Community Services
          </p>

          <h1>
            Services for Our
            <span>Community</span>
          </h1>

          <p>
            Explore the services available to connect
            families, individuals, businesses and community
            members.
          </p>

        </div>

      </section>


      {/* =========================
          SERVICES INTRO
      ========================== */}

      <section className="services-introduction">

        <div className="services-container">

          <div className="services-intro-content">

            <p className="section-label">
              What We Provide
            </p>

            <h2>
              Simple Services,
              Meaningful Connections
            </h2>

            <p>
              Our platform provides useful community services
              in one convenient place. Browse matrimonial
              profiles or discover advertisements and
              announcements shared with the community.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          SERVICE CARDS
      ========================== */}

      <section className="services-list">

        <div className="services-container">

          <div className="services-grid">


            {/* =====================
                MATRIMONY
            ====================== */}

            <div className="large-service-card">

              <div className="large-service-icon">
                💍
              </div>

              <span className="service-number">
                01
              </span>

              <h2>
                Matrimony
              </h2>

              <p>
                Explore matrimonial profiles shared by
                community families and individuals. Find
                suitable connections and learn more about
                available profiles.
              </p>


              <ul>

                <li>
                  ✓ Browse matrimonial profiles
                </li>

                <li>
                  ✓ Search by location
                </li>

                <li>
                  ✓ Filter by gender
                </li>

                <li>
                  ✓ View education and profession
                </li>

              </ul>


              <Link
                to="/services/matrimony"
                className="service-button"
              >
                Explore Matrimony →
              </Link>

            </div>


            {/* =====================
                ADVERTISEMENT
            ====================== */}

            <div className="large-service-card">

              <div className="large-service-icon">
                📢
              </div>

              <span className="service-number">
                02
              </span>

              <h2>
                Advertisement
              </h2>

              <p>
                Discover advertisements, businesses,
                services, job opportunities, events and
                announcements shared with the community.
              </p>


              <ul>

                <li>
                  ✓ Business advertisements
                </li>

                <li>
                  ✓ Job opportunities
                </li>

                <li>
                  ✓ Community announcements
                </li>

                <li>
                  ✓ Events and services
                </li>

              </ul>


              <Link
                to="/services/advertisement"
                className="service-button"
              >
                View Advertisements →
              </Link>

            </div>


          </div>

        </div>

      </section>


      {/* =========================
          HOW IT WORKS
      ========================== */}

      <section className="how-it-works">

        <div className="services-container">

          <div className="how-heading">

            <p className="section-label">
              How It Works
            </p>

            <h2>
              Easy to Explore
            </h2>

            <p>
              Access the community services in just a few
              simple steps.
            </p>

          </div>


          <div className="steps-grid">


            <div className="step-card">

              <div className="step-number">
                01
              </div>

              <div>
                <h3>
                  Choose a Service
                </h3>

                <p>
                  Select Matrimony or Advertisement from
                  our services.
                </p>
              </div>

            </div>


            <div className="step-card">

              <div className="step-number">
                02
              </div>

              <div>
                <h3>
                  Explore
                </h3>

                <p>
                  Browse the available information and
                  profiles.
                </p>
              </div>

            </div>


            <div className="step-card">

              <div className="step-number">
                03
              </div>

              <div>
                <h3>
                  Connect
                </h3>

                <p>
                  Contact the relevant person or community
                  team when appropriate.
                </p>
              </div>

            </div>


          </div>

        </div>

      </section>


      {/* =========================
          CTA
      ========================== */}

      <section className="services-cta">

        <div className="services-container">

          <div className="services-cta-content">

            <div>

              <h2>
                Have a Question?
              </h2>

              <p>
                Contact our community team if you need
                more information about our services.
              </p>

            </div>

            <Link
              to="/contact"
              className="services-contact-button"
            >
              Contact Us →
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Services;

