import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchFreelancerDetails,
  toggleSaveFreelancer,
  clearSelectedFreelancer,
} from "./talentSlice";
import { mapFreelancerDetails } from "./freelancerDetailsMapper";
import FreelancerHeaderCard from "./components/FreelancerHeaderCard";
import FreelancerMainInfoCard from "./components/FreelancerMainInfoCard";
import FreelancerDetailsSidebarCard from "./components/FreelancerDetailsSidebarCard";
import FreelancerSkillsCard from "./components/FreelancerSkillsCard";
import FreelancerLanguagesCard from "./components/FreelancerLanguagesCard";
import FreelancerEducationCard from "./components/FreelancerEducationCard";
import FreelancerEmploymentCard from "./components/FreelancerEmploymentCard";
import FreelancerPortfolioCard from "./components/FreelancerPortfolioCard";
import FreelancerDetailsSkeleton from "./components/FreelancerDetailsSkeleton";
import "./styles/freelancerDetails.css";

export default function FreelancerDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedFreelancer, detailsLoading, detailsError } = useSelector(
    (state) => state.talent
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchFreelancerDetails(id));
    }
    return () => {
      dispatch(clearSelectedFreelancer());
    };
  }, [dispatch, id]);

  const freelancer = useMemo(() => {
    if (!selectedFreelancer?.data) return null;
    return mapFreelancerDetails(selectedFreelancer.data, {
      id: selectedFreelancer.userIdHash,
      isSaved: selectedFreelancer.isSaved,
    });
  }, [selectedFreelancer]);

  if (detailsLoading && !freelancer) {
    return <FreelancerDetailsSkeleton />;
  }

  if (detailsError || !freelancer) {
    return (
      <div className="fd-page">
        <div className="fd-shell">
          <div className="fd-section-card fd-center-state">
            <h2>Unable to load profile</h2>
            <p>{detailsError || "Freelancer profile could not be found."}</p>
            <Link to="/client/search-talent" className="fd-back-link">
              Back to search
            </Link>
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
    console.log("Invite freelancer:", freelancer.id);
  };

  return (
    <div className="fd-page">
      <div className="fd-shell">
        <nav className="fd-breadcrumb" aria-label="Breadcrumb">
          <Link to="/client/search-talent" className="fd-breadcrumb-link">
            Search Talent
          </Link>
          <span className="fd-breadcrumb-sep" aria-hidden="true">
            /
          </span>
          <span className="fd-breadcrumb-current">{freelancer.fullName}</span>
        </nav>

        <FreelancerHeaderCard
          freelancer={freelancer}
          onToggleSave={handleToggleSave}
          onInvite={handleInvite}
        />

        <div className="fd-grid">
          <aside className="fd-column-left">
            <FreelancerDetailsSidebarCard freelancer={freelancer} />
          </aside>

          <div className="fd-column-right">
            <FreelancerMainInfoCard freelancer={freelancer} />
            <FreelancerSkillsCard skills={freelancer.skills} />
            <FreelancerLanguagesCard
              languages={freelancer.languages}
              formatLanguage={freelancer.formatLanguage}
            />
            <FreelancerEducationCard
              education={freelancer.education}
              formatEducation={freelancer.formatEducation}
            />
            <FreelancerEmploymentCard
              employmentHistory={freelancer.employmentHistory}
              formatExperience={freelancer.formatExperience}
            />
            <FreelancerPortfolioCard portfolio={freelancer.portfolio} />
          </div>
        </div>
      </div>
    </div>
  );
}
