import { ReactNode } from 'react'
import './ProfileCard.css'

interface ProfileCardProps {
  title?: string
  children: ReactNode
  onEdit?: () => void
  onAdd?: () => void
  showEdit?: boolean
  showAdd?: boolean
}

const ProfileCard = ({ title, children, onEdit, onAdd, showEdit = false, showAdd = false }: ProfileCardProps) => {
  const hasHeader = title || showEdit || showAdd
  
  return (
    <div className="profile-card">
      {hasHeader && (
        <div className="profile-card-header">
          {title && <h3 className="profile-card-title">{title}</h3>}
          {(showEdit || showAdd) && (
            <div className="profile-card-actions">
              {showAdd && (
                <button className="icon-button" onClick={onAdd} title="Add">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              )}
              {showEdit && (
                <button className="icon-button" onClick={onEdit} title="Edit">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      )}
      <div className="profile-card-content">
        {children}
      </div>
    </div>
  )
}

export default ProfileCard

