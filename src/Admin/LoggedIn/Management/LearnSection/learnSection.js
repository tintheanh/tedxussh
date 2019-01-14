import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PostList from './PostList/postList';
import FullPost from './FullPost/fullPost';

const history = createBrowserHistory();

class LearnSection extends React.Component {
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
      return <PostList getPost={this.getPost.bind(this)} />;
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
      <Router>
        <div className="page-wrapper">
          <div className="page-breadcrumb">
            <div className="row">
              <div className="col-12 d-flex no-block align-items-center">
                <h4 className="page-title">Dashboard</h4>
              </div>
            </div>
          </div>
          {this.manualRouter()}
          {/* <Route
            exact
            path="/admin/learn/post1"
            // component={FullPost}
            render={() => <FullPost history={history} />}
          /> */}
        </div>
      </Router>
    );
  }
}

export default LearnSection;
