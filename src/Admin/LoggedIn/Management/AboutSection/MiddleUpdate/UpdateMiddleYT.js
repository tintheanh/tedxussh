import React from 'react';
import YouTube from 'react-youtube';
import { updateData } from '../../../../../config/firebase';

export default class UpdateMiddleYT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      video: this.props.video
    };
  }

  onReady(event) {
    event.target.pauseVideo();
  }

  youtubeParser(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : '';
  }

  onUpdate() {
    const update = {
      middle: {
        video: this.state.video
      }
    };
    updateData('about', update).catch(err => alert(err.message));
  }

  render() {
    if (!this.state.toggle) {
      return (
        <div className="col-12">
          <div>
            <h5>Middle video</h5>
          </div>
          <div>
            <YouTube
              videoId={this.youtubeParser(this.state.video)}
              onReady={this.onReady}
            />
          </div>
          <div>
            <button onClick={() => this.setState({ toggle: true })}>
              Edit video
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="col-12">
        <div>
          <h5>Middle video</h5>
        </div>
        <div>
          <input
            type="text"
            value={this.state.video}
            onChange={e => this.setState({ video: e.target.value })}
          />
        </div>
        <div>
          <button
            onClick={() => {
              this.onUpdate();
              this.setState({ toggle: false });
            }}
          >
            Save
          </button>
          <button
            onClick={() =>
              this.setState({ toggle: false, video: this.props.video })
            }
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}
