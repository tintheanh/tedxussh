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
      .ref(`learnPosts/${this.props.postID}`)
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

  render() {
    const { post } = this.state;
    return (
      <div>
        <button onClick={this.goBack}>Go back</button>
        <div className="row">
          <img className="img-fluid" src={post.thumbnail} alt="" />
        </div>
        <div className="row">
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      </div>
    );
  }
}

export default FullPost;
