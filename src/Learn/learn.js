import React from 'react'
import { createBrowserHistory } from 'history'
import FullPost from '../FullPost/fullPost'
import PostsAndVideos from './PostsAndVideos/postsAndVideos'
import { modifyObj } from '../config/functions'

const history = createBrowserHistory()

class Learn extends React.Component {
  componentDidMount() {
    window.document.title = 'TEDxHCMUSSH - Learn'
  }

  processUrl(href) {
    let result = ''
    if (!href.includes('fbclid')) {
      const n = href.lastIndexOf('/')
      result = href.substring(n + 1)
      return result
    }

    const n = href.lastIndexOf('/')
    let temp = href.substring(n + 1)
    temp = temp.split('fbclid')
    result = temp[0].substring(0, temp[0].length - 1)
    return result
  }

  manualRouter() {
    const { isVN, videoSection, postSection } = this.props.learn
    const { href } = window.location
    if (href.includes('learn') && !href.includes('post')) return <PostsAndVideos isVN={isVN} videoSection={videoSection} postSection={postSection} />
    if (this.processUrl(href).includes('post'))
      return <FullPost history={history} postID={`${this.processUrl(window.location.href).slice(6)}`} />
    return null
  }

  render() {
    const { isVN, } = this.props
    const learn = modifyObj(isVN, this.props.learn, 'learn')
    return (
      <div>
        <div
          className="learn-header text-vertical-center"
          style={{
					  backgroundImage: `url(${learn.cover})`
          }}
        >
          <div className="row" style={{ width: '100%', margin: '0' }}>
            <div className="col-md-12">
              <h1 className="about-title">{learn.title}</h1>
            </div>
          </div>
        </div>
        {this.manualRouter()}
      </div>
    )
  }
}

export default Learn
