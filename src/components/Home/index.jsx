import Header from '../Header'
import Cookies from 'js-cookie'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Home() {
  const navigate = useNavigate()

  useEffect(() => {    
    const token = Cookies.get("jwt_token")
    if(!token){
      navigate("/login")
    }
  }, [])

    return <>
    <Header />
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching jobs, salary information, company review.
          Find that fits your abilities  and potential.
        </p>
        <button type="button" className="find-job-button" onClick={()=> navigate('/jobs')}>
          Find Jobs
        </button>
      </div>
    </div>
  </>  
}