import React from 'react'
import VideoList from './VideoList/videoList'
import { modifyObj } from '../../../config/functions'

const VideoSection = props => {
  const { isVN } = props
  const videoSection = modifyObj(isVN, props.videoSection, 'video')
  return (
    <div>
      <div className="row" style={{ width: '100%', margin: '0' }}>
        <div className="col-sm-6 mx-auto text-center mb-5 section-heading" style={{ marginTop: '54px' }}>
          <h2 className="mb-5">Videos</h2>
          <p style={{ fontFamily: 'Montserrat', paddingBottom: '24px' }}>{videoSection.title}</p>
        </div>
      </div>
      <div style={{ width: '100%', margin: '0', paddingBottom: '54px' }}>
        <VideoList left={videoSection.left} videos={videoSection.videoList} />
      </div>
    </div>
  )
}

export default VideoSection
