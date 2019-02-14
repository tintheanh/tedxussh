import React from 'react';
import { updateData } from '../../../../../config/firebase';

export default class UpdateLeftDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      description: this.props.description
    };
  }

  onUpdate() {
    const update = {
      left: {
        description: this.state.description
      }
    };
    updateData('home', update).catch(err => alert(err.message));
  }

  render() {
    if (!this.state.toggle) {
      return (
        <div className="col-12">
          <div>
            <p>{this.state.description}</p>
          </div>
          <div>
            <button onClick={() => this.setState({ toggle: true })}>
              Edit description
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="col-12">
        <div>
          <textarea
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
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
              this.setState({ toggle: false, description: this.props.description })
            }
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}
