import React from 'react';
import firebase from 'firebase';
import { createBrowserHistory } from 'history';
import FullPost from '../FullPost/fullPost';
import PostListAndPage from './PostListAndPage/postListandPage';

const history = createBrowserHistory();

class Learn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cover: '',
      post: {}
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref('learnPosts')
      .on('value', snapshot => {
        const learnPostsObj = snapshot.val();
        if (learnPostsObj) {
          this.setState({ cover: learnPostsObj.cover }, () =>
            console.log('learn', this.state.cover)
          );
        }
      });
  }

  getPost(post) {
    this.setState({ post });
  }

  processUrl(href) {
    const n = href.lastIndexOf('/');
    const result = href.substring(n + 1);
    return result;
  }

  manualRouter() {
    const { href } = window.location;
    if (href.includes('learn') && !href.includes('post'))
      return <PostListAndPage getPost={this.getPost.bind(this)} />;
    if (this.processUrl(href).includes('post'))
      return (
        <FullPost
          history={history}
          postID={`${this.processUrl(window.location.href).slice(6)}`}
        />
      );
    return null;
  }

  render() {
    return (
      <div>
        <div
          className="learn-header"
          data-aos="fade"
          style={{
            backgroundImage: `url(${this.state.cover})`
          }}
        />
        {this.manualRouter()}
      </div>
    );
  }
}

export default Learn;
