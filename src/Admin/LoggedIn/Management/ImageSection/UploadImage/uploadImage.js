import React from 'react';
import firebase from 'firebase';

class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: 'conference-images/main-picture',
      uploadedImg: ''
    };
    this.fileInput = React.createRef();
  }

  onTypeChange(e) {
    this.setState({ path: e.target.value }, () => console.log(this.state.path));
  }

  onUpload(event) {
    event.preventDefault();
    const file = this.fileInput.current.files[0];
    const uploadTask = firebase
      .storage()
      .ref(`${this.state.path}/${file.name}`)
      .put(file);
    uploadTask.on(
      'state_changed',
      function(snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      error => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
          this.setState({ uploadedImg: downloadURL });
        });
      }
    );
  }

  render() {
    return (
      <div>
        <h1>Upload Image</h1>
        <img className="img-fluid" src={this.state.uploadedImg} alt="" />
        <input type="file" ref={this.fileInput} />
        <select value={this.state.path} onChange={this.onTypeChange.bind(this)}>
          <option value="conference-images/main-picture">Conference</option>
          <option value="conference-images/highlight">Highlight</option>
          <option value="conference-images/speakers">Speaker</option>
          <option value="conference-images/sponsors">Sponsor</option>
          <option value="learn-post-images/thumbnails">Thumbnails</option>
          <option value="stock-images">Stock</option>
        </select>
        <button onClick={this.onUpload.bind(this)}>Submit</button>
      </div>
    );
  }
}

export default UploadImage;
