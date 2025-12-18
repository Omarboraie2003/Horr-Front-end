import { useState } from 'react'
import './AddPortfolioProject.css'

interface PortfolioItem {
  id: string
  title: string
  description: string
  role?: string
  skills: string[]
  mediaLink?: string
}

interface AddPortfolioProjectProps {
  onClose: () => void
  onSave: (item: PortfolioItem) => void
  editItem?: PortfolioItem | null
}

interface Skill {
  id: string
  name: string
}

const AddPortfolioProject = ({ onClose, onSave, editItem }: AddPortfolioProjectProps) => {
  const [projectTitle, setProjectTitle] = useState(editItem?.title || '')
  const [role, setRole] = useState(editItem?.role || '')
  const [description, setDescription] = useState(editItem?.description || '')
  const [skills, setSkills] = useState<Skill[]>(editItem?.skills.map(s => ({ id: Date.now().toString() + Math.random(), name: s })) || [])
  const [skillInput, setSkillInput] = useState('')
  const [contentUrl, setContentUrl] = useState(editItem?.mediaLink || '')
  const [showPreview, setShowPreview] = useState(false)

  const TITLE_MAX_LENGTH = 70
  const ROLE_MAX_LENGTH = 100
  const DESCRIPTION_MAX_LENGTH = 600
  const MAX_SKILLS = 5

  const handleAddSkill = () => {
    if (skillInput.trim() && skills.length < MAX_SKILLS) {
      setSkills([...skills, { id: Date.now().toString(), name: skillInput.trim() }])
      setSkillInput('')
    }
  }

  const handleRemoveSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handleNext = () => {
    // Validation
    if (!projectTitle.trim() || !description.trim() || skills.length === 0) {
      alert('Please fill in all required fields (Title, Description, and at least one skill)')
      return
    }
    setShowPreview(true)
  }

  const handleSave = () => {
    const newItem: PortfolioItem = {
      id: editItem?.id || Date.now().toString(),
      title: projectTitle.trim(),
      description: description.trim(),
      role: role.trim() || undefined,
      skills: skills.map(s => s.name),
      mediaLink: contentUrl.trim() || undefined,
    }

    onSave(newItem)
    
    // Reset form only if not editing
    if (!editItem) {
      setProjectTitle('')
      setRole('')
      setDescription('')
      setSkills([])
      setSkillInput('')
      setContentUrl('')
    }
    setShowPreview(false)
  }

  const renderPreview = () => {
    return (
      <div className="portfolio-preview-panel">
        <div className="preview-header-bar">
          <span className="preview-label">Preview</span>
        </div>
        <div className="preview-content-wrapper">
          {contentUrl ? (
            <div className="preview-iframe-container">
              <iframe
                src={contentUrl}
                className="preview-iframe"
                title="Project Preview"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          ) : (
            <div className="preview-placeholder">
              <p>Add a media link to see preview</p>
              <p className="preview-hint">Enter a URL in the Media Link field to see your project preview here</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-header">
          <h1 className="modal-title">{editItem ? 'Edit portfolio project' : 'Add a new portfolio project'}</h1>
          <p className="modal-subtitle">All fields are required unless otherwise indicated.</p>
        </div>

        <div className="modal-content">
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="project-title" className="form-label">
                Project title <span className="required">*</span>
              </label>
              <input
                id="project-title"
                type="text"
                className="form-input"
                placeholder="Enter a brief but descriptive title."
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                maxLength={TITLE_MAX_LENGTH}
              />
              <div className="char-counter">
                {TITLE_MAX_LENGTH - projectTitle.length} characters left
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="role" className="form-label">
                Your role <span className="optional">(optional)</span>
              </label>
              <input
                id="role"
                type="text"
                className="form-input"
                placeholder="e.g., Front-end engineer or Marketing analyst."
                value={role}
                onChange={(e) => setRole(e.target.value)}
                maxLength={ROLE_MAX_LENGTH}
              />
              <div className="char-counter">
                {ROLE_MAX_LENGTH - role.length} characters left
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Project description <span className="required">*</span>
              </label>
              <textarea
                id="description"
                className="form-textarea"
                placeholder="Briefly describe the project's goals, your solution and the impact you made here."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={DESCRIPTION_MAX_LENGTH}
                rows={6}
              />
              <div className="char-counter">
                {DESCRIPTION_MAX_LENGTH - description.length} characters left
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="skills" className="form-label">
                Skills and deliverables <span className="required">*</span>
              </label>
              <div className="skills-input-container">
                <input
                  id="skills"
                  type="text"
                  className="form-input"
                  placeholder="Type to add skills relevant to this project."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={skills.length >= MAX_SKILLS}
                />
                {skills.length > 0 && (
                  <div className="skills-tags">
                    {skills.map((skill) => (
                      <span key={skill.id} className="skill-tag">
                        {skill.name}
                        <button
                          type="button"
                          className="skill-remove"
                          onClick={() => handleRemoveSkill(skill.id)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="char-counter">
                {MAX_SKILLS - skills.length} skills left
              </div>
            </div>
          </div>

          <div className="content-column">
            <div className="form-group">
              <label htmlFor="media-link" className="form-label">
                Media Link <span className="optional">(optional)</span>
              </label>
              <input
                id="media-link"
                type="url"
                className="form-input"
                placeholder="https://example.com/project-media or https://youtube.com/watch?v=..."
                value={contentUrl}
                onChange={(e) => setContentUrl(e.target.value)}
              />
              <div className="char-counter">
                Add a link to any media related to this project (images, videos, demos, etc.)
              </div>
            </div>
            {renderPreview()}
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          {showPreview ? (
            <>
              <button type="button" className="btn-back" onClick={() => setShowPreview(false)}>
                Back
              </button>
              <button type="button" className="btn-save" onClick={handleSave}>
                Save Project
              </button>
            </>
          ) : (
            <button type="button" className="btn-next" onClick={handleNext}>
              Next: Preview
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddPortfolioProject

