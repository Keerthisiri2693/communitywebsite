import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdvertisementManager.css";

const emptyForm = {
  id: null,
  title: "",
  description: "",
  image: "",
  phone: "",
  location: "",
  active: true,
};

function AdvertisementManager() {
  const [advertisements, setAdvertisements] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadAdvertisements();
  }, []);

  const loadAdvertisements = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "/data/advertisements.json"
      );

      if (!response.ok) {
        throw new Error("Failed to load advertisements");
      }

      const data = await response.json();

      setAdvertisements(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to load advertisements.json"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setMessage("Advertisement title is required.");
      return;
    }

    if (!form.description.trim()) {
      setMessage("Advertisement description is required.");
      return;
    }

    if (editingId !== null) {
      setAdvertisements((prev) =>
        prev.map((ad) =>
          ad.id === editingId
            ? {
                ...form,
                id: editingId,
                title: form.title.trim(),
                description: form.description.trim(),
              }
            : ad
        )
      );

      setMessage("Advertisement updated successfully.");
    } else {
      const newId =
        advertisements.length > 0
          ? Math.max(
              ...advertisements.map(
                (ad) => Number(ad.id) || 0
              )
            ) + 1
          : 1;

      const newAdvertisement = {
        ...form,
        id: newId,
        title: form.title.trim(),
        description: form.description.trim(),
      };

      setAdvertisements((prev) => [
        ...prev,
        newAdvertisement,
      ]);

      setMessage("Advertisement added successfully.");
    }

    resetForm();
  };

  const handleEdit = (advertisement) => {
    setForm({
      id: advertisement.id,
      title: advertisement.title || "",
      description: advertisement.description || "",
      image: advertisement.image || "",
      phone: advertisement.phone || "",
      location: advertisement.location || "",
      active:
        advertisement.active !== false,
    });

    setEditingId(advertisement.id);

    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this advertisement?"
    );

    if (!confirmed) {
      return;
    }

    setAdvertisements((prev) =>
      prev.filter((ad) => ad.id !== id)
    );

    if (editingId === id) {
      resetForm();
    }

    setMessage("Advertisement deleted.");
  };

  const toggleActive = (id) => {
    setAdvertisements((prev) =>
      prev.map((ad) =>
        ad.id === id
          ? {
              ...ad,
              active: !ad.active,
            }
          : ad
      )
    );
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const downloadJSON = () => {
    const jsonData = JSON.stringify(
      advertisements,
      null,
      2
    );

    const blob = new Blob(
      [jsonData],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
      "advertisements-updated.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setMessage(
      "Updated advertisements JSON downloaded."
    );
  };

  const downloadBackup = () => {
    const jsonData = JSON.stringify(
      advertisements,
      null,
      2
    );

    const blob = new Blob(
      [jsonData],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
      `advertisements-backup-${Date.now()}.json`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="advertisement-manager">

      {/* =========================
          HEADER
      ========================== */}

      <header className="manager-header">

        <div>
          <Link
            to="/admin/dashboard"
            className="manager-back"
          >
            ← Dashboard
          </Link>

          <h1>Advertisement Manager</h1>

          <p>
            Manage community advertisements
          </p>
        </div>

        <button
          type="button"
          className="manager-export-btn"
          onClick={downloadJSON}
        >
          📥 Export JSON
        </button>

      </header>

      <main className="manager-content">

        {/* =========================
            MESSAGE
        ========================== */}

        {message && (
          <div className="manager-message">
            {message}
          </div>
        )}

        {/* =========================
            EDITOR
        ========================== */}

        <section className="advertisement-editor">

          <div className="manager-section-title">

            <div>
              <span className="section-icon">
                {editingId !== null
                  ? "✏️"
                  : "➕"}
              </span>
            </div>

            <div>
              <h2>
                {editingId !== null
                  ? "Edit Advertisement"
                  : "Add Advertisement"}
              </h2>

              <p>
                Add or update community advertisement
                information.
              </p>
            </div>

          </div>

          <form
            onSubmit={handleSubmit}
            className="advertisement-form"
          >

            {/* Title */}

            <div className="form-field full-width">
              <label>
                Advertisement Title *
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Example: New Business Opening"
                required
              />
            </div>

            {/* Description */}

            <div className="form-field full-width">
              <label>
                Description *
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter advertisement description"
                rows="4"
                required
              />
            </div>

            {/* Image */}

            <div className="form-field">
              <label>
                Image Path
              </label>

              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="/images/advertisements/shop.jpg"
              />

              <small>
                Example:
                /images/advertisements/shop.jpg
              </small>
            </div>

            {/* Phone */}

            <div className="form-field">
              <label>
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="9876543210"
              />
            </div>

            {/* Location */}

            <div className="form-field">
              <label>
                Location
              </label>

              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Sivakasi"
              />
            </div>

            {/* Active */}

            <div className="form-field active-field">

              <label className="checkbox-label">

                <input
                  type="checkbox"
                  name="active"
                  checked={form.active}
                  onChange={handleChange}
                />

                <span>
                  Show this advertisement publicly
                </span>

              </label>

            </div>

            {/* Buttons */}

            <div className="form-actions">

              <button
                type="submit"
                className="save-ad-btn"
              >
                {editingId !== null
                  ? "💾 Update Advertisement"
                  : "➕ Add Advertisement"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="cancel-ad-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </section>

        {/* =========================
            ADVERTISEMENT LIST
        ========================== */}

        <section className="advertisement-list-section">

          <div className="list-header">

            <div>
              <h2>
                Advertisements
              </h2>

              <p>
                {advertisements.length} total
                advertisements
              </p>
            </div>

            <button
              type="button"
              className="backup-btn"
              onClick={downloadBackup}
            >
              💾 Download Backup
            </button>

          </div>

          {loading ? (
            <div className="manager-empty">
              Loading advertisements...
            </div>
          ) : advertisements.length === 0 ? (
            <div className="manager-empty">
              No advertisements found.
            </div>
          ) : (
            <div className="advertisement-admin-grid">

              {advertisements.map((advertisement) => (

                <article
                  key={advertisement.id}
                  className={`advertisement-admin-card ${
                    advertisement.active
                      ? ""
                      : "inactive"
                  }`}
                >

                  {/* Image */}

                  <div className="admin-ad-image">

                    {advertisement.image ? (
                      <img
                        src={advertisement.image}
                        alt={
                          advertisement.title
                        }
                      />
                    ) : (
                      <div className="admin-ad-placeholder">
                        📢
                      </div>
                    )}

                    <span
                      className={
                        advertisement.active
                          ? "status-active"
                          : "status-inactive"
                      }
                    >
                      {advertisement.active
                        ? "Active"
                        : "Hidden"}
                    </span>

                  </div>

                  {/* Content */}

                  <div className="admin-ad-content">

                    <h3>
                      {advertisement.title}
                    </h3>

                    <p className="admin-ad-description">
                      {advertisement.description}
                    </p>

                    <div className="admin-ad-details">

                      {advertisement.phone && (
                        <div>
                          📞{" "}
                          {advertisement.phone}
                        </div>
                      )}

                      {advertisement.location && (
                        <div>
                          📍{" "}
                          {advertisement.location}
                        </div>
                      )}

                    </div>

                    {/* Actions */}

                    <div className="admin-ad-actions">

                      <button
                        type="button"
                        className="edit-ad-btn"
                        onClick={() =>
                          handleEdit(
                            advertisement
                          )
                        }
                      >
                        ✏️ Edit
                      </button>

                      <button
                        type="button"
                        className={
                          advertisement.active
                            ? "hide-ad-btn"
                            : "show-ad-btn"
                        }
                        onClick={() =>
                          toggleActive(
                            advertisement.id
                          )
                        }
                      >
                        {advertisement.active
                          ? "🙈 Hide"
                          : "👁️ Show"}
                      </button>

                      <button
                        type="button"
                        className="delete-ad-btn"
                        onClick={() =>
                          handleDelete(
                            advertisement.id
                          )
                        }
                      >
                        🗑️ Delete
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>
          )}

        </section>

      

      </main>
    </div>
  );
}

export default AdvertisementManager;