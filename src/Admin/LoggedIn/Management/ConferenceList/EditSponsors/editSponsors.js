import React from 'react';
import firebase from 'firebase';
import Modal from 'react-responsive-modal';
import ImageManagement from '../../ImageMangement/imageManagement';
import AddSponsor from './AddSponsor/addSponsor';

class EditSponsors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sponsorSelected: '',
      changedWebsite: '',

      modalAdd: false,
      modalEditLogo: false
    };
    this.openModalAdd = this.openModalAdd.bind(this);
    this.closeModalAdd = this.closeModalAdd.bind(this);

    this.openModalEditLogo = this.openModalEditLogo.bind(this);
    this.closeModalEditLogo = this.closeModalEditLogo.bind(this);
  }

  openModalAdd() {
    this.setState({ modalAdd: true });
  }

  closeModalAdd() {
    this.setState({ modalAdd: false });
  }

  openModalEditLogo() {
    this.setState({ modalEditLogo: true });
  }

  closeModalEditLogo() {
    this.setState({ modalEditLogo: false });
  }

  onWebsiteChange(e) {
    this.setState({ changedWebsite: e.target.value });
  }

  onSaveChanges(sponsor) {
    const update = {
      logo: sponsor.logo,
      website: this.state.changedWebsite
    };

    firebase
      .database()
      .ref(`conference/sponsors/sponsorList/${sponsor.id}`)
      .update(update);
    this.setState({ sponsorSelected: '' });
  }

  onPictureChange(logo) {
    const update = {
      logo
    };

    firebase
      .database()
      .ref(`conference/sponsors/sponsorList/${this.state.sponsorSelected}`)
      .update(update);
  }

  deleteSponsor(sponsorID) {
    const ask = window.confirm('Sure to delete this sponsor?');
    if (ask) {
      firebase
        .database()
        .ref(`conference/sponsors/sponsorList/${sponsorID}`)
        .remove();
    } else console.log('stopped');
  }

  renderRow(startIndex, endIndex, imgs) {
    return imgs.slice(startIndex, endIndex).map(sponsor => {
      if (this.state.sponsorSelected !== sponsor.id) {
        return (
          <div className="col-3" key={sponsor.id}>
            <div className="hotel-room text-center notransition">
              <div className="d-block mb-0 thumbnail notransition">
                <img
                  src={sponsor.logo}
                  className="img-fluid notransition"
                  alt=""
                />
              </div>
              <p>{sponsor.website}</p>
              <button
                type="button"
                onClick={() =>
                  this.setState({
                    sponsorSelected: sponsor.id,
                    changedWebsite: ''
                  })
                }
              >
                Edit
              </button>
              <button onClick={this.deleteSponsor.bind(this, sponsor.id)}>
                Delete
              </button>
            </div>
          </div>
        );
      }
      return (
        <div className="col-3" key={sponsor.id}>
          <div className="hotel-room text-center notransition">
            <div className="d-block mb-0 thumbnail notransition">
              <img
                src={sponsor.logo}
                className="img-fluid notransition"
                alt=""
                onClick={this.openModalEditLogo}
              />
              <Modal
                open={this.state.modalEditLogo}
                onClose={this.closeModalEditLogo}
                center
              >
                <ImageManagement
                  category="sponsors"
                  pick={this.onPictureChange.bind(this)}
                  closeModal={this.closeModalEditLogo}
                />
              </Modal>
            </div>
            <input
              type="text"
              defaultValue={sponsor.website}
              onChange={this.onWebsiteChange.bind(this)}
            />
            <button
              type="button"
              onClick={this.onSaveChanges.bind(this, sponsor)}
            >
              Save
            </button>
            <button onClick={() => this.setState({ sponsorSelected: '' })}>
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
        {this.renderAllImg(this.props.sponsors)}
        <button
          onClick={() => {
            this.props.closeModal();
          }}
        >
          Done
        </button>
        <button onClick={this.openModalAdd}>Add</button>
        <Modal open={this.state.modalAdd} onClose={this.closeModalAdd} center>
          <AddSponsor closeModal={this.closeModalAdd} />
        </Modal>
      </div>
    );
  }
}

export default EditSponsors;
