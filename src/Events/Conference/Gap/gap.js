import React from 'react';

const Gap = props => (
  <div
    style={{
      backgroundImage: `url(${props.img})`,
      height: '400px',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}
    className="text-vertical-center"
  >
    <h1>Theme</h1>
  </div>
);

export default Gap;
