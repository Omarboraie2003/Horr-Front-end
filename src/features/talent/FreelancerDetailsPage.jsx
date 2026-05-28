import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTalents, toggleSaveFreelancer } from "./talentSlice";
import { mapFreelancerDetails } from "./freelancerDetailsMapper";
import FreelancerHeaderCard from "./components/FreelancerHeaderCard";
import FreelancerMainInfoCard from "./components/FreelancerMainInfoCard";
import FreelancerDetailsSidebarCard from "./components/FreelancerDetailsSidebarCard";
import FreelancerSkillsCard from "./components/FreelancerSkillsCard";
import FreelancerBackgroundCard from "./components/FreelancerBackgroundCard";
import FreelancerDetailsSkeleton from "./components/FreelancerDetailsSkeleton";
import "./styles/freelancerDetails.css";

export default function FreelancerDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { talents, loading } = useSelector((state) => state.talent);

  useEffect(() => {
    if (!talents.length) {
      dispatch(fetchTalents({ page: 1, pageSize: 10 }));
    }
  }, [dispatch, talents.length]);

  const freelancerRaw = useMemo(
    () => talents.find((talent) => talent.id === id) || null,
    [talents, id]
  );

  const freelancer = useMemo(
    () => (freelancerRaw ? mapFreelancerDetails(freelancerRaw) : null),
    [freelancerRaw]
  );

  if (loading && !freelancer) {
    return <FreelancerDetailsSkeleton />;
  }

  if (!freelancer) {
    return (
      <div className="fd-page">
        <div className="fd-shell">
          <div className="fd-card fd-center-state">
            <h2>Freelancer not found</h2>
            <p>
              We could not find this freelancer in the loaded talent list yet.
              Return to search and open the profile again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleToggleSave = () => {
    dispatch(
      toggleSaveFreelancer({
        freelancerId: freelancer.id,
        isSaved: freelancer.isSaved,
      })
    );
  };

  const handleInvite = () => {
    // Invitation flow will be wired to jobs when endpoint is ready.
    console.log("Invite freelancer:", freelancer.id);
  };

  return (
    <div className="fd-page">
      <div className="fd-shell">
        <FreelancerHeaderCard
          freelancer={freelancer}
          onToggleSave={handleToggleSave}
          onInvite={handleInvite}
        />

        <div className="fd-grid">
          <div className="fd-column-left">
            <FreelancerDetailsSidebarCard freelancer={freelancer} />
          </div>

          <div className="fd-column-right">
            <FreelancerMainInfoCard freelancer={freelancer} />
            <FreelancerSkillsCard skills={freelancer.skills} />
            <FreelancerBackgroundCard freelancer={freelancer} />
          </div>
        </div>
      </div>
    </div>
  );
}
