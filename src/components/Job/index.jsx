import Cookies from 'js-cookie'
import './index.css'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {fetchingStatusCode} from '../Jobs'
import Header from '../Header'
import { FailureContainer } from '../FailureContainer'
import { ThreeDots } from 'react-loader-spinner';
import { FaStar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BsBriefcaseFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";


export default function Job(){
    const [jobDetails, setJobDetails] = useState({})
    const [similarJobs, setSimilarJobs] = useState([])
    const [jobDetailsFetchingStatus, setJobDetailsFetchingStatus] = useState(fetchingStatusCode.initial)
    const [retryJobFetch, setRetryJobFetch] = useState(false)
    const {id} = useParams()    
    useEffect(()=> {
        const fetchJobDetails = async() => {
            setJobDetailsFetchingStatus(fetchingStatusCode.loading)
            const jwtToken = Cookies.get("jwt_token")            
            const fetchJobUrl = `https://apis.ccbp.in/jobs/${id}`
            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
            const jobResponse = await fetch(fetchJobUrl, options);
            if(jobResponse.ok){
                const {job_details, similar_jobs} = await jobResponse.json()                        
                const updateJobDetails = {
                    companyLogoUrl: job_details.company_logo_url,
                    companyWebsiteUrl: job_details.company_website_url,
                    employmentType: job_details.employment_type,
                    id: job_details.id,
                    jobDescription: job_details.job_description,
                    lifeAtCompany: {
                        description: job_details.life_at_company.description,
                        imageUrl: job_details.life_at_company.image_url,
                    },
                    location: job_details.location,
                    packagePerAnnum: job_details.package_per_annum,
                    rating: job_details.rating,
                    skills: job_details.skills.map(eachSkill => {
                        return {
                            imageUrl: eachSkill.image_url,
                            name: eachSkill.name
                        }
                    }),
                    title: job_details.title                
                }
                
                const updatedSimilarJobs = similar_jobs.map(eachSimilarJob => {
                    return {companyLogoUrl: eachSimilarJob.company_logo_url,
                    employmentType: eachSimilarJob.employment_type,
                    id: eachSimilarJob.id,
                    jobDescription: eachSimilarJob.job_description,
                    location: eachSimilarJob.location,
                    rating: eachSimilarJob.rating,
                    title: eachSimilarJob.title
                    }
                })                       
                setRetryJobFetch(false)
                setJobDetails(updateJobDetails)
                setSimilarJobs(updatedSimilarJobs)
                setJobDetailsFetchingStatus(fetchingStatusCode.success)
                
            }else{
                setJobDetailsFetchingStatus(fetchingStatusCode.failure)
            }
            
        }   
        fetchJobDetails()
    }, [retryJobFetch])

    return <div>
        <Header></Header>        
            {(()=> {   
                switch(jobDetailsFetchingStatus){
                    case fetchingStatusCode.loading:
                        return <div className='loading-bg-container'>
                            <ThreeDots
                                            visible={true}
                                            height="10"
                                            width="100"
                                            color="#4f46e5"
                                            radius="9"
                                            ariaLabel="three-dots-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                            />
                            </div>
                    case fetchingStatusCode.success:
                        return <div className='job-bg-container'>
                            <div className='job-card-container'>
                            <div className='logo-title-rating-container'>
                                <img src={jobDetails.companyLogoUrl} alt="company logo" className='company-logo' />
                                <div className='title-rating-container'>
                                    <h1 className='title'>{jobDetails.title}</h1>
                                    <div className='rating-container'>
                                        <FaStar style={{color: '#fbbf24', marginRight: '6px'}}/>
                                        <p>{jobDetails.rating}</p>
                                    </div>
                                </div>
                            </div>
                                <div className="job-location-type-package-container">
                                    <div className="job-location-type-container">
                                        <div className="job-location-type">
                                            <MdLocationOn className="job-location-type-icon" />
                                            <p className="info-text">{jobDetails.location}</p>
                                        </div>
                                        <div className="location-type">
                                            <BsBriefcaseFill className="location-type-icon"/>
                                            <p className="info-text">{jobDetails.employmentType}</p>
                                        </div>                    
                                    </div>
                                    <p>{jobDetails.packagePerAnnum}</p>
                                </div>
                                <hr />
                                <div className='Description-link-container'>
                                <h1 style={{fontSize: '18px', padding: '0', margin: '0'}}>Description</h1>
                                <Link to={jobDetails.companyWebsiteUrl} target='_blank' className='visit-container'>
                                    <p style={{marginRight: '5px'}}>Visit</p>
                                    <FaExternalLinkAlt style={{width: '12px'}} />
                                </Link>
                                
                                </div>
                                <p>{jobDetails.jobDescription} </p>
                                <h1 style={{fontSize: '18px', padding: '0', margin: '0'}}>Skills</h1>
                                <ul className='skills-container'> 
                                                                   
                                    {jobDetails.skills.map(eachSkill => {
                                        return <li className='each-skill-container' key={eachSkill.name}>
                                            <img src={eachSkill.imageUrl} alt="skills" className='skills-img' />
                                            <p>{eachSkill.name}</p>
                                        </li>
                                    })}
                                </ul>
                                <div className='company-life-container'>
                                <div>
                                    <h1 style={{fontSize: '18px', padding: '0', margin: '0'}}>Life at Company</h1>
                                    <p>{jobDetails.lifeAtCompany.description}</p>
                                </div>
                                <div className='company-life-img-container'>
                                    <img src={jobDetails.lifeAtCompany.imageUrl} alt='life at company' className='company-life-img' />
                                </div>                                
                                </div>
                            </div>
                            <h1 style={{fontSize: '18px', padding: '0', margin: '0', color: 'white'}}>Similar Jobs</h1>
                            <ul className='similar-job-list-container'>
                                {similarJobs.map(eachSimilarJob => <li key={eachSimilarJob.id} className='similar-job-card-container'>                                    
                                <div className='logo-title-rating-container'>
                                    <img src={jobDetails.companyLogoUrl} alt="company logo" className='company-logo' />
                                    <div className='title-rating-container'>
                                        <h1 className='title'>{jobDetails.title}</h1>
                                        <div className='rating-container'>
                                            <FaStar style={{color: '#fbbf24', marginRight: '6px'}}/>
                                            <p>{jobDetails.rating}</p>
                                        </div>
                                    </div>
                                </div>
                                <h1 style={{fontSize: '18px', padding: '0', marginTop: '24px'}}>Description</h1>
                                <p>{eachSimilarJob.jobDescription}</p>
                                <div className="job-location-type-container">
                                        <div className="job-location-type">
                                            <MdLocationOn className="job-location-type-icon" />
                                            <p className="info-text">{eachSimilarJob.location}</p>
                                        </div>
                                        <div className="location-type">
                                            <BsBriefcaseFill className="location-type-icon"/>
                                            <p className="info-text">{eachSimilarJob.employmentType}</p>
                                        </div>                    
                                    </div>
                                </li>)}

                            </ul>
                            </div>
                            
                    case fetchingStatusCode.failure:
                        return <div className='failure-bg-container'>
                                <FailureContainer onClick={()=> setRetryJobFetch(true)}  />
                            </div>
                }
            })()}        
    </div>
}