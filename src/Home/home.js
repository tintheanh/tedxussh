import React from 'react';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    window.document.title = 'TEDxHCMUSSH - Home';
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    if (
      this.props.home &&
      this.props.home.left &&
      this.props.home.middle &&
      this.props.home.right
    ) {
      const { background, title, description } = this.props.home;
      return (
        <div>
          <Parallax
            bgImage={background}
            strength={500}
            className="home-parallax"
            // bgImageSizes={{ width: 1440, height: 810 }}
          >
            <div className="container" style={{ height: '100%' }}>
              <div
                className="row align-items-center"
                style={{ height: '100%' }}
              >
                <div className="col-lg-6 col-md-12 home-text-wrapper">
                  <h1 className="home-title mb-1">{title}</h1>
                  <p className="description">{description}</p>
                  <br />
                  <Link
                    to="/attend"
                    className="explore"
                    style={{ fontFamily: 'Montserrat' }}
                  >
                    Explore the event
                  </Link>
                </div>
              </div>
            </div>
          </Parallax>

          <div className="site-section bg-white">
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-lg-4 mb-2">
                  <div className="hotel-room">
                    <div className="d-block mb-0 thumbnail">
                      <Link to="/attend">
                        <img
                          src={this.props.home.left.cover}
                          alt=""
                          className="img-fluid"
                        />

                        <div className="my-overlay text-vertical-center">
                          <strong
                            className="text-inside"
                            style={{ fontFamily: 'Oswald' }}
                          >
                            {this.props.home.left.title}
                            <br />
                            <span
                              style={{
                                fontWeight: '300',
                                fontSize: '18px',
                                fontFamily: 'Montserrat'
                              }}
                            >
                              {this.props.home.left.description}
                            </span>
                          </strong>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-4 mb-2">
                  <div className="hotel-room">
                    <div className="d-block mb-0 thumbnail">
                      <Link to="/learn">
                        <img
                          src={this.props.home.middle.cover}
                          alt=""
                          className="img-fluid"
                        />

                        <div className="my-overlay text-vertical-center">
                          <strong
                            className="text-inside"
                            style={{ fontFamily: 'Oswald' }}
                          >
                            {this.props.home.middle.title} <br />
                            <span
                              style={{
                                fontWeight: '300',
                                fontSize: '18px',
                                fontFamily: 'Montserrat'
                              }}
                            >
                              {this.props.home.middle.description}
                            </span>
                          </strong>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-4 mb-2">
                  <div className="hotel-room">
                    <div className="d-block mb-0 thumbnail">
                      <Link to="/about">
                        <img
                          src={this.props.home.right.cover}
                          alt=""
                          className="img-fluid"
                        />

                        <div className="my-overlay text-vertical-center">
                          <strong
                            className="text-inside"
                            style={{ fontFamily: 'Oswald' }}
                          >
                            {this.props.home.right.title} <br />
                            <span
                              style={{
                                fontWeight: '300',
                                fontSize: '18px',
                                fontFamily: 'Montserrat'
                              }}
                            >
                              {this.props.home.right.description}
                            </span>
                          </strong>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default Home;
