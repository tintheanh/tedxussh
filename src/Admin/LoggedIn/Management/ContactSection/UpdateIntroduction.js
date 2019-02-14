import React from 'react';
import { updateData } from '../../../../config/firebase';

export default class UpdateIntroduction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      introduction: this.props.introduction
    };
  }

  onUpdate() {
    const update = {
      hqName: this.state.introduction
    };
    updateData('contact', update).catch(err => alert(err.message));
  }

  render() {
    if (!this.state.toggle) {
      return (
        <div className="row style-section">
          <div className="col-12">
            <h3>Introduction</h3>
          </div>
          <div className="col-12">
            <p>{this.state.introduction}</p>
          </div>
          <div className="col-12">
            <button onClick={() => this.setState({ toggle: true })}>
              Edit introduction
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="row style-section">
        <div className="col-12">
          <h3>Introduction</h3>
        </div>
        <textarea
          value={this.state.introduction}
          onChange={e => this.setState({ introduction: e.target.value })}
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
              this.setState({
                toggle: false,
                introduction: this.props.introduction
              })
            }
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}
