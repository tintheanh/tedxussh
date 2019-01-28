import React from 'react';

const LangPicking = props => (
  <li onClick={() => props.toggleLang()} style={{ cursor: 'pointer' }}>
    <img src={props.img} alt="vi" width="32" height="32" />
  </li>
);

export default LangPicking;
