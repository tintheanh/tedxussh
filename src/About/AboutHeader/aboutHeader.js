import React from 'react';
import PropTypes from 'prop-types';

const AboutHeader = props => (
  <div
    className="about-header text-vertical-center"
    style={{
      backgroundImage: `url(${props.background})`
    }}
  >
    <div className="row" style={{ width: '100%', margin: '0' }}>
      <div className="col-md-12">
        <h1 className="about-title">{props.header}</h1>
      </div>
    </div>
  </div>
);

AboutHeader.propTypes = {
  background: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired
};

export default AboutHeader;
