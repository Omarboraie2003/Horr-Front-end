import { useState } from 'react'
import './VideoIntroModal.css'

interface VideoIntroModalProps {
  onClose: () => void
  onSave: (link: string) => void
  currentLink?: string
}

const VideoIntroModal = ({ onClose, onSave, currentLink = '' }: VideoIntroModalProps) => {
  const [videoLink, setVideoLink] = useState(currentLink)

  const handleSave = () => {
    if (videoLink.trim()) {
      onSave(videoLink.trim())
    } else {
      alert('Please enter a video link')
    }
  }

  return (
    <div className="modal-overlay">
      <div className="video-intro-modal">
        <button className="close-button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="video-intro-header">
          <h2 className="video-intro-title">Add Video Introduction</h2>
          <p className="video-intro-subtitle">Add a link to your video introduction (YouTube, Vimeo, etc.)</p>
        </div>

        <div className="video-intro-content">
          <div className="form-group">
            <label htmlFor="video-link" className="form-label">
              Video Link <span className="required">*</span>
            </label>
            <input
              id="video-link"
              type="url"
              className="form-input"
              placeholder="https://www.youtube.com/watch?v=..."
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
            />
            <p className="form-hint">Enter a valid URL to your video (YouTube, Vimeo, or other video hosting platform)</p>
          </div>
        </div>

        <div className="video-intro-footer">
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

export default VideoIntroModal



