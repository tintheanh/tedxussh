import React from 'react';

const Overview = props => (
  <div className="site-section bg-light">
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto text-center mb-5 section-heading">
          <h2 className="mb-5">Overview</h2>
        </div>
      </div>
      <div className="row text-center">{props.description}</div>
    </div>
  </div>
);

export default Overview;
