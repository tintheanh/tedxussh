import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import GetEventUpdate from './GetEventUpdate/getEventUpdate';
import logo2 from './logo/logo2.png';

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
            <ul
              className="site-nav-wrap"
              style={{ textTransform: 'uppercase' }}
            >
              <li>
                <Link to="/attend" style={{ fontFamily: 'Montserrat' }}>
                  Attend
                </Link>
              </li>
              <li>
                <Link to="/learn" style={{ fontFamily: 'Montserrat' }}>
                  Learn
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ fontFamily: 'Montserrat' }}>
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
                    {/* <h2
                      className="mb-0 site-logo"
                      style={{ fontFamily: 'Montserrat' }}
                    > */}
                    <Link to="/">
                      <img
                        id="logo"
                        src={logo2}
                        alt="logo"
                        className="site-logo"
                        style={{ width: '100%', padding: '0' }}
                      />
                    </Link>
                    {/* </h2> */}
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
                            <Link to="/attend" style={{ fontFamily: 'Montserrat' }}>
                              Attend
                            </Link>
                          </li>
                          <li>
                            <Link to="/learn" style={{ fontFamily: 'Montserrat' }}>
                              Learn
                            </Link>
                          </li>
                          <li>
                            <Link to="/about" style={{ fontFamily: 'Montserrat' }}>
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
