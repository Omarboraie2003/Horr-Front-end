import { useState } from 'react'
import './EmploymentModal.css'

interface Employment {
  company: string
  position: string
  startDate?: string
  endDate?: string
  description?: string
}

interface EmploymentModalProps {
  onClose: () => void
  onSave: (emp: Employment) => void
}

const EmploymentModal = ({ onClose, onSave }: EmploymentModalProps) => {
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [description, setDescription] = useState('')

  const handleSave = () => {
    if (!company.trim() || !position.trim()) {
      alert('Please enter company and position')
      return
    }
    onSave({
      company: company.trim(),
      position: position.trim(),
      startDate: startDate.trim() || undefined,
      endDate: endDate.trim() || undefined,
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
          <h2 className="section-modal-title">Add Employment</h2>
        </div>

        <div className="section-modal-content">
          <div className="form-group">
            <label htmlFor="emp-company" className="form-label">
              Company <span className="required">*</span>
            </label>
            <input
              id="emp-company"
              type="text"
              className="form-input"
              placeholder="e.g., Google"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="emp-position" className="form-label">
              Position <span className="required">*</span>
            </label>
            <input
              id="emp-position"
              type="text"
              className="form-input"
              placeholder="e.g., Senior Software Engineer"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="emp-start" className="form-label">
                Start Date <span className="optional">(optional)</span>
              </label>
              <input
                id="emp-start"
                type="text"
                className="form-input"
                placeholder="e.g., January 2020"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="emp-end" className="form-label">
                End Date <span className="optional">(optional)</span>
              </label>
              <input
                id="emp-end"
                type="text"
                className="form-input"
                placeholder="e.g., December 2023 or Present"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="emp-description" className="form-label">
              Description <span className="optional">(optional)</span>
            </label>
            <textarea
              id="emp-description"
              className="form-textarea"
              placeholder="Describe your role and achievements..."
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

export default EmploymentModal



