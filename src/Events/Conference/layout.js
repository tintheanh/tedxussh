import React from 'react';

const Conference = props => {
  console.log(props.conference.description);
  return (
    <div
      className="site-blocks-cover overlay"
      data-aos="fade"
      data-stellar-background-ratio="0.5"
    >
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-7 text-center">
            <h1 className="mb-2">Welcome To Suites</h1>
            <h2 className="caption">Hotel &amp; Resort</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conference;
