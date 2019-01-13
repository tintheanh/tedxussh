import React from 'react';
import { Link } from 'react-router-dom';

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
        <div
          className="site-blocks-cover overlay"
          data-aos="fade"
          data-stellar-background-ratio="0.5"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-7">
                <h1 className="mb-1">{title}</h1>
                <p className="p-2">{description}</p>
                <br />
                <Link to="/conference">Explore the event</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="site-section bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-4 mb-5">
                <div className="hotel-room text-center">
                  <div className="d-block mb-0 thumbnail">
                    <Link to="/conference">
                      <img
                        src="images/img_1.jpg"
                        alt="Image"
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="hotel-room-body">
                    <h3 className="heading mb-0" />
                    <strong className="price">
                      Explore the upcoming event
                    </strong>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-5">
                <div className="hotel-room text-center">
                  <a href="#" className="d-block mb-0 thumbnail">
                    <img
                      src="images/img_2.jpg"
                      alt="Image"
                      className="img-fluid"
                    />
                  </a>
                  <div className="hotel-room-body">
                    <h3 className="heading mb-0">
                      <a href="#">Family Room</a>
                    </h3>
                    <strong className="price">$400.00 / per night</strong>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-5">
                <div className="hotel-room text-center">
                  <a href="#" className="d-block mb-0 thumbnail">
                    <img
                      src="images/img_3.jpg"
                      alt="Image"
                      className="img-fluid"
                    />
                  </a>
                  <div className="hotel-room-body">
                    <h3 className="heading mb-0">
                      <a href="#">Single Room</a>
                    </h3>
                    <strong className="price">$255.00 / per night</strong>
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
