import { useState } from 'react'
import './EditHoursModal.css'

interface EditHoursModalProps {
  onClose: () => void
  onSave: (hours: string, contractType: string) => void
  currentHours: string
  currentContractType: string
}

const EditHoursModal = ({ onClose, onSave, currentHours, currentContractType }: EditHoursModalProps) => {
  const [hours, setHours] = useState(currentHours)
  const [contractType, setContractType] = useState(currentContractType)

  const handleSave = () => {
    if (hours.trim()) {
      onSave(hours.trim(), contractType.trim())
      onClose()
    }
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
          <h2 className="section-modal-title">Edit Hours per Week</h2>
        </div>

        <div className="section-modal-content">
          <div className="form-group">
            <label htmlFor="hours" className="form-label">
              Hours per Week <span className="required">*</span>
            </label>
            <input
              id="hours"
              type="text"
              className="form-input"
              placeholder="e.g., More than 30 hrs/week"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contract" className="form-label">
              Contract Type <span className="optional">(optional)</span>
            </label>
            <input
              id="contract"
              type="text"
              className="form-input"
              placeholder="e.g., Open to contract to hire"
              value={contractType}
              onChange={(e) => setContractType(e.target.value)}
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

export default EditHoursModal



