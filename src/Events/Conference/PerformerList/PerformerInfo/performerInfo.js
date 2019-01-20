import React from 'react';

const HostInfo = props => (
  <div className="row">
    <div className="col-5">
      <img className="img-fluid" src={props.performer.picture} alt="" />
    </div>
    <div className="col-7">
      <h3 style={{ fontFamily: 'Oswald' }}>{props.performer.name}</h3>
      <h5 style={{ fontFamily: 'Oswald' }}>{props.performer.occupation}</h5>
      <p style={{ fontFamily: 'Montserrat' }}>{props.performer.introduction}</p>
    </div>
  </div>
);

export default HostInfo;
