import React from 'react';
import { updateData } from '../../../../config/firebase';

export default class UpdateDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleEditDescription: false,
      description: this.props.description
    };
  }

  onUpdate() {
    const update = {
      description: this.state.description
    };
    updateData('home', update).catch(err => alert(err.message));
  }

  render() {
    if (!this.state.toggleEditDescription) {
      return (
        <div className="row style-section">
          <div className="col-12">
            <h3>Home description</h3>
          </div>
          <div className="col-12">
            <p>{this.state.description}</p>
          </div>
          <div className="col-12">
            <button onClick={() => this.setState({ toggleEditDescription: true })}>
              Edit description
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="row style-section">
        <textarea
          value={this.state.description}
          onChange={e => this.setState({ description: e.target.value })}
        />
        <div className="col-12">
          <button
            onClick={() => {
              this.onUpdate();
              this.setState({ toggleEditDescription: false });
            }}
          >
            Save
          </button>
          <button
            onClick={() =>
              this.setState({ toggleEditDescription: false, description: this.props.description })
            }
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}
