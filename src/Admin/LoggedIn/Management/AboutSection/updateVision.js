import React from 'react';
import firebase from 'firebase';
import { database } from '../../../../config/firebase';

export default class UpdateVision extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vision: this.props.vision,
      toggle: false
    };
  }

  onTitleChange(e) {
    const vision = {
      ...this.state.vision,
      title: e.target.value
    };
    this.setState({ vision });
  }

  onDescriptionChange(e) {
    const vision = {
      ...this.state.vision,
      description: e.target.value
    };
    this.setState({ vision });
  }

  onUpdate() {
    const update = { ...this.state.vision };
    database
      .collection('tedxhcmussh-data')
      .doc('about')
      .update({
        visions: firebase.firestore.FieldValue.arrayRemove(this.props.vision)
      })
      .then(() =>
        database
          .collection('tedxhcmussh-data')
          .doc('about')
          .update({ visions: firebase.firestore.FieldValue.arrayUnion(update) })
      );
    this.setState({ toggle: false });
  }

  render() {
    const { vision } = this.state;
    if (!this.state.toggle) {
      return (
        <div className="col-12">
          <p>{vision.title}</p>
          <p>{vision.description}</p>
          <button onClick={() => this.setState({ toggle: true })}>Edit</button>
        </div>
      );
    }
    return (
      <div className="col-12">
        <input
          type="text"
          value={vision.title}
          onChange={e => this.onTitleChange(e)}
        />
        <textarea
          value={vision.description}
          onChange={e => this.onDescriptionChange(e)}
        />
        <button onClick={this.onUpdate.bind(this)}>Save</button>
        <button
          onClick={() =>
            this.setState({ toggle: false, vision: this.props.vision })
          }
        >
          Cancel
        </button>
      </div>
    );
  }
}
