import React from 'react'
import Modal from 'react-responsive-modal'
import Video from './Video/video'
import AddVideo from './AddVideo/addVideo'

export default class VideoList extends React.Component {
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

  render() {
    return (
      <div className="col-12">
        <div>
          <h3>Video list</h3>
        </div>
        {this.props.videos.map(e => (
          <Video video={e} key={e.id} />
        ))}
        <button onClick={this.openModalAdd}>Add</button>
        <Modal open={this.state.modalAdd} onClose={this.closeModalAdd} center>
          <AddVideo closeModal={this.closeModalAdd} />
        </Modal>
      </div>
    )
  }
}
