
import { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./MatrimonyApply.css";
function MatrimonyApply() {

  // =========================================
  // FORM DATA
  // =========================================

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    age: "",
    phone: "",
    email: "",
    city: "",
    education: "",
    occupation: "",
    maritalStatus: "Never Married",
    height: "",
    religion: "",
    community: "",
    about: "",
    partnerPreference: "",
  });


  const [photo, setPhoto] = useState(null);

  const [photoPreview, setPhotoPreview] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  // =========================================
  // HANDLE INPUT
  // =========================================

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };


  // =========================================
  // HANDLE PHOTO
  // =========================================

  const handlePhotoChange = (event) => {

    const file = event.target.files?.[0];

    if (!file) {
      return;
    }


    // Check image

    if (!file.type.startsWith("image/")) {

      setError(
        "Please select a valid image file."
      );

      event.target.value = "";

      return;
    }


    // Maximum 5 MB

    if (file.size > 5 * 1024 * 1024) {

      setError(
        "Profile photo must be less than 5 MB."
      );

      event.target.value = "";

      return;
    }


    setPhoto(file);

    setPhotoPreview(
      URL.createObjectURL(file)
    );

    setError("");
  };


  // =========================================
  // CALCULATE AGE
  // =========================================

  const calculateAge = (dateOfBirth) => {

    if (!dateOfBirth) {
      return "";
    }

    const today = new Date();

    const birthDate = new Date(dateOfBirth);

    let age =
      today.getFullYear() -
      birthDate.getFullYear();

    const monthDifference =
      today.getMonth() -
      birthDate.getMonth();


    if (
      monthDifference < 0 ||
      (
        monthDifference === 0 &&
        today.getDate() < birthDate.getDate()
      )
    ) {
      age--;
    }

    return age;
  };


  // =========================================
  // DATE OF BIRTH
  // =========================================

  const handleDateOfBirthChange = (event) => {

    const dateOfBirth =
      event.target.value;

    const calculatedAge =
      calculateAge(dateOfBirth);

    setFormData((previous) => ({
      ...previous,

      dateOfBirth,

      age:
        calculatedAge >= 0
          ? String(calculatedAge)
          : "",
    }));

    setError("");
  };


  // =========================================
  // SUBMIT APPLICATION
  // =========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setError("");
    setSubmitted(false);

    // =======================================
    // VALIDATION
    // =======================================

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.gender) {
      setError("Please select your gender.");
      return;
    }

    if (!formData.dateOfBirth) {
      setError("Please select your date of birth.");
      return;
    }

    if (!formData.age || Number(formData.age) < 18) {
      setError(
        "Matrimony applications are available for users aged 18 or above."
      );
      return;
    }

    if (!formData.phone.trim()) {
      setError("Please enter your mobile number.");
      return;
    }

    // Indian mobile validation
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(formData.phone.trim())) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Email validation
    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    // =======================================
    // EMAILJS CONFIGURATION
    // =======================================

    const SERVICE_ID =
      import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();

    const TEMPLATE_ID =
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();

    const PUBLIC_KEY =
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

    if (!SERVICE_ID) {
      setError(
        "EmailJS Service ID is missing. Check your .env file."
      );
      console.error(
        "Missing VITE_EMAILJS_SERVICE_ID"
      );
      return;
    }

    if (!TEMPLATE_ID) {
      setError(
        "EmailJS Template ID is missing. Check your .env file."
      );
      console.error(
        "Missing VITE_EMAILJS_TEMPLATE_ID"
      );
      return;
    }

    if (!PUBLIC_KEY) {
      setError(
        "EmailJS Public Key is missing. Check your .env file."
      );
      console.error(
        "Missing VITE_EMAILJS_PUBLIC_KEY"
      );
      return;
    }

    const form = event.currentTarget;

    try {
      setIsSubmitting(true);

      console.log("========================================");
      console.log("EMAILJS SEND START");
      console.log("========================================");
      console.log("SERVICE ID:", SERVICE_ID);
      console.log("TEMPLATE ID:", TEMPLATE_ID);
      console.log("PUBLIC KEY:", "Loaded");

      // Show exactly what is being sent.
      const dataToSend = new FormData(form);

      console.log("========== FORM DATA ==========");

      for (const [key, value] of dataToSend.entries()) {
        if (key === "photo") {
          console.log(
            "photo:",
            value instanceof File ? value.name : value
          );
        } else {
          console.log(`${key}:`, value);
        }
      }

      // =====================================
      // SEND USING EMAILJS
      // =====================================

      const response = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        form,
        {
          publicKey: PUBLIC_KEY,
        }
      );

      console.log("========================================");
      console.log("EMAILJS SEND SUCCESS");
      console.log("STATUS:", response.status);
      console.log("TEXT:", response.text);
      console.log("========================================");

      // =====================================
      // SUCCESS
      // =====================================

      setSubmitted(true);

      // Clear form state after successful send.
      setFormData({
        name: "",
        gender: "",
        dateOfBirth: "",
        age: "",
        phone: "",
        email: "",
        city: "",
        education: "",
        occupation: "",
        maritalStatus: "Never Married",
        height: "",
        religion: "",
        community: "",
        about: "",
        partnerPreference: "",
      });

      setPhoto(null);

      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }

      setPhotoPreview("");

      // Clear selected file from the HTML input.
      const photoInput = form.querySelector(
        'input[type="file"]'
      );

      if (photoInput) {
        photoInput.value = "";
      }
    } catch (submitError) {
      console.error("========================================");
      console.error("EMAILJS SEND FAILED");
      console.error("========================================");
      console.error("ERROR OBJECT:", submitError);
      console.error("ERROR STATUS:", submitError?.status);
      console.error("ERROR TEXT:", submitError?.text);
      console.error("ERROR MESSAGE:", submitError?.message);
      console.error("========================================");

      setError(
        submitError?.text ||
          submitError?.message ||
          "Unable to send the application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================================
  // SUCCESS SCREEN
  // =========================================

  if (submitted) {

    return (

      <div className="matrimony-success">

        <div className="success-card">

          <div className="success-icon">
            ✅
          </div>


          <h1>
            Application Submitted Successfully
          </h1>


          <p>
            Your matrimony application has been
            sent successfully to the community admin.
          </p>


          <p>
            Your application is now pending admin
            review. The profile will be published
            only after admin approval.
          </p>


          {photo && (
            <p>
              📷 Your selected profile photo was
              included with the application.
            </p>
          )}


          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >

            <Link
              to="/services/matrimony"
              className="submit-matrimony-btn"
              style={{
                width: "auto",
                textDecoration: "none",
              }}
            >
              View Matrimony
            </Link>


            <Link
              to="/"
              className="submit-matrimony-btn"
              style={{
                width: "auto",
                textDecoration: "none",
                background: "#607d68",
              }}
            >
              Back to Home
            </Link>

          </div>

        </div>

      </div>

    );
  }


  // =========================================
  // FORM
  // =========================================

  return (

    <div className="matrimony-apply-page">

      <div className="matrimony-container">


        {/* =================================
            HEADER
        ================================== */}

        <div className="matrimony-header">

          <span>
            💍
          </span>


          <h1>
            Matrimony Application
          </h1>


          <p>
            Submit your matrimonial profile to
            our community. Your application will
            be reviewed by the admin before it
            is published.
          </p>

        </div>


        {/* =================================
            ERROR
        ================================== */}

        {error && (

          <div
            style={{
              marginBottom: "20px",
              padding: "14px 16px",
              borderRadius: "10px",
              background: "#ffebee",
              border: "1px solid #ffcdd2",
              color: "#c62828",
              lineHeight: "1.5",
            }}
          >
            ⚠️ {error}
          </div>

        )}


        {/* =================================
            FORM
        ================================== */}

        <form
          className="matrimony-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <input
            type="hidden"
            name="status"
            value="PENDING"
          />


          {/* =================================
              PERSONAL INFORMATION
          ================================== */}

          <div className="form-section">

            <h2>
              👤 Personal Information
            </h2>


            <div className="form-grid">


              {/* NAME */}

              <div className="form-group">

                <label>
                  Full Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  maxLength={100}
                  required
                />

              </div>


              {/* GENDER */}

              <div className="form-group">

                <label>
                  Gender *
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                </select>

              </div>


              {/* DOB */}

              <div className="form-group">

                <label>
                  Date of Birth *
                </label>

                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={
                    handleDateOfBirthChange
                  }
                  required
                />

              </div>


              {/* AGE */}

              <div className="form-group">

                <label>
                  Age
                </label>

                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  readOnly
                  placeholder="Calculated automatically"
                />

              </div>

            </div>

          </div>


          {/* =================================
              CONTACT
          ================================== */}

          <div className="form-section">

            <h2>
              📱 Contact Information
            </h2>


            <div className="form-grid">


              <div className="form-group">

                <label>
                  Mobile Number *
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  inputMode="numeric"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  maxLength={150}
                />

              </div>


              <div className="form-group">

                <label>
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  maxLength={100}
                />

              </div>

            </div>

          </div>


          {/* =================================
              EDUCATION
          ================================== */}

          <div className="form-section">

            <h2>
              🎓 Education & Career
            </h2>


            <div className="form-grid">

              <div className="form-group">

                <label>
                  Education
                </label>

                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="e.g. B.E, MBA, M.Sc"
                  maxLength={150}
                />

              </div>


              <div className="form-group">

                <label>
                  Occupation
                </label>

                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="Enter occupation"
                  maxLength={150}
                />

              </div>

            </div>

          </div>


          {/* =================================
              MATRIMONIAL DETAILS
          ================================== */}

          <div className="form-section">

            <h2>
              💍 Matrimonial Details
            </h2>


            <div className="form-grid">

              <div className="form-group">

                <label>
                  Marital Status
                </label>

                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                >

                  <option value="Never Married">
                    Never Married
                  </option>

                  <option value="Divorced">
                    Divorced
                  </option>

                  <option value="Widowed">
                    Widowed
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label>
                  Height
                </label>

                <input
                  type="text"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="e.g. 5'6"
                  maxLength={20}
                />

              </div>


              <div className="form-group">

                <label>
                  Religion
                </label>

                <input
                  type="text"
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  placeholder="Religion"
                  maxLength={100}
                />

              </div>


              <div className="form-group">

                <label>
                  Community
                </label>

                <input
                  type="text"
                  name="community"
                  value={formData.community}
                  onChange={handleChange}
                  placeholder="Community"
                  maxLength={100}
                />

              </div>

            </div>

          </div>


          {/* =================================
              PROFILE PHOTO
          ================================== */}

          <div className="form-section">

            <h2>
              📷 Profile Photo
            </h2>


            <div className="form-group">

              <label>
                Upload Profile Photo
              </label>


              <input
                type="file"
                name="photo"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoChange}
              />


              <small>
                JPG, PNG or WebP. Maximum size: 5 MB.
              </small>


              {/* PHOTO PREVIEW */}

              {photoPreview && (

                <div
                  style={{
                    marginTop: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >

                  <img
                    src={photoPreview}
                    alt="Profile preview"
                    style={{
                      width: "110px",
                      height: "110px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      border:
                        "2px solid #e0e8e1",
                    }}
                  />


                  <div>

                    <strong>
                      Photo selected
                    </strong>


                    <p
                      style={{
                        margin: "5px 0 0",
                        color: "#777",
                        fontSize: "13px",
                      }}
                    >
                      {photo?.name}
                    </p>

                  </div>

                </div>

              )}

            </div>

          </div>


          {/* =================================
              ABOUT
          ================================== */}

          <div className="form-section">

            <h2>
              📝 About You
            </h2>


            <div
              className="form-group"
              style={{
                marginBottom: "20px",
              }}
            >

              <label>
                About Yourself
              </label>


              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="Tell us about yourself, your interests, family background, career, etc."
                rows={5}
                maxLength={1000}
              />


              <small>
                Maximum 1000 characters.
              </small>

            </div>


            <div className="form-group">

              <label>
                Partner Preference
              </label>


              <textarea
                name="partnerPreference"
                value={
                  formData.partnerPreference
                }
                onChange={handleChange}
                placeholder="Describe your preferred partner..."
                rows={5}
                maxLength={1000}
              />


              <small>
                Maximum 1000 characters.
              </small>

            </div>

          </div>


          {/* =================================
              CONSENT
          ================================== */}

          <div className="application-consent">

            <label>

              <input
                type="checkbox"
                required
              />


              <span>
                I confirm that the information
                provided is accurate. I understand
                that my application will be reviewed
                by the community admin before my
                matrimonial profile is published.
              </span>

            </label>

          </div>


          {/* =================================
              SUBMIT
          ================================== */}

          <button
            type="submit"
            className="submit-matrimony-btn"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "⏳ Sending Application..."
              : "💍 Submit Matrimony Application"}
          </button>

        </form>

      </div>

    </div>

  );
}


export default MatrimonyApply;
