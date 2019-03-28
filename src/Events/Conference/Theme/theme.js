import React from 'react';
import { Parallax } from 'react-parallax';

const Theme = props => (
  <Parallax
    bgImage={props.theme.picture}
    strength={500}
    style={{ height: '400px' }}
  >
    <div className="container" style={{ height: '100%' }}>
      <div className="row align-items-center" style={{ height: '100%' }}>
        <div className="col-lg-6 col-md-12 text-vertical-center" style={{ height: '100%' }}>
          <h1 className="gap-header mb-1">{props.theme.title}</h1>
          <p className="gap-detail">{props.theme.description}</p>
        </div>
      </div>
    </div>
  </Parallax>
);

export default Theme;
