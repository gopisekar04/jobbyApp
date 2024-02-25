import {Link, useNavigate} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'
import { FiLogOut } from "react-icons/fi";
import { IoMdHome } from "react-icons/io";
import { BsBriefcaseFill } from "react-icons/bs";

const Header = () => {  
  const navigate = useNavigate()

 const logout = () => {  
    Cookies.remove("jwt_token")
    navigate('/login')  
 }

 const navigateToHome = () => {
  navigate("/")
 }

 const navigateToJobs = () => {
  navigate("/jobs")
 }

  return <nav className="nav-header">
    <div className="nav-content">
      <a href='/'>
        <img
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </a>
      <ul className="nav-menu">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="nav-link">
            Jobs
          </Link>
        </li>
      </ul>
      <button type="button" className="logout-desktop-btn" onClick={logout}>
        Logout
      </button>
      <div className='sm-icon-container'>
      <button type="button" className="logout-mobile-btn" onClick={navigateToHome}>
      <IoMdHome className='sm-icon' />
      </button>
      <button type="button" className="logout-mobile-btn" onClick={navigateToJobs}>
      <BsBriefcaseFill className='sm-icon' />
      </button>
      <button type="button" className="logout-mobile-btn" onClick={logout}>
      <FiLogOut className='sm-icon' />
      </button>
      </div>
    </div>
    
  </nav>
  
}
export default Header
