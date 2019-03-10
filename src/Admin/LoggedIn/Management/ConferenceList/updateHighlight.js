import React from 'react'
import Modal from 'react-responsive-modal'
import ImageManagement from '../ImageMangement/imageManagement'
import { root } from '../../../../config/firebase'

export default class UpdateHighlight extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalAdd: false
    }
    this.openModalAdd = this.openModalAdd.bind(this)
    this.closeModalAdd = this.closeModalAdd.bind(this)
  }

  openModalAdd() {
    this.setState({ modalAdd: true })
  }

  closeModalAdd() {
    this.setState({ modalAdd: false })
  }

  deleteImg(imgID) {
    const ask = window.confirm('Sure to delete this sponsor?')
    if (ask) {
      root
        .doc('conference')
        .collection('highlightList')
        .doc(imgID)
        .delete()
    }
  }

  onAddImg(url, name) {
    let newImg = {
      name,
      url,
      width: Math.floor(Math.random() * (5 - 2 + 1)) + 2,
      height: Math.floor(Math.random() * (5 - 2 + 1)) + 2,
      createdDate: new Date()
    }
    while (newImg.height - newImg.width > 1) {
      newImg = {
        name,
        url,
        width: Math.floor(Math.random() * (5 - 2 + 1)) + 2,
        height: Math.floor(Math.random() * (5 - 2 + 1)) + 2,
        createdDate: new Date()
      }
    }
    root
      .doc('conference')
      .collection('highlightList')
      .add(newImg)
      .then(() => alert('Img added'))
      .catch(err => alert(err.message))
  }

  renderRow(startIndex, endIndex, imgs) {
    return imgs.slice(startIndex, endIndex).map(hl => (
      <div className="col-3" key={hl.id}>
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={hl.url} className="img-fluid notransition" alt="" />
          </div>
          <div className="hotel-room-body">
            <div>
              <p>{hl.name}</p>
            </div>
          </div>
          <button onClick={this.deleteImg.bind(this, hl.id)}>Delete</button>
        </div>
      </div>
    ))
  }

  renderImg(totalRows, imgs) {
    let startIndex = -4
    let endIndex = startIndex + 4
    const temp = Array.from({ length: totalRows }, () => Math.floor(Math.random()))

    return temp.map((_, i) => {
      startIndex += 4
      endIndex += 4
      return (
        <div className="row" key={i}>
          {this.renderRow(startIndex, endIndex, imgs)}
        </div>
      )
    })
  }

  renderAllImg(imgs) {
    if (imgs.length > 0) {
      if (imgs.length % 4 === 0) {
        return this.renderImg(imgs.length / 4, imgs)
      }
      return this.renderImg(imgs.length / 4 + 1, imgs)
    }
    return <h2>No imgs available</h2>
  }

  render() {
    return (
      <div>
        {this.renderAllImg(this.props.highlight)}
        <button
          onClick={() => {
            this.props.closeModal()
          }}
        >
          Done
        </button>
        <button onClick={this.openModalAdd}>Add</button>
        <Modal open={this.state.modalAdd} onClose={this.closeModalAdd} center>
          <ImageManagement category="highlightImages" pick={this.onAddImg.bind(this)} closeModal={this.closeModalAdd} />
        </Modal>
      </div>
    )
  }
}
