import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navHeader">
      <div className="navContent">
        <div className="navBarContainer">
          <Link to="/">
            <img
              className="websiteLogo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="navMenu">
            <li className="navItem">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="navItem">
              <Link to="/jobs" className="nav-link">
                Jobs
              </Link>
            </li>
          </ul>
          <button type="button" className="logoutBtn" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
