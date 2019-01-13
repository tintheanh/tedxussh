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
    <div className="site-navbar-wrap js-site-navbar bg-white">
      <div className="container">
        <div className="site-navbar bg-light">
          <div className="py-1">
            <div className="row align-items-center">
              <div className="col-2">
                <h2 className="mb-0 site-logo">
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
                      <li className="has-children">
                        <a href="rooms.html">Attend</a>
                        <ul className="dropdown arrow-top">
                          <li>
                            <Link to="/conference">Conference</Link>
                          </li>
                          <li>
                            <Link to="/salons">Salon</Link>
                          </li>
                          <li>
                            <a href="rooms.html">Single Room</a>
                          </li>
                          <li className="has-children">
                            <a href="rooms.html">Rooms</a>
                            <ul className="dropdown">
                              <li>
                                <a href="rooms.html">America</a>
                              </li>
                              <li>
                                <a href="rooms.html">Europe</a>
                              </li>
                              <li>
                                <a href="rooms.html">Asia</a>
                              </li>
                              <li>
                                <a href="rooms.html">Africa</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="events.html">Events</a>
                      </li>
                      <li>
                        <a href="about.html">About</a>
                      </li>
                      <li>
                        <a href="contact.html">Contact</a>
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
