import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Hide success message when user starts entering a new enquiry
    if (submitSuccess) {
      setSubmitSuccess(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminEmail = "keerthanasiriyalu@email.com";

    const mailSubject = encodeURIComponent(
      formData.subject || "Community Website Enquiry"
    );

    const mailBody = encodeURIComponent(
      `Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}

Message:
${formData.message}`
    );

    // Show success message
    setSubmitSuccess(true);

    // Open user's email application
    window.location.href =
      `mailto:${adminEmail}?subject=${mailSubject}&body=${mailBody}`;

    // Clear form
    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">

      {/* =========================
          HERO
      ========================== */}

      <section className="contact-hero">

        <div className="contact-hero-content">

          <p className="contact-label">
            Get in Touch
          </p>

          <h1>
            Contact
            <span>Our Community</span>
          </h1>

          <p>
            Have a question, suggestion, advertisement enquiry
            or need information? We would be happy to hear
            from you.
          </p>

        </div>

      </section>


      {/* =========================
          CONTACT SECTION
      ========================== */}

      <section className="contact-section">

        <div className="contact-container">

          <div className="contact-grid">

            {/* =====================
                CONTACT INFORMATION
            ====================== */}

            <div className="contact-information">

              <p className="section-label">
                Contact Information
              </p>

              <h2>
                We are here to help
              </h2>

              <p className="contact-intro">
                You can contact us for matrimonial enquiries,
                advertisements, community announcements or
                general information.
              </p>


              {/* PHONE */}

              <div className="contact-info-item">

                <div className="contact-info-icon">
                  📞
                </div>

                <div>
                  <span>Phone</span>

                  <a href="tel:+919876543210">
                    +91 98765 43210
                  </a>
                </div>

              </div>


              {/* EMAIL */}

              <div className="contact-info-item">

                <div className="contact-info-icon">
                  ✉️
                </div>

                <div>
                  <span>Email</span>

                  <a href="mailto:keerthanasiriyalu@email.com">
                    keerthanasiriyalu@email.com
                  </a>
                </div>

              </div>


              {/* LOCATION */}

              <div className="contact-info-item">

                <div className="contact-info-icon">
                  📍
                </div>

                <div>
                  <span>Location</span>

                  <p>
                    Thiruvarur, Tamil Nadu, India
                  </p>
                </div>

              </div>


              {/* WORKING HOURS */}

              <div className="contact-info-item">

                <div className="contact-info-icon">
                  🕐
                </div>

                <div>
                  <span>Availability</span>

                  <p>
                    Monday - Saturday
                    <br />
                    9:00 AM - 6:00 PM
                  </p>
                </div>

              </div>

            </div>


            {/* =====================
                CONTACT FORM
            ====================== */}

            <div className="contact-form-wrapper">

              <div className="contact-form-header">

                <h2>
                  Send Us a Message
                </h2>

                <p>
                  Fill out the form below and we will get
                  back to you.
                </p>

              </div>


              {/* =====================
                  SUCCESS MESSAGE
              ====================== */}

              {submitSuccess && (
                <div className="contact-success">

                  <div className="contact-success-icon">
                    ✓
                  </div>

                  <div>
                    <h3>
                      Email Window Opened Successfully
                    </h3>

                    <p>
                      Your enquiry has been prepared.
                      Please click <strong>Send</strong> in
                      your email application to complete it.
                    </p>
                  </div>

                </div>
              )}


              <form
                className="contact-form"
                onSubmit={handleSubmit}
              >

                {/* NAME */}

                <div className="form-group">

                  <label htmlFor="name">
                    Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />

                </div>


                {/* PHONE + EMAIL */}

                <div className="form-row">

                  <div className="form-group">

                    <label htmlFor="phone">
                      Phone
                    </label>

                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                    />

                  </div>


                  <div className="form-group">

                    <label htmlFor="email">
                      Email
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                    />

                  </div>

                </div>


                {/* SUBJECT */}

                <div className="form-group">

                  <label htmlFor="subject">
                    Subject
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select an enquiry type
                    </option>

                    <option value="Matrimony Enquiry">
                      Matrimony Enquiry
                    </option>

                    <option value="Advertisement Enquiry">
                      Advertisement Enquiry
                    </option>

                    <option value="Community Enquiry">
                      Community Enquiry
                    </option>

                    <option value="General Enquiry">
                      General Enquiry
                    </option>

                  </select>

                </div>


                {/* MESSAGE */}

                <div className="form-group">

                  <label htmlFor="message">
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    rows="6"
                    required
                  />

                </div>


                {/* SUBMIT */}

                <button
                  type="submit"
                  className="contact-submit-btn"
                >
                  Send Message →
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          MAP / LOCATION
      ========================== */}

      <section className="location-section">

        <div className="contact-container">

          <div className="location-box">

            <div className="location-icon">
              📍
            </div>

            <div>

              <p className="section-label">
                Our Location
              </p>

              <h2>
                Thiruvarur, Tamil Nadu
              </h2>

              <p>
                Tamil Nadu, India
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          CTA
      ========================== */}

      <section className="contact-cta">

        <div className="contact-container">

          <h2>
            Let's Stay Connected
          </h2>

          <p>
            We welcome your questions, suggestions and
            community participation.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Contact;