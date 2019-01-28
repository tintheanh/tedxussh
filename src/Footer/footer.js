import React from 'react';
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import GetEventUpdate from '../NavBar/GetEventUpdate/getEventUpdate';
import { modifyObj } from '../config/functions';

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
    const { isVN } = this.props;
    if (
      this.props.footer &&
      this.props.footer.left &&
      this.props.footer.middle &&
      this.props.footer.right
    ) {
      const modifyFooter = modifyObj(isVN, this.props.footer, 'footer');
      const { left } = modifyFooter;
      const { middle } = modifyFooter;
      const { right } = modifyFooter;
      return (
        <footer className="site-footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="small-nav">
                  <p
                    className="text-center"
                    style={{ fontFamily: 'Montserrat' }}
                  >
                    <Link to="/organizers">
                      {isVN ? 'Ban tổ chức' : 'Organizers'}
                    </Link>{' '}
                    {' - '}
                    <a
                      href="javascript:void(0);"
                      onClick={this.openModalGetUpdate}
                    >
                      {isVN ? 'Thông báo sự kiện' : 'Get event update'}
                    </a>
                    {' - '}
                    <Link to="/contact">{isVN ? 'Liên hệ' : 'Contact'}</Link>
                  </p>
                </div>
                <div className="social-links">
                  <p className="text-center">
                    <a
                      href={left.links.facebook}
                      target="_blank"
                      className="pb-2 pr-2 pl-0"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      <span
                        className="fa icon-facebook-f"
                        style={{ fontSize: '20px' }}
                      />
                    </a>
                    <a
                      href={left.links.youtube}
                      target="_blank"
                      className="p-2"
                    >
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
                    <div
                      dangerouslySetInnerHTML={{ __html: middle.sentence }}
                      style={{ fontFamily: 'Montserrat' }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="col-md-12 text-center">
                  <Link to="/attend">
                    <p style={{ fontFamily: 'Montserrat' }}>{right.sentence}</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row pt-5 mt-5 text-center">
              <div className="col-md-12">
                <p style={{ fontFamily: 'Montserrat' }}>
                  Copyright &copy; {new Date().getFullYear()}{' '}
                  {modifyFooter.copyright}
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
