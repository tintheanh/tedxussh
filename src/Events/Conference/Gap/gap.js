import React from 'react';

const Gap = props => (
  <div
    style={{
      backgroundImage: `url(${props.gap.picture})`,
      height: '400px',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}
    className="text-vertical-center"
  >
    <h1>{props.gap.header}</h1>
    <p>{props.gap.detail}</p>
  </div>
);

export default Gap;
