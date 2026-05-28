export default function FreelancerMainInfoCard({ freelancer }) {
  return (
    <section className="fd-card">
      <h2 className="fd-section-title">{freelancer.title}</h2>
      <p className="fd-bio">
        {freelancer.bio ||
          "No bio provided yet. This freelancer has not added a professional summary."}
      </p>
    </section>
  );
}
