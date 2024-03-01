import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

export default function JobCard({eachJobDetails}) {
  return (
    <Link to={`/jobs/${eachJobDetails.id}`} className="link-style">
      <li className="job-card-container">
        <div className="logo-title-container">
          <div className="company-img-container">
            <img
              src={eachJobDetails.companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
          </div>
          <div className="title-rating-container">
            <h1 className="job-title">{eachJobDetails.title}</h1>
            <div className="rating-container">
              <FaStar className="rating-icon" />
              <p>{eachJobDetails.rating}</p>
            </div>
          </div>
        </div>
        <div className="location-type-package-container">
          <div className="location-type-container">
            <div className="location-type">
              <MdLocationOn className="location-type-icon" />
              <p className="info-text">{eachJobDetails.location}</p>
            </div>
            <div className="location-type">
              <BsBriefcaseFill className="location-type-icon" />
              <p className="info-text">{eachJobDetails.employmentType}</p>
            </div>
          </div>
          <p>{eachJobDetails.packagePerAnnum}</p>
        </div>
        <hr />
        <h1 style={{fontSize: '18px'}}>Description</h1>
        <p>{eachJobDetails.jobDescription}</p>
      </li>
    </Link>
  )
}
