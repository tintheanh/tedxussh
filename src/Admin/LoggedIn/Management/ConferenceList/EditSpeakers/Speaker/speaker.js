import React from 'react'
import Modal from 'react-responsive-modal'
import ImageManagement from '../../../ImageMangement/imageManagement'
import { root } from '../../../../../../config/firebase'

export default class Speaker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleEdit: false,
      modalEditPic: false,

      speaker: this.props.speaker,
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
    const { speaker } = this.state
    const update = {
      introduction: speaker.introduction,
      name: speaker.name,
      occupation: speaker.occupation,
      picture: speaker.picture
    }

    root
      .doc('conference')
      .collection('speakerList')
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
        .collection('speakerList')
        .doc(id)
        .delete()
        .then(() => this.setState({ toggleEdit: false }))
        .catch(err => alert(err.message))
    }
  }

  onPictureChange(newPic) {
    const speaker = {
      ...this.state.speaker,
      picture: newPic
    }
    this.setState({ speaker })
  }

  onNameChange(e) {
    const speaker = {
      ...this.state.speaker,
      name: e.target.value
    }
    this.setState({ speaker })
  }

  onOccupationChange(e) {
    const speaker = {
      ...this.state.speaker,
      occupation: e.target.value
    }
    this.setState({ speaker })
  }

  onIntroductionChange(e) {
    const speaker = {
      ...this.state.speaker,
      introduction: e.target.value
    }
    this.setState({ speaker })
  }

  render() {
    const { speaker } = this.state
    return !this.state.toggleEdit ? (
      <div className="col-md-6 col-lg-3 mb-2">
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={speaker.picture} alt="" className="img-fluid notransition" />
          </div>
          <div className="hotel-room-body">
            <h3 className="text-left" style={{ margin: '0' }}>
              {speaker.name}
            </h3>
            <p className="text-left" style={{ margin: '0' }}>
              {speaker.occupation}
            </p>
            <p
              className="text-left"
              style={{
                margin: '0'
              }}
            >
              {speaker.introduction}
            </p>
          </div>
        </div>
        <button onClick={() => this.setState({ toggleEdit: true })}>Edit</button>
        <button onClick={this.onDelete.bind(this, speaker.id)}>Delete</button>
      </div>
    ) : (
      <div className="col-md-6 col-lg-3 mb-2">
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={speaker.picture} alt="" className="img-fluid notransition" onClick={this.openModalEditPic} />
            <Modal open={this.state.modalEditPic} onClose={this.closeModalEditPic} center>
              <ImageManagement category="speakers" closeModal={this.closeModalEditPic} pick={this.onPictureChange.bind(this)} />
            </Modal>
          </div>
          <div className="hotel-room-body">
            <input type="text" value={speaker.name} onChange={e => this.onNameChange(e)} />
            <input type="text" value={speaker.occupation} onChange={e => this.onOccupationChange(e)} />
            <textarea value={speaker.introduction} onChange={e => this.onIntroductionChange(e)} />
          </div>
        </div>
        <button onClick={this.onUpdate.bind(this, speaker.id)}>Save</button>
        <button onClick={() => this.setState({ toggleEdit: false })}>Cancel</button>
      </div>
    )
  }
}
