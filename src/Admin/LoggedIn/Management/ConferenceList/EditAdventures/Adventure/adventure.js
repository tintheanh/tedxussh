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

      newDetail: this.props.adventure.detail,
      newName: this.props.adventure.name,
      newPic: this.props.adventure.picture
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
      detail: this.state.newDetail,
      name: this.state.newName,
      picture: this.state.newPic
    };

    firebase
      .database()
      .ref(`conference/adventures/adventureList/${id}`)
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
        .ref(`conference/adventures/adventureList/${id}`)
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
              src={this.props.adventure.picture}
              alt=""
              className="img-fluid notransition"
            />
          </div>
          <div className="hotel-room-body">
            <h3 className="text-left" style={{ margin: '0' }}>
              {this.props.adventure.name}
            </h3>
            <p
              className="text-left"
              style={{
                margin: '0'
              }}
            >
              {this.props.adventure.detail}
            </p>
          </div>
        </div>
        <button onClick={() => this.setState({ toggleEdit: true })}>
          Edit
        </button>
        <button onClick={this.onDelete.bind(this, this.props.adventure.id)}>
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
                category="performers"
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
            <textarea
              defaultValue={this.state.newDetail}
              onChange={e =>
                this.setState({ newDetail: e.target.value }, () =>
                  console.log(this.state.newDetail)
                )
              }
            />
          </div>
        </div>
        <button onClick={this.onUpdate.bind(this, this.props.adventure.id)}>
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
