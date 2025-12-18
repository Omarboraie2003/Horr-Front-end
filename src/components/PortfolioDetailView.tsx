import './PortfolioDetailView.css'

interface PortfolioItem {
  id: string
  title: string
  description: string
  role?: string
  skills: string[]
  mediaLink?: string
}

interface PortfolioDetailViewProps {
  item: PortfolioItem
  onClose: () => void
  onEdit?: () => void
}

const PortfolioDetailView = ({ item, onClose, onEdit }: PortfolioDetailViewProps) => {
  const handleCopyLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    alert('Link copied to clipboard!')
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="portfolio-detail-overlay">
      <div className="portfolio-detail-container">
        <div className="portfolio-detail-header">
          <button className="copy-link-button" onClick={handleCopyLink}>
            Copy link
          </button>
          <button className="detail-close-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="portfolio-detail-content">
          <div className="portfolio-detail-left">
            <h1 className="portfolio-detail-title">{item.title}</h1>
            
            {item.role && (
              <div className="portfolio-detail-role">
                <span className="role-label">My role:</span> {item.role}
              </div>
            )}

            <div className="portfolio-detail-section">
              <h3 className="section-title">Project description.</h3>
              <p className="section-content">{item.description}</p>
            </div>

            <div className="portfolio-detail-section">
              <h3 className="section-title">Skills and deliverables</h3>
              <div className="skills-container">
                {item.skills.map((skill, index) => (
                  <span key={index} className="skill-pill">{skill}</span>
                ))}
              </div>
            </div>

            <div className="portfolio-detail-meta">
              <p className="publish-date">Published on {formatDate(new Date())}</p>
              <a href="#" className="report-issue-link">Report an issue</a>
            </div>

            {item.mediaLink && (
              <div className="media-link-section">
                <a 
                  href={item.mediaLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="media-link-button"
                >
                  Link for more videos/photos
                </a>
              </div>
            )}
          </div>

          <div className="portfolio-detail-right">
            {item.mediaLink ? (
              <div className="media-preview-container">
                <iframe
                  src={item.mediaLink}
                  className="media-preview-iframe"
                  title={`${item.title} Preview`}
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />
              </div>
            ) : (
              <div className="no-media-placeholder">
                <p>No media available</p>
                <p className="placeholder-hint">Add a media link to display project screenshots or videos here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioDetailView



