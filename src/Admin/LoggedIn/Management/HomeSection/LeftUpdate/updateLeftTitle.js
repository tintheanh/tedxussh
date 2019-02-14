import React from 'react';
import { updateData } from '../../../../../config/firebase';

export default class UpdateLeftTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      title: this.props.title
    };
  }

  onUpdate() {
    const update = {
      left: {
        title: this.state.title
      }
    };
    updateData('home', update).catch(err => alert(err.message));
  }

  render() {
    if (!this.state.toggle) {
      return (
        <div className="col-12">
          <div>
            <p>{this.state.title}</p>
          </div>
          <div>
            <button onClick={() => this.setState({ toggle: true })}>
              Edit title
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="col-12">
        <div>
          <input
            type="text"
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
        </div>
        <div>
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
