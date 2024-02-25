import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom"
import './index.css'
import { useEffect, useState } from 'react'

export default function LoginForm(){
  const navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get("jwt_token")
    if(token){
      navigate('/')
    }
  }, [])



  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMessage, setErrMsg] = useState('Invalid username and password')
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false)

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const renderPasswordField = () => {
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={onChangePassword}
          placeholder='Password'
        />
      </>
    )
  }

  const renderUsernameField = () => {    
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={onChangeUsername}
          placeholder='Username'
        />
      </>
    )
  }
  
    return (
      <div className="login-form-container">
        <form className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="login-website-logo-mobile-image"
            alt="website logo"
          />
          <div className="input-container">{renderUsernameField()}</div>
          <div className="input-container">{renderPasswordField()}</div>
          <button type="submit" className="login-button" onClick={async (e) => {
            e.preventDefault()
            const userDetails = {username, password}         
            const url = "https://apis.ccbp.in/login"
            const options = {
              method: 'POST',
              body: JSON.stringify(userDetails)
            }
            const response = await fetch(url, options)            
            if(response.ok){
              const jsonData = await response.json()                             
              Cookies.set('jwt_token', jsonData.jwt_token, { expires: 7 })         
              navigate('/')
            }else{               
              setIsInvalidCredentials(true)     
              setUsername('')
              setPassword('')
            }

            
            
          }}>
            Login
          </button>
          {isInvalidCredentials && <p className='error-message'>*{errMessage}</p>}
        </form>
      </div>
    )
  }

