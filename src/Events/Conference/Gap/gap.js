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
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 col-md-12">
          <h1 className="gap-header mb-1">{props.gap.header}</h1>
          <p className="gap-detail">{props.gap.detail}</p>
        </div>
      </div>
    </div>
  </div>
);

export default Gap;
