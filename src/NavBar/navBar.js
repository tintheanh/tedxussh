import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import GetEventUpdate from './GetEventUpdate/getEventUpdate';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalGetUpdate: false
    };
    this.openModalGetUpdate = this.openModalGetUpdate.bind(this);
    this.closeModalGetUpdate = this.closeModalGetUpdate.bind(this);
  }

  openModalGetUpdate() {
    this.setState({ modalGetUpdate: true });
  }

  closeModalGetUpdate() {
    this.setState({ modalGetUpdate: false });
  }

  render() {
    return (
      <div>
        <div className="site-mobile-menu">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
              <span className="icon-close2 js-menu-toggle" />
            </div>
          </div>
          <div className="site-mobile-menu-body">
            <ul className="site-nav-wrap">
              <li>
                <Link to="/attend" style={{ fontFamily: 'Roboto' }}>
                  Attend
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
                <a
                  className="get-event-update"
                  onClick={this.openModalGetUpdate}
                >
                  Get event update
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="site-navbar-wrap js-site-navbar">
          <div className="container">
            <div className="site-navbar bg-light">
              <div className="py-1">
                <div className="row align-items-center">
                  <div className="col-2">
                    <h2
                      className="mb-0 site-logo"
                      style={{ fontFamily: 'Roboto' }}
                    >
                      <Link to="/">Home</Link>
                    </h2>
                  </div>
                  <div className="col-10">
                    <nav
                      className="site-navigation text-right"
                      role="navigation"
                    >
                      <div className="container">
                        <div className="d-inline-block d-lg-none  ml-md-0 mr-auto py-3">
                          <a
                            href="#"
                            className="site-menu-toggle js-menu-toggle"
                          >
                            <span className="icon-menu h3" />
                          </a>
                        </div>
                        <ul className="site-menu js-clone-nav d-none d-lg-block">
                          <li>
                            <Link to="/attend" style={{ fontFamily: 'Roboto' }}>
                              Attend
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
                            <a
                              className="get-event-update"
                              onClick={this.openModalGetUpdate}
                            >
                              Get event update
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
        <Modal
          open={this.state.modalGetUpdate}
          onClose={this.closeModalGetUpdate}
          center
        >
          <GetEventUpdate />
        </Modal>
      </div>
    );
  }
}

export default NavBar;
