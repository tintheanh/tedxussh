import React from 'react';
import firebase from 'firebase';

class AddVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      link: '',
      by: ''
    };
  }

  onAdd() {
    const newVid = {
      title: this.state.title,
      link: this.state.link,
      by: this.state.by
    };

    firebase
      .database()
      .ref('learnPosts/videoSection/videoList')
      .push(newVid)
      .then(() => {
        alert('Added');
        this.props.closeModal();
      })
      .catch(err => alert(err.message));
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="title"
          onChange={e => this.setState({ title: e.target.value })}
        />
        <input
          type="text"
          placeholder="link"
          onChange={e => this.setState({ link: e.target.value })}
        />
        <input
          type="text"
          placeholder="by"
          onChange={e => this.setState({ by: e.target.value })}
        />
        <button onClick={this.onAdd.bind(this)}>Add</button>
        <button onClick={() => this.props.closeModal()}>Cancel</button>
      </div>
    );
  }
}

export default AddVideo;
