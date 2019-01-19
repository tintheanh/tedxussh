import React from 'react';
import { Parallax } from 'react-scroll-parallax';

const toVNDate = inputDate => {
  const date = inputDate.split('-');
  return `${date[2]}/${date[1]}/${date[0]}`;
};

const ConferenceHeader = props => (
  <Parallax
    // disabled={this.state.width <= 414 ? true : false}
    slowerScrollRate
    offsetYMax={30}
    offsetYMin={-30}
    tag="figure"
  >
    <div
      className="site-blocks-cover overlay header-cover"
      data-aos="fade"
      style={{ backgroundImage: `url(${props.background})` }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="header-wrapper">
            <div className="col-lg-12 col-md-12">
              <h1 className="event-title mb-1">{props.title}</h1>
              <p className="p-2 event-description">{props.description}</p>
              <p className="p-2 event-description">
                <span style={{ fontWeight: '500' }}>Audience:</span>{' '}
                {props.audience}
              </p>
              <p className="p-2 event-description">
                <span style={{ fontWeight: '500' }}>Time:</span>{' '}
                {props.startTime} - {props.endTime} on {toVNDate(props.date)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Parallax>
);

export default ConferenceHeader;
