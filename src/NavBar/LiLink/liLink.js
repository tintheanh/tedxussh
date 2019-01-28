import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LiLink = props => (
  <li>
    <Link to={props.to} style={{ fontFamily: 'Montserrat' }}>
      {props.title}
    </Link>
  </li>
);

LiLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default LiLink;
