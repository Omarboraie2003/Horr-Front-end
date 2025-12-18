import { useState } from 'react'
import './OtherExperienceModal.css'

interface OtherExperience {
  title: string
  organization?: string
  date?: string
  description?: string
}

interface OtherExperienceModalProps {
  onClose: () => void
  onSave: (exp: OtherExperience) => void
}

const OtherExperienceModal = ({ onClose, onSave }: OtherExperienceModalProps) => {
  const [title, setTitle] = useState('')
  const [organization, setOrganization] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a title')
      return
    }
    onSave({
      title: title.trim(),
      organization: organization.trim() || undefined,
      date: date.trim() || undefined,
      description: description.trim() || undefined,
    })
  }

  return (
    <div className="modal-overlay">
      <div className="section-modal">
        <button className="close-button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="section-modal-header">
          <h2 className="section-modal-title">Add Other Experience</h2>
        </div>

        <div className="section-modal-content">
          <div className="form-group">
            <label htmlFor="exp-title" className="form-label">
              Title <span className="required">*</span>
            </label>
            <input
              id="exp-title"
              type="text"
              className="form-input"
              placeholder="e.g., Volunteer Work, Freelance Project"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exp-org" className="form-label">
              Organization <span className="optional">(optional)</span>
            </label>
            <input
              id="exp-org"
              type="text"
              className="form-input"
              placeholder="e.g., Local Community Center"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exp-date" className="form-label">
              Date <span className="optional">(optional)</span>
            </label>
            <input
              id="exp-date"
              type="text"
              className="form-input"
              placeholder="e.g., 2023 - Present"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exp-description" className="form-label">
              Description <span className="optional">(optional)</span>
            </label>
            <textarea
              id="exp-description"
              className="form-textarea"
              placeholder="Describe the experience..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <div className="section-modal-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn-save" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default OtherExperienceModal



