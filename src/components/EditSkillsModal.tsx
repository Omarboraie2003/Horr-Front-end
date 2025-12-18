import { useState } from 'react'
import './EditSkillsModal.css'

interface EditSkillsModalProps {
  onClose: () => void
  onSave: (skills: string[]) => void
  currentSkills: string[]
}

const EditSkillsModal = ({ onClose, onSave, currentSkills }: EditSkillsModalProps) => {
  const [skills, setSkills] = useState<string[]>(currentSkills)
  const [newSkill, setNewSkill] = useState('')

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handleSave = () => {
    onSave(skills)
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
          <h2 className="section-modal-title">Edit Skills</h2>
        </div>

        <div className="section-modal-content">
          <div className="skills-display">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag-modal">
                {skill}
                <button
                  type="button"
                  className="skill-remove-modal"
                  onClick={() => handleRemoveSkill(index)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="form-group">
            <label htmlFor="skill-input" className="form-label">Add Skill</label>
            <div className="skill-input-container">
              <input
                id="skill-input"
                type="text"
                className="form-input"
                placeholder="Type skill and press Enter"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button type="button" className="btn-add" onClick={handleAddSkill}>
                Add
              </button>
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

export default EditSkillsModal



