import React from 'react';
import Modal from 'react-responsive-modal';
import firebase from 'firebase';
import ImageManagement from '../../../ImageMangement/imageManagement';

class AddMem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      role: '',
      socialLink: '',
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

  onAddMember() {
    const newMem = {
      name: this.state.name,
      role: this.state.role,
      picture: this.state.picture,
      socialLink: this.state.socialLink
    };

    firebase
      .database()
      .ref('organizers/teamMem')
      .push(newMem)
      .then(() => {
        alert('Added');
        this.props.closeModal();
      })
      .catch(err => alert(err.message));
  }

  render() {
    const { name, role, socialLink, picture } = this.state;
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
          placeholder="role"
          value={role}
          onChange={e => this.setState({ role: e.target.value })}
        />
        <input
          type="text"
          placeholder="social link"
          value={socialLink}
          onChange={e => this.setState({ socialLink: e.target.value })}
        />
        <img src={picture} alt="" className="img-fluid" />
        <button onClick={this.openModalPic}>Select picture</button>
        <Modal open={this.state.modalPic} onClose={this.closeModalPic} center>
          <ImageManagement
            category="stockImages"
            closeModal={this.closeModalPic}
            pick={this.selectPic.bind(this)}
          />
        </Modal>
        <button onClick={this.onAddMember.bind(this)}>Add</button>
        <button onClick={() => this.props.closeModal()}>Done</button>
      </div>
    );
  }
}

export default AddMem;
