import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import firebase from 'firebase';
import Modal from 'react-responsive-modal';
import PostList from './PostList/postList';
import FullPost from '../../../../FullPost/fullPost';
import AddPost from './AddPost/addPost';
import ImageManagement from '../ImageMangement/imageManagement';
import VideoList from './VideoList/videoList';

const history = createBrowserHistory();

class LearnSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      cover: '',
      post: {},
      videos: [],
      modalAdd: false,
      modalEditCover: false
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.openModalAdd = this.openModalAdd.bind(this);
    this.closeModalAdd = this.closeModalAdd.bind(this);

    this.openModalEditCover = this.openModalEditCover.bind(this);
    this.closeModalEditCover = this.closeModalEditCover.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ height: window.innerHeight });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    firebase
      .database()
      .ref('learnPosts')
      .on('value', snapshot => {
        const learnPostsObj = snapshot.val();
        if (learnPostsObj) {
          this.setState({ cover: learnPostsObj.cover });
        }
        if (learnPostsObj.videoList) {
          const videos = [];
          Object.keys(learnPostsObj.videoList).forEach(e => {
            const video = {
              id: e,
              by: learnPostsObj.videoList[e].by,
              title: learnPostsObj.videoList[e].title,
              link: learnPostsObj.videoList[e].link
            };
            videos.push(video);
          });
          this.setState({ videos });
        }
      });
  }

  openModalAdd() {
    this.setState({ modalAdd: true });
  }

  closeModalAdd() {
    this.setState({ modalAdd: false });
  }

  openModalEditCover() {
    this.setState({ modalEditCover: true });
  }

  closeModalEditCover() {
    this.setState({ modalEditCover: false });
  }

  getPost(post) {
    this.setState({ post });
  }

  updateCover(newCover) {
    const update = {
      cover: newCover
    };
    firebase
      .database()
      .ref('learnPosts')
      .update(update)
      .then(() => alert('Updated!'))
      .catch(err => alert(err.message));
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
        <div style={{ paddingBottom: '54px' }}>
          <PostList getPost={this.getPost.bind(this)} />
          <button
            style={{ border: '2px solid #ccc', margin: '24px' }}
            onClick={this.openModalAdd}
          >
            Add post
          </button>
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
        <div
          className="page-wrapper"
          style={{ height: `${this.state.height - 64}px`, overflowY: 'scroll' }}
        >
          <div className="page-breadcrumb">
            <div className="row">
              <div className="col-12 d-flex no-block align-items-center">
                <h2 className="page-title">Learn Edit Section</h2>
              </div>
            </div>
            {!window.location.href.includes('post') ? (
              <div>
                <div className="row style-section">
                  <div className="col-12">
                    <h3>Cover picture</h3>
                  </div>
                  <div className="col-12">
                    <img
                      className="img-fluid"
                      src={this.state.cover}
                      alt="cover"
                    />
                  </div>
                  <div className="col-12">
                    <button type="button" onClick={this.openModalEditCover}>
                      Edit cover
                    </button>
                  </div>
                  <Modal
                    open={this.state.modalEditCover}
                    onClose={this.closeModalEditCover}
                    center
                  >
                    <ImageManagement
                      category="stockImages"
                      pick={this.updateCover.bind(this)}
                      closeModal={this.closeModalEditCover}
                    />
                  </Modal>
                </div>
                <div className="row style-section">
                  <div className="col-12">
                    <h3>Videos</h3>
                  </div>
                  <div className="col-12">
                    <VideoList videos={this.state.videos} />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          {this.manualRouter()}
        </div>
      </Router>
    );
  }
}

export default LearnSection;
