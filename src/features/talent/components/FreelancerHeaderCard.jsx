import { Heart } from "lucide-react";

export default function FreelancerHeaderCard({
  freelancer,
  onToggleSave,
  onInvite,
}) {
  const stats = [
    { value: `${freelancer.trustScore}%`, label: "Job Success" },
    { value: freelancer.totalEarnings, label: "Total Earnings" },
    { value: String(freelancer.totalJobs), label: "Jobs Completed" },
    { value: String(freelancer.totalHours), label: "Hours Worked" },
  ];

  return (
    <section className="fd-hero-card">
      <div className="fd-hero-accent" aria-hidden="true" />

      <div className="fd-hero-main">
        <div className="fd-avatar-wrap">
          {freelancer.avatarUrl ? (
            <img
              src={freelancer.avatarUrl}
              alt={freelancer.fullName}
              className="fd-avatar"
            />
          ) : (
            <div className="fd-avatar fd-avatar-fallback">
              {freelancer.initials}
            </div>
          )}
          {freelancer.isVerified ? (
            <span className="fd-status-dot" title="Verified" />
          ) : null}
        </div>

        <div className="fd-hero-content">
          <div className="fd-hero-top">
            <div>
              <div className="fd-name-row">
                <h1 className="fd-title">{freelancer.fullName}</h1>
                {freelancer.isVerified ? (
                  <span className="fd-verified-badge">Verified</span>
                ) : null}
              </div>
              <p className="fd-role">{freelancer.title}</p>
              <p className="fd-subtitle">
                {freelancer.locationLabel || "Location not provided"}
              </p>
            </div>

            <div className="fd-header-actions">
              <button
                type="button"
                className={`fd-save-btn ${freelancer.isSaved ? "saved" : ""}`}
                onClick={onToggleSave}
                aria-label={
                  freelancer.isSaved ? "Remove from saved" : "Save freelancer"
                }
              >
                <Heart
                  size={16}
                  strokeWidth={2}
                  fill={freelancer.isSaved ? "currentColor" : "none"}
                />
                {freelancer.isSaved ? "Saved" : "Save"}
              </button>
              <button type="button" className="fd-invite-btn" onClick={onInvite}>
                Invite to Job
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fd-stats-row">
        {stats.map((stat) => (
          <div className="fd-stat-card" key={stat.label}>
            <p className="fd-stat-value">{stat.value}</p>
            <p className="fd-stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
