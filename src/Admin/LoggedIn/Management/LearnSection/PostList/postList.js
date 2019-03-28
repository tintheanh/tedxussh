import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import moment from 'moment'
import { getPostListRealtime, deletePost } from 'config/firebase'
import Modal from 'react-responsive-modal'
import EditPost from './EditPost/editPost'
import './styles.css'

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
    getPostListRealtime(snapshot => {
      const obj = snapshot.val()
      if (obj) {
        const posts = []
        Object.keys(obj).forEach(e => {
          const post = {
            id: e,
            thumbnail: obj[e].thumbnail,
            by: obj[e].by,
            datePosted: obj[e].datePosted,
            title: obj[e].title,
            description: obj[e].description,
            content: obj[e].content
          }
          posts.push(post)
        })
        const sorted = _.sortBy(posts, ['datePosted'])
        this.setState({ posts: sorted.reverse() })
      }
    })
  }

  deletePost(postID) {
    const ask = window.confirm('Sure to delete?')
    if (ask) {
      deletePost(postID).catch(err => alert(err.message))
    }
  }

  shortenDescription(text) {
    if (text !== undefined && text.length > 150) return text.substring(0, 150)
    return text
  }

  toTime(epoch) {
    return moment(epoch).format('D/M/YYYY')
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
                  <span className="mb-3 d-block post-date">
                    {this.shortenDescription(e.description)}
                  </span>
                </div>
              </div>
            </Link>
            <div className="row">
              <button onClick={this.openModalEdit.bind(this, e.id)}>Edit</button>
              <button onClick={this.deletePost.bind(this, e.id)}>Delete</button>
            </div>
            <Modal
              showCloseIcon={false}
              open={this.state.modalEdit}
              onClose={() => console.log('')}
              center
              classNames={{
							  modal: 'customModal'
              }}
            >
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
