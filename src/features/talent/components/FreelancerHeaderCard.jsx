export default function FreelancerHeaderCard({
  freelancer,
  onToggleSave,
  onInvite,
}) {
  return (
    <section className="fd-card fd-header-card">
      <div className="fd-avatar-wrap">
        {freelancer.avatarUrl ? (
          <img
            src={freelancer.avatarUrl}
            alt={freelancer.fullName}
            className="fd-avatar"
          />
        ) : (
          <div className="fd-avatar fd-avatar-fallback">{freelancer.initials}</div>
        )}
        <span className="fd-status-dot" />
      </div>

      <div className="fd-header-content">
        <div className="fd-header-top">
          <div>
            <h1 className="fd-title">{freelancer.fullName}</h1>
            <p className="fd-subtitle">
              {freelancer.locationLabel || "Location not provided"}
              {freelancer.timeZone ? ` - ${freelancer.timeZone}` : ""}
            </p>
          </div>

          <div className="fd-header-actions">
            <button
              type="button"
              className={`fd-save-btn ${freelancer.isSaved ? "saved" : ""}`}
              onClick={onToggleSave}
              aria-label="Save freelancer"
            >
              ❤
            </button>
            <button type="button" className="fd-invite-btn" onClick={onInvite}>
              Invite to Job
            </button>
          </div>
        </div>

        <div className="fd-stats-grid">
          <div>
            <p className="fd-stat-value">{freelancer.trustScore}%</p>
            <p className="fd-stat-label">Job Success</p>
          </div>
          <div>
            <p className="fd-stat-value">
              {freelancer.hourlyRate !== null
                ? `$${freelancer.hourlyRate.toFixed(2)}`
                : "N/A"}
            </p>
            <p className="fd-stat-label">Hourly Rate</p>
          </div>
          <div>
            <p className="fd-stat-value">{freelancer.totalReviews}</p>
            <p className="fd-stat-label">Total Reviews</p>
          </div>
          <div>
            <p className="fd-stat-value">{freelancer.averageRating.toFixed(1)}</p>
            <p className="fd-stat-label">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
