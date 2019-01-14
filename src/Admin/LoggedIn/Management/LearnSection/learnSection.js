import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Modal from 'react-responsive-modal';
import PostList from './PostList/postList';
import FullPost from '../../../../FullPost/fullPost';
import AddPost from './AddPost/addPost';

const history = createBrowserHistory();

class LearnSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      modalAdd: false
    };

    this.openModalAdd = this.openModalAdd.bind(this);
    this.closeModalAdd = this.closeModalAdd.bind(this);
  }

  openModalAdd() {
    this.setState({ modalAdd: true });
  }

  closeModalAdd() {
    this.setState({ modalAdd: false });
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
      return (
        <div>
          <PostList getPost={this.getPost.bind(this)} />
          <button onClick={this.openModalAdd}>Add</button>
          <Modal
            open={this.state.modalAdd}
            showCloseIcon={false}
            onClose={() => console.log('')}
          >
            <AddPost closeModal={this.closeModalAdd} />
          </Modal>
        </div>
      );
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
        </div>
      </Router>
    );
  }
}

export default LearnSection;
