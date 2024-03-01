import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import './index.css'
import {MdSearch} from 'react-icons/md'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import FailureContainer from '../FailureContainer'
import Header from '../Header'
import JobCard from '../JobCard'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

export const fetchingStatusCode = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

export default function Jobs({salaryRangesList, employmentTypesList}) {
  const history = useHistory()

  useEffect(() => {
    const token = Cookies.get('jwt_token')
    if (!token) {
      history.push('/login')
    }
  }, [history])

  const jwtToken = Cookies.get('jwt_token')
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  }

  // State variables
  const [profileDetails, setProfileDetails] = useState({})
  const [profileFetchingStatus, setProfileFetchingStatus] = useState(
    fetchingStatusCode.initial,
  )
  const [jobsFetchingStatus, setJobsFetchingStatus] = useState(
    fetchingStatusCode.initial,
  )
  const [retryProfileFetch, setRetryProfileFetch] = useState(false)
  const [retryJobsFetch, setRetryJobsFetch] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [typeFilterList, setTypeFilterList] = useState([])
  const [packageFilter, setPackageFilter] = useState('1000000')

  const jobsSnakeCaseToCamelCase = jobsList => {
    const updatedData = jobsList.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
    }))
    return updatedData
  }

  const filterJobsData = async () => {
    setJobsFetchingStatus(fetchingStatusCode.loading)
    const fetchJobUrl = `https://apis.ccbp.in/jobs?employment_type=${typeFilterList.join()}&minimum_package=${packageFilter}&search=${searchText}`
    const filteredJobsResponse = await fetch(fetchJobUrl, options)

    if (filteredJobsResponse.ok) {
      const {jobs} = await filteredJobsResponse.json()
      const updatedFilterJobs = jobsSnakeCaseToCamelCase(jobs)
      setJobsFetchingStatus(fetchingStatusCode.success)
      setFilteredData(updatedFilterJobs)
    } else {
      setJobsFetchingStatus(fetchingStatusCode.failure)
    }
    setRetryJobsFetch(false)
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      setProfileFetchingStatus(fetchingStatusCode.loading)
      const fetchProfileUrl = 'https://apis.ccbp.in/profile'
      const profileResponse = await fetch(fetchProfileUrl, options)
      if (profileResponse.ok) {
        const jsonData = await profileResponse.json()
        const updatedProfileData = {
          name: jsonData.profile_details.name,
          profileImageUrl: jsonData.profile_details.profile_image_url,
          shortBio: jsonData.profile_details.short_bio,
        }
        setProfileDetails(updatedProfileData)
        setProfileFetchingStatus(fetchingStatusCode.success)
      } else {
        setProfileFetchingStatus(fetchingStatusCode.failure)
      }
      setRetryProfileFetch(false)
    }
    fetchProfileData()
  }, [retryProfileFetch])

  const renderInputContainer = () => (
    <div className="searchbar-container">
      <input
        type="search"
        placeholder="Search"
        className="search-input"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
      <button
        data-testid="searchButton"
        type="button"
        className="search-btn"
        onClick={filterJobsData}
        aria-label="job search"
      >
        <MdSearch className="search-icon" />
      </button>
    </div>
  )

  useEffect(() => {
    filterJobsData()
  }, [typeFilterList, packageFilter, retryJobsFetch])

  return (
    <div>
      <Header />
      <div className="jobs-bg-container">
        <div className="progile-filter-section">
          <div className="sm-input-container">{renderInputContainer()}</div>
          {/* Profile section */}
          {profileFetchingStatus === fetchingStatusCode.loading && (
            <div className="user-profile-section" data-testid="loader">
              <Loader type="ThreeDots" color="#4f46e5" height={10} width={80} />
            </div>
          )}
          {profileFetchingStatus === fetchingStatusCode.success && (
            <div className="user-profile-container">
              <div className="profile-img-container">
                <img
                  src={profileDetails.profileImageUrl}
                  alt="profile"
                  className="profile-img"
                />
                <h1 className="user-name">{profileDetails.name}</h1>
                <p className="user-bio">{profileDetails.shortBio}</p>
              </div>
            </div>
          )}
          {profileFetchingStatus === fetchingStatusCode.failure && (
            <div className="user-profile-section">
              <button
                className="retry-btn"
                type="button"
                onClick={() => setRetryProfileFetch(true)}
              >
                Retry
              </button>
            </div>
          )}
          <hr />
          {/* Type of Employment filter */}
          <ul className="filter-list-container">
            <h1 className="filter-title">Type of Employment</h1>
            {employmentTypesList.map(eachJobType => (
              <li key={eachJobType.employmentTypeId} className="each-job-type">
                <input
                  type="checkbox"
                  value={eachJobType.employmentTypeId}
                  className="checkbox"
                  id={eachJobType.employmentTypeId}
                  onClick={e => {
                    if (!typeFilterList.includes(e.target.value)) {
                      setTypeFilterList(prevList => [
                        ...prevList,
                        e.target.value,
                      ])
                    } else {
                      const updatedTypeFilterList = typeFilterList.filter(
                        eachType => eachType !== e.target.value,
                      )
                      setTypeFilterList(updatedTypeFilterList)
                    }
                  }}
                />
                <label className="label" htmlFor={eachJobType.employmentTypeId}>
                  {eachJobType.label}
                </label>
              </li>
            ))}
          </ul>
          <hr />
          {/* Salary Range filter */}
          <ul className="filter-list-container">
            <h1 className="filter-title">Salary Range</h1>
            {salaryRangesList.map(eachSalaryRange => (
              <li key={eachSalaryRange.salaryRangeId} className="each-job-type">
                <input
                  type="radio"
                  value={eachSalaryRange.salaryRangeId}
                  className="checkbox"
                  id={eachSalaryRange.salaryRangeId}
                  name="salary-range"
                  onClick={e => {
                    setPackageFilter(e.target.value)
                    filterJobsData()
                  }}
                />
                <label
                  className="label"
                  htmlFor={eachSalaryRange.salaryRangeId}
                >
                  {eachSalaryRange.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
        {/* Jobs list section */}
        <div className="search-jobs-list-container">
          <div className="md-searchbar-container">{renderInputContainer()}</div>
          {jobsFetchingStatus === fetchingStatusCode.loading && (
            <div className="jobs-loading-container" data-testid="loader">
              <Loader type="ThreeDots" color="#4f46e5" height={10} width={80} />
            </div>
          )}
          {filteredData.length !== 0 &&
            jobsFetchingStatus === fetchingStatusCode.success && (
              <ul className="jobs-list-container">
                {filteredData.map(eachJob => (
                  <JobCard eachJobDetails={eachJob} key={eachJob.id} />
                ))}
              </ul>
            )}
          {jobsFetchingStatus === fetchingStatusCode.failure && (
            <FailureContainer onClick={() => setRetryJobsFetch(true)} />
          )}
          {filteredData.length === 0 &&
            jobsFetchingStatus === fetchingStatusCode.success && (
              <div className="no-job-found-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                  alt="no jobs"
                  className="no-job-found-img"
                />
                <h1>No Jobs Found</h1>
                <p>We could not find any jobs. Try other filters.</p>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}
