import { useState } from 'react'
import './EditSummaryModal.css'

interface EditSummaryModalProps {
  onClose: () => void
  onSave: (summary: string) => void
  currentSummary: string
}

const EditSummaryModal = ({ onClose, onSave, currentSummary }: EditSummaryModalProps) => {
  const [summary, setSummary] = useState(currentSummary)
  const MAX_LENGTH = 1000

  const handleSave = () => {
    if (summary.trim()) {
      onSave(summary.trim())
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
          <h2 className="section-modal-title">Edit Professional Summary</h2>
        </div>

        <div className="section-modal-content">
          <div className="form-group">
            <label htmlFor="summary" className="form-label">
              Professional Summary <span className="required">*</span>
            </label>
            <textarea
              id="summary"
              className="form-textarea"
              placeholder="Describe your professional background and expertise..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={8}
              maxLength={MAX_LENGTH}
            />
            <div className="char-counter">
              {summary.length} / {MAX_LENGTH} characters
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

export default EditSummaryModal



