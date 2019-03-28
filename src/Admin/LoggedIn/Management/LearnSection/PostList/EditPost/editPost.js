import React from 'react'
import ReactQuill from 'react-quill'
import Modal from 'react-responsive-modal'
import ImageManagement from 'utils/components/ImageManagement'
import { updatePost } from 'config/firebase'
import { modules, formats } from 'utils/functions'

export default class EditPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.post.title,
      by: this.props.post.by,
      description: this.props.post.description,
      content: this.props.post.content,
      thumbnail: this.props.post.thumbnail,
      modalThumbAdd: false
    }

    this.onContentChange = this.onContentChange.bind(this)
    this.openModalThumbAdd = this.openModalThumbAdd.bind(this)
    this.closeModalThumbAdd = this.closeModalThumbAdd.bind(this)
  }

  openModalThumbAdd() {
    this.setState({ modalThumbAdd: true })
  }

  closeModalThumbAdd() {
    this.setState({ modalThumbAdd: false })
  }

  onContentChange(value) {
    this.setState({ content: value })
  }

  onThumbChange(url) {
    this.setState({ thumbnail: url })
  }

  onUpdate() {
    const update = {
      by: this.state.by,
      description: this.state.description,
      content: this.state.content,
      thumbnail: this.state.thumbnail
    }

    updatePost(this.props.post.id, update)
      .then(() => this.props.closeModal())
      .catch(err => alert(err.message))
  }

  render() {
    return (
      <div>
        <div className="row">
          <p>{this.state.title}</p>
        </div>
        <div className="row">
          <input
            type="text"
            placeholder="by"
            value={this.state.by}
            onChange={e => this.setState({ by: e.target.value })}
          />
        </div>
        <div className="row">
          <textarea
            placeholder="description"
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
          />
        </div>
        <div className="row">
          <img className="img-fluid" src={this.state.thumbnail} alt="" style={{ width: '50%', height: '50%' }} />
        </div>
        <button onClick={this.openModalThumbAdd}>Thumbnail</button>
        <Modal open={this.state.modalThumbAdd} onClose={this.closeModalThumbAdd} center>
          <ImageManagement
            category="posts"
            closeModal={this.closeModalThumbAdd}
            pick={this.onThumbChange.bind(this)}
          />
        </Modal>
        <ReactQuill
          value={this.state.content}
          onChange={this.onContentChange}
          modules={modules}
          formats={formats}
        />
        <button onClick={this.props.closeModal}>Close</button>
        <button onClick={() => this.onUpdate()}>
					Save
        </button>
      </div>
    )
  }
}
