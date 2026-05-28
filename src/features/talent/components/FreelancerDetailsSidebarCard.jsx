function InfoRow({ label, value }) {
  return (
    <div className="fd-info-row">
      <p className="fd-info-label">{label}</p>
      <p className="fd-info-value">{value || "Not provided"}</p>
    </div>
  );
}

export default function FreelancerDetailsSidebarCard({ freelancer }) {
  const location = [
    freelancer.address,
    freelancer.locationLabel,
    freelancer.zipCode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <aside className="fd-card">
      <h3 className="fd-section-title">Details</h3>

      <InfoRow label="Availability" value={freelancer.availability} />
      <InfoRow
        label="Years of experience"
        value={
          freelancer.yearsOfExperience === null
            ? "Not provided"
            : `${freelancer.yearsOfExperience} years`
        }
      />
      <InfoRow label="Role" value={freelancer.role} />
      <InfoRow
        label="Verification"
        value={freelancer.isVerified ? "Verified" : "Not verified"}
      />
      <InfoRow label="Email" value={freelancer.email} />
      <InfoRow label="Phone" value={freelancer.phoneNumber} />
      <InfoRow label="Location" value={location} />
      <InfoRow label="Time Zone" value={freelancer.timeZone} />

      {freelancer.portfolioUrl ? (
        <a
          className="fd-portfolio-link"
          href={freelancer.portfolioUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open Portfolio
        </a>
      ) : null}
    </aside>
  );
}
