function ListBlock({ title, items, formatter }) {
  if (!items.length) return null;

  return (
    <div className="fd-list-block">
      <h4>{title}</h4>
      <ul>
        {items.map((item, index) => (
          <li key={`${title}-${index}`}>{formatter(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default function FreelancerBackgroundCard({ freelancer }) {
  const hasBackgroundData =
    freelancer.languages.length > 0 ||
    freelancer.education.length > 0 ||
    freelancer.experienceDetails.length > 0 ||
    freelancer.employmentHistory.length > 0;

  return (
    <section className="fd-card">
      <h3 className="fd-section-title">Background</h3>

      {!hasBackgroundData ? (
        <p className="fd-muted">
          No language, education, or employment background has been added yet.
        </p>
      ) : null}

      <ListBlock
        title="Languages"
        items={freelancer.languages}
        formatter={freelancer.formatLanguage}
      />
      <ListBlock
        title="Education"
        items={freelancer.education}
        formatter={freelancer.formatEducation}
      />
      <ListBlock
        title="Experience Details"
        items={freelancer.experienceDetails}
        formatter={freelancer.formatExperience}
      />
      <ListBlock
        title="Employment History"
        items={freelancer.employmentHistory}
        formatter={freelancer.formatExperience}
      />
    </section>
  );
}
