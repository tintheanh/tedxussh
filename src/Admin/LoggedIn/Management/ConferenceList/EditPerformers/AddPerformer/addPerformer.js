import React from 'react';
import Modal from 'react-responsive-modal';
import firebase from 'firebase';
import ImageManagement from '../../../ImageMangement/imageManagement';

class AddHost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      occupation: '',
      introduction: '',
      picture: '',

      modalPic: false
    };

    this.openModalPic = this.openModalPic.bind(this);
    this.closeModalPic = this.closeModalPic.bind(this);
  }

  openModalPic() {
    this.setState({ modalPic: true });
  }

  closeModalPic() {
    this.setState({ modalPic: false });
  }

  selectPic(newPic) {
    this.setState({ picture: newPic });
  }

  onAddPerformer() {
    const newPerformer = {
      name: this.state.name,
      occupation: this.state.occupation,
      picture: this.state.picture,
      introduction: this.state.introduction
    };

    firebase
      .database()
      .ref('conference/performers/performerList')
      .push(newPerformer)
      .then(() => {
        alert('Added');
        this.props.closeModal();
      })
      .catch(err => alert(err.message));
  }

  render() {
    const { name, occupation, introduction, picture } = this.state;
    return (
      <div>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <input
          type="text"
          placeholder="occupation"
          value={occupation}
          onChange={e => this.setState({ occupation: e.target.value })}
        />
        <textarea
          placeholder="introduction"
          value={introduction}
          onChange={e => this.setState({ introduction: e.target.value })}
        />
        <img src={picture} alt="" className="img-fluid" />
        <button onClick={this.openModalPic}>Select picture</button>
        <Modal open={this.state.modalPic} onClose={this.closeModalPic} center>
          <ImageManagement
            category="performers"
            closeModal={this.closeModalPic}
            pick={this.selectPic.bind(this)}
          />
        </Modal>
        <button onClick={this.onAddPerformer.bind(this)}>Add</button>
        <button onClick={() => this.props.closeModal()}>Done</button>
      </div>
    );
  }
}

export default AddHost;
