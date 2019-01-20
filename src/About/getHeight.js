import React from 'react';
import sizeMe from 'react-sizeme';

const GetHeight = props => (
  <div
    className="d-block mb-0 thumbnail"
    // ref={this.element}
  >
    <img src={props.img} alt="" className="img-fluid" />
  </div>
);

export default sizeMe({ monitorHeight: true })(GetHeight);
