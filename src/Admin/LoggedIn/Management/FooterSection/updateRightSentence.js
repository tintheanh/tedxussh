import React from 'react';
import { updateData } from '../../../../config/firebase';

export default class UpdateMiddleSentence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      toggle: false
    };
  }

  onUpdate() {
    const update = {
      right: {
        sentence: this.state.data
      }
    };
    updateData('footer', update).catch(err => alert(err.message));
    this.setState({ toggle: false });
  }

  render() {
    if (!this.state.toggle) {
      return (
        <div className="row style-section">
          <div className="col-12">
            <h3>Right</h3>
          </div>
          <div className="col-12">
            <h5>Sentence</h5>
          </div>
          <div className="col-12">
            <p>{this.state.data}</p>
          </div>
          <button type="button" onClick={() => this.setState({ toggle: true })}>
            Edit
          </button>
        </div>
      );
    }
    return (
      <div className="row style-section">
        <div className="col-12">
          <h3>Right</h3>
        </div>
        <div className="col-12">
          <h5>Sentence</h5>
        </div>
        <div className="col-12">
          <textarea
            value={this.state.data}
            onChange={e => this.setState({ data: e.target.value })}
          />
        </div>
        <button onClick={this.onUpdate.bind(this)}>Save</button>
        <button
          onClick={() =>
            this.setState({ toggle: false, data: this.props.data })
          }
        >
          Cancel
        </button>
      </div>
    );
  }
}
