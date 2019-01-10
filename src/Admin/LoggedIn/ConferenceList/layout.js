import React from 'react';

const ConferenceList = () => (
  <div className="page-wrapper">
    <div className="page-breadcrumb">
      <div className="row">
        <div className="col-12 d-flex no-block align-items-center">
          <h4 className="page-title">Dashboard</h4>
          <div className="ml-auto text-right">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Library
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ConferenceList;
