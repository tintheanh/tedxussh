import React from 'react';
import Modal from 'react-responsive-modal';
import firebase from 'firebase';
import ImageManagement from '../../../ImageMangement/imageManagement';

class AddSpeaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      occupation: '',
      introduction: '',
      picture: '',
      togglePicture: false
    };
    this.openModalPicture = this.openModalPicture.bind(this);
    this.closeModalPicture = this.closeModalPicture.bind(this);
  }

  openModalPicture() {
    this.setState({ togglePicture: true });
  }

  closeModalPicture() {
    this.setState({ togglePicture: false });
  }

  pickImg(url) {
    this.setState({ picture: url }, () => console.log(this.state.picture));
  }

  onAddSpeaker() {
    const speakersRef = firebase.database().ref('conference/speakers');
    const newSpeaker = {
      name: this.state.name,
      occupation: this.state.occupation,
      introduction: this.state.introduction,
      picture: this.state.picture
    };
    speakersRef
      .push(newSpeaker)
      .then(() => alert('Speaker added'))
      .catch(err => {
        console.error(err);
        alert('Error');
      });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="name"
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <br />
        <input
          type="text"
          placeholder="occupation"
          value={this.state.occupation}
          onChange={e => this.setState({ occupation: e.target.value })}
        />
        <br />
        <input
          type="text"
          placeholder="introduction"
          value={this.state.introduction}
          onChange={e => this.setState({ introduction: e.target.value })}
        />
        <br />
        <img className="img-fluid" src={this.state.picture} alt="" />
        <button onClick={this.openModalPicture}>Select picture</button>
        <Modal
          open={this.state.togglePicture}
          onClose={this.closeModalPicture}
          center
        >
          <ImageManagement
            category="speakers"
            closeModal={this.closeModalPicture}
            pick={this.pickImg.bind(this)}
          />
        </Modal>
        <button
          onClick={() => {
            this.onAddSpeaker();
            this.props.closeModal();
          }}
        >
          Add Speaker
        </button>
      </div>
    );
  }
}

export default AddSpeaker;
