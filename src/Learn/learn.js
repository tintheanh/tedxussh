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
      title: '',
      post: {}
    };
  }

  componentDidMount() {
    window.document.title = 'TEDxHCMUSSH - Learn';
    firebase
      .database()
      .ref('learnPosts')
      .on('value', snapshot => {
        const learnPostsObj = snapshot.val();
        if (learnPostsObj) {
          this.setState({
            cover: learnPostsObj.cover,
            title: learnPostsObj.title
          });
        }
      });
  }

  getPost(post) {
    this.setState({ post });
  }

  processUrl(href) {
    let result = '';
    if (!href.includes('fbclid')) {
      const n = href.lastIndexOf('/');
      result = href.substring(n + 1);
      console.log(result);
      // console.log(window.location.href);
      return result;
    }

    const n = href.lastIndexOf('/');
    let temp = href.substring(n + 1);
    temp = temp.split('fbclid');
    result = temp[0].substring(0, temp[0].length - 1);
    console.log(result);
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
          className="learn-header text-vertical-center"
          style={{
            backgroundImage: `url(${this.state.cover})`
          }}
        >
          <div className="row" style={{ width: '100%', margin: '0' }}>
            <div className="col-md-12">
              <h1 className="about-title">{this.state.title}</h1>
            </div>
          </div>
        </div>
        {this.manualRouter()}
      </div>
    );
  }
}

export default Learn;
