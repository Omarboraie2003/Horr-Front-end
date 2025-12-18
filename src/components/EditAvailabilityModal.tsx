import { useState } from 'react'
import './EditAvailabilityModal.css'

interface EditAvailabilityModalProps {
  onClose: () => void
  onSave: (availability: string) => void
  currentAvailability: string
}

const EditAvailabilityModal = ({ onClose, onSave, currentAvailability }: EditAvailabilityModalProps) => {
  const [availability, setAvailability] = useState(currentAvailability)

  const handleSave = () => {
    if (availability.trim()) {
      onSave(availability.trim())
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
          <h2 className="section-modal-title">Edit Availability</h2>
        </div>

        <div className="section-modal-content">
          <div className="form-group">
            <label htmlFor="availability" className="form-label">
              Availability Status <span className="required">*</span>
            </label>
            <select
              id="availability"
              className="form-input"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
              <option value="Busy">Busy</option>
            </select>
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

export default EditAvailabilityModal



