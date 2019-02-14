import React from 'react';
import { updateData } from '../../../../config/firebase';

export default class UpdateTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      title: this.props.title
    };
  }

  onUpdate() {
    const update = {
      title: this.state.title
    };
    updateData('organizer', update).catch(err => alert(err.message));
  }

  render() {
    if (!this.state.toggle) {
      return (
        <div className="row style-section">
          <div className="col-12">
            <h3>Title</h3>
          </div>
          <div className="col-12">
            <p>{this.state.title}</p>
          </div>
          <div className="col-12">
            <button onClick={() => this.setState({ toggle: true })}>
              Edit title
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="row style-section">
        <input
          type="text"
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
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
              this.setState({ toggle: false, title: this.props.title })
            }
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}
