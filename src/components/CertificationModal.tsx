import { useState } from 'react'
import './CertificationModal.css'

interface Certification {
  name: string
  issuer?: string
  date?: string
  link?: string
}

interface CertificationModalProps {
  onClose: () => void
  onSave: (cert: Certification) => void
}

const CertificationModal = ({ onClose, onSave }: CertificationModalProps) => {
  const [name, setName] = useState('')
  const [issuer, setIssuer] = useState('')
  const [date, setDate] = useState('')
  const [link, setLink] = useState('')

  const handleSave = () => {
    if (!name.trim()) {
      alert('Please enter a certification name')
      return
    }
    onSave({ name: name.trim(), issuer: issuer.trim() || undefined, date: date.trim() || undefined, link: link.trim() || undefined })
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
          <h2 className="section-modal-title">Add Certification</h2>
        </div>

        <div className="section-modal-content">
          <div className="form-group">
            <label htmlFor="cert-name" className="form-label">
              Certification Name <span className="required">*</span>
            </label>
            <input
              id="cert-name"
              type="text"
              className="form-input"
              placeholder="e.g., AWS Certified Solutions Architect"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cert-issuer" className="form-label">
              Issuing Organization <span className="optional">(optional)</span>
            </label>
            <input
              id="cert-issuer"
              type="text"
              className="form-input"
              placeholder="e.g., Amazon Web Services"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cert-date" className="form-label">
              Date <span className="optional">(optional)</span>
            </label>
            <input
              id="cert-date"
              type="text"
              className="form-input"
              placeholder="e.g., January 2024"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cert-link" className="form-label">
              Certificate Link <span className="optional">(optional)</span>
            </label>
            <input
              id="cert-link"
              type="url"
              className="form-input"
              placeholder="https://..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
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

export default CertificationModal



