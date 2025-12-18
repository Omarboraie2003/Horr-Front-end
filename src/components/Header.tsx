import './Header.css'

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-content">
        <div className="logo-container">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#D4AF37" />
              <path d="M2 17L12 22L22 17" stroke="#D4AF37" strokeWidth="2" fill="none" />
              <path d="M2 12L12 17L22 12" stroke="#D4AF37" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <span className="logo-text">HORR</span>
        </div>

        <nav className="main-nav">
          <a href="#" className="nav-link">Hire Talent</a>
          <a href="#" className="nav-link">Find Work</a>
          <a href="#" className="nav-link">Why HORR</a>
          <a href="#" className="nav-link">About</a>
        </nav>

        <div className="header-actions">
          <button className="btn-login">Log in</button>
          <button className="btn-signup">Sign Up</button>
        </div>
      </div>
    </header>
  )
}

export default Header

