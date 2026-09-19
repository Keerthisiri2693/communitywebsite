import { useEffect, useMemo, useState } from "react";
import "./Matrimony.css";

function Matrimony() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [location, setLocation] = useState("All");

  useEffect(() => {
    fetch("/data/matrimony.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load matrimony profiles");
        }

        return response.json();
      })
      .then((data) => {
        const activeProfiles = data.filter(
          (profile) => profile.active === true
        );

        setProfiles(activeProfiles);
      })
      .catch((error) => {
        console.error("Matrimony loading error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /* =========================
     LOCATIONS
  ========================== */

  const locations = useMemo(() => {
    const uniqueLocations = [
      ...new Set(
        profiles
          .map((profile) => profile.location)
          .filter(Boolean)
      ),
    ];

    return uniqueLocations.sort();
  }, [profiles]);


  /* =========================
     FILTER PROFILES
  ========================== */

  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        String(profile.name || "")
          .toLowerCase()
          .includes(searchText) ||
        String(profile.education || "")
          .toLowerCase()
          .includes(searchText) ||
        String(profile.profession || "")
          .toLowerCase()
          .includes(searchText) ||
        String(profile.location || "")
          .toLowerCase()
          .includes(searchText);

      const matchesGender =
        gender === "All" ||
        profile.gender === gender;

      const matchesLocation =
        location === "All" ||
        profile.location === location;

      return (
        matchesSearch &&
        matchesGender &&
        matchesLocation
      );
    });
  }, [
    profiles,
    search,
    gender,
    location,
  ]);


  return (
    <div className="matrimony-page">

      {/* =========================
          HERO
      ========================== */}

      <section className="matrimony-hero">

        <div className="matrimony-hero-content">

          <p className="matrimony-label">
            Community Matrimony
          </p>

          <h1>
            Find the Right
            <span>Connection</span>
          </h1>

          <p>
            Explore matrimonial profiles shared by
            community families and discover suitable
            connections.
          </p>

        </div>

      </section>


      {/* =========================
          MAIN CONTENT
      ========================== */}

      <section className="matrimony-section">

        <div className="matrimony-container">


          {/* =====================
              HEADER
          ====================== */}

          <div className="matrimony-heading">

            <div>

              <p className="section-label">
                Matrimonial Profiles
              </p>

              <h2>
                Find a Suitable Profile
              </h2>

              <p>
                Browse the available profiles and use
                the filters to find relevant matches.
              </p>

            </div>

            <div className="profile-count">

              <strong>
                {filteredProfiles.length}
              </strong>

              <span>
                Profiles
              </span>

            </div>

          </div>


          {/* =====================
              FILTERS
          ====================== */}

          <div className="matrimony-filters">

            {/* Search */}

            <div className="search-box">

              <span>
                🔍
              </span>

              <input
                type="text"
                placeholder="Search name, education, profession..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            {/* Gender */}

            <select
              value={gender}
              onChange={(e) =>
                setGender(e.target.value)
              }
            >

              <option value="All">
                All Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

            </select>


            {/* Location */}

            <select
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
            >

              <option value="All">
                All Locations
              </option>

              {locations.map((item) => (

                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>

              ))}

            </select>


            {/* Clear */}

            {(search ||
              gender !== "All" ||
              location !== "All") && (

              <button
                className="clear-filter"
                onClick={() => {
                  setSearch("");
                  setGender("All");
                  setLocation("All");
                }}
              >
                Clear
              </button>

            )}

          </div>


          {/* =====================
              LOADING
          ====================== */}

          {loading && (

            <div className="matrimony-message">

              <div className="matrimony-loader"></div>

              <p>
                Loading profiles...
              </p>

            </div>

          )}


          {/* =====================
              NO RESULTS
          ====================== */}

          {!loading &&
            filteredProfiles.length === 0 && (

              <div className="matrimony-message">

                <div className="empty-profile-icon">
                  💍
                </div>

                <h3>
                  No Profiles Found
                </h3>

                <p>
                  Try changing your search or filters.
                </p>

              </div>

            )}


          {/* =====================
              PROFILE GRID
          ====================== */}

          {!loading &&
            filteredProfiles.length > 0 && (

              <div className="matrimony-grid">

                {filteredProfiles.map((profile) => (

                  <article
                    className="profile-card"
                    key={profile.id}
                  >

                    {/* PHOTO */}

                    <div className="profile-image">

                      {profile.photo ? (

                        <img
                          src={profile.photo}
                          alt={profile.name}
                        />

                      ) : (

                        <div className="profile-placeholder">
                          👤
                        </div>

                      )}

                      <span className="profile-status">
                        Available
                      </span>

                    </div>


                    {/* DETAILS */}

                    <div className="profile-details">

                      <h3>
                        {profile.name}
                      </h3>

                      <p className="profile-age">
                        {profile.age
                          ? `${profile.age} years`
                          : ""}
                      </p>


                      {profile.location && (

                        <div className="profile-info">
                          📍 {profile.location}
                        </div>

                      )}


                      {profile.education && (

                        <div className="profile-info">
                          🎓 {profile.education}
                        </div>

                      )}


                      {profile.profession && (

                        <div className="profile-info">
                          💼 {profile.profession}
                        </div>

                      )}


                      {profile.description && (

                        <p className="profile-description">
                          {profile.description}
                        </p>

                      )}

                    </div>

                  </article>

                ))}

              </div>

            )}

        </div>

      </section>


      {/* =========================
          PRIVACY NOTE
      ========================== */}

      <section className="matrimony-privacy">

        <div className="matrimony-container">

          <div className="privacy-box">

            <div className="privacy-icon">
              🔒
            </div>

            <div>

              <h3>
                Privacy & Safety
              </h3>

              <p>
                Please do not publish sensitive personal
                information such as Aadhaar numbers,
                passwords, financial information or
                government identification documents.
                Share contact information only when
                appropriate.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Matrimony;

