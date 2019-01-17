import React from 'react';

const ConferenceHeader = props => (
  <div
    className="con-header"
    style={{
      backgroundImage: `url(${props.background})`
    }}
  />
);

export default ConferenceHeader;
