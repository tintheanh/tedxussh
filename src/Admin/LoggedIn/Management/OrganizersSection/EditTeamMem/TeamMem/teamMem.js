import React from 'react'
import Modal from 'react-responsive-modal'
import ImageManagement from '../../../ImageMangement/imageManagement'
import { root } from '../../../../../../config/firebase'

class TeamMem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleEdit: false,
      modalEditPic: false,

      newName: this.props.teamMem.name,
      newRole: this.props.teamMem.role,
      newLink: this.props.teamMem.socialLink,
      newPic: this.props.teamMem.picture
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

  selectPic(newPic) {
    this.setState({ newPic })
  }

  onUpdate(id) {
    const update = {
      name: this.state.newName,
      role: this.state.newRole,
      socialLink: this.state.newLink,
      picture: this.state.newPic
    }

    root
      .doc('organizer')
      .collection('teamMembers')
      .doc(id)
      .set(update, { merge: true })
      .then(() => this.setState({ toggleEdit: false }))
      .catch(err => alert(err.message))
  }

  onDelete(id) {
    const ask = window.confirm('Sure to delete?')
    if (ask) {
      root
        .doc('organizer')
        .collection('teamMembers')
        .doc(id)
        .delete()
        .then(() => this.setState({ toggleEdit: false }))
        .catch(err => alert(err.message))
    }
  }

  render() {
    return !this.state.toggleEdit ? (
      <div className="col-md-6 col-lg-3 mb-2">
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={this.props.teamMem.picture} alt="" className="img-fluid notransition" />
          </div>
          <div className="hotel-room-body">
            <h3 className="text-left" style={{ margin: '0' }}>
              {this.props.teamMem.name}
            </h3>
            <p className="text-left" style={{ margin: '0' }}>
              {this.props.teamMem.role}
            </p>
            <p
              className="text-left"
              style={{
                margin: '0',
                fontWeight: '500',
                color: 'red',
                cursor: 'pointer'
              }}
            >
              {this.props.teamMem.socialLink}
            </p>
          </div>
        </div>
        <button onClick={() => this.setState({ toggleEdit: true })}>Edit</button>
        <button onClick={this.onDelete.bind(this, this.props.teamMem.id)}>Delete</button>
      </div>
    ) : (
      <div className="col-md-6 col-lg-3 mb-2">
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={this.state.newPic} alt="" className="img-fluid notransition" onClick={this.openModalEditPic} />
            <Modal open={this.state.modalEditPic} onClose={this.closeModalEditPic} center>
              <ImageManagement category="stockImages" closeModal={this.closeModalEditPic} pick={this.selectPic.bind(this)} />
            </Modal>
          </div>
          <div className="hotel-room-body">
            <input type="text" value={this.state.newName} onChange={e => this.setState({ newName: e.target.value })} />
            <input type="text" value={this.state.newRole} onChange={e => this.setState({ newRole: e.target.value })} />
            <input type="text" defaultValue={this.state.newLink} onChange={e => this.setState({ newLink: e.target.value })} />
          </div>
        </div>
        <button onClick={this.onUpdate.bind(this, this.props.teamMem.id)}>Save</button>
        <button onClick={() => this.setState({ toggleEdit: false })}>Cancel</button>
      </div>
    )
  }
}

export default TeamMem
