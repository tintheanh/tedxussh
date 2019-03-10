import React from 'react'
import Modal from 'react-responsive-modal'
import ImageManagement from '../../../ImageMangement/imageManagement'
import { root } from '../../../../../../config/firebase'

export default class Sponsor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleEdit: false,
      modalEditPic: false,

      sponsor: this.props.sponsor
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
    const { sponsor } = this.state
    const update = {
      picture: sponsor.picture,
      link: sponsor.link
    }

    root
      .doc('conference')
      .collection('sponsorList')
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
        .collection('sponsorList')
        .doc(id)
        .delete()
        .then(() => this.setState({ toggleEdit: false }))
        .catch(err => alert(err.message))
    }
  }

  onPictureChange(newPic) {
    const sponsor = {
      ...this.state.sponsor,
      picture: newPic
    }
    this.setState({ sponsor })
  }

  onLinkChange(e) {
    const sponsor = {
      ...this.state.sponsor,
      link: e.target.value
    }
    this.setState({ sponsor })
  }

  onOccupationChange(e) {
    const sponsor = {
      ...this.state.sponsor,
      occupation: e.target.value
    }
    this.setState({ sponsor })
  }

  onIntroductionChange(e) {
    const sponsor = {
      ...this.state.sponsor,
      introduction: e.target.value
    }
    this.setState({ sponsor })
  }

  render() {
    const { sponsor } = this.state
    return !this.state.toggleEdit ? (
      <div className="col-md-6 col-lg-3 mb-2">
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={sponsor.picture} alt="" className="img-fluid notransition" />
          </div>
          <div className="hotel-room-body">
            <p className="text-left" style={{ margin: '0' }}>
              {sponsor.link}
            </p>
          </div>
        </div>
        <button onClick={() => this.setState({ toggleEdit: true })}>Edit</button>
        <button onClick={this.onDelete.bind(this, sponsor.id)}>Delete</button>
      </div>
    ) : (
      <div className="col-md-6 col-lg-3 mb-2">
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={sponsor.picture} alt="" className="img-fluid notransition" onClick={this.openModalEditPic} />
            <Modal open={this.state.modalEditPic} onClose={this.closeModalEditPic} center>
              <ImageManagement category="sponsors" closeModal={this.closeModalEditPic} pick={this.onPictureChange.bind(this)} />
            </Modal>
          </div>
          <div className="hotel-room-body">
            <input type="text" value={sponsor.link} onChange={e => this.onLinkChange(e)} />
          </div>
        </div>
        <button onClick={this.onUpdate.bind(this, sponsor.id)}>Save</button>
        <button onClick={() => this.setState({ toggleEdit: false })}>Cancel</button>
      </div>
    )
  }
}
