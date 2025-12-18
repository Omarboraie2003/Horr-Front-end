import './ProfileHeader.css'

interface ProfileHeaderProps {
  name: string
  location: string
  profileImage?: string
  onPublicView?: () => void
}

const ProfileHeader = ({ name, location, profileImage, onPublicView }: ProfileHeaderProps) => {
  return (
    <div className="profile-header-card">
      <div className="profile-header-left">
        <div className="profile-image-container">
          {profileImage ? (
            <img src={profileImage} alt={name} className="profile-image" />
          ) : (
            <div className="profile-image-placeholder">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          )}
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{name}</h1>
          <p className="profile-location">{location}</p>
        </div>
      </div>
      <div className="profile-header-right">
        <div className="profile-actions">
          <button className="btn-public-view" onClick={onPublicView}>See public view</button>
          <button className="btn-profile-settings">Profile settings</button>
        </div>
        <div className="share-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
          </svg>
          <span>Share</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader

