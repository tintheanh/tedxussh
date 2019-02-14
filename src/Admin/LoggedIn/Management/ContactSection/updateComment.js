import React from 'react';
import { updateData } from '../../../../config/firebase';

export default class UpdateComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      comment: this.props.comment
    };
  }

  onUpdate() {
    const update = {
      comment: this.state.comment
    };
    updateData('contact', update).catch(err => alert(err.message));
  }

  render() {
    if (!this.state.toggle) {
      return (
        <div className="row style-section">
          <div className="col-12">
            <h3>Comment</h3>
          </div>
          <div className="col-12">
            <p>{this.state.comment}</p>
          </div>
          <div className="col-12">
            <button onClick={() => this.setState({ toggle: true })}>
              Edit comment
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="row style-section">
        <div className="col-12">
          <h3>Comment</h3>
        </div>
        <textarea
          value={this.state.comment}
          onChange={e => this.setState({ comment: e.target.value })}
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
              this.setState({ toggle: false, comment: this.props.comment })
            }
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}
