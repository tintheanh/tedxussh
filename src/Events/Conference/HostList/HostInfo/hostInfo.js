import React from 'react';

const HostInfo = props => (
  <div className="row">
    <div className="col-5">
      <img className="img-fluid" src={props.host.picture} alt="" />
    </div>
    <div className="col-7">
      <h3>{props.host.name}</h3>
      <h5>{props.host.occupation}</h5>
      <p>{props.host.introduction}</p>
    </div>
  </div>
);

export default HostInfo;
