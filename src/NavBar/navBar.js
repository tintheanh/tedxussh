import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <div>
    <div className="site-mobile-menu">
      <div className="site-mobile-menu-header">
        <div className="site-mobile-menu-close mt-3">
          <span className="icon-close2 js-menu-toggle" />
        </div>
      </div>
      <div className="site-mobile-menu-body" />
    </div>
    <div className="site-navbar-wrap js-site-navbar">
      <div className="container">
        <div className="site-navbar bg-light">
          <div className="py-1">
            <div className="row align-items-center">
              <div className="col-2">
                <h2 className="mb-0 site-logo" style={{ fontFamily: 'Roboto' }}>
                  <Link to="/">Home</Link>
                </h2>
              </div>
              <div className="col-10">
                <nav className="site-navigation text-right" role="navigation">
                  <div className="container">
                    <div className="d-inline-block d-lg-none  ml-md-0 mr-auto py-3">
                      <a href="#" className="site-menu-toggle js-menu-toggle">
                        <span className="icon-menu h3" />
                      </a>
                    </div>
                    <ul className="site-menu js-clone-nav d-none d-lg-block">
                      <li>
                        <Link to="/conference" style={{ fontFamily: 'Roboto' }}>
                          Conference
                        </Link>
                      </li>
                      <li>
                        <Link to="/learn" style={{ fontFamily: 'Roboto' }}>
                          Learn
                        </Link>
                      </li>
                      <li>
                        <Link to="/about" style={{ fontFamily: 'Roboto' }}>
                          About
                        </Link>
                      </li>
                      <li>
                        <a href="contact.html" style={{ fontFamily: 'Roboto' }}>
                          Contact
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default NavBar;
