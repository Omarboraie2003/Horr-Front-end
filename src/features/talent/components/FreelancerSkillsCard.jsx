export default function FreelancerSkillsCard({ skills }) {
  return (
    <section className="fd-card">
      <h3 className="fd-section-title">Skills</h3>
      {skills.length === 0 ? (
        <p className="fd-muted">No skills were added yet.</p>
      ) : (
        <div className="fd-skills-wrap">
          {skills.map((skill, index) => (
            <span className="fd-skill-pill" key={`${skill.name}-${index}`}>
              {skill.name}
              {skill.level ? <small>{skill.level}</small> : null}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
