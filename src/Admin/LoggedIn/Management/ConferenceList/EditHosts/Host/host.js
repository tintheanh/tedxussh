import React from 'react';
import firebase from 'firebase';
import Modal from 'react-responsive-modal';
import ImageManagement from '../../../ImageMangement/imageManagement';

class Speaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleEdit: false,
      modalEditPic: false,

      newIntroduction: this.props.host.introduction,
      newName: this.props.host.name,
      newOccupation: this.props.host.occupation,
      newPic: this.props.host.picture
    };

    this.openModalEditPic = this.openModalEditPic.bind(this);
    this.closeModalEditPic = this.closeModalEditPic.bind(this);
  }

  openModalEditPic() {
    this.setState({ modalEditPic: true });
  }

  closeModalEditPic() {
    this.setState({ modalEditPic: false });
  }

  selectPic(newPic) {
    this.setState({ newPic });
  }

  onUpdate(id) {
    const update = {
      introduction: this.state.newIntroduction,
      name: this.state.newName,
      occupation: this.state.newOccupation,
      picture: this.state.newPic
    };

    firebase
      .database()
      .ref(`conference/hosts/${id}`)
      .update(update)
      .then(() => {
        alert('Updated');
        this.setState({ toggleEdit: false });
      })
      .catch(err => alert(err.message));
  }

  onDelete(id) {
    const ask = window.confirm('Sure to delete?');
    if (ask) {
      firebase
        .database()
        .ref(`conference/hosts/${id}`)
        .remove()
        .then(() => this.setState({ toggleEdit: false }))
        .catch(err => alert(err.message));
    }
  }

  render() {
    return !this.state.toggleEdit ? (
      <div className="col-md-6 col-lg-3 mb-2">
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img
              src={this.props.host.picture}
              alt=""
              className="img-fluid notransition"
            />
          </div>
          <div className="hotel-room-body">
            <h3 className="text-left" style={{ margin: '0' }}>
              {this.props.host.name}
            </h3>
            <p className="text-left" style={{ margin: '0' }}>
              {this.props.host.occupation}
            </p>
            <p
              className="text-left"
              style={{
                margin: '0'
              }}
            >
              {this.props.host.introduction}
            </p>
          </div>
        </div>
        <button onClick={() => this.setState({ toggleEdit: true })}>
          Edit
        </button>
        <button onClick={this.onDelete.bind(this, this.props.host.id)}>
          Delete
        </button>
      </div>
    ) : (
      <div className="col-md-6 col-lg-3 mb-2">
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img
              src={this.state.newPic}
              alt=""
              className="img-fluid notransition"
              onClick={this.openModalEditPic}
            />
            <Modal
              open={this.state.modalEditPic}
              onClose={this.closeModalEditPic}
              center
            >
              <ImageManagement
                category="hosts"
                closeModal={this.closeModalEditPic}
                pick={this.selectPic.bind(this)}
              />
            </Modal>
          </div>
          <div className="hotel-room-body">
            <input
              type="text"
              value={this.state.newName}
              onChange={e =>
                this.setState({ newName: e.target.value }, () =>
                  console.log(this.state.newName)
                )
              }
            />
            <input
              type="text"
              value={this.state.newOccupation}
              onChange={e =>
                this.setState({ newOccupation: e.target.value }, () =>
                  console.log(this.state.newOccupation)
                )
              }
            />
            <textarea
              defaultValue={this.state.newIntroduction}
              onChange={e =>
                this.setState({ newIntroduction: e.target.value }, () =>
                  console.log(this.state.newIntroduction)
                )
              }
            />
          </div>
        </div>
        <button onClick={this.onUpdate.bind(this, this.props.host.id)}>
          Save
        </button>
        <button onClick={() => this.setState({ toggleEdit: false })}>
          Cancel
        </button>
      </div>
    );
  }
}

export default Speaker;
