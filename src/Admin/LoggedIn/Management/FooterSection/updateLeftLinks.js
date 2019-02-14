import React from 'react';
import { updateData } from '../../../../config/firebase';

export default class UpdateLeftLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      toggle: false
    };
  }

  onChangeFb(e) {
    const data = {
      ...this.state.data,
      facebook: e.target.value
    };

    this.setState({ data });
  }

  onChangeYT(e) {
    const data = {
      ...this.state.data,
      youtube: e.target.value
    };

    this.setState({ data });
  }

  onUpdate() {
    const update = {
      left: {
        links: { ...this.state.data }
      }
    };
    updateData('footer', update).catch(err => alert(err.message));
    this.setState({ toggle: false });
  }

  render() {
    const { facebook, youtube } = this.state.data;
    if (!this.state.toggle) {
      return (
        <div className="row style-section">
          <div className="col-12">
            <h3>Left</h3>
          </div>
          <div className="col-12">
            <h5>Facebook link</h5>
          </div>
          <div className="col-12">
            <p>{facebook}</p>
          </div>
          <div className="col-12">
            <h5>Youtube link</h5>
          </div>
          <div className="col-12">
            <p>{youtube}</p>
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
          <h3>Left</h3>
        </div>
        <div className="col-12">
          <h5>Facebook link</h5>
        </div>
        <div className="col-12">
          <input
            type="text"
            value={facebook}
            onChange={e => this.onChangeFb(e)}
          />
        </div>
        <div className="col-12">
          <h5>Youtube link</h5>
        </div>
        <div className="col-12">
          <input
            type="text"
            value={youtube}
            onChange={e => this.onChangeYT(e)}
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
