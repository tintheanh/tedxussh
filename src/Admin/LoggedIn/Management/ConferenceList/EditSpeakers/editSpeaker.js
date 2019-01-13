import React from 'react';
import Modal from 'react-responsive-modal';
import firebase from 'firebase';
import ImageManagement from '../../ImageMangement/imageManagement';
import AddSpeaker from './AddSpeaker/addSpeaker';

class EditSpeakers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speakerSelected: '',

      changedName: '',
      changedOccupation: '',
      changedIntroduction: '',
      changedPicture: '',

      focus: [],

      modalAddSpeaker: false,
      modalEditPicture: false
    };
    this.openModalAddSpeaker = this.openModalAddSpeaker.bind(this);
    this.closeModalAddSpeaker = this.closeModalAddSpeaker.bind(this);

    this.openModalEditPicture = this.openModalEditPicture.bind(this);
    this.closeModalEditPicture = this.closeModalEditPicture.bind(this);
  }

  openModalAddSpeaker() {
    this.setState({ modalAddSpeaker: true });
  }

  closeModalAddSpeaker() {
    this.setState({ modalAddSpeaker: false });
  }

  openModalEditPicture() {
    this.setState({ modalEditPicture: true });
  }

  closeModalEditPicture() {
    this.setState({ modalEditPicture: false });
  }

  onNameChange(e) {
    e.preventDefault();
    const focus = [...this.state.focus];
    if (!focus.includes('name')) {
      focus.push('name');
    }
    this.setState({ changedName: e.target.value, focus }, () =>
      console.log(this.state.changedName, this.state.focus)
    );
  }

  onOccupationChange(e) {
    e.preventDefault();
    const focus = [...this.state.focus];
    if (!focus.includes('occupation')) {
      focus.push('occupation');
    }
    this.setState({ changedOccupation: e.target.value, focus }, () =>
      console.log(this.state.changedOccupation, this.state.focus)
    );
  }

  onIntroductionChange(e) {
    e.preventDefault();
    const focus = [...this.state.focus];
    if (!focus.includes('introduction')) {
      focus.push('introduction');
    }
    this.setState({ changedIntroduction: e.target.value, focus }, () =>
      console.log(this.state.changedIntroduction, this.state.focus)
    );
  }

  onPictureChange(pic) {
    // this.setState({ changedPicture: pic });
    // const speakers = [...this.props.speakers];
    // speakers[this.state.speakerSelected].picture = pic;

    // this.props.updatePicture('speakers');
    const update = {
      picture: pic
    };

    firebase
      .database()
      .ref(`conference/speakers/${this.state.speakerSelected}`)
      .update(update);
  }

  deleteSpeaker(speaker) {
    const ask = window.confirm(`Want to delete ${speaker.name}?`);
    if (ask) {
      firebase.database().ref(`conference/speakers/${speaker.id}`).remove();
    } else console.log('Stopped');
  }

  onSaveChanges(speaker) {
    const updatedSpeaker = {
      id: speaker.id,
      name:
        this.state.changedName === '' && !this.state.focus.includes('name')
          ? speaker.name
          : this.state.changedName,
      occupation:
        this.state.changedOccupation === '' &&
        !this.state.focus.includes('occupation')
          ? speaker.occupation
          : this.state.changedOccupation,
      introduction:
        this.state.changedIntroduction === '' &&
        !this.state.focus.includes('introduction')
          ? speaker.introduction
          : this.state.changedIntroduction,
      picture: speaker.picture
    };
    // console.log('saved', updatedSpeaker.id);
    this.props.updateOneSpeaker(updatedSpeaker);
    this.setState({ speakerSelected: '' });
  }

  renderRow(startIndex, endIndex, imgs) {
    return imgs.slice(startIndex, endIndex).map(speaker => {
      if (this.state.speakerSelected !== speaker.id) {
        return (
          <div className="col-3" key={speaker.id}>
            <div className="hotel-room text-center notransition">
              <div className="d-block mb-0 thumbnail notransition">
                <img
                  src={speaker.picture}
                  className="img-fluid notransition"
                  alt=""
                />
              </div>
              <div className="hotel-room-body">
                <div>
                  <h3 className="heading mb-0">{speaker.name}</h3>
                  <strong className="price">{speaker.occupation}</strong>
                  <p>{speaker.introduction}</p>
                </div>
              </div>
              <button
                onClick={() =>
                  this.setState({
                    speakerSelected: speaker.id,
                    changedName: '',
                    changedOccupation: '',
                    changedIntroduction: '',
                    focus: []
                  })
                }
              >
                Edit
              </button>
              <button onClick={this.deleteSpeaker.bind(this, speaker)}>
                Delete
              </button>
            </div>
          </div>
        );
      }
      return (
        <div className="col-3" key={speaker.id}>
          <div className="hotel-room text-center notransition">
            <div className="d-block mb-0 thumbnail notransition">
              <img
                src={speaker.picture}
                className="img-fluid notransition"
                alt=""
                onClick={this.openModalEditPicture}
              />
              <Modal
                open={this.state.modalEditPicture}
                onClose={this.closeModalEditPicture}
                center
              >
                <ImageManagement
                  category="speakers"
                  pick={this.onPictureChange.bind(this)}
                  closeModal={this.closeModalEditPicture}
                />
              </Modal>
            </div>
            <div className="hotel-room-body">
              <div>
                <input
                  type="text"
                  defaultValue={speaker.name}
                  onChange={this.onNameChange.bind(this)}
                />
                <input
                  type="text"
                  defaultValue={speaker.occupation}
                  onChange={this.onOccupationChange.bind(this)}
                />
                <textarea
                  defaultValue={speaker.introduction}
                  onChange={this.onIntroductionChange.bind(this)}
                />
              </div>
            </div>
            <button onClick={this.onSaveChanges.bind(this, speaker)}>
              Save
            </button>
            <button onClick={() => this.setState({ speakerSelected: '' })}>
              Cancel
            </button>
          </div>
        </div>
      );
    });
  }

  renderImg(totalRows, imgs) {
    let startIndex = -4;
    let endIndex = startIndex + 4;
    const temp = Array.from({ length: totalRows }, () =>
      Math.floor(Math.random())
    );

    return temp.map((_, i) => {
      startIndex += 4;
      endIndex += 4;
      return (
        <div className="row" key={i}>
          {this.renderRow(startIndex, endIndex, imgs)}
        </div>
      );
    });
  }

  renderAllImg(imgs) {
    if (imgs.length > 0) {
      if (imgs.length % 4 === 0) {
        return this.renderImg(imgs.length / 4, imgs);
      }
      return this.renderImg(imgs.length / 4 + 1, imgs);
    }
    return <h2>No imgs available</h2>;
  }

  render() {
    return (
      <div>
        {this.renderAllImg(this.props.speakers)}
        <button onClick={this.openModalAddSpeaker}>Add</button>
        <Modal
          open={this.state.modalAddSpeaker}
          onClose={this.closeModalAddSpeaker}
          center
        >
          <AddSpeaker closeModal={this.closeModalAddSpeaker} />
        </Modal>
        <button
          onClick={() => {
            this.props.closeModalSpeakers();
          }}
        >
          Done
        </button>
      </div>
    );
  }
}
export default EditSpeakers;
