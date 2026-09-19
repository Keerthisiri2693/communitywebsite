import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* =========================
          PAGE HERO
      ========================== */}

      <section className="about-hero">

        <div className="about-hero-content">

          <p className="about-label">
            About Our Community
          </p>

          <h1>
            Building a Stronger
            <span>Community Together</span>
          </h1>

          <p>
            A platform created to connect families, individuals,
            businesses and community members through useful
            services and information.
          </p>

        </div>

      </section>


      {/* =========================
          INTRODUCTION
      ========================== */}

      <section className="about-introduction">

        <div className="about-container">

          <div className="about-grid">

            <div className="about-icon-box">
              <div className="about-large-icon">
                🌙
              </div>
            </div>

            <div className="about-content">

              <p className="section-label">
                Who We Are
              </p>

              <h2>
                Connecting People,
                Supporting Families
              </h2>

              <p>
                Our community platform is designed to bring
                people together and make important community
                services easily accessible.
              </p>

              <p>
                We provide a simple platform where community
                members can discover matrimonial opportunities,
                advertisements, announcements and other useful
                information.
              </p>

              <p>
                Our goal is to create a trusted and welcoming
                digital space that helps community members stay
                connected.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          OUR PURPOSE
      ========================== */}

      <section className="purpose-section">

        <div className="about-container">

          <div className="section-heading-center">

            <p className="section-label">
              Our Purpose
            </p>

            <h2>
              Serving Our Community
            </h2>

            <p>
              We aim to provide useful digital services while
              helping community members stay connected.
            </p>

          </div>


          <div className="purpose-grid">

            <div className="purpose-card">

              <div className="purpose-icon">
                🤝
              </div>

              <h3>
                Community Connection
              </h3>

              <p>
                Bring community members together through
                a common platform.
              </p>

            </div>


            <div className="purpose-card">

              <div className="purpose-icon">
                💍
              </div>

              <h3>
                Matrimony
              </h3>

              <p>
                Help families and individuals discover
                suitable matrimonial profiles.
              </p>

            </div>


            <div className="purpose-card">

              <div className="purpose-icon">
                📢
              </div>

              <h3>
                Community Information
              </h3>

              <p>
                Share advertisements, announcements,
                opportunities and useful information.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          SERVICES
      ========================== */}

      <section className="about-services">

        <div className="about-container">

          <div className="about-services-content">

            <div>

              <p className="section-label">
                What We Offer
              </p>

              <h2>
                Useful Services for Our Community
              </h2>

              <p>
                Our platform currently provides two main
                services designed to support community
                members.
              </p>

            </div>


            <div className="about-service-list">

              <Link
                to="/services/matrimony"
                className="about-service-item"
              >

                <span className="about-service-icon">
                  💍
                </span>

                <div>
                  <h3>Matrimony</h3>

                  <p>
                    Explore matrimonial profiles and
                    connect families.
                  </p>
                </div>

                <span className="arrow">
                  →
                </span>

              </Link>


              <Link
                to="/services/advertisement"
                className="about-service-item"
              >

                <span className="about-service-icon">
                  📢
                </span>

                <div>
                  <h3>Advertisement</h3>

                  <p>
                    View community advertisements,
                    businesses and announcements.
                  </p>
                </div>

                <span className="arrow">
                  →
                </span>

              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          COMMUNITY MESSAGE
      ========================== */}

      <section className="community-message">

        <div className="about-container">

          <div className="message-box">

            <div className="message-icon">
              🌙
            </div>

            <div>

              <h2>
                Together We Build a Better Community
              </h2>

              <p>
                We believe that strong communities are built
                through connection, cooperation and mutual
                support.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          CONTACT
      ========================== */}

      <section className="about-contact">

        <div className="about-container">

          <h2>
            Want to Get in Touch?
          </h2>

          <p>
            Have a question or want to share something
            with the community?
          </p>

          <Link
            to="/contact"
            className="about-contact-btn"
          >
            Contact Us →
          </Link>

        </div>

      </section>

    </div>
  );
}

export default About;