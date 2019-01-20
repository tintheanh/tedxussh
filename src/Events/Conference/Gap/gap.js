import React from 'react';
import { Parallax } from 'react-parallax';

const Gap = props => (
  <Parallax
    bgImage={props.gap.picture}
    strength={500}
    style={{ height: '400px' }}
    // bgImageSizes={{ width: 1440, height: 810 }}
  >
    <div className="container" style={{ height: '100%' }}>
      <div className="row align-items-center" style={{ height: '100%' }}>
        <div className="col-lg-6 col-md-12 text-vertical-center" style={{ height: '100%' }}>
          <h1 className="gap-header mb-1">{props.gap.header}</h1>
          <p className="gap-detail">{props.gap.detail}</p>
        </div>
      </div>
    </div>
  </Parallax>
);

export default Gap;
