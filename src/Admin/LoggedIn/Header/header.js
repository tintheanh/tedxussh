import React from 'react'
import firebase from 'firebase'

const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => alert('You have been logged out.'))
    .catch(err => {
      console.error(err)
      alert('error occured')
    })
}

const Header = () => (
  <header className="topbar" data-navbarbg="skin5">
    <nav className="navbar top-navbar navbar-expand-md navbar-dark">
      <div className="navbar-header" data-logobg="skin5" style={{ backgroundColor: '#1F262D', height: '64px' }}>
        <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="javascript:void(0)">
          <i className="ti-menu ti-close" />
        </a>
        <a className="navbar-brand" href="#">
          <b className="logo-icon p-l-10">
            <i className="wi wi-sunset" />
            {/* <img
              src="/assets/images/logo-icon.png"
              alt="homepage"
              className="light-logo"
            /> */}
          </b>
          {/* <span className="logo-text">
            <img
              src="/assets/images/logo-text.png"
              alt="homepage"
              className="light-logo"
            />
          </span> */}
        </a>
      </div>
      <div className="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin5">
        <ul className="navbar-nav float-left mr-auto">
          <li className="nav-item d-none d-md-block">
            <a className="nav-link sidebartoggler waves-effect waves-light" />
          </li>
        </ul>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="icon-user rounded-circle" width="31" />
          </a>
          <div className="dropdown-menu dropdown-menu-right user-dd animated">
            <div className="dropdown-divider" />
            <a className="dropdown-item" onClick={() => logout()} style={{ cursor: 'pointer' }}>
              <i className="fa fa-power-off m-r-5 m-l-5" /> Logout
            </a>
          </div>
        </li>
      </div>
    </nav>
  </header>
)

export default Header
