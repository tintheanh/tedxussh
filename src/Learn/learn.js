import React from 'react';
import firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Pagination from 'react-paginating';
import FullPost from '../FullPost/fullPost';
import PostListAndPage from './PostListAndPage/postListandPage';

const history = createBrowserHistory();

class Learn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {}
    };
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
          className="site-blocks-cover overlay"
          data-aos="fade"
          data-stellar-background-ratio="0.5"
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-7">
                <h1 className="mb-1">Learn</h1>
                <br />
              </div>
            </div>
          </div>
        </div>
        {this.manualRouter()}
      </div>
    );
  }
}

export default Learn;
