import React from 'react';
import { Link } from 'react-router-dom';

console.log(window.location.pathname);

const LeftSideBar = () => (
  <aside
    className="left-sidebar"
    data-sidebarbg="skin5"
    style={{ backgroundColor: '#1F262D' }}
  >
    <div className="scroll-sidebar">
      <nav className="sidebar-nav">
        <ul id="sidebarnav" className="p-t-30">
          <li className="sidebar-item">
            {' '}
            <Link
              to="/admin/home"
              className="sidebar-link waves-effect waves-dark sidebar-link"
              aria-expanded="false"
              // style={{ backgroundColor: window.location.pathname === '/admin/conference' ? '#27a9e3' : '' }}
              style={
                window.location.pathname === '/admin/home' ||
                window.location.pathname === '/admin' ||
                window.location.pathname === '/admin/'
                  ? { backgroundColor: '#27a9e3', opacity: 1 }
                  : { backgroundColor: '' }
              }
            >
              <i className="fa fa-home" />
              <span className="hide-menu">Home</span>
            </Link>
          </li>
          <li className="sidebar-item">
            {' '}
            <Link
              to="/admin/conference"
              className="sidebar-link waves-effect waves-dark sidebar-link"
              aria-expanded="false"
              // style={{ backgroundColor: window.location.pathname === '/admin/conference' ? '#27a9e3' : '' }}
              style={
                window.location.pathname === '/admin/conference'
                  ? { backgroundColor: '#27a9e3', opacity: 1 }
                  : { backgroundColor: '' }
              }
            >
              <i className="mdi mdi-view-dashboard" />
              <span className="hide-menu">Conference</span>
            </Link>
          </li>
          <li className="sidebar-item">
            {' '}
            <Link
              to="/admin/learn"
              className="sidebar-link waves-effect waves-dark sidebar-link"
              aria-expanded="false"
              // style={{ backgroundColor: window.location.pathname === '/admin/conference' ? '#27a9e3' : '' }}
              style={
                window.location.pathname === '/admin/learn'
                  ? { backgroundColor: '#27a9e3', opacity: 1 }
                  : { backgroundColor: '' }
              }
            >
              <i className="mdi mdi-chart-bar" />
              <span className="hide-menu">Learn</span>
            </Link>
          </li>
          <li className="sidebar-item">
            {' '}
            <Link
              to="/admin/footer"
              className="sidebar-link waves-effect waves-dark sidebar-link"
              aria-expanded="false"
              // style={{ backgroundColor: window.location.pathname === '/admin/conference' ? '#27a9e3' : '' }}
              style={
                window.location.pathname === '/admin/footer'
                  ? { backgroundColor: '#27a9e3', opacity: 1 }
                  : { backgroundColor: '' }
              }
            >
              <i className="mdi mdi-chart-bubble" />
              <span className="hide-menu">Footer</span>
            </Link>
          </li>
          <li className="sidebar-item">
            {' '}
            <Link
              to="/admin/about"
              className="sidebar-link waves-effect waves-dark sidebar-link"
              aria-expanded="false"
              style={
                window.location.pathname === '/admin/about'
                  ? { backgroundColor: '#27a9e3', opacity: 1 }
                  : { backgroundColor: '' }
              }
            >
              <i className="mdi mdi-blur-linear" />
              <span className="hide-menu">About</span>
            </Link>
          </li>
          <li className="sidebar-item">
            {' '}
            <Link
              to="/admin/organizers"
              className="sidebar-link waves-effect waves-dark sidebar-link"
              aria-expanded="false"
              style={
                window.location.pathname === '/admin/organizers'
                  ? { backgroundColor: '#27a9e3', opacity: 1 }
                  : { backgroundColor: '' }
              }
            >
              <i className="mdi mdi-blur-linear" />
              <span className="hide-menu">Organizers</span>
            </Link>
          </li>
          <li className="sidebar-item">
            {' '}
            <Link
              to="/admin/contact"
              className="sidebar-link waves-effect waves-dark sidebar-link"
              aria-expanded="false"
              style={
                window.location.pathname === '/admin/contact'
                  ? { backgroundColor: '#27a9e3', opacity: 1 }
                  : { backgroundColor: '' }
              }
            >
              <i className="mdi mdi-blur-linear" />
              <span className="hide-menu">Contact</span>
            </Link>
          </li>
          <li className="sidebar-item">
            {' '}
            <Link
              to="/admin/images"
              className="sidebar-link waves-effect waves-dark sidebar-link"
              aria-expanded="false"
              style={
                window.location.pathname === '/admin/images'
                  ? { backgroundColor: '#27a9e3', opacity: 1 }
                  : { backgroundColor: '' }
              }
            >
              <i className="mdi mdi-blur-linear" />
              <span className="hide-menu">Images</span>
            </Link>
          </li>
          <li className="sidebar-item">
            {' '}
            <Link
              to="/admin/get-event-update"
              className="sidebar-link waves-effect waves-dark sidebar-link"
              aria-expanded="false"
              style={
                window.location.pathname === '/admin/get-event-update'
                  ? { backgroundColor: '#27a9e3', opacity: 1 }
                  : { backgroundColor: '' }
              }
            >
              <i className="mdi mdi-blur-linear" />
              <span className="hide-menu">Get event update</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
);

export default LeftSideBar;
