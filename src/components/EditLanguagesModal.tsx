import { useState } from 'react'
import './EditLanguagesModal.css'

interface Language {
  name: string
  level: string
}

interface EditLanguagesModalProps {
  onClose: () => void
  onSave: (languages: Language[]) => void
  currentLanguages: Language[]
}

const EditLanguagesModal = ({ onClose, onSave, currentLanguages }: EditLanguagesModalProps) => {
  const [languages, setLanguages] = useState<Language[]>(currentLanguages)
  const [newLanguage, setNewLanguage] = useState({ name: '', level: '' })

  const handleAddLanguage = () => {
    if (newLanguage.name.trim() && newLanguage.level.trim()) {
      setLanguages([...languages, { ...newLanguage, name: newLanguage.name.trim(), level: newLanguage.level.trim() }])
      setNewLanguage({ name: '', level: '' })
    }
  }

  const handleRemoveLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    onSave(languages)
    onClose()
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
          <h2 className="section-modal-title">Edit Languages</h2>
        </div>

        <div className="section-modal-content">
          <div className="languages-list">
            {languages.map((lang, index) => (
              <div key={index} className="language-item">
                <span>{lang.name}: {lang.level}</span>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => handleRemoveLanguage(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="lang-name" className="form-label">Language</label>
              <input
                id="lang-name"
                type="text"
                className="form-input"
                placeholder="e.g., English"
                value={newLanguage.name}
                onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lang-level" className="form-label">Level</label>
              <select
                id="lang-level"
                className="form-input"
                value={newLanguage.level}
                onChange={(e) => setNewLanguage({ ...newLanguage, level: e.target.value })}
              >
                <option value="">Select level</option>
                <option value="Native or Bilingual">Native or Bilingual</option>
                <option value="Fluent">Fluent</option>
                <option value="Conversational">Conversational</option>
                <option value="Basic">Basic</option>
              </select>
            </div>
            <button type="button" className="btn-add" onClick={handleAddLanguage}>
              Add
            </button>
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

export default EditLanguagesModal



