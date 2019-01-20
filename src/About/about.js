import React from 'react';
import YouTube from 'react-youtube';
import { SizeMe } from 'react-sizeme';
import GetHeight from './getHeight';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = { height: 0 };
    this.element = React.createRef();
  }

  onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  youtube_parser(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : '';
  }

  renderVisions(visions) {
    return visions.map((v, i) => (
      <div className="col-md-12 col-lg-4 mb-2" key={i}>
        <div
          className="hotel-room text-center"
          style={{ background: 'transparent' }}
        >
          <div className="hotel-room-body" style={{ padding: '38px' }}>
            <h3 className="heading mb-0" style={{ paddingBottom: '32px', fontFamily: 'Oswald' }}>
              {v.title}
            </h3>
            <strong className="price" style={{ fontFamily: 'Montserrat' }}>{v.description}</strong>
          </div>
        </div>
      </div>
    ));
  }

  onSize = size => {
    this.setState({ height: size.height }, () =>
      console.log(this.state.height)
    );
  };

  render() {
    return (
      <div>
        <div>
          <div
            className="about-header text-vertical-center"
            style={{
              backgroundImage: `url(${this.props.abtBackground})`
            }}
          >
            <div className="row" style={{ width: '100%', margin: '0' }}>
              <div className="col-md-12">
                <h1 className="about-title">{this.props.abtHeader}</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="site-section bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-4 mb-2">
                <div
                  className="hotel-room text-center"
                  style={{ background: 'transparent' }}
                >
                  <GetHeight img={this.props.leftPic} onSize={this.onSize} />
                  <div
                    className="hotel-room-body"
                    style={{ paddingTop: '32px' }}
                  >
                    <h3
                      className="heading mb-0"
                      style={{ fontFamily: 'Oswald' }}
                    >
                      {this.props.leftTitle}
                    </h3>
                    <strong className="price" style={{ fontFamily: 'Montserrat' }}>{this.props.leftDesc}</strong>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-4 mb-2">
                <div
                  className="hotel-room text-center"
                  style={{ background: 'transparent' }}
                >
                  <YouTube
                    videoId={this.youtube_parser(this.props.midVideo)}
                    onReady={this.onReady}
                    className="youtube"
                    opts={{ height: `${this.state.height}px` }}
                  />

                  <div
                    className="hotel-room-body"
                    style={{ paddingTop: '32px' }}
                  >
                    <h3 className="heading mb-0" style={{ fontFamily: 'Oswald' }}>{this.props.midTitle}</h3>
                    <strong className="price" style={{ fontFamily: 'Montserrat' }}>{this.props.midDesc}</strong>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-4 mb-2">
                <div
                  className="hotel-room text-center"
                  style={{ background: 'transparent' }}
                >
                  <a href="#" className="d-block mb-0 thumbnail">
                    <img
                      src={this.props.rightPic}
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                  <div
                    className="hotel-room-body"
                    style={{ paddingTop: '32px' }}
                  >
                    <h3 className="heading mb-0" style={{ fontFamily: 'Oswald' }}>{this.props.rightTitle}</h3>
                    <strong className="price" style={{ fontFamily: 'Montserrat' }}>{this.props.rightDesc}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="site-section bg-light">
          <div className="container">
            <div className="col-md-6 mx-auto text-center mb-5 section-heading">
              <h2 className="mb-5" style={{ fontFamily: 'Oswald' }}>
                Vision and Goals
              </h2>
            </div>
            <div className="row">{this.renderVisions(this.props.vision)}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
