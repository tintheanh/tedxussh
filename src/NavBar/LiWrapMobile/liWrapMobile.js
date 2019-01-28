import React from 'react';
import PropTypes from 'prop-types';

const LiWrapMobile = props => (
  <ul className="site-nav-wrap" style={{ textTransform: 'uppercase' }}>{props.children}</ul>
);

LiWrapMobile.propTypes = {
  children: PropTypes.node.isRequired
};

export default LiWrapMobile;
