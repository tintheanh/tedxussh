import React from 'react';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-scroll-parallax';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {}

  render() {
    const { background, title, description } = this.props.home;
    return (
      <div>
        <Parallax
          slowerScrollRate
          offsetYMax={30}
          offsetYMin={-30}
          tag="figure"
        >
          <div
            className="site-blocks-cover overlay"
            style={{ backgroundImage: `url(${background})` }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h1 className="home-title mb-1">{title}</h1>
                  <p
                    className="p-2 description"
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: '400',
                      fontSize: '18px'
                    }}
                  >
                    {description}
                  </p>
                  <br />
                  <Link to="/conference" class="explore">
                    Explore the event
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Parallax>

        <div className="site-section bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-4 mb-2">
                <div className="hotel-room">
                  <div className="d-block mb-0 thumbnail">
                    <Link to="/conference">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/tedxussh-e39fb.appspot.com/o/conference-images%2Fspeakers%2Ffemale-speaker-1024x683.jpg?alt=media&token=3ff28a0d-f890-4a76-9931-399505df1081"
                        alt=""
                        className="img-fluid"
                      />

                      <div className="my-overlay text-vertical-center">
                        <strong className="text-inside">
                          EXPLORE THE UPCOMING EVENT
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
                        src="https://firebasestorage.googleapis.com/v0/b/tedxussh-e39fb.appspot.com/o/conference-images%2Fspeakers%2Ffemale-speaker-1024x683.jpg?alt=media&token=3ff28a0d-f890-4a76-9931-399505df1081"
                        alt=""
                        className="img-fluid"
                      />

                      <div className="my-overlay text-vertical-center">
                        <strong className="text-inside">READ OUR BLOG</strong>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-4 mb-2">
                <div className="hotel-room">
                  <div className="d-block mb-0 thumbnail">
                    <Link to="/conference">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/tedxussh-e39fb.appspot.com/o/conference-images%2Fspeakers%2Ffemale-speaker-1024x683.jpg?alt=media&token=3ff28a0d-f890-4a76-9931-399505df1081"
                        alt=""
                        className="img-fluid"
                      />

                      <div className="my-overlay text-vertical-center">
                        <strong className="text-inside">
                          EXPLORE THE UPCOMING EVENT
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
