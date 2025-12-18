import { useState } from 'react'
import './EditJobTitleModal.css'

interface EditJobTitleModalProps {
  onClose: () => void
  onSave: (title: string, rateUSD: string, rateEGP: string) => void
  currentTitle: string
  currentRateUSD: string
  currentRateEGP: string
}

const EditJobTitleModal = ({ onClose, onSave, currentTitle, currentRateUSD, currentRateEGP }: EditJobTitleModalProps) => {
  const [title, setTitle] = useState(currentTitle)
  const [rateUSD, setRateUSD] = useState(currentRateUSD)
  const [rateEGP, setRateEGP] = useState(currentRateEGP)

  const handleSave = () => {
    if (title.trim()) {
      onSave(title.trim(), rateUSD.trim(), rateEGP.trim())
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
          <h2 className="section-modal-title">Edit Job Title & Rate</h2>
        </div>

        <div className="section-modal-content">
          <div className="form-group">
            <label htmlFor="job-title" className="form-label">
              Job Title <span className="required">*</span>
            </label>
            <input
              id="job-title"
              type="text"
              className="form-input"
              placeholder="e.g., Front-End Developer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="rate-usd" className="form-label">Hourly Rate (USD)</label>
              <input
                id="rate-usd"
                type="text"
                className="form-input"
                placeholder="e.g., $20.00/hr"
                value={rateUSD}
                onChange={(e) => setRateUSD(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="rate-egp" className="form-label">Hourly Rate (EGP)</label>
              <input
                id="rate-egp"
                type="text"
                className="form-input"
                placeholder="e.g., EGP 980.0/hr"
                value={rateEGP}
                onChange={(e) => setRateEGP(e.target.value)}
              />
            </div>
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

export default EditJobTitleModal



