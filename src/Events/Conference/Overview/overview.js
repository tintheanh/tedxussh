import React from 'react';
import { Parallax } from 'react-parallax';

const Overview = props => (
  <Parallax
    bgImage={props.background}
    strength={500}
    className="home-parallax"
    // bgImageSizes={{ width: 1440, height: 810 }}
  >
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto text-center mb-5 section-heading">
          <h2 className="mb-5" style={{ fontFamily: 'Roboto' }}>
            Overview
          </h2>
          <p>{props.address}</p>
        </div>
      </div>
      {/* <div
        className="row text-center overview-section"
        // style={{ fontFamily: 'Roboto', fontSize: '22px', margin: '0 234px' }}
      >
        {props.description}
      </div> */}
    </div>
  </Parallax>
);

export default Overview;
