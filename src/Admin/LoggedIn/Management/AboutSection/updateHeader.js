import React from 'react';
import { updateData } from '../../../../config/firebase';

export default class UpdateHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      header: this.props.header
    };
  }

  onUpdate() {
    const update = {
      header: this.state.header
    };
    updateData('about', update).catch(err => alert(err.message));
  }

  render() {
    if (!this.state.toggle) {
      return (
        <div className="row style-section">
          <div className="col-12">
            <h3>About title</h3>
          </div>
          <div className="col-12">
            <p>{this.state.header}</p>
          </div>
          <div className="col-12">
            <button onClick={() => this.setState({ toggle: true })}>
              Edit header
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="row style-section">
        <input
          type="text"
          value={this.state.header}
          onChange={e => this.setState({ header: e.target.value })}
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
              this.setState({ toggle: false, header: this.props.header })
            }
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}
