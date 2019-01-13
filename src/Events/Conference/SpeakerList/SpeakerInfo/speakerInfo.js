import React from 'react';

const SpeakerInfo = props => (
  <div className="row">
    <div className="col-5">
      <img className="img-fluid" src={props.speaker.picture} alt="" />
    </div>
    <div className="col-7">
      <h3>{props.speaker.name}</h3>
      <h3>{props.speaker.occupation}</h3>
      <p>{props.speaker.introduction}</p>
    </div>
  </div>
);

export default SpeakerInfo;
