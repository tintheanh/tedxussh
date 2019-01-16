import React from 'react';
// import { Parallax } from 'react-scroll-parallax';

const ConferenceHeader = props => (
  <div
    className="con-header"
    data-aos="fade"
    style={{
      backgroundImage: `url(${props.background})`
    }}
  />
);

export default ConferenceHeader;
