import React from 'react';
import { Parallax } from 'react-scroll-parallax';

const ConferenceHeader = props => (
  <Parallax
    // disabled={this.state.width <= 414 ? true : false}
    slowerScrollRate
    offsetYMax={30}
    offsetYMin={-30}
    tag="figure"
  >
    <div
      className="site-blocks-cover overlay"
      data-aos="fade"
      style={{ backgroundImage: `url(${props.background})` }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12 col-md-12">
            <h1 className="event-title mb-1">{props.title}</h1>
            <p className="p-2 event-description">{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  </Parallax>
);

export default ConferenceHeader;
