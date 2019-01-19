import React from 'react';
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import GetEventUpdate from '../NavBar/GetEventUpdate/getEventUpdate';

class Footer extends React.Component {
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
    if (
      this.props &&
      this.props.left &&
      this.props.middle &&
      this.props.right
    ) {
      const { links } = this.props.left;
      const { sentence } = this.props.middle;
      const { quote } = this.props.right;
      const { copyright } = this.props;
      return (
        <footer className="site-footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="small-nav">
                  <p className="text-center">
                    <Link to="/organizers">Organizers</Link> {' - '}
                    <a
                      href="javascript:void(0);"
                      onClick={this.openModalGetUpdate}
                    >
                      Get event update
                    </a>
                    {' - '}
                    <Link to="/contact">Contact</Link>
                  </p>
                </div>
                <div className="social-links">
                  <p className="text-center">
                    <a
                      href={links.facebook}
                      target="_blank"
                      className="pb-2 pr-2 pl-0"
                    >
                      <span
                        className="fa icon-facebook-f"
                        style={{ fontSize: '20px' }}
                      />
                    </a>
                    <a href={links.youtube} target="_blank" className="p-2">
                      <span
                        className="fa icon-youtube-play"
                        style={{ fontSize: '20px' }}
                      />
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-12 text-center">
                    {/* <p>{sentence}</p> */}
                    <div dangerouslySetInnerHTML={{ __html: sentence }} />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="col-md-12 text-center">
                  <Link to="/attend">
                    <p>{quote}</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row pt-5 mt-5 text-center">
              <div className="col-md-12">
                <p>
                  Copyright &copy; {new Date().getFullYear()} {copyright}
                </p>
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
        </footer>
      );
    }
    return null;
  }
}

export default Footer;
