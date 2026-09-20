import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./MatrimonyManager.css";

// =====================================================
// CONSTANTS
// =====================================================

const STORAGE_KEY = "community_matrimony_profiles";

const STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

// =====================================================
// EMPTY FORM
// =====================================================

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
  status: STATUS.PENDING,
};

// =====================================================
// STATUS HELPERS
// =====================================================

const normalizeStatus = (status) => {
  const value = String(status || "")
    .trim()
    .toUpperCase();

  if (
    value === STATUS.APPROVED ||
    value === STATUS.REJECTED ||
    value === STATUS.PENDING
  ) {
    return value;
  }

  return STATUS.PENDING;
};

const getStatusLabel = (status) => {
  switch (normalizeStatus(status)) {
    case STATUS.APPROVED:
      return "Approved";

    case STATUS.REJECTED:
      return "Rejected";

    default:
      return "Pending";
  }
};

// =====================================================
// NORMALIZE PROFILE
// =====================================================

const normalizeProfile = (profile) => {
  const status = normalizeStatus(profile?.status);

  return {
    ...profile,

    id: profile?.id ?? null,

    name: String(profile?.name || ""),
    age: profile?.age || "",
    gender: profile?.gender || "Female",
    location: String(profile?.location || ""),
    education: String(profile?.education || ""),
    profession: String(profile?.profession || ""),
    photo: String(profile?.photo || ""),
    description: String(profile?.description || ""),

    status,

    active:
      status === STATUS.REJECTED
        ? false
        : profile?.active !== false,
  };
};

// =====================================================
// COMPONENT
// =====================================================

function MatrimonyManager() {
  const [profiles, setProfiles] = useState([]);

  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState("success");

  const [search, setSearch] = useState("");

  const [genderFilter, setGenderFilter] = useState("All");

  const [statusFilter, setStatusFilter] = useState("All");

  // ===================================================
  // LOAD PROFILES
  // ===================================================

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      setLoading(true);

      // -----------------------------------------------
      // FIRST: LOCAL STORAGE
      // -----------------------------------------------

      const savedProfiles =
        localStorage.getItem(STORAGE_KEY);

      if (savedProfiles) {
        try {
          const parsed = JSON.parse(savedProfiles);

          if (Array.isArray(parsed)) {
            const normalizedProfiles =
              parsed.map(normalizeProfile);

            setProfiles(normalizedProfiles);
            return;
          }
        } catch (storageError) {
          console.warn(
            "Invalid saved matrimony data:",
            storageError
          );

          localStorage.removeItem(STORAGE_KEY);
        }
      }

      // -----------------------------------------------
      // SECOND: INITIAL JSON
      // -----------------------------------------------

      const response = await fetch(
        "/data/matrimony.json"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load matrimony.json"
        );
      }

      const data = await response.json();

      const normalizedData = Array.isArray(data)
        ? data.map(normalizeProfile)
        : [];

      setProfiles(normalizedData);

      // Save initial data locally
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(normalizedData)
      );
    } catch (error) {
      console.error(
        "MATRIMONY LOAD ERROR:",
        error
      );

      setMessage(
        "Unable to load matrimony profiles."
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // SAVE LOCAL DATA
  // ===================================================

  const saveProfiles = (updatedProfiles) => {
    const normalizedProfiles =
      updatedProfiles.map(normalizeProfile);

    setProfiles(normalizedProfiles);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(normalizedProfiles)
    );
  };

  // ===================================================
  // FORM CHANGE
  // ===================================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ===================================================
  // FORM SUBMIT
  // ===================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");

    // -----------------------------------------------
    // VALIDATION
    // -----------------------------------------------

    if (!form.name.trim()) {
      setMessage("Name is required.");
      setMessageType("error");
      return;
    }

    if (!form.age) {
      setMessage("Age is required.");
      setMessageType("error");
      return;
    }

    if (Number(form.age) < 18) {
      setMessage(
        "Matrimony profile age must be 18 or above."
      );

      setMessageType("error");
      return;
    }

    if (!form.gender) {
      setMessage("Gender is required.");
      setMessageType("error");
      return;
    }

    if (!form.location.trim()) {
      setMessage("Location is required.");
      setMessageType("error");
      return;
    }

    // -----------------------------------------------
    // STATUS
    // -----------------------------------------------

    const status = normalizeStatus(form.status);

    const active =
      status === STATUS.APPROVED
        ? true
        : status === STATUS.REJECTED
        ? false
        : form.active;

    // -----------------------------------------------
    // UPDATE
    // -----------------------------------------------

    if (editingId !== null) {
      const updatedProfiles = profiles.map(
        (profile) =>
          profile.id === editingId
            ? {
                ...profile,

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

                status,

                active,
              }
            : profile
      );

      saveProfiles(updatedProfiles);

      setMessage(
        "Matrimony profile updated successfully."
      );

      setMessageType("success");

      resetForm();

      return;
    }

    // -----------------------------------------------
    // CREATE
    // -----------------------------------------------

    const numericIds = profiles
      .map((profile) => Number(profile.id))
      .filter((id) => Number.isFinite(id));

    const newId =
      numericIds.length > 0
        ? Math.max(...numericIds) + 1
        : 1;

    const newProfile = {
      ...form,

      id: newId,

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

      status,

      active,
    };

    const updatedProfiles = [
      ...profiles,
      newProfile,
    ];

    saveProfiles(updatedProfiles);

    setMessage(
      "Matrimony profile added successfully."
    );

    setMessageType("success");

    resetForm();
  };

  // ===================================================
  // EDIT
  // ===================================================

  const handleEdit = (profile) => {
    const status = normalizeStatus(
      profile.status
    );

    setForm({
      id: profile.id,

      name: profile.name || "",

      age: profile.age || "",

      gender:
        profile.gender || "Female",

      location:
        profile.location || "",

      education:
        profile.education || "",

      profession:
        profile.profession || "",

      photo:
        profile.photo || "",

      description:
        profile.description || "",

      active:
        status === STATUS.REJECTED
          ? false
          : profile.active !== false,

      status,
    });

    setEditingId(profile.id);

    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ===================================================
  // DELETE
  // ===================================================

  const handleDelete = (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to permanently delete this matrimonial profile?"
      );

    if (!confirmed) {
      return;
    }

    const updatedProfiles =
      profiles.filter(
        (profile) =>
          profile.id !== id
      );

    saveProfiles(updatedProfiles);

    if (editingId === id) {
      resetForm();
    }

    setMessage(
      "Matrimony profile deleted."
    );

    setMessageType("success");
  };

  // ===================================================
  // APPLICATION STATUS
  // ===================================================

  const updateApplicationStatus = (
    id,
    status
  ) => {
    const normalizedStatus =
      normalizeStatus(status);

    const updatedProfiles =
      profiles.map((profile) => {
        if (profile.id !== id) {
          return profile;
        }

        return {
          ...profile,

          status:
            normalizedStatus,

          active:
            normalizedStatus ===
            STATUS.APPROVED
              ? true
              : normalizedStatus ===
                STATUS.REJECTED
              ? false
              : profile.active,
        };
      });

    saveProfiles(updatedProfiles);

    if (editingId === id) {
      setForm((prev) => ({
        ...prev,

        status:
          normalizedStatus,

        active:
          normalizedStatus ===
          STATUS.APPROVED
            ? true
            : normalizedStatus ===
              STATUS.REJECTED
            ? false
            : prev.active,
      }));
    }

    const messages = {
      [STATUS.APPROVED]:
        "Matrimony application approved successfully.",

      [STATUS.REJECTED]:
        "Matrimony application rejected.",

      [STATUS.PENDING]:
        "Matrimony application moved back to pending.",
    };

    setMessage(
      messages[normalizedStatus]
    );

    setMessageType(
      normalizedStatus ===
        STATUS.REJECTED
        ? "warning"
        : "success"
    );
  };

  // ===================================================
  // TOGGLE ACTIVE
  // ===================================================

  const toggleActive = (id) => {
    const updatedProfiles =
      profiles.map((profile) =>
        profile.id === id
          ? {
              ...profile,

              active:
                !profile.active,
            }
          : profile
      );

    saveProfiles(updatedProfiles);

    setMessage(
      "Profile visibility updated."
    );

    setMessageType("success");
  };

  // ===================================================
  // RESET FORM
  // ===================================================

  const resetForm = () => {
    setForm({
      ...emptyForm,
    });

    setEditingId(null);
  };

  // ===================================================
  // RESET LOCAL DATA
  // ===================================================

  const clearLocalData = () => {
    const confirmed =
      window.confirm(
        "This will remove all locally saved changes and reload the original matrimony.json data. Continue?"
      );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(
      STORAGE_KEY
    );

    setMessage(
      "Local changes cleared. Reloading original data..."
    );

    setMessageType("success");

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  // ===================================================
  // EXPORT JSON
  // ===================================================

const downloadJSON = () => {
  try {
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

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    // Exact file name
    link.download = "001_mat_210926.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setMessage(
      "001_mat_210926.json exported successfully."
    );

    setMessageType("success");
  } catch (error) {
    console.error(
      "EXPORT JSON ERROR:",
      error
    );

    setMessage(
      "Unable to export 001_mat_210926.json."
    );

    setMessageType("error");
  }
};

  // ===================================================
  // BACKUP
  // ===================================================


const downloadBackup = () => {
  try {
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

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    // ==========================================
    // BACKUP FILE NAME
    // Example:
    // 001_mat_200926.json
    // ==========================================

    const today = new Date();

    const day = String(
      today.getDate()
    ).padStart(2, "0");

    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");

    const year = String(
      today.getFullYear()
    ).slice(-2);

    // Get previous backup number
    const backupNumber =
      Number(
        localStorage.getItem(
          "matrimony_backup_number"
        )
      ) || 0;

    const nextNumber =
      backupNumber + 1;

    // Save next number
    localStorage.setItem(
      "matrimony_backup_number",
      String(nextNumber)
    );

    const serialNumber =
      String(nextNumber).padStart(
        3,
        "0"
      );

    link.download =
      `${serialNumber}_mat_${day}${month}${year}.json`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setMessage(
      `Backup downloaded: ${serialNumber}_mat_${day}${month}${year}.json`
    );

    setMessageType("success");

  } catch (error) {
    console.error(
      "BACKUP ERROR:",
      error
    );

    setMessage(
      "Unable to create backup."
    );

    setMessageType("error");
  }
};



  // ===================================================
  // COUNTS
  // ===================================================

  const counts = useMemo(() => {
    return profiles.reduce(
      (result, profile) => {
        const status =
          normalizeStatus(
            profile.status
          );

        result.total += 1;

        if (
          status ===
          STATUS.PENDING
        ) {
          result.pending += 1;
        }

        if (
          status ===
          STATUS.APPROVED
        ) {
          result.approved += 1;
        }

        if (
          status ===
          STATUS.REJECTED
        ) {
          result.rejected += 1;
        }

        if (profile.active) {
          result.active += 1;
        }

        return result;
      },
      {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        active: 0,
      }
    );
  }, [profiles]);

  // ===================================================
  // FILTER
  // ===================================================

  const filteredProfiles =
    useMemo(() => {
      return profiles.filter(
        (profile) => {
          const searchText =
            search
              .toLowerCase()
              .trim();

          const matchesSearch =
            !searchText ||
            String(
              profile.name || ""
            )
              .toLowerCase()
              .includes(searchText) ||
            String(
              profile.location || ""
            )
              .toLowerCase()
              .includes(searchText) ||
            String(
              profile.education || ""
            )
              .toLowerCase()
              .includes(searchText) ||
            String(
              profile.profession || ""
            )
              .toLowerCase()
              .includes(searchText);

          const matchesGender =
            genderFilter === "All" ||
            profile.gender ===
              genderFilter;

          const matchesStatus =
            statusFilter === "All" ||
            normalizeStatus(
              profile.status
            ) === statusFilter;

          return (
            matchesSearch &&
            matchesGender &&
            matchesStatus
          );
        }
      );
    }, [
      profiles,
      search,
      genderFilter,
      statusFilter,
    ]);

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="matrimony-manager">

      {/* =================================================
          HEADER
      ================================================= */}

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
            Review and manage matrimonial
            applications
          </p>
        </div>

        <div className="matrimony-header-actions">

          <button
            type="button"
            className="matrimony-export-btn"
            onClick={downloadJSON}
          >
            📥 Export JSON
          </button>

          <button
            type="button"
            className="matrimony-backup-btn"
            onClick={downloadBackup}
          >
            💾 Backup
          </button>

        </div>

      </header>

      <main className="matrimony-manager-content">

        {/* =================================================
            MESSAGE
        ================================================= */}

        {message && (
          <div
            className={`matrimony-manager-message ${messageType}`}
          >
            <span>
              {messageType === "error"
                ? "⚠️"
                : messageType === "warning"
                ? "⚠️"
                : "✅"}
            </span>

            <span>
              {message}
            </span>
          </div>
        )}

        {/* =================================================
            PRIVACY
        ================================================= */}

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
              passwords, bank details,
              government ID numbers or other
              sensitive personal information
              in the public matrimonial JSON
              file.
            </p>
          </div>

        </section>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <section className="matrimony-statistics">

          <div
            className="matrimony-stat-card total"
            onClick={() =>
              setStatusFilter("All")
            }
          >
            <div className="stat-icon">
              👥
            </div>

            <div>
              <span>
                Total Applications
              </span>

              <strong>
                {counts.total}
              </strong>
            </div>
          </div>

          <div
            className="matrimony-stat-card pending"
            onClick={() =>
              setStatusFilter(
                STATUS.PENDING
              )
            }
          >
            <div className="stat-icon">
              ⏳
            </div>

            <div>
              <span>
                Pending
              </span>

              <strong>
                {counts.pending}
              </strong>
            </div>
          </div>

          <div
            className="matrimony-stat-card approved"
            onClick={() =>
              setStatusFilter(
                STATUS.APPROVED
              )
            }
          >
            <div className="stat-icon">
              ✅
            </div>

            <div>
              <span>
                Approved
              </span>

              <strong>
                {counts.approved}
              </strong>
            </div>
          </div>

          <div
            className="matrimony-stat-card rejected"
            onClick={() =>
              setStatusFilter(
                STATUS.REJECTED
              )
            }
          >
            <div className="stat-icon">
              ❌
            </div>

            <div>
              <span>
                Rejected
              </span>

              <strong>
                {counts.rejected}
              </strong>
            </div>
          </div>

          <div
            className="matrimony-stat-card active"
            onClick={() =>
              setStatusFilter(
                STATUS.APPROVED
              )
            }
          >
            <div className="stat-icon">
              🌐
            </div>

            <div>
              <span>
                Public Profiles
              </span>

              <strong>
                {counts.active}
              </strong>
            </div>
          </div>

        </section>


        {/* =================================================
            APPLICATION LIST
        ================================================= */}

        <section className="matrimony-list-section">

          <div className="matrimony-list-header">

            <div>
              <h2>
                Matrimony Applications
              </h2>

              <p>
                Showing{" "}
                <strong>
                  {filteredProfiles.length}
                </strong>{" "}
                of {profiles.length} profiles
              </p>
            </div>

            <button
              type="button"
              className="matrimony-clear-btn"
              onClick={clearLocalData}
            >
              ♻️ Reset Local Data
            </button>

          </div>

          {/* =================================================
              FILTERS
          ================================================= */}

          <div className="matrimony-filters">

            <div className="matrimony-search-box">

              <span>
                🔎
              </span>

              <input
                type="text"
                placeholder="Search name, location, education..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

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

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="PENDING">
                Pending
              </option>

              <option value="APPROVED">
                Approved
              </option>

              <option value="REJECTED">
                Rejected
              </option>
            </select>

          </div>

          {/* =================================================
              PROFILE LIST
          ================================================= */}

          {loading ? (

            <div className="matrimony-manager-empty">

              <div className="loading-spinner"></div>

              <p>
                Loading matrimonial
                applications...
              </p>

            </div>

          ) : filteredProfiles.length === 0 ? (

            <div className="matrimony-manager-empty">

              <div className="empty-icon">
                🔍
              </div>

              <h3>
                No applications found
              </h3>

              <p>
                Try changing your search
                or filters.
              </p>

            </div>

          ) : (

            <div className="matrimony-admin-grid">

              {filteredProfiles.map(
                (profile) => {

                  const status =
                    normalizeStatus(
                      profile.status
                    );

                  return (

                    <article
                      key={profile.id}
                      className={`matrimony-admin-card ${
                        profile.active
                          ? ""
                          : "profile-inactive"
                      }`}
                    >

                      {/* IMAGE */}

                      <div className="matrimony-admin-image">

                        {profile.photo ? (

                          <img
                            src={profile.photo}
                            alt={
                              profile.name ||
                              "Matrimony profile"
                            }
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                          />

                        ) : (

                          <div className="matrimony-image-placeholder">
                            👤
                          </div>

                        )}

                        <span
                          className={`profile-application-status ${status.toLowerCase()}`}
                        >
                          {getStatusLabel(
                            status
                          )}
                        </span>

                      </div>

                      {/* CONTENT */}

                      <div className="matrimony-admin-content">

                        <div className="matrimony-admin-title-row">

                          <div>

                            <h3>
                              {profile.name}
                            </h3>

                            {profile.age && (
                              <span>
                                {profile.age}{" "}
                                years
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

                        <div className="profile-status-info">

                          <span>
                            Status
                          </span>

                          <strong
                            className={`status-text ${status.toLowerCase()}`}
                          >
                            {getStatusLabel(
                              status
                            )}
                          </strong>

                        </div>

                       

                      </div>

                    </article>

                  );
                }
              )}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default MatrimonyManager;