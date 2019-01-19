import React from 'react';

const VideoList = props =>
  props.videos.map(e => (
    <div
      className="col-12"
      key={e.id}
      style={{
        textAlign: 'center'
      }}
    >
      <p style={{ fontWeight: '500' }}>
        <span>
          {e.by} {' | '}
        </span>
        <a href={e.link} target="_blank" style={{ color: '#c0392b' }}>
          {e.title}
        </a>
      </p>
    </div>
  ));

export default VideoList;
