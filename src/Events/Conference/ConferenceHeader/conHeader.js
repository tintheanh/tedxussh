import React from 'react';
import { Parallax } from 'react-parallax';

const toVNDate = inputDate => {
  const date = inputDate.split('-');
  return `${date[2]}/${date[1]}/${date[0]}`;
};

const ConferenceHeader = props => (
  <Parallax
    bgImage={props.background}
    strength={500}
    className="overview-parallax"
    // bgImageSizes={{ width: 1440, height: 810 }}
  >
    <div className="container" style={{ height: '100%' }}>
      <div className="row align-items-center" style={{ height: '100%' }}>
        <div className="header-wrapper">
          <div className="col-lg-12 col-md-12 text-vertical-center">
            <h1 className="event-title mb-1">{props.title}</h1>
            <p className="p-2 event-description">{props.description}</p>
            <p className="p-2 event-description">
              <span style={{ fontWeight: '500' }}>Location:</span>{' '}
              {props.audience}
            </p>
            <p className="p-2 event-description">
              <span style={{ fontWeight: '500' }}>Time:</span> {props.startTime}{' '}
              - {props.endTime} on {toVNDate(props.date)}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Parallax>
);

export default ConferenceHeader;
