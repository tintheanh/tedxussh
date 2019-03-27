import React from 'react'
import firebase from 'firebase'
import { addUnit } from 'config/firebase'

export default class UploadImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      path: 'coverPage',
      uploadedImg: ''
    }
    this.fileInput = React.createRef()
  }

  onTypeChange(e) {
    this.setState({ path: e.target.value }, () => console.log(this.state.path))
  }

  onUpload(event) {
    event.preventDefault()
    const file = this.fileInput.current.files[0]
    const uploadTask = firebase
      .storage()
      .ref(`${this.state.path}/${file.name}`)
      .put(file)
    uploadTask.on(
      'state_changed',
      snapshot => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(`Upload is ${progress}% done`)
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused')
            break
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running')
            break
        }
      },
      error => {
        alert(error.message)
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL)
          this.setState({ uploadedImg: downloadURL })
          const { path } = this.state
          const picture = {
            name: file.name,
            url: downloadURL,
            dateAdded: new Date()
          }
          addUnit('images', path, picture)
        })
      }
    )
  }

  render() {
    return (
      <div>
        <h1>Upload Image</h1>
        <img className="img-fluid" src={this.state.uploadedImg} alt="" />
        <input type="file" ref={this.fileInput} />
        <select value={this.state.path} onChange={this.onTypeChange.bind(this)}>
          <option value="coverPage">Page cover</option>
          <option value="speakers">Speaker</option>
          <option value="performers">Performer</option>
          <option value="hosts">Host</option>
          <option value="adventures">Adventure</option>
          <option value="highlight">Highlight</option>
          <option value="sponsors">Sponsor</option>
          <option value="posts">Post image</option>
          <option value="organizers">Organizers</option>
          <option value="others">Others</option>
        </select>
        <br />
        <button onClick={this.onUpload.bind(this)}>Submit</button>
        <button onClick={() => this.props.closeModal()}>Done</button>
      </div>
    )
  }
}
