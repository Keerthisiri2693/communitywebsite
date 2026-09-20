import { useState } from "react";
import emailjs from "@emailjs/browser";
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
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (submitSuccess) {
      setSubmitSuccess(false);
    }

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSending(true);
    setSubmitSuccess(false);
    setErrorMessage("");

    try {
      const templateParams = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || "Not provided",
        subject: formData.subject,
        message: formData.message,

        // Admin email
        to_email: "keerthanasiriyalu@gmail.com",
      };

     await emailjs.send(
  "service_ivpr5fr",
  "template_kn6hv0w",
  {
    name: formData.name,
    phone: formData.phone,
    email: formData.email || "Not provided",
    subject: formData.subject,
    message: formData.message,
  },
  {
    publicKey: "uYkHBM0W_J6jjV97Y",
  }
);

      setSubmitSuccess(true);

      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });

    } catch (error) {
      console.error("CONTACT EMAIL ERROR:", error);

      setErrorMessage(
        "Unable to send your message right now. Please try again."
      );
    } finally {
      setIsSending(false);
    }
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
            Contact{" "}
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


              <div className="contact-info-list">

                {/* PHONE */}

                <div className="contact-info-item">

                  <div className="contact-info-icon">
                    📞
                  </div>

                  <div className="contact-info-content">

                    <h3>
                      Phone
                    </h3>

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

                  <div className="contact-info-content">

                    <h3>
                      Email
                    </h3>

                    <a href="mailto:keerthanasiriyalu@gmail.com">
                      keerthanasiriyalu@gmail.com
                    </a>

                  </div>

                </div>


                {/* LOCATION */}

                <div className="contact-info-item">

                  <div className="contact-info-icon">
                    📍
                  </div>

                  <div className="contact-info-content">

                    <h3>
                      Location
                    </h3>

                    <p>
                      Thiruvarur, Tamil Nadu, India
                    </p>

                  </div>

                </div>


                {/* AVAILABILITY */}

                <div className="contact-info-item">

                  <div className="contact-info-icon">
                    🕐
                  </div>

                  <div className="contact-info-content">

                    <h3>
                      Availability
                    </h3>

                    <p>
                      Monday - Saturday
                      <br />
                      9:00 AM - 6:00 PM
                    </p>

                  </div>

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
                  Fill out the form below and we will
                  receive your enquiry directly by email.
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
                      Message Sent Successfully
                    </h3>

                    <p>
                      Thank you for contacting us.
                      Your message has been sent successfully.
                    </p>

                  </div>

                </div>
              )}


              {/* =====================
                  ERROR MESSAGE
              ====================== */}

              {errorMessage && (
                <div className="contact-error">

                  <div className="contact-error-icon">
                    !
                  </div>

                  <div>

                    <h3>
                      Message Not Sent
                    </h3>

                    <p>
                      {errorMessage}
                    </p>

                  </div>

                </div>
              )}


              {/* =====================
                  FORM
              ====================== */}

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
                    autoComplete="name"
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
                      autoComplete="tel"
                      inputMode="numeric"
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
                      autoComplete="email"
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
                  disabled={isSending}
                >

                  {isSending ? (
                    <>
                      <span className="contact-spinner"></span>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span className="submit-arrow">
                        →
                      </span>
                    </>
                  )}

                </button>

              </form>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          LOCATION
      ========================== */}

      <section className="location-section">

        <div className="contact-container">

          <div className="location-box">

            <div className="location-icon">
              📍
            </div>

            <div className="location-content">

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