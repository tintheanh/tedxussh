import React from 'react';
import { Parallax } from 'react-parallax';

const toVNDate = inputDate => {
  if (inputDate) {
    const date = inputDate.split('-');
    const year = date[0];
    let month = date[1];
    let day = date[2];
    if (parseInt(month) < 10) {
      month = month.substring(1, 2);
    }
    if (parseInt(day) < 10) {
      day = day.substring(1, 2);
    }
    return `${day}/${month}/${year}`;
  }
  return '';
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
              <span style={{ fontWeight: '500' }}>Địa điểm:</span>{' '}
              {props.audience}
            </p>
            <p className="p-2 event-description">
              <span style={{ fontWeight: '500' }}>Thời gian:</span> {props.startTime}{' '}
              - {props.endTime} ngày {toVNDate(props.date)}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Parallax>
);

export default ConferenceHeader;
