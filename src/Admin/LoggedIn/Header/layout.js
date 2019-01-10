import React from 'react';

const Header = () => (
  <header className="topbar" data-navbarbg="skin5">
    <nav className="navbar top-navbar navbar-expand-md navbar-dark">
      <div className="navbar-header" data-logobg="skin5" style={{ backgroundColor: '#1F262D' }}>
        <a
          className="nav-toggler waves-effect waves-light d-block d-md-none"
          href="javascript:void(0)"
        >
          <i className="ti-menu ti-close" />
        </a>
        <a className="navbar-brand" href="#">
          <b className="logo-icon p-l-10">
            <i className="wi wi-sunset" />
            <img
              src="/assets/images/logo-icon.png"
              alt="homepage"
              className="light-logo"
            />
          </b>
          <span className="logo-text">
            <img
              src="/assets/images/logo-text.png"
              alt="homepage"
              className="light-logo"
            />
          </span>
        </a>
        <a
          className="topbartoggler d-block d-md-none waves-effect waves-light"
          href="javascript:void(0)"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="ti-more" />
        </a>
      </div>
      <div
        className="navbar-collapse collapse"
        id="navbarSupportedContent"
        data-navbarbg="skin5"
      >
        <ul className="navbar-nav float-left mr-auto">
          <li className="nav-item d-none d-md-block">
            <a
              className="nav-link sidebartoggler waves-effect waves-light"
              href="javascript:void(0)"
              data-sidebartype="mini-sidebar"
            >
              <i className="mdi mdi-menu font-24" />
            </a>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="d-none d-md-block">
                Create New <i className="fa fa-angle-down" />
              </span>
              <span className="d-block d-md-none">
                <i className="fa fa-plus" />
              </span>
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </li>
        </ul>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              src="/assets/images/users/1.jpg"
              alt="user"
              className="rounded-circle"
              width="31"
            />
          </a>
          <div className="dropdown-menu dropdown-menu-right user-dd animated">
            <a className="dropdown-item" href="javascript:void(0)">
              <i className="ti-user m-r-5 m-l-5" /> My Profile
            </a>
            <a className="dropdown-item" href="javascript:void(0)">
              <i className="ti-wallet m-r-5 m-l-5" /> My Balance
            </a>
            <a className="dropdown-item" href="javascript:void(0)">
              <i className="ti-email m-r-5 m-l-5" /> Inbox
            </a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="javascript:void(0)">
              <i className="ti-settings m-r-5 m-l-5" /> Account Setting
            </a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="javascript:void(0)">
              <i className="fa fa-power-off m-r-5 m-l-5" /> Logout
            </a>
            <div className="dropdown-divider" />
            <div className="p-l-30 p-10">
              <a
                href="javascript:void(0)"
                className="btn btn-sm btn-success btn-rounded"
              >
                View Profile
              </a>
            </div>
          </div>
        </li>
      </div>
    </nav>
  </header>
);

export default Header;
