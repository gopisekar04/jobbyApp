import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {useHistory} from 'react-router-dom' // Import useHistory instead of useNavigate
import './index.css'

export default function LoginForm() {
  const history = useHistory() // Use useHistory instead of useNavigate

  useEffect(() => {
    const token = Cookies.get('jwt_token')
    if (token) {
      history.push('/') // Use history.push('/') for navigation
    }
  }, [history])

  const [username, setUsername] = useState('rahul')
  const [password, setPassword] = useState('rahul@2021')
  const [errMessage, setErrMsg] = useState('')
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false)

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const jsonData = await response.json()
      if (response.ok) {
        Cookies.set('jwt_token', jsonData.jwt_token, {expires: 7})
        history.replace('/')
      } else {
        setIsInvalidCredentials(true)
        setErrMsg(jsonData.error_msg)
        setUsername('')
        setPassword('')
      }
    } catch (error) {
      console.error('Error occurred during login:', error)
      setIsInvalidCredentials(true)

      setErrMsg('An error occurred during login. Please try again later.')
    }
  }

  return (
    <div className="login-form-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="username-input-filed"
            value={username}
            onChange={onChangeUsername}
            placeholder="Username"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="password-input-filed"
            value={password}
            onChange={onChangePassword}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {isInvalidCredentials && <p className="error-message">*{errMessage}</p>}
      </form>
    </div>
  )
}
