import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import firebase from 'firebase'
import Modal from 'react-responsive-modal'
import { root } from '../../../../config/firebase'
import PostList from './PostList/postList'
import FullPost from '../../../../FullPost/fullPost'
import AddPost from './AddPost/addPost'
import ImageManagement from '../ImageMangement/imageManagement'
import VideoList from './VideoList/videoList'
import UpdateTitle from './updateTitle'
import UpdateBackground from './updateBackground'
import UpdateVidSectionTitle from './updateVidSectionTitle'

const history = createBrowserHistory()

export default class LearnSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      learn: null,
      height: 0,
      cover: '',
      title: '',
      post: {},
      videos: [],
      toggleEditTitle: false,

      toggleEditDesc1: false,
      toggleEditTitle1: false,
      modalEditCover1: false,

      modalAdd: false,
      modalEditCover: false
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)

    this.openModalAdd = this.openModalAdd.bind(this)
    this.closeModalAdd = this.closeModalAdd.bind(this)

    this.openModalEditCover = this.openModalEditCover.bind(this)
    this.closeModalEditCover = this.closeModalEditCover.bind(this)

    this.openModalEditCover1 = this.openModalEditCover1.bind(this)
    this.closeModalEditCover1 = this.closeModalEditCover1.bind(this)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ height: window.innerHeight })
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    this.fetchData()

    root.doc('learn').onSnapshot(doc => {
      if (doc.exists) {
        const learnObj = doc.data()
        let learn
        let postArray
        let videoArray

        root
          .doc('learn')
          .collection('videoList')
          .orderBy('createdDate')
          .onSnapshot(videoSnapshot => {
            videoArray = []
            videoSnapshot.forEach(vi => {
              const video = { ...vi.data(), id: vi.id }
              videoArray.push(video)
            })
            root
              .doc('learn')
              .collection('posts')
              .orderBy('datePosted')
              .onSnapshot(postSnapshot => {
                postArray = []
                postSnapshot.forEach(pt => {
                  const post = { ...pt.data(), id: pt.id }
                  postArray.push(post)
                })
                learn = {
                  ...learnObj,
                  postSection: {
                    ...learnObj.postSection,
                    postList: postArray
                  },
                  videoSection: {
                    ...learnObj.videoSection,
                    videoList: videoArray
                  }
                }
                this.setState({ learn }, () => console.log(this.state.learn))
              })
          })
      }
    })
  }

  onUpdateText(type) {
    let update = {}
    if (type === 'title1') {
      update = {
        title: this.state.title1
      }
    }
    if (type === 'desc1') {
      update = {
        description: this.state.desc1
      }
    }
    firebase
      .database()
      .ref('learnPosts/videoSection/left')
      .update(update)
      .catch(err => alert(err.message))
  }

  onUpdateCover1(newPic) {
    const update = {
      cover: newPic
    }

    firebase
      .database()
      .ref('learnPosts/videoSection/left')
      .update(update)
      .catch(err => alert(err.message))
  }

  fetchData() {
    firebase
      .database()
      .ref('learnPosts')
      .on('value', snapshot => {
        const learnPostsObj = snapshot.val()
        if (learnPostsObj) {
          this.setState({
            cover: learnPostsObj.cover,
            title: learnPostsObj.title
          })
        }
        if (learnPostsObj.videoSection.videoList) {
          const videos = []
          Object.keys(learnPostsObj.videoSection.videoList).forEach(e => {
            const video = {
              id: e,
              by: learnPostsObj.videoSection.videoList[e].by,
              title: learnPostsObj.videoSection.videoList[e].title,
              link: learnPostsObj.videoSection.videoList[e].link
            }
            videos.push(video)
          })
          this.setState({ videos })
        }
        if (learnPostsObj.videoSection.left) {
          this.setState({
            cover1: learnPostsObj.videoSection.left.cover,
            title1: learnPostsObj.videoSection.left.title,
            desc1: learnPostsObj.videoSection.left.description
          })
        }
      })
  }

  openModalAdd() {
    this.setState({ modalAdd: true })
  }

  closeModalAdd() {
    this.setState({ modalAdd: false })
  }

  openModalEditCover() {
    this.setState({ modalEditCover: true })
  }

  closeModalEditCover() {
    this.setState({ modalEditCover: false })
  }

  openModalEditCover1() {
    this.setState({ modalEditCover1: true })
  }

  closeModalEditCover1() {
    this.setState({ modalEditCover1: false })
  }

  getPost(post) {
    this.setState({ post })
  }

  updateCover(newCover) {
    const update = {
      cover: newCover
    }
    firebase
      .database()
      .ref('learnPosts')
      .update(update)
      .then(() => alert('Updated!'))
      .catch(err => alert(err.message))
  }

  processUrl(href) {
    const n = href.lastIndexOf('/')
    const result = href.substring(n + 1)
    return result
  }

  updateTitle() {
    const update = {
      title: this.state.title
    }

    firebase
      .database()
      .ref('learnPosts')
      .update(update)
      .catch(err => alert(err.message))
  }

  manualRouter() {
    const { href } = window.location
    if (href.includes('learn') && !href.includes('post'))
      return (
        <div style={{ paddingBottom: '54px' }}>
          <PostList getPost={this.getPost.bind(this)} />
          <button style={{ border: '2px solid #ccc', margin: '24px' }} onClick={this.openModalAdd}>
            Add post
          </button>
          <Modal open={this.state.modalAdd} showCloseIcon={false} onClose={() => console.log('')}>
            <AddPost closeModal={this.closeModalAdd} />
          </Modal>
        </div>
      )
    if (this.processUrl(href).includes('post')) return <FullPost history={history} postID={`${this.processUrl(window.location.href).slice(6)}`} />
    return null
  }

  render() {
    const { learn } = this.state
    const route = window.location.href
    if (learn) {
      return (
        <Router>
          <div className="page-wrapper" style={{ height: `${this.state.height - 64}px`, overflowY: 'scroll' }}>
            <div className="page-breadcrumb">
              <div className="row">
                <div className="col-12 d-flex no-block align-items-center">
                  <h2 className="page-title">Learn Edit Section</h2>
                </div>
              </div>
              {!route.includes('post') ? (
                <div>
                  <div className="row style-section">
                    <div className="col-12">
                      <h3>Cover picture</h3>
                    </div>
                    <UpdateTitle title={learn.title} />
                    <UpdateBackground background={learn.cover} />
                  </div>
                  <div className="row style-section">
                    <div className="col-12">
                      <h3>Video Section</h3>
                    </div>
                    <UpdateVidSectionTitle title={learn.videoSection.title} />
                    <VideoList videos={learn.videoSection.videoList} />
                  </div>
                  <div className="row style-section">
                    <div className="col-12">
                      <h3>Left</h3>
                    </div>
                    <div className="col-12">
                      <h5>Title</h5>
                    </div>
                    {!this.state.toggleEditTitle1 ? (
                      <div className="col-12">
                        <div>
                          <p>{this.state.title1}</p>
                        </div>
                        <div>
                          <button onClick={() => this.setState({ toggleEditTitle1: true })}>Edit</button>
                        </div>
                      </div>
                    ) : (
                      <div className="col-12">
                        <div>
                          <input type="text" value={this.state.title1} onChange={e => this.setState({ title1: e.target.value })} />
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              this.onUpdateText('title1')
                              this.setState({ toggleEditTitle1: false })
                            }}
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              this.fetchData()
                              this.setState({ toggleEditTitle1: false })
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="col-12">
                      <h5>Description</h5>
                    </div>
                    {!this.state.toggleEditDesc1 ? (
                      <div className="col-12">
                        <div>
                          <p>{this.state.desc1}</p>
                        </div>
                        <div>
                          <button onClick={() => this.setState({ toggleEditDesc1: true })}>Edit</button>
                        </div>
                      </div>
                    ) : (
                      <div className="col-12">
                        <div>
                          <textarea value={this.state.desc1} onChange={e => this.setState({ desc1: e.target.value })} />
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              this.onUpdateText('desc1')
                              this.setState({ toggleEditDesc1: false })
                            }}
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              this.fetchData()
                              this.setState({ toggleEditDesc1: false })
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="col-12">
                      <img src={this.state.cover1} alt="" className="img-fluid" />
                    </div>
                    <div className="col-12">
                      <button onClick={this.openModalEditCover1}>Edit cover</button>
                    </div>
                    <Modal open={this.state.modalEditCover1} onClose={this.closeModalEditCover1} center>
                      <ImageManagement category="stockImages" pick={this.onUpdateCover1.bind(this)} closeModal={this.closeModalEditCover1} />
                    </Modal>
                  </div>
                </div>
              ) : null}
            </div>
            {this.manualRouter()}
          </div>
        </Router>
      )
    }
    return null
  }
}
