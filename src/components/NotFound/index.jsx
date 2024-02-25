import './index.css'

const NotFound = () => (
  
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"      
      alt="not-found"
      className="not-found-img"
    />
    <div className='not-found-content-container'>
      <h1 className='not-found-title'>Page Not Found</h1>
      <p>We are sorry, the page you requested could not be found</p>
    </div>
  </div>
)

export default NotFound
