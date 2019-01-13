import React from 'react';
import Modal from 'react-responsive-modal';
import firebase from 'firebase';
import ImageManagement from '../../../ImageMangement/imageManagement';

class AddSponsor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      website: '',
      logo: '',
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
    this.setState({ logo: url }, () => console.log(this.state.logo));
  }

  onAddSponsor() {
    const sponsorsRef = firebase.database().ref('conference/sponsors');
    const newSponsor = {
      website: this.state.website,
      logo: this.state.logo
    };
    sponsorsRef
      .push(newSponsor)
      .then(() => alert('Sponsor added'))
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
          placeholder="website"
          value={this.state.website}
          onChange={e => this.setState({ website: e.target.value })}
        />
        <img className="img-fluid" src={this.state.logo} alt="" />
        <button onClick={this.openModalPicture}>Select logo</button>
        <Modal
          open={this.state.togglePicture}
          onClose={this.closeModalPicture}
          center
        >
          <ImageManagement
            category="sponsors"
            closeModal={this.closeModalPicture}
            pick={this.pickImg.bind(this)}
          />
        </Modal>
        <button
          onClick={() => {
            this.onAddSponsor();
            this.props.closeModal();
          }}
        >
          Add sponsor
        </button>
      </div>
    );
  }
}

export default AddSponsor;
