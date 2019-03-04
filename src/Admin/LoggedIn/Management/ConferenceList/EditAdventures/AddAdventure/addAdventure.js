import React from 'react'
import Modal from 'react-responsive-modal'
import firebase from 'firebase'
import ImageManagement from '../../../ImageMangement/imageManagement'

class AddHost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      detail: '',
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

  onAddAdventure() {
    const newAdventure = {
      name: this.state.name,
      picture: this.state.picture,
      detail: this.state.detail
    }

    firebase
      .database()
      .ref('conference/adventures/adventureList')
      .push(newAdventure)
      .then(() => {
        alert('Added')
        this.props.closeModal()
      })
      .catch(err => alert(err.message))
  }

  render() {
    const { name, detail, picture } = this.state
    return (
      <div>
        <input type="text" placeholder="name" value={name} onChange={e => this.setState({ name: e.target.value })} />
        <textarea placeholder="detail" value={detail} onChange={e => this.setState({ detail: e.target.value })} />
        <img src={picture} alt="" className="img-fluid" />
        <button onClick={this.openModalPic}>Select picture</button>
        <Modal open={this.state.modalPic} onClose={this.closeModalPic} center>
          <ImageManagement category="adventures" closeModal={this.closeModalPic} pick={this.selectPic.bind(this)} />
        </Modal>
        <button onClick={this.onAddAdventure.bind(this)}>Add</button>
        <button onClick={() => this.props.closeModal()}>Done</button>
      </div>
    )
  }
}

export default AddHost
