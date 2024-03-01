import {Link, useHistory} from 'react-router-dom' // Import useHistory instead of useNavigate
import './index.css'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {IoMdHome} from 'react-icons/io'
import {BsBriefcaseFill} from 'react-icons/bs'

const Header = () => {
  const history = useHistory() // Use useHistory instead of useNavigate

  const logout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login') // Use history.push('/login') to navigate
  }

  const navigateToHome = () => {
    history.push('/') // Use history.push('/') for navigation
  }

  const navigateToJobs = () => {
    history.push('/jobs') // Use history.push('/jobs') for navigation
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-menu">
          <li>
            <button
              type="button"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
              }}
              onClick={navigateToHome}
              className="nav-link"
            >
              Home
            </button>
          </li>
          <li>
            <button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
              }}
              type="button"
              onClick={navigateToJobs}
              className="nav-link"
            >
              Jobs
            </button>
          </li>
        </ul>
        <button type="button" className="logout-desktop-btn" onClick={logout}>
          Logout
        </button>
        <ul className="sm-icon-container">
          <li>
            <button
              type="button"
              className="logout-mobile-btn"
              onClick={navigateToHome}
              aria-label="Navigate to Home"
            >
              <IoMdHome className="sm-icon" />
            </button>
          </li>
          <li>
            <button
              type="button"
              className="logout-mobile-btn"
              onClick={navigateToJobs}
              aria-label="Navigate to Jobs"
            >
              <BsBriefcaseFill className="sm-icon" />
            </button>
          </li>
          <li>
            <button
              type="button"
              className="logout-mobile-btn"
              onClick={logout}
              aria-label="Logout"
            >
              <FiLogOut className="sm-icon" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
