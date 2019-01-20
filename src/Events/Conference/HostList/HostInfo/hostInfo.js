import React from 'react';

const HostInfo = props => (
  <div className="row">
    <div className="col-5">
      <img className="img-fluid" src={props.host.picture} alt="" />
    </div>
    <div className="col-7">
      <h3 style={{ fontFamily: 'Oswald' }}>{props.host.name}</h3>
      <h5 style={{ fontFamily: 'Oswald' }}>{props.host.occupation}</h5>
      <p style={{ fontFamily: 'Montserrat' }}>{props.host.introduction}</p>
    </div>
  </div>
);

export default HostInfo;
