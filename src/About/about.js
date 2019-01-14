import React from 'react';
import YouTube from 'react-youtube';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  youtube_parser(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  }

  renderVisions(visions) {
    return visions.map(v => (
      <div className="col-md-6 col-lg-4 mb-5">
        <div className="hotel-room text-center">
          <div className="hotel-room-body">
            <h3 className="heading mb-0">{v.title}</h3>
            <strong className="price">{v.description}</strong>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    if (
      this.props &&
      this.props.left &&
      this.props.middle &&
      this.props.right
    ) {
      console.log(this.props);
      const { background, header, left, middle, right, visions } = this.props;
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
                  <h1 className="mb-1">{header}</h1>
                  <br />
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
                      <img
                        src={left.picture}
                        alt="Image"
                        className="img-fluid"
                      />
                    </div>
                    <div className="hotel-room-body">
                      <h3 className="heading mb-0">{left.title}</h3>
                      <strong className="price">{left.description}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-5">
                  <div className="hotel-room text-center">
                    <YouTube
                      videoId={this.youtube_parser(middle.video)}
                      onReady={this.onReady}
                      className="img-fluid"
                    />

                    <div className="hotel-room-body">
                      <h3 className="heading mb-0">{middle.title}</h3>
                      <strong className="price">{middle.description}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-5">
                  <div className="hotel-room text-center">
                    <a href="#" className="d-block mb-0 thumbnail">
                      <img
                        src={right.picture}
                        alt="Image"
                        className="img-fluid"
                      />
                    </a>
                    <div className="hotel-room-body">
                      <h3 className="heading mb-0">{right.title}</h3>
                      <strong className="price">{right.description}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="site-section bg-light">
            <div className="container">
              <div className="col-md-6 mx-auto text-center mb-5 section-heading">
                <h2 className="mb-5">Visions and Goals</h2>
              </div>
              <div className="row">{this.renderVisions(visions)}</div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default About;
