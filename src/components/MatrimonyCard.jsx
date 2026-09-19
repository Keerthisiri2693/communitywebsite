import "./MatrimonyCard.css";

function MatrimonyCard({ profile }) {
  if (!profile) {
    return null;
  }

  return (
    <article className="matrimony-card">

      {/* =========================
          PROFILE IMAGE
      ========================== */}

      <div className="matrimony-card-image">

        {profile.photo ? (

          <img
            src={profile.photo}
            alt={`${profile.name || "Matrimony"} profile`}
          />

        ) : (

          <div className="matrimony-card-placeholder">
            👤
          </div>

        )}

        {/* Active status */}

        {profile.active && (
          <span className="matrimony-card-status">
            Available
          </span>
        )}

      </div>


      {/* =========================
          PROFILE CONTENT
      ========================== */}

      <div className="matrimony-card-content">

        <div className="matrimony-card-header">

          <div>

            <h3>
              {profile.name || "Profile"}
            </h3>

            {profile.age && (
              <p className="matrimony-card-age">
                {profile.age} years
              </p>
            )}

          </div>

          {profile.gender && (
            <span className="matrimony-card-gender">
              {profile.gender}
            </span>
          )}

        </div>


        {/* =========================
            PROFILE INFORMATION
        ========================== */}

        <div className="matrimony-card-info">

          {profile.location && (
            <div className="matrimony-info-row">
              <span className="info-icon">📍</span>

              <span>
                {profile.location}
              </span>
            </div>
          )}


          {profile.education && (
            <div className="matrimony-info-row">
              <span className="info-icon">🎓</span>

              <span>
                {profile.education}
              </span>
            </div>
          )}


          {profile.profession && (
            <div className="matrimony-info-row">
              <span className="info-icon">💼</span>

              <span>
                {profile.profession}
              </span>
            </div>
          )}

        </div>


        {/* =========================
            DESCRIPTION
        ========================== */}

        {profile.description && (

          <p className="matrimony-card-description">
            {profile.description}
          </p>

        )}

      </div>

    </article>
  );
}

export default MatrimonyCard;
