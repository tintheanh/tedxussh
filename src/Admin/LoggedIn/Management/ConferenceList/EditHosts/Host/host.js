import React from 'react'
import Modal from 'react-responsive-modal'
import ImageManagement from '../../../ImageMangement/imageManagement'
import { root } from '../../../../../../config/firebase'

export default class Host extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleEdit: false,
      modalEditPic: false,

      host: this.props.host
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
    const { host } = this.state
    const update = {
      introduction: host.introduction,
      name: host.name,
      occupation: host.occupation,
      picture: host.picture
    }

    root
      .doc('conference')
      .collection('hostList')
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
        .collection('hostList')
        .doc(id)
        .delete()
        .then(() => this.setState({ toggleEdit: false }))
        .catch(err => alert(err.message))
    }
  }

  onPictureChange(newPic) {
    const host = {
      ...this.state.host,
      picture: newPic
    }
    this.setState({ host })
  }

  onNameChange(e) {
    const host = {
      ...this.state.host,
      name: e.target.value
    }
    this.setState({ host })
  }

  onOccupationChange(e) {
    const host = {
      ...this.state.host,
      occupation: e.target.value
    }
    this.setState({ host })
  }

  onIntroductionChange(e) {
    const host = {
      ...this.state.host,
      introduction: e.target.value
    }
    this.setState({ host })
  }

  render() {
    const { host } = this.state
    return !this.state.toggleEdit ? (
      <div className="col-md-6 col-lg-3 mb-2">
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={host.picture} alt="" className="img-fluid notransition" />
          </div>
          <div className="hotel-room-body">
            <h3 className="text-left" style={{ margin: '0' }}>
              {host.name}
            </h3>
            <p className="text-left" style={{ margin: '0' }}>
              {host.occupation}
            </p>
            <p
              className="text-left"
              style={{
                margin: '0'
              }}
            >
              {host.introduction}
            </p>
          </div>
        </div>
        <button onClick={() => this.setState({ toggleEdit: true })}>Edit</button>
        <button onClick={this.onDelete.bind(this, host.id)}>Delete</button>
      </div>
    ) : (
      <div className="col-md-6 col-lg-3 mb-2">
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={host.picture} alt="" className="img-fluid notransition" onClick={this.openModalEditPic} />
            <Modal open={this.state.modalEditPic} onClose={this.closeModalEditPic} center>
              <ImageManagement category="hosts" closeModal={this.closeModalEditPic} pick={this.onPictureChange.bind(this)} />
            </Modal>
          </div>
          <div className="hotel-room-body">
            <input type="text" value={host.name} onChange={e => this.onNameChange(e)} />
            <input type="text" value={host.occupation} onChange={e => this.onOccupationChange(e)} />
            <textarea value={host.introduction} onChange={e => this.onIntroductionChange(e)} />
          </div>
        </div>
        <button onClick={this.onUpdate.bind(this, host.id)}>Save</button>
        <button onClick={() => this.setState({ toggleEdit: false })}>Cancel</button>
      </div>
    )
  }
}
