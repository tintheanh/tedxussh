import React from 'react';
import PropTypes from 'prop-types';

const LiWrap = props => (
  <ul className="site-menu js-clone-nav d-none d-lg-block">{props.children}</ul>
);

LiWrap.propTypes = {
  children: PropTypes.node.isRequired
};

export default LiWrap;
