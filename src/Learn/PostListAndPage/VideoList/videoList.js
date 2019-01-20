import React from 'react';

const VideoList = props => {
  if (props.videos.length) {
    return props.videos.map(e => (
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
  }
  return (
    <div className="col-12">
      <h5 className="text-center">Let me know what to put here when no video</h5>
    </div>
  );
};

export default VideoList;
