import './ProfilePreview.css'

interface ProfilePreviewProps {
  onClose: () => void
  profileData: any
}

const ProfilePreview = ({ onClose, profileData }: ProfilePreviewProps) => {
  return (
    <div className="preview-overlay">
      <div className="preview-container">
        <button className="preview-close-button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="preview-header">
          <h2>Public Profile Preview</h2>
          <p>This is how your profile appears to clients</p>
        </div>

        <div className="preview-content">
          <div className="preview-profile-header">
            <div className="preview-profile-info">
              <h1>{profileData.name}</h1>
              <p>{profileData.location}</p>
            </div>
          </div>

          <div className="preview-section">
            <h3>Professional Title</h3>
            <p>{profileData.jobTitle}</p>
            <p>{profileData.hourlyRateUSD} • {profileData.hourlyRateEGP}</p>
          </div>

          <div className="preview-section">
            <h3>Professional Summary</h3>
            <p>{profileData.professionalSummary}</p>
          </div>

          <div className="preview-section">
            <h3>Skills</h3>
            <div className="preview-skills">
              {profileData.skills.map((skill: string, index: number) => (
                <span key={index} className="preview-skill-tag">{skill}</span>
              ))}
            </div>
          </div>

          <div className="preview-section">
            <h3>Portfolio</h3>
            {profileData.portfolioItems.length > 0 ? (
              <div className="preview-portfolio">
                {profileData.portfolioItems.map((item: any) => (
                  <div key={item.id} className="preview-portfolio-item">
                    <h4>{item.title}</h4>
                    {item.role && <p className="preview-role">{item.role}</p>}
                    {item.description && <p>{item.description}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="preview-empty">No portfolio items</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePreview



