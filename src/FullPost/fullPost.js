import React from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class FullPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {}
    };
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    firebase
      .database()
      .ref(`learnPosts/postList/${this.props.postID}`)
      .on('value', snapshot => {
        const learnPostsObj = snapshot.val();
        if (learnPostsObj) {
          const post = {
            title: learnPostsObj.title,
            by: learnPostsObj.by,
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

  renderContent(content) {
    var div = document.createElement('div');
    div.innerHTML = content.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
  }

  render() {
    const { post } = this.state;
    return (
      <div className="container post-section">
        <div className="row">
          {/* <div className="col-lg-4">
            <img className="img-fluid" src={post.thumbnail} alt="" />
          </div> */}
          <div className="col-lg-12">
            <div className="col-lg-4">
              <img
                className="img-fluid thumb"
                src={post.thumbnail}
                alt=""
                style={{ float: 'left' }}
              />
            </div>
            <h1>{post.title}</h1>
            <div
              className="text-section"
              dangerouslySetInnerHTML={{ __html: post.content }}
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
