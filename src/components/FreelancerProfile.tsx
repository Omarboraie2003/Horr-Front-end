import { useState } from 'react'
import Header from './Header'
import ProfileHeader from './ProfileHeader'
import ProfileCard from './ProfileCard'
import AddPortfolioProject from './AddPortfolioProject'
import AddSectionModal from './AddSectionModal'
import VideoIntroModal from './VideoIntroModal'
import CertificationModal from './CertificationModal'
import EmploymentModal from './EmploymentModal'
import OtherExperienceModal from './OtherExperienceModal'
import EditAvailabilityModal from './EditAvailabilityModal'
import EditHoursModal from './EditHoursModal'
import EditLanguagesModal from './EditLanguagesModal'
import EditSkillsModal from './EditSkillsModal'
import EditJobTitleModal from './EditJobTitleModal'
import EditSummaryModal from './EditSummaryModal'
import ProfilePreview from './ProfilePreview'
import PortfolioDetailView from './PortfolioDetailView'
import './FreelancerProfile.css'

interface PortfolioItem {
  id: string
  title: string
  description?: string
  role?: string
  mediaLink?: string
  skills?: string[]
}

interface Certification {
  id: string
  name: string
  issuer?: string
  date?: string
  link?: string
}

interface Employment {
  id: string
  company: string
  position: string
  startDate?: string
  endDate?: string
  description?: string
}

interface OtherExperience {
  id: string
  title: string
  organization?: string
  date?: string
  description?: string
}

const FreelancerProfile = () => {
  const [showPortfolioModal, setShowPortfolioModal] = useState(false)
  const [showAddSectionModal, setShowAddSectionModal] = useState(false)
  const [showVideoIntroModal, setShowVideoIntroModal] = useState(false)
  const [videoIntroLink, setVideoIntroLink] = useState<string>('')
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    { id: '1', title: 'Revo', description: 'scover and id Vuur in Fashion!', role: 'Front-End Developer', mediaLink: 'https://example.com/revo', skills: ['HTML5', 'CSS 3', 'Simplicity'] },
    { id: '2', title: 'World', description: 'Cityscape and web interface', role: 'UI/UX Designer', mediaLink: 'https://example.com/world', skills: ['UI/UX', 'Design', 'Web'] },
    { id: '3', title: 'Tourista', description: 'FALCOHI', role: 'Full-Stack Developer', mediaLink: 'https://example.com/tourista', skills: ['HTML5', 'CSS 3', 'JavaScript', 'Lifestyle & Travel'] },
  ])

  const handleAddPortfolioItem = (item: PortfolioItem) => {
    setPortfolioItems([...portfolioItems, item])
    setShowPortfolioModal(false)
  }

  const handleUpdatePortfolioItem = (item: PortfolioItem) => {
    setPortfolioItems(portfolioItems.map(p => p.id === item.id ? item : p))
    setShowPortfolioModal(false)
    setEditingPortfolioItem(null)
  }

  const [certifications, setCertifications] = useState<Certification[]>([])
  const [employmentHistory, setEmploymentHistory] = useState<Employment[]>([])
  const [otherExperiences, setOtherExperiences] = useState<OtherExperience[]>([])
  const [showCertificationModal, setShowCertificationModal] = useState(false)
  const [showEmploymentModal, setShowEmploymentModal] = useState(false)
  const [showOtherExperienceModal, setShowOtherExperienceModal] = useState(false)

  // Editable profile data
  const [availability, setAvailability] = useState('Available')
  const [hoursPerWeek, setHoursPerWeek] = useState('More than 30 hrs/week')
  const [contractType, setContractType] = useState('Open to contract to hire')
  const [skills, setSkills] = useState<string[]>(['Web Development', 'HTML5', 'CSS 3', 'Bootstrap', 'JavaScript'])
  const [languages, setLanguages] = useState([
    { name: 'English', level: 'Conversational' },
    { name: 'Arabic', level: 'Native or Bilingual' },
  ])
  const [jobTitle, setJobTitle] = useState('Front-End Developer')
  const [hourlyRateUSD, setHourlyRateUSD] = useState('$20.00/hr')
  const [hourlyRateEGP, setHourlyRateEGP] = useState('EGP 980.0/hr')
  const [professionalSummary, setProfessionalSummary] = useState('I\'m Medhat Shalaby - Front-End Developer with 2 years of experience delivering clean, responsive, and high-performance web interfaces. Focused on modern UI, usability, and reliable results.')

  // Modal states
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false)
  const [showHoursModal, setShowHoursModal] = useState(false)
  const [showLanguagesModal, setShowLanguagesModal] = useState(false)
  const [showSkillsModal, setShowSkillsModal] = useState(false)
  const [showJobTitleModal, setShowJobTitleModal] = useState(false)
  const [showSummaryModal, setShowSummaryModal] = useState(false)
  const [editingPortfolioItem, setEditingPortfolioItem] = useState<PortfolioItem | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [viewingPortfolioItem, setViewingPortfolioItem] = useState<PortfolioItem | null>(null)

  return (
    <div className="freelancer-profile-page">
      <Header />
      <div className="profile-container">
        <ProfileHeader
          name="Medhat Shalaby"
          location="Cairo, Egypt"
          onPublicView={() => setShowPreview(true)}
        />

        <div className="profile-content">
          <div className="profile-left-column">
            <ProfileCard 
              title="Availability" 
              showEdit={true}
              onEdit={() => setShowAvailabilityModal(true)}
            >
              <div className="availability-status">
                <span className="status-dot"></span>
                <span>{availability}</span>
              </div>
            </ProfileCard>

            <ProfileCard title="Connects" showEdit={false}>
              <div className="connects-info">
                <p>Connects: 0</p>
                <a href="#" className="link-gold">View details</a>
              </div>
            </ProfileCard>

            <ProfileCard 
              title="Video introduction" 
              showAdd={true} 
              showEdit={!!videoIntroLink}
              onAdd={() => setShowVideoIntroModal(true)}
              onEdit={() => setShowVideoIntroModal(true)}
            >
              {videoIntroLink ? (
                <div className="video-intro-link">
                  <a href={videoIntroLink} target="_blank" rel="noopener noreferrer" className="link-gold">
                    View video introduction
                  </a>
                  <button 
                    className="remove-link-btn" 
                    onClick={() => setVideoIntroLink('')}
                    title="Remove video"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="empty-state">No video added</div>
              )}
            </ProfileCard>

            <ProfileCard 
              title="Hours per week" 
              showEdit={true}
              onEdit={() => setShowHoursModal(true)}
            >
              <p>{hoursPerWeek}</p>
              <p className="text-muted">{contractType}</p>
            </ProfileCard>

            <ProfileCard 
              title="Languages" 
              showAdd={true} 
              showEdit={true}
              onAdd={() => setShowLanguagesModal(true)}
              onEdit={() => setShowLanguagesModal(true)}
            >
              {languages.map((lang, index) => (
                <p key={index}>{lang.name}: {lang.level}</p>
              ))}
            </ProfileCard>

            <ProfileCard title="Verifications" showEdit={false}>
              <div className="verification-item">
                <span>ID: Unverified</span>
                <a href="#" className="link-gold">Verify your identity</a>
              </div>
            </ProfileCard>

            <ProfileCard title="Education" showAdd={true}>
              <p>Egypt-Japan University of Science and Technology (E-JUST)</p>
              <p className="text-muted">Bachelor of Computer Science (BCompSc), Computer science 2022-2026 (expected)</p>
            </ProfileCard>

            <ProfileCard title="Linked Accounts" showEdit={false}>
              <div className="linked-account">
                <div className="linkedin-icon">in</div>
                <div>
                  <p>Mazen Yousry</p>
                  <a href="#" className="link-gold">View profile</a>
                </div>
              </div>
            </ProfileCard>
          </div>

          <div className="profile-right-column">
            <ProfileCard 
              showEdit={true}
              onEdit={() => setShowJobTitleModal(true)}
            >
              <div className="job-title-rate">
                <h4 className="professional-title">{jobTitle}</h4>
                <div className="hourly-rates">
                  <span>{hourlyRateUSD}</span>
                  <span>{hourlyRateEGP}</span>
                </div>
              </div>
            </ProfileCard>

            <ProfileCard 
              title="Professional Summary" 
              showEdit={true}
              onEdit={() => setShowSummaryModal(true)}
            >
              <p className="professional-summary">{professionalSummary}</p>
            </ProfileCard>

            <div className="profile-card">
              <div className="profile-card-header">
                <h3 className="profile-card-title">Portfolio</h3>
                <div className="profile-card-actions">
                  <button
                    className="icon-button"
                    onClick={() => setShowPortfolioModal(true)}
                    title="Add portfolio item"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="portfolio-list">
                {portfolioItems.length > 0 ? (
                  portfolioItems.map((item) => (
                    <div key={item.id} className="portfolio-item-text">
                      <div className="portfolio-item-header">
                        <h4>{item.title}</h4>
                        <div className="portfolio-item-actions">
                          {item.mediaLink && (
                            <a 
                              href={item.mediaLink} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="portfolio-media-link"
                            >
                              View Media
                            </a>
                          )}
                          <button
                            className="icon-button-small"
                            onClick={() => {
                              setEditingPortfolioItem(item)
                              setShowPortfolioModal(true)
                            }}
                            title="Edit"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                          <button
                            className="icon-button-small"
                            onClick={() => setPortfolioItems(portfolioItems.filter(p => p.id !== item.id))}
                            title="Delete"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 6L6 18M6 6l12 12"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      {item.role && <p className="portfolio-role">{item.role}</p>}
                      {item.description && <p className="portfolio-description">{item.description}</p>}
                    </div>
                  ))
                ) : (
                  <div className="empty-state">No portfolio items</div>
                )}
              </div>
            </div>

            <ProfileCard title="Work history" showEdit={false}>
              <div className="empty-state">No items</div>
            </ProfileCard>

            <ProfileCard 
              title="Skills" 
              showEdit={true}
              onEdit={() => setShowSkillsModal(true)}
            >
              <div className="skills-list">
                {skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </ProfileCard>

            {otherExperiences.length > 0 ? (
              <ProfileCard title="Other experiences" showAdd={true} onAdd={() => setShowOtherExperienceModal(true)}>
                {otherExperiences.map((exp) => (
                  <div key={exp.id} className="experience-item">
                    <div className="experience-content">
                      <h4 className="experience-title">{exp.title}</h4>
                      {exp.organization && <p className="experience-org">{exp.organization}</p>}
                      {exp.date && <p className="text-muted">{exp.date}</p>}
                      {exp.description && <p className="experience-description">{exp.description}</p>}
                    </div>
                    <button className="icon-button-small" onClick={() => setOtherExperiences(otherExperiences.filter(e => e.id !== exp.id))}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </ProfileCard>
            ) : (
              <div className="profile-card section-card-empty" onClick={() => setShowOtherExperienceModal(true)}>
                <div className="profile-card-header">
                  <h3 className="profile-card-title">Other experiences</h3>
                  <button className="icon-button" title="Add">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
                <div className="section-card-icon folder-icon">
                  <span style={{ fontSize: '80px' }}>📂</span>
                </div>
              </div>
            )}

            {certifications.length > 0 ? (
              <ProfileCard title="Certifications" showAdd={true} onAdd={() => setShowCertificationModal(true)}>
                {certifications.map((cert) => (
                  <div key={cert.id} className="certification-item">
                    <div className="certification-content">
                      <h4 className="certification-name">{cert.name}</h4>
                      {cert.issuer && <p className="certification-issuer">{cert.issuer}</p>}
                      {cert.date && <p className="text-muted">{cert.date}</p>}
                      {cert.link && (
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="link-gold">
                          View certificate
                        </a>
                      )}
                    </div>
                    <button className="icon-button-small" onClick={() => setCertifications(certifications.filter(c => c.id !== cert.id))}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </ProfileCard>
            ) : (
              <div className="profile-card section-card-empty" onClick={() => setShowCertificationModal(true)}>
                <div className="profile-card-header">
                  <h3 className="profile-card-title">Certifications</h3>
                  <button className="icon-button" title="Add">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
                <div className="section-card-icon certification-icon">
                  <span style={{ fontSize: '80px' }}>🏆</span>
                </div>
              </div>
            )}

            {employmentHistory.length > 0 ? (
              <ProfileCard title="Employment history" showAdd={true} onAdd={() => setShowEmploymentModal(true)}>
                {employmentHistory.map((emp) => (
                  <div key={emp.id} className="employment-item">
                    <div className="employment-content">
                      <h4 className="employment-position">{emp.position}</h4>
                      <p className="employment-company">{emp.company}</p>
                      {(emp.startDate || emp.endDate) && (
                        <p className="text-muted">
                          {emp.startDate} {emp.endDate ? `- ${emp.endDate}` : '- Present'}
                        </p>
                      )}
                      {emp.description && <p className="employment-description">{emp.description}</p>}
                    </div>
                    <button className="icon-button-small" onClick={() => setEmploymentHistory(employmentHistory.filter(e => e.id !== emp.id))}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </ProfileCard>
            ) : (
              <div className="profile-card section-card-empty" onClick={() => setShowEmploymentModal(true)}>
                <div className="profile-card-header">
                  <h3 className="profile-card-title">Employment history</h3>
                  <button className="icon-button" title="Add">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
                <div className="section-card-icon briefcase-icon">
                  <span style={{ fontSize: '80px' }}>💼</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showPortfolioModal && (
        <AddPortfolioProject 
          onClose={() => {
            setShowPortfolioModal(false)
            setEditingPortfolioItem(null)
          }} 
          onSave={(item) => {
            if (editingPortfolioItem) {
              handleUpdatePortfolioItem(item)
            } else {
              handleAddPortfolioItem(item)
            }
            setEditingPortfolioItem(null)
          }}
          editItem={editingPortfolioItem ? {
            id: editingPortfolioItem.id,
            title: editingPortfolioItem.title,
            description: editingPortfolioItem.description || '',
            role: editingPortfolioItem.role,
            skills: editingPortfolioItem.skills || [],
            mediaLink: editingPortfolioItem.mediaLink,
          } : null}
        />
      )}

      {showAddSectionModal && (
        <AddSectionModal onClose={() => setShowAddSectionModal(false)} />
      )}

      {showVideoIntroModal && (
        <VideoIntroModal 
          onClose={() => setShowVideoIntroModal(false)}
          onSave={(link) => {
            setVideoIntroLink(link)
            setShowVideoIntroModal(false)
          }}
          currentLink={videoIntroLink}
        />
      )}

      {showCertificationModal && (
        <CertificationModal
          onClose={() => setShowCertificationModal(false)}
          onSave={(cert) => {
            setCertifications([...certifications, { ...cert, id: Date.now().toString() }])
            setShowCertificationModal(false)
          }}
        />
      )}

      {showEmploymentModal && (
        <EmploymentModal
          onClose={() => setShowEmploymentModal(false)}
          onSave={(emp) => {
            setEmploymentHistory([...employmentHistory, { ...emp, id: Date.now().toString() }])
            setShowEmploymentModal(false)
          }}
        />
      )}

      {showOtherExperienceModal && (
        <OtherExperienceModal
          onClose={() => setShowOtherExperienceModal(false)}
          onSave={(exp) => {
            setOtherExperiences([...otherExperiences, { ...exp, id: Date.now().toString() }])
            setShowOtherExperienceModal(false)
          }}
        />
      )}

      {showAvailabilityModal && (
        <EditAvailabilityModal
          onClose={() => setShowAvailabilityModal(false)}
          onSave={setAvailability}
          currentAvailability={availability}
        />
      )}

      {showHoursModal && (
        <EditHoursModal
          onClose={() => setShowHoursModal(false)}
          onSave={(hours, contract) => {
            setHoursPerWeek(hours)
            setContractType(contract)
          }}
          currentHours={hoursPerWeek}
          currentContractType={contractType}
        />
      )}

      {showLanguagesModal && (
        <EditLanguagesModal
          onClose={() => setShowLanguagesModal(false)}
          onSave={setLanguages}
          currentLanguages={languages}
        />
      )}

      {showSkillsModal && (
        <EditSkillsModal
          onClose={() => setShowSkillsModal(false)}
          onSave={setSkills}
          currentSkills={skills}
        />
      )}

      {showJobTitleModal && (
        <EditJobTitleModal
          onClose={() => setShowJobTitleModal(false)}
          onSave={(title, usd, egp) => {
            setJobTitle(title)
            setHourlyRateUSD(usd)
            setHourlyRateEGP(egp)
          }}
          currentTitle={jobTitle}
          currentRateUSD={hourlyRateUSD}
          currentRateEGP={hourlyRateEGP}
        />
      )}

      {showSummaryModal && (
        <EditSummaryModal
          onClose={() => setShowSummaryModal(false)}
          onSave={setProfessionalSummary}
          currentSummary={professionalSummary}
        />
      )}

      {showPreview && (
        <ProfilePreview
          onClose={() => setShowPreview(false)}
          profileData={{
            name: 'Medhat Shalaby',
            location: 'Cairo, Egypt',
            jobTitle,
            hourlyRateUSD,
            hourlyRateEGP,
            professionalSummary,
            skills,
            portfolioItems,
          }}
        />
      )}

      {viewingPortfolioItem && (
        <PortfolioDetailView
          item={{
            id: viewingPortfolioItem.id,
            title: viewingPortfolioItem.title,
            description: viewingPortfolioItem.description || '',
            role: viewingPortfolioItem.role,
            skills: viewingPortfolioItem.skills || [],
            mediaLink: viewingPortfolioItem.mediaLink,
          }}
          onClose={() => setViewingPortfolioItem(null)}
          onEdit={() => {
            setEditingPortfolioItem(viewingPortfolioItem)
            setViewingPortfolioItem(null)
            setShowPortfolioModal(true)
          }}
        />
      )}
    </div>
  )
}

export default FreelancerProfile

