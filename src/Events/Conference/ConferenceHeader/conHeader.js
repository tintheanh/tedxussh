import React from 'react';
// import { Parallax } from 'react-scroll-parallax';

const ConferenceHeader = props => (
  <div
    className="site-blocks-cover"
    style={{
      backgroundImage: `url(${props.background})`,
      height: 'calc(30vh)'
    }}
  />
);

export default ConferenceHeader;
