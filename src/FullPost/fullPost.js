import React from 'react';
import firebase from 'firebase';
import { getData } from '../config/firebase';

class FullPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {}
    };
    this.goBack = this.goBack.bind(this);
  }

  linkify(text) {
    if (text !== undefined) {
      var exp = /((href|src)=["']|)(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
      return text.replace(exp, function() {
        return arguments[1]
          ? arguments[0]
          : `${arguments[3].substring(0, 25)}... ${arguments[3].substring(
              arguments[3].length - 25,
              arguments[3].length
            )}`;
      });
    }
    return null;
  }

  componentDidMount() {
    getData(`learnPosts/postSection/postList/${this.props.postID}`, data => {
      const learnPostsObj = data.val();
      if (learnPostsObj) {
        const post = {
          title: learnPostsObj.title,
          by: learnPostsObj.by,
          description: learnPostsObj.description,
          content: learnPostsObj.content,
          datePosted: learnPostsObj.datePosted,
          thumbnail: learnPostsObj.thumbnail
        };
        this.setState({ post });
      }
    });
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const { post } = this.state;
    return (
      <div className="container post-section">
        <div className="row">
          <div className="col-lg-12">
            <div>
              <h1 style={{ fontFamily: 'Oswald' }}>{post.title}</h1>
              <p style={{ fontFamily: 'Montserrat' }}>By {post.by}</p>
              <p style={{ fontFamily: 'Montserrat' }}>{post.datePosted}</p>
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
            <button
              onClick={this.goBack}
              style={{ textDecoration: 'none', color: '#000' }}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FullPost;
