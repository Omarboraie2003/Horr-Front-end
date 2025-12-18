import './AddSectionModal.css'

interface AddSectionModalProps {
  onClose: () => void
}

const AddSectionModal = ({ onClose }: AddSectionModalProps) => {
  const sections = [
    {
      id: 'certifications',
      title: 'Certifications',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2h-2"></path>
          <path d="M6 1v8l4-2 4 2V1"></path>
        </svg>
      ),
      color: '#D4AF37',
    },
    {
      id: 'employment',
      title: 'Employment history',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
      color: '#8B4513',
    },
    {
      id: 'other',
      title: 'Other experiences',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
      color: '#228B22',
    },
  ]

  const handleSectionClick = (sectionId: string) => {
    console.log(`Adding ${sectionId}...`)
    // Handle section addition logic here
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="add-section-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="add-section-content">
          {sections.map((section) => (
            <div
              key={section.id}
              className="section-card"
              onClick={() => handleSectionClick(section.id)}
            >
              <div className="section-card-header">
                <h3 className="section-card-title">{section.title}</h3>
                <button className="section-add-button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
              <div className="section-icon" style={{ color: section.color }}>
                {section.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddSectionModal

