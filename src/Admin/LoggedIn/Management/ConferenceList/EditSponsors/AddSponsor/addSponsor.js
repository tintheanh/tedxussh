import React from 'react'
import Modal from 'react-responsive-modal'
import ImageManagement from '../../../ImageMangement/imageManagement'
import { root } from '../../../../../../config/firebase'

export default class AddSponsor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      link: '',
      picture: '',

      modalPic: false
    }

    this.openModalPic = this.openModalPic.bind(this)
    this.closeModalPic = this.closeModalPic.bind(this)
  }

  openModalPic() {
    this.setState({ modalPic: true })
  }

  closeModalPic() {
    this.setState({ modalPic: false })
  }

  selectPic(newPic) {
    this.setState({ picture: newPic })
  }

  onAddSponsor() {
    const newSpeaker = {
      picture: this.state.picture,
      link: this.state.link,
      createdDate: new Date()
    }

    root
      .doc('conference')
      .collection('sponsorList')
      .add(newSpeaker)
      .then(() => {
        alert('Added')
        this.props.closeModal()
      })
      .catch(err => alert(err.message))
  }

  render() {
    const { link, picture } = this.state
    return (
      <div>
        <input type="text" placeholder="link" value={link} onChange={e => this.setState({ link: e.target.value })} />
        <img src={picture} alt="" className="img-fluid" />
        <br />
        <button onClick={this.openModalPic}>Select picture</button>
        <Modal open={this.state.modalPic} onClose={this.closeModalPic} center>
          <ImageManagement category="sponsors" closeModal={this.closeModalPic} pick={this.selectPic.bind(this)} />
        </Modal>
        <button onClick={this.onAddSponsor.bind(this)}>Add</button>
        <button onClick={() => this.props.closeModal()}>Done</button>
      </div>
    )
  }
}
