import {useEffect} from 'react'
import Cookies from 'js-cookie'
import {useHistory, Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

export default function Home() {
  const history = useHistory() // Use useHistory instead of useNavigate

  useEffect(() => {
    const token = Cookies.get('jwt_token')
    if (!token) {
      history.push('/login') // Use history.push('/login') to navigate
    }
  }, [history])

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company review. Find that fits your abilities and potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="find-job-button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
