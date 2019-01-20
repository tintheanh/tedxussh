import React from 'react';

const renderVideos = videos => {
  if (videos) {
    return videos.map(e => (
      <div
        key={e.id}
        style={{
          textAlign: 'left'
        }}
      >
        <p style={{ fontFamily: 'Montserrat', fontWeight: '500' }}>
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
  return null;
};

const VideoList = props => {
  return (
    <div className="row" style={{ width: '100%' }}>
      <div className="col-lg-3 col-md-6">
        <img src={props.left.cover} alt="" style={{ width: '100%' }} />
        <h1 style={{ fontFamily: 'Oswald', textTransform: 'uppercase', padding: '24px 0' }}>{props.left.title}</h1>
        <h3 style={{ fontFamily: 'Oswald', textTransform: 'uppercase' }}>{props.left.description}</h3>
      </div>
      <div className="col-lg-9 col-md-6">{renderVideos(props.videos)}</div>
    </div>
  );
};

export default VideoList;
