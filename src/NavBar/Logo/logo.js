import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

const Logo = () => (
  <Link to="/" className="col-lg-2 col-4">
    <img
      id="logo"
      src={logo}
      alt="Logo"
      className="site-logo"
      style={{ width: '100%', padding: '0' }}
    />
  </Link>
);

export default Logo;
