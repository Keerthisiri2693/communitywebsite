import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MatrimonyManager.css";

const emptyForm = {
  id: null,
  name: "",
  age: "",
  gender: "Female",
  location: "",
  education: "",
  profession: "",
  photo: "",
  description: "",
  active: true,
};

function MatrimonyManager() {
  const [profiles, setProfiles] = useState([]);
  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "/data/matrimony.json"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load matrimony.json"
        );
      }

      const data = await response.json();

      setProfiles(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to load matrimony.json"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");

    if (!form.name.trim()) {
      setMessage("Name is required.");
      return;
    }

    if (!form.age) {
      setMessage("Age is required.");
      return;
    }

    if (!form.gender) {
      setMessage("Gender is required.");
      return;
    }

    if (!form.location.trim()) {
      setMessage("Location is required.");
      return;
    }

    if (editingId !== null) {
      setProfiles((prev) =>
        prev.map((profile) =>
          profile.id === editingId
            ? {
                ...form,
                id: editingId,
                age: Number(form.age),
                name: form.name.trim(),
                location:
                  form.location.trim(),
                education:
                  form.education.trim(),
                profession:
                  form.profession.trim(),
                description:
                  form.description.trim(),
              }
            : profile
        )
      );

      setMessage(
        "Matrimony profile updated successfully."
      );
    } else {
      const newId =
        profiles.length > 0
          ? Math.max(
              ...profiles.map(
                (profile) =>
                  Number(profile.id) || 0
              )
            ) + 1
          : 1;

      const newProfile = {
        ...form,
        id: newId,
        age: Number(form.age),
        name: form.name.trim(),
        location: form.location.trim(),
        education:
          form.education.trim(),
        profession:
          form.profession.trim(),
        description:
          form.description.trim(),
      };

      setProfiles((prev) => [
        ...prev,
        newProfile,
      ]);

      setMessage(
        "Matrimony profile added successfully."
      );
    }

    resetForm();
  };

  const handleEdit = (profile) => {
    setForm({
      id: profile.id,
      name: profile.name || "",
      age: profile.age || "",
      gender: profile.gender || "Female",
      location: profile.location || "",
      education: profile.education || "",
      profession: profile.profession || "",
      photo: profile.photo || "",
      description:
        profile.description || "",
      active: profile.active !== false,
    });

    setEditingId(profile.id);
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this matrimonial profile?"
    );

    if (!confirmed) {
      return;
    }

    setProfiles((prev) =>
      prev.filter(
        (profile) => profile.id !== id
      )
    );

    if (editingId === id) {
      resetForm();
    }

    setMessage(
      "Matrimony profile deleted."
    );
  };

  const toggleActive = (id) => {
    setProfiles((prev) =>
      prev.map((profile) =>
        profile.id === id
          ? {
              ...profile,
              active: !profile.active,
            }
          : profile
      )
    );
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const downloadJSON = () => {
    const jsonData = JSON.stringify(
      profiles,
      null,
      2
    );

    const blob = new Blob(
      [jsonData],
      {
        type: "application/json",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "matrimony-updated.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setMessage(
      "Updated matrimony JSON downloaded successfully."
    );
  };

  const downloadBackup = () => {
    const jsonData = JSON.stringify(
      profiles,
      null,
      2
    );

    const blob = new Blob(
      [jsonData],
      {
        type: "application/json",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `matrimony-backup-${Date.now()}.json`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const filteredProfiles =
    profiles.filter((profile) => {
      const searchText =
        search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        String(profile.name || "")
          .toLowerCase()
          .includes(searchText) ||
        String(profile.location || "")
          .toLowerCase()
          .includes(searchText) ||
        String(profile.education || "")
          .toLowerCase()
          .includes(searchText) ||
        String(profile.profession || "")
          .toLowerCase()
          .includes(searchText);

      const matchesGender =
        genderFilter === "All" ||
        profile.gender === genderFilter;

      return (
        matchesSearch &&
        matchesGender
      );
    });

  return (
    <div className="matrimony-manager">

      {/* =========================
          HEADER
      ========================== */}

      <header className="matrimony-manager-header">

        <div>
          <Link
            to="/admin/dashboard"
            className="matrimony-back-link"
          >
            ← Dashboard
          </Link>

          <h1>
            Matrimony Manager
          </h1>

          <p>
            Manage matrimonial profiles
          </p>
        </div>

        <button
          type="button"
          className="matrimony-export-btn"
          onClick={downloadJSON}
        >
          📥 Export JSON
        </button>

      </header>

      <main className="matrimony-manager-content">

        {/* =========================
            MESSAGE
        ========================== */}

        {message && (
          <div className="matrimony-manager-message">
            {message}
          </div>
        )}

        {/* =========================
            PRIVACY WARNING
        ========================== */}

        <section className="matrimony-privacy-warning">

          <div className="privacy-icon">
            🔐
          </div>

          <div>
            <h3>
              Privacy & Security
            </h3>

            <p>
              Do not store Aadhaar numbers,
              passwords, bank details, government
              ID numbers or other sensitive
              personal information in the public
              matrimonial JSON file.
            </p>
          </div>

        </section>

        {/* =========================
            PROFILE FORM
        ========================== */}

        <section className="matrimony-editor">

          <div className="matrimony-section-title">

            <div className="matrimony-section-icon">
              {editingId !== null
                ? "✏️"
                : "👤"}
            </div>

            <div>
              <h2>
                {editingId !== null
                  ? "Edit Matrimony Profile"
                  : "Add Matrimony Profile"}
              </h2>

              <p>
                Add or update matrimonial
                profile information.
              </p>
            </div>

          </div>

          <form
            className="matrimony-form"
            onSubmit={handleSubmit}
          >

            {/* Name */}

            <div className="matrimony-field">
              <label>
                Name *
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter name"
                required
              />
            </div>

            {/* Age */}

            <div className="matrimony-field">
              <label>
                Age *
              </label>

              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="25"
                min="18"
                max="100"
                required
              />
            </div>

            {/* Gender */}

            <div className="matrimony-field">
              <label>
                Gender *
              </label>

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="Female">
                  Female
                </option>

                <option value="Male">
                  Male
                </option>
              </select>
            </div>

            {/* Location */}

            <div className="matrimony-field">
              <label>
                Location *
              </label>

              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Sivakasi"
                required
              />
            </div>

            {/* Education */}

            <div className="matrimony-field">
              <label>
                Education
              </label>

              <input
                type="text"
                name="education"
                value={form.education}
                onChange={handleChange}
                placeholder="B.E Computer Science"
              />
            </div>

            {/* Profession */}

            <div className="matrimony-field">
              <label>
                Profession
              </label>

              <input
                type="text"
                name="profession"
                value={form.profession}
                onChange={handleChange}
                placeholder="Software Developer"
              />
            </div>

            {/* Photo */}

            <div className="matrimony-field full-field">
              <label>
                Photo Path
              </label>

              <input
                type="text"
                name="photo"
                value={form.photo}
                onChange={handleChange}
                placeholder="/images/matrimony/profile1.jpg"
              />

              <small>
                Example:
                /images/matrimony/profile1.jpg
              </small>
            </div>

            {/* Description */}

            <div className="matrimony-field full-field">
              <label>
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter a short matrimonial profile description"
                rows="4"
              />
            </div>

            {/* Active */}

            <div className="matrimony-active-field">

              <label className="matrimony-checkbox">

                <input
                  type="checkbox"
                  name="active"
                  checked={form.active}
                  onChange={handleChange}
                />

                <span>
                  Show this profile publicly
                </span>

              </label>

            </div>

            {/* Buttons */}

            <div className="matrimony-form-actions">

              <button
                type="submit"
                className="matrimony-save-btn"
              >
                {editingId !== null
                  ? "💾 Update Profile"
                  : "➕ Add Profile"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="matrimony-cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </section>

        {/* =========================
            PROFILE LIST
        ========================== */}

        <section className="matrimony-list-section">

          <div className="matrimony-list-header">

            <div>
              <h2>
                Matrimony Profiles
              </h2>

              <p>
                {profiles.length} total profiles
              </p>
            </div>

            <button
              type="button"
              className="matrimony-backup-btn"
              onClick={downloadBackup}
            >
              💾 Download Backup
            </button>

          </div>

          {/* Filters */}

          <div className="matrimony-filters">

            <input
              type="text"
              placeholder="Search name, location, education..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              value={genderFilter}
              onChange={(e) =>
                setGenderFilter(
                  e.target.value
                )
              }
            >
              <option value="All">
                All Genders
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Male">
                Male
              </option>
            </select>

          </div>

          {/* Profiles */}

          {loading ? (
            <div className="matrimony-manager-empty">
              Loading matrimonial profiles...
            </div>
          ) : filteredProfiles.length === 0 ? (
            <div className="matrimony-manager-empty">
              No profiles found.
            </div>
          ) : (
            <div className="matrimony-admin-grid">

              {filteredProfiles.map(
                (profile) => (
                  <article
                    key={profile.id}
                    className={`matrimony-admin-card ${
                      profile.active
                        ? ""
                        : "profile-inactive"
                    }`}
                  >

                    {/* Image */}

                    <div className="matrimony-admin-image">

                      {profile.photo ? (
                        <img
                          src={profile.photo}
                          alt={
                            profile.name ||
                            "Matrimony profile"
                          }
                        />
                      ) : (
                        <div className="matrimony-image-placeholder">
                          👤
                        </div>
                      )}

                      <span
                        className={
                          profile.active
                            ? "profile-active-status"
                            : "profile-hidden-status"
                        }
                      >
                        {profile.active
                          ? "Active"
                          : "Hidden"}
                      </span>

                    </div>

                    {/* Content */}

                    <div className="matrimony-admin-content">

                      <div className="matrimony-admin-title-row">

                        <div>
                          <h3>
                            {profile.name}
                          </h3>

                          {profile.age && (
                            <span>
                              {profile.age} years
                            </span>
                          )}
                        </div>

                        {profile.gender && (
                          <span className="profile-gender">
                            {profile.gender}
                          </span>
                        )}

                      </div>

                      <div className="matrimony-admin-details">

                        {profile.location && (
                          <div>
                            📍{" "}
                            {profile.location}
                          </div>
                        )}

                        {profile.education && (
                          <div>
                            🎓{" "}
                            {profile.education}
                          </div>
                        )}

                        {profile.profession && (
                          <div>
                            💼{" "}
                            {profile.profession}
                          </div>
                        )}

                      </div>

                      {profile.description && (
                        <p className="profile-description">
                          {profile.description}
                        </p>
                      )}

                      {/* Actions */}

                      <div className="matrimony-admin-actions">

                        <button
                          type="button"
                          className="matrimony-edit-btn"
                          onClick={() =>
                            handleEdit(profile)
                          }
                        >
                          ✏️ Edit
                        </button>

                        <button
                          type="button"
                          className={
                            profile.active
                              ? "matrimony-hide-btn"
                              : "matrimony-show-btn"
                          }
                          onClick={() =>
                            toggleActive(
                              profile.id
                            )
                          }
                        >
                          {profile.active
                            ? "🙈 Hide"
                            : "👁️ Show"}
                        </button>

                        <button
                          type="button"
                          className="matrimony-delete-btn"
                          onClick={() =>
                            handleDelete(
                              profile.id
                            )
                          }
                        >
                          🗑️ Delete
                        </button>

                      </div>

                    </div>

                  </article>
                )
              )}

            </div>
          )}

        </section>

       

      </main>
    </div>
  );
}

export default MatrimonyManager;