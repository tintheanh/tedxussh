import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { getListRealtime, deleteUnitData } from 'config/firebase'
import Modal from 'react-responsive-modal'
import EditPost from './EditPost/editPost'

export default class PostList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],

      selectedPost: '',
      modalEdit: false
    }

    this.openModalEdit = this.openModalEdit.bind(this)
    this.closeModalEdit = this.closeModalEdit.bind(this)
  }

  openModalEdit(postID) {
    this.setState({ modalEdit: true, selectedPost: postID })
  }

  closeModalEdit() {
    this.setState({ modalEdit: false })
  }

  componentDidMount() {
    getListRealtime('learn', 'posts', 'datePosted', querySnapshot => {
      const postArray = []
      querySnapshot.forEach(doc => {
        const post = { ...doc.data(), id: doc.id }
        postArray.push(post)
      })
      this.setState({ posts: postArray.reverse() })
    })
  }

  deletePost(postID) {
    const ask = window.confirm('Sure to delete?')
    if (ask) {
      deleteUnitData('learn', 'posts', postID).catch(err => alert(err.message))
    }
  }

  toTime(time) {
    return moment.unix(time.seconds).format('d/m/YYYY hh:mm a')
  }

  shortenDescription(text) {
    if (text !== undefined && text.length > 150)
      return text.substring(0, 150)
    return text
  }

  renderPost(startIndex, endIndex) {
    const { posts } = this.state
    return posts.slice(startIndex, endIndex).map(e => {
      if (this.state.selectedPost === e.id) {
        return (
          <div onClick={this.props.getPost.bind(this, e)} className="col-3" key={e.id}>
            <Link to={`/admin/learn/?post=${e.id}`}>
              <div className="hotel-room text-center notransition">
                <div className="media-with-text">
                  <div className="img-border-sm mb-4">
                    <img src={e.thumbnail} alt="" className="img-fluid notransition" />
                  </div>
                  <h2 className="heading mb-0">{e.title}</h2>
                  <span className="mb-3 d-block post-date">
                    {this.toTime(e.datePosted)} By {e.by}
                  </span>
                  <span className="mb-3 d-block post-date">{this.shortenDescription(e.description)}</span>
                </div>
              </div>
            </Link>
            <div className="row">
              <button onClick={this.openModalEdit.bind(this, e.id)}>Edit</button>
              <button onClick={this.deletePost.bind(this, e.id)}>Delete</button>
            </div>
            <Modal showCloseIcon={false} open={this.state.modalEdit} onClose={() => console.log('')} center>
              <EditPost post={e} closeModal={this.closeModalEdit} />
            </Modal>
          </div>
        )
      }
      return (
        <div onClick={this.props.getPost.bind(this, e)} className="col-3" key={e.id}>
          <Link to={`/admin/learn/?post=${e.id}`}>
            <div className="hotel-room text-center notransition">
              <div className="media-with-text">
                <div className="img-border-sm mb-4">
                  <img src={e.thumbnail} alt="" className="img-fluid notransition" />
                </div>
                <h2 className="heading mb-0">{e.title}</h2>
                <span className="mb-3 d-block post-date">
                  {this.toTime(e.datePosted)} By {e.by}
                </span>
                <span className="mb-3 d-block post-date">{this.shortenDescription(e.description)}</span>
              </div>
            </div>
          </Link>
          <div className="row">
            <button onClick={this.openModalEdit.bind(this, e.id)}>Edit</button>
            <button onClick={this.deletePost.bind(this, e.id)}>Delete</button>
          </div>
        </div>
      )
    })
  }

  renderPostRow(totalRows) {
    let startIndex = -4
    let endIndex = startIndex + 4
    const temp = Array.from({ length: totalRows }, () => Math.floor(Math.random()))

    return temp.map((_, i) => {
      startIndex += 4
      endIndex += 4
      return (
        <div className="row" key={i}>
          {this.renderPost(startIndex, endIndex)}
        </div>
      )
    })
  }

  renderAllPosts() {
    const { posts } = this.state
    if (posts.length > 0) {
      if (posts.length % 4 === 0) {
        return this.renderPostRow(posts.length / 4)
      }
      return this.renderPostRow(posts.length / 4 + 1)
    }
    return <h2>No post available</h2>
  }

  render() {
    return (
      <div className="style-section-pictures">
        <div className="col-12">
          <h2>Posts</h2>
        </div>
        {this.renderAllPosts()}
      </div>
    )
  }
}
