import React from 'react';
import fireabase from 'firebase';

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.video.title,
      link: this.props.video.link,
      by: this.props.video.by,
      toggleEdit: false
    };
  }

  onUpdate(vid) {
    const video = {
      title: this.state.title,
      link: this.state.link,
      by: this.state.by
    };

    fireabase
      .database()
      .ref(`learnPosts/videoList/${vid}`)
      .update(video)
      .then(() => this.setState({ toggleEdit: false }))
      .catch(err => alert(err.message));
  }

  onDelete(vid) {
    const ask = window.confirm('Sure to delete?');
    if (ask) {
      fireabase
        .database()
        .ref(`learnPosts/videoList/${vid}`)
        .remove()
        .catch(err => alert(err.message));
    }
  }

  render() {
    return !this.state.toggleEdit ? (
      <div>
        <h5>{this.state.title}</h5>
        <p>{this.state.link}</p>
        <p>{this.state.by}</p>
        <button onClick={() => this.setState({ toggleEdit: true })}>
          Edit
        </button>
        <button onClick={this.onDelete.bind(this, this.props.video.id)}>
          Delete
        </button>
      </div>
    ) : (
      <div>
        <input
          type="text"
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
        />
        <input
          type="text"
          value={this.state.link}
          onChange={e => this.setState({ link: e.target.value })}
        />
        <input
          type="text"
          value={this.state.by}
          onChange={e => this.setState({ by: e.target.value })}
        />
        <button onClick={this.onUpdate.bind(this, this.props.video.id)}>
          Save
        </button>
        <button
          onClick={() =>
            this.setState({
              toggleEdit: false,
              title: this.props.video.title,
              link: this.props.video.link
            })
          }
        >
          Cancel
        </button>
      </div>
    );
  }
}

export default Video;
