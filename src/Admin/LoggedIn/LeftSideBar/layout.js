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
              to="/admin/salons"
              className="sidebar-link waves-effect waves-dark sidebar-link"
              aria-expanded="false"
              // style={{ backgroundColor: window.location.pathname === '/admin/conference' ? '#27a9e3' : '' }}
              style={
                window.location.pathname === '/admin/salons'
                  ? { backgroundColor: '#27a9e3', opacity: 1 }
                  : { backgroundColor: '' }
              }
            >
              <i className="mdi mdi-chart-bar" />
              <span className="hide-menu">Salons</span>
            </Link>
          </li>
          <li className="sidebar-item">
            {' '}
            <a
              className="sidebar-link waves-effect waves-dark sidebar-link"
              href="widgets.html"
              aria-expanded="false"
            >
              <i className="mdi mdi-chart-bubble" />
              <span className="hide-menu">Widgets</span>
            </a>
          </li>
          <li className="sidebar-item">
            {' '}
            <a
              className="sidebar-link waves-effect waves-dark sidebar-link"
              href="tables.html"
              aria-expanded="false"
            >
              <i className="mdi mdi-border-inside" />
              <span className="hide-menu">Tables</span>
            </a>
          </li>
          <li className="sidebar-item">
            {' '}
            <a
              className="sidebar-link waves-effect waves-dark sidebar-link"
              href="grid.html"
              aria-expanded="false"
            >
              <i className="mdi mdi-blur-linear" />
              <span className="hide-menu">Full Width</span>
            </a>
          </li>
          <li className="sidebar-item">
            {' '}
            <a
              className="sidebar-link has-arrow waves-effect waves-dark"
              href="javascript:void(0)"
              aria-expanded="false"
            >
              <i className="mdi mdi-receipt" />
              <span className="hide-menu">Forms </span>
            </a>
            <ul aria-expanded="false" className="collapse  first-level">
              <li className="sidebar-item">
                <a href="form-basic.html" className="sidebar-link">
                  <i className="mdi mdi-note-outline" />
                  <span className="hide-menu"> Form Basic </span>
                </a>
              </li>
              <li className="sidebar-item">
                <a href="form-wizard.html" className="sidebar-link">
                  <i className="mdi mdi-note-plus" />
                  <span className="hide-menu"> Form Wizard </span>
                </a>
              </li>
            </ul>
          </li>
          <li className="sidebar-item">
            {' '}
            <a
              className="sidebar-link waves-effect waves-dark sidebar-link"
              href="pages-buttons.html"
              aria-expanded="false"
            >
              <i className="mdi mdi-relative-scale" />
              <span className="hide-menu">Buttons</span>
            </a>
          </li>
          <li className="sidebar-item">
            {' '}
            <a
              className="sidebar-link has-arrow waves-effect waves-dark"
              href="javascript:void(0)"
              aria-expanded="false"
            >
              <i className="mdi mdi-face" />
              <span className="hide-menu">Icons </span>
            </a>
            <ul aria-expanded="false" className="collapse  first-level">
              <li className="sidebar-item">
                <a href="icon-material.html" className="sidebar-link">
                  <i className="mdi mdi-emoticon" />
                  <span className="hide-menu"> Material Icons </span>
                </a>
              </li>
              <li className="sidebar-item">
                <a href="icon-fontawesome.html" className="sidebar-link">
                  <i className="mdi mdi-emoticon-cool" />
                  <span className="hide-menu"> Font Awesome Icons </span>
                </a>
              </li>
            </ul>
          </li>
          <li className="sidebar-item">
            {' '}
            <a
              className="sidebar-link waves-effect waves-dark sidebar-link"
              href="pages-elements.html"
              aria-expanded="false"
            >
              <i className="mdi mdi-pencil" />
              <span className="hide-menu">Elements</span>
            </a>
          </li>
          <li className="sidebar-item">
            {' '}
            <a
              className="sidebar-link has-arrow waves-effect waves-dark"
              href="javascript:void(0)"
              aria-expanded="false"
            >
              <i className="mdi mdi-move-resize-variant" />
              <span className="hide-menu">Addons </span>
            </a>
            <ul aria-expanded="false" className="collapse  first-level">
              <li className="sidebar-item">
                <a href="index2.html" className="sidebar-link">
                  <i className="mdi mdi-view-dashboard" />
                  <span className="hide-menu"> Dashboard-2 </span>
                </a>
              </li>
              <li className="sidebar-item">
                <a href="pages-gallery.html" className="sidebar-link">
                  <i className="mdi mdi-multiplication-box" />
                  <span className="hide-menu"> Gallery </span>
                </a>
              </li>
              <li className="sidebar-item">
                <a href="pages-calendar.html" className="sidebar-link">
                  <i className="mdi mdi-calendar-check" />
                  <span className="hide-menu"> Calendar </span>
                </a>
              </li>
              <li className="sidebar-item">
                <a href="pages-invoice.html" className="sidebar-link">
                  <i className="mdi mdi-bulletin-board" />
                  <span className="hide-menu"> Invoice </span>
                </a>
              </li>
              <li className="sidebar-item">
                <a href="pages-chat.html" className="sidebar-link">
                  <i className="mdi mdi-message-outline" />
                  <span className="hide-menu"> Chat Option </span>
                </a>
              </li>
            </ul>
          </li>
          <li className="sidebar-item">
            {' '}
            <a
              className="sidebar-link has-arrow waves-effect waves-dark"
              href="javascript:void(0)"
              aria-expanded="false"
            >
              <i className="mdi mdi-account-key" />
              <span className="hide-menu">Authentication </span>
            </a>
            <ul aria-expanded="false" className="collapse  first-level">
              <li className="sidebar-item">
                <a href="authentication-login.html" className="sidebar-link">
                  <i className="mdi mdi-all-inclusive" />
                  <span className="hide-menu"> Login </span>
                </a>
              </li>
              <li className="sidebar-item">
                <a href="authentication-register.html" className="sidebar-link">
                  <i className="mdi mdi-all-inclusive" />
                  <span className="hide-menu"> Register </span>
                </a>
              </li>
            </ul>
          </li>
          <li className="sidebar-item">
            {' '}
            <a
              className="sidebar-link has-arrow waves-effect waves-dark"
              href="javascript:void(0)"
              aria-expanded="false"
            >
              <i className="mdi mdi-alert" />
              <span className="hide-menu">Errors </span>
            </a>
            <ul aria-expanded="false" className="collapse  first-level">
              <li className="sidebar-item">
                <a href="error-403.html" className="sidebar-link">
                  <i className="mdi mdi-alert-octagon" />
                  <span className="hide-menu"> Error 403 </span>
                </a>
              </li>
              <li className="sidebar-item">
                <a href="error-404.html" className="sidebar-link">
                  <i className="mdi mdi-alert-octagon" />
                  <span className="hide-menu"> Error 404 </span>
                </a>
              </li>
              <li className="sidebar-item">
                <a href="error-405.html" className="sidebar-link">
                  <i className="mdi mdi-alert-octagon" />
                  <span className="hide-menu"> Error 405 </span>
                </a>
              </li>
              <li className="sidebar-item">
                <a href="error-500.html" className="sidebar-link">
                  <i className="mdi mdi-alert-octagon" />
                  <span className="hide-menu"> Error 500 </span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
);

export default LeftSideBar;
