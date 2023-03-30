import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFail = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }

  SubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFail(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    Cookies.remove('jwt_token')
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="loginContainer">
        <form className="formContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="loginLogo"
            alt="website logo"
          />
          <div className="inputContainer ">
            <label className="input-label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="username-input-field"
              onChange={this.onChangeUsername}
              placeholder="Username"
              value={username}
            />
          </div>
          <div className="inputContainer">
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <input
              className="password-input-field"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <button
            type="submit"
            className="login-button"
            onClick={this.SubmitForm}
          >
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
