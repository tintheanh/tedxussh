import React from 'react';

const ConferenceHeader = props => (
  <div
    className="site-blocks-cover overlay"
    data-aos="fade"
    data-stellar-background-ratio="0.5"
    style={{ backgroundImage: `url(${props.background})` }}
  />
);

export default ConferenceHeader;
