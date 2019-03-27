import React from 'react'
import moment from 'moment'
import { getPost } from 'config/firebase'

export default class FullPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post: null
    }
    this.goBack = this.goBack.bind(this)
  }

  linkify(text) {
    if (text !== undefined) {
      const exp = /((href|src)=["']|)(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
      return text.replace(exp, function() {
        return arguments[1]
          ? arguments[0]
          : `${arguments[3].substring(0, 25)}... ${arguments[3].substring(
            arguments[3].length - 25,
            arguments[3].length
					  )}`
      })
    }
    return null
  }

  componentDidMount() {
    getPost(this.props.postID).then(doc => {
      const postObj = doc.data()
      const post = { ...postObj }
      this.setState({ post }, () => console.log(this.state.post))
    })
  }

  goBack() {
    this.props.history.goBack()
  }

  toTime(time) {
    return moment.unix(time.seconds).format('d/m/YYYY hh:mm a')
  }

  render() {
    const { post } = this.state
    if (post) {
      return (
        <div className="container post-section">
          <div className="row">
            <div className="col-lg-12">
              <div>
                <h1 style={{ fontFamily: 'Oswald' }}>{post.title}</h1>
                <p style={{ fontFamily: 'Montserrat' }}>By {post.by}</p>
                <p style={{ fontFamily: 'Montserrat' }}>{this.toTime(post.datePosted)}</p>
                <img className="img-fluid thumb" src={post.thumbnail} alt="" />
              </div>
              <div
                className="text-section"
                dangerouslySetInnerHTML={{ __html: this.linkify(post.content) }}
              />
            </div>
          </div>
          <div className="row">
            <div className="back-btn">
              <button onClick={this.goBack} style={{ textDecoration: 'none', color: '#000' }}>
                Go Back
              </button>
            </div>
          </div>
        </div>
      )
    } return null
  }
}
