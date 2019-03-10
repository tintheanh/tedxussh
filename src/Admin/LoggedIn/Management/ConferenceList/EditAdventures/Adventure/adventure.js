import React from 'react'
import Modal from 'react-responsive-modal'
import ImageManagement from '../../../ImageMangement/imageManagement'
import { root } from '../../../../../../config/firebase'

export default class Adventure extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleEdit: false,
      modalEditPic: false,

      adventure: this.props.adventure
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
    const { adventure } = this.state
    const update = {
      name: adventure.name,
      detail: adventure.detail,
      picture: adventure.picture
    }

    root
      .doc('conference')
      .collection('adventureList')
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
        .collection('adventureList')
        .doc(id)
        .delete()
        .then(() => this.setState({ toggleEdit: false }))
        .catch(err => alert(err.message))
    }
  }

  onPictureChange(newPic) {
    const adventure = {
      ...this.state.adventure,
      picture: newPic
    }
    this.setState({ adventure })
  }

  onNameChange(e) {
    const adventure = {
      ...this.state.adventure,
      name: e.target.value
    }
    this.setState({ adventure })
  }

  onDetailChange(e) {
    const adventure = {
      ...this.state.adventure,
      detail: e.target.value
    }
    this.setState({ adventure })
  }

  render() {
    const { adventure } = this.state
    return !this.state.toggleEdit ? (
      <div className="col-md-6 col-lg-3 mb-2">
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={adventure.picture} alt="" className="img-fluid notransition" />
          </div>
          <div className="hotel-room-body">
            <h3 className="text-left" style={{ margin: '0' }}>
              {adventure.name}
            </h3>
            <p className="text-left" style={{ margin: '0' }}>
              {adventure.detail}
            </p>
          </div>
        </div>
        <button onClick={() => this.setState({ toggleEdit: true })}>Edit</button>
        <button onClick={this.onDelete.bind(this, adventure.id)}>Delete</button>
      </div>
    ) : (
      <div className="col-md-6 col-lg-3 mb-2">
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={adventure.picture} alt="" className="img-fluid notransition" onClick={this.openModalEditPic} />
            <Modal open={this.state.modalEditPic} onClose={this.closeModalEditPic} center>
              <ImageManagement category="adventures" closeModal={this.closeModalEditPic} pick={this.onPictureChange.bind(this)} />
            </Modal>
          </div>
          <div className="hotel-room-body">
            <input type="text" value={adventure.name} onChange={e => this.onNameChange(e)} />
            <input type="text" value={adventure.detail} onChange={e => this.onDetailChange(e)} />
          </div>
        </div>
        <button onClick={this.onUpdate.bind(this, adventure.id)}>Save</button>
        <button onClick={() => this.setState({ toggleEdit: false })}>Cancel</button>
      </div>
    )
  }
}
