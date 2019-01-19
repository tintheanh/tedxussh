import React from 'react';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-scroll-parallax';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
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
    const {
      background,
      title,
      description,
      cover1,
      cover2,
      cover3
    } = this.props.home;
    return (
      <div>
        <Parallax
          disabled={this.state.width <= 414 ? true : false}
          slowerScrollRate
          offsetYMax={30}
          offsetYMin={-30}
          tag="figure"
        >
          <div
            className="site-blocks-cover overlay"
            data-aos="fade"
            style={{ backgroundImage: `url(${background})` }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-12">
                  <h1 className="home-title mb-1">{title}</h1>
                  <p className="description">{description}</p>
                  <br />
                  <Link to="/attend" className="explore">
                    Explore the event
                  </Link>
                </div>
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
                      <img src={cover1} alt="" className="img-fluid" />

                      <div className="my-overlay text-vertical-center">
                        <strong className="text-inside">
                          EXPLORE THE UPCOMING EVENT
                          <br />
                          <span style={{ fontWeight: '300', fontSize: '18px' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit
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
                      <img src={cover2} alt="" className="img-fluid" />

                      <div className="my-overlay text-vertical-center">
                        <strong className="text-inside">
                          READ OUR BLOG <br />
                          <span style={{ fontWeight: '300', fontSize: '18px' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit
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
                      <img src={cover3} alt="" className="img-fluid" />

                      <div className="my-overlay text-vertical-center">
                        <strong className="text-inside">
                          ABOUT US <br />
                          <span style={{ fontWeight: '300', fontSize: '18px' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit
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
}

export default Home;
