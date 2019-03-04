import React from 'react'
import Modal from 'react-responsive-modal'
import ImageManagement from '../../../ImageMangement/imageManagement'
import { root } from '../../../../../../config/firebase'

export default class Performer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleEdit: false,
      modalEditPic: false,

      performer: this.props.performer,
    }

    this.openModalEditPic = this.openModalEditPic.bind(this)
    this.closeModalEditPic = this.closeModalEditPic.bind(this)
  }

  openModalEditPic() {
    this.setState({ modalEditPic: true })
  }

  closeModalEditPic() {
    this.setState({ modalEditPic: false })
  }

  onUpdate(id) {
    const { performer } = this.state
    const update = {
      introduction: performer.introduction,
      name: performer.name,
      occupation: performer.occupation,
      picture: performer.picture
    }

    root
      .doc('conference')
      .collection('performerList')
      .doc(id)
      .set(update, { merge: true })
      .then(() => this.setState({ toggleEdit: false }))
      .catch(err => alert(err.message))
  }

  onDelete(id) {
    const ask = window.confirm('Sure to delete?')
    if (ask) {
      root
        .doc('conference')
        .collection('performerList')
        .doc(id)
        .delete()
        .then(() => this.setState({ toggleEdit: false }))
        .catch(err => alert(err.message))
    }
  }

  onPictureChange(newPic) {
    const performer = {
      ...this.state.performer,
      picture: newPic
    }
    this.setState({ performer })
  }

  onNameChange(e) {
    const performer = {
      ...this.state.performer,
      name: e.target.value
    }
    this.setState({ performer })
  }

  onOccupationChange(e) {
    const performer = {
      ...this.state.performer,
      occupation: e.target.value
    }
    this.setState({ performer })
  }

  onIntroductionChange(e) {
    const performer = {
      ...this.state.performer,
      introduction: e.target.value
    }
    this.setState({ performer })
  }

  render() {
    const { performer } = this.state
    return !this.state.toggleEdit ? (
      <div className="col-md-6 col-lg-3 mb-2">
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={performer.picture} alt="" className="img-fluid notransition" />
          </div>
          <div className="hotel-room-body">
            <h3 className="text-left" style={{ margin: '0' }}>
              {performer.name}
            </h3>
            <p className="text-left" style={{ margin: '0' }}>
              {performer.occupation}
            </p>
            <p
              className="text-left"
              style={{
                margin: '0'
              }}
            >
              {performer.introduction}
            </p>
          </div>
        </div>
        <button onClick={() => this.setState({ toggleEdit: true })}>Edit</button>
        <button onClick={this.onDelete.bind(this, performer.id)}>Delete</button>
      </div>
    ) : (
      <div className="col-md-6 col-lg-3 mb-2">
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={performer.picture} alt="" className="img-fluid notransition" onClick={this.openModalEditPic} />
            <Modal open={this.state.modalEditPic} onClose={this.closeModalEditPic} center>
              <ImageManagement category="performers" closeModal={this.closeModalEditPic} pick={this.onPictureChange.bind(this)} />
            </Modal>
          </div>
          <div className="hotel-room-body">
            <input type="text" value={performer.name} onChange={e => this.onNameChange(e)} />
            <input type="text" value={performer.occupation} onChange={e => this.onOccupationChange(e)} />
            <textarea value={performer.introduction} onChange={e => this.onIntroductionChange(e)} />
          </div>
        </div>
        <button onClick={this.onUpdate.bind(this, performer.id)}>Save</button>
        <button onClick={() => this.setState({ toggleEdit: false })}>Cancel</button>
      </div>
    )
  }
}
