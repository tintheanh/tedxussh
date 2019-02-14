import React from 'react';
import { updateData } from '../../../../config/firebase';

export default class UpdateEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      email: this.props.email
    };
  }

  onUpdate() {
    const update = {
      hqAddress: this.state.email
    };
    updateData('contact', update).catch(err => alert(err.message));
  }

  render() {
    if (!this.state.toggle) {
      return (
        <div className="row style-section">
          <div className="col-12">
            <h3>Email</h3>
          </div>
          <div className="col-12">
            <p>{this.state.email}</p>
          </div>
          <div className="col-12">
            <button onClick={() => this.setState({ toggle: true })}>
              Edit email
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="row style-section">
        <div className="col-12">
          <h3>Email</h3>
        </div>
        <textarea
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <div className="col-12">
          <button
            onClick={() => {
              this.onUpdate();
              this.setState({ toggle: false });
            }}
          >
            Save
          </button>
          <button
            onClick={() =>
              this.setState({ toggle: false, email: this.props.email })
            }
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}
