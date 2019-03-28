import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { getDataRealtime, getListRealtime } from 'config/firebase'
import Modal from 'react-responsive-modal'
import {
  PageTitle, PageWrapper, SectionWrapper, SectionTitle, Loading
} from 'utils/components/PageComponents'
import { UpdateText, UpdatePicture } from 'utils/components/Updates'
import PostList from './PostList/postList'

import FullPost from '../../../../FullPost/fullPost'
import AddPost from './AddPost/addPost'
import VideoList from './VideoList/videoList'
import './styles.css'

const history = createBrowserHistory()

export default class LearnSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      learn: null,
      modalAdd: false
    }

    this.openModalAdd = this.openModalAdd.bind(this)
    this.closeModalAdd = this.closeModalAdd.bind(this)
  }

  componentDidMount() {
    getDataRealtime('learn', doc => {
      if (doc.exists) {
        const learnObj = doc.data()
        let learn

        let videoArray

        getListRealtime('learn', 'videoList', 'createdDate', querySnapshot => {
          videoArray = []
          querySnapshot.forEach(vi => {
            const video = { ...vi.data(), id: vi.id }
            videoArray.push(video)
          })
          learn = {
            ...learnObj,
            videoSection: {
              ...learnObj.videoSection,
              videoList: videoArray
            }
          }
          this.setState({ learn })
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

  getPost(post) {
    this.setState({ post })
  }

  processUrl(href) {
    const n = href.lastIndexOf('/')
    const result = href.substring(n + 1)
    return result
  }

  manualRouter() {
    const { href } = window.location
    if (href.includes('learn') && !href.includes('post'))
      return (
        <div style={{ paddingBottom: '54px' }}>
          <PostList getPost={this.getPost.bind(this)} />
          <button
            style={{
              width: '100px', height: '50px', position: 'fixed', bottom: '10px', zIndex: 1000
            }}
            onClick={this.openModalAdd}
          >
						Add post
          </button>
          <Modal
            open={this.state.modalAdd}
            showCloseIcon={false}
            onClose={() => console.log('')}
            classNames={{
						  modal: 'customModal'
            }}
          >
            <AddPost closeModal={this.closeModalAdd} />
          </Modal>
        </div>
      )
    if (this.processUrl(href).includes('post'))
      return <FullPost history={history} postID={`${this.processUrl(window.location.href).slice(6)}`} />
    return null
  }

  render() {
    const { learn } = this.state
    const route = window.location.href
    if (learn) {
      return (
        <Router>
          <PageWrapper>
            <PageTitle title="Learn edit section" />
            {!route.includes('post') ? (
              <div>
                <SectionWrapper>
                  <SectionTitle title="Cover" />
                  <UpdatePicture name="Picture" data={learn.cover} field="cover" updateTo="learn" />
                  <UpdateText name="Title" data={learn.title} field="title" updateTo="learn" />
                </SectionWrapper>
                <SectionWrapper>
                  <SectionTitle title="Video section introduction" />
                  <UpdatePicture
                    name="Picture"
                    data={learn.videoSection.left.cover}
                    outer="left."
                    field="cover"
                    updateTo="learn"
                  />
                  <UpdateText
                    name="Title"
                    data={learn.videoSection.left.title}
                    outer="left."
                    field="title"
                    updateTo="learn"
                  />
                  <UpdateText
                    name="Description"
                    data={learn.videoSection.left.description}
                    outer="left."
                    field="description"
                    updateTo="learn"
                  />
                </SectionWrapper>
                <SectionWrapper>
                  <SectionTitle title="Video section" />
                  <UpdateText
                    name="Title"
                    data={learn.videoSection.title}
                    outer="videoSection"
                    field="title"
                    updateTo="learn"
                  />
                  <VideoList videos={learn.videoSection.videoList} />
                </SectionWrapper>
              </div>
            ) : null}
            {this.manualRouter()}
          </PageWrapper>
        </Router>
      )
    }
    return <Loading />
  }
}
