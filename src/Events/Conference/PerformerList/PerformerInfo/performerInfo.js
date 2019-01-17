import React from 'react';

const HostInfo = props => (
  <div className="row">
    <div className="col-5">
      <img className="img-fluid" src={props.performer.picture} alt="" />
    </div>
    <div className="col-7">
      <h3>{props.performer.name}</h3>
      <h3>{props.performer.occupation}</h3>
      <p>{props.performer.introduction}</p>
    </div>
  </div>
);

export default HostInfo;
