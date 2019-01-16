import React from 'react';
import ReactQuill from 'react-quill';
import Modal from 'react-responsive-modal';
import moment from 'moment';
import firebase from 'firebase';
import ImageManagement from '../../ImageMangement/imageManagement';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image'],
    ['clean']
  ]
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image'
];

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      by: '',
      content: '',
      thumbnail: '',
      modalThumbAdd: false
    }; // You can also pass a Quill Delta here

    this.onContentChange = this.onContentChange.bind(this);
    this.openModalThumbAdd = this.openModalThumbAdd.bind(this);
    this.closeModalThumbAdd = this.closeModalThumbAdd.bind(this);
  }

  openModalThumbAdd() {
    this.setState({ modalThumbAdd: true });
  }

  closeModalThumbAdd() {
    this.setState({ modalThumbAdd: false });
  }

  onContentChange(value) {
    this.setState({ content: value }, () => console.log(this.state.content));
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value }, () =>
      console.log(this.state.title)
    );
  }

  onAuthorChange(e) {
    this.setState({ by: e.target.value }, () => console.log(this.state.by));
  }

  onThumbChange(url) {
    this.setState({ thumbnail: url }, () => console.log(this.state.thumbnail));
  }

  onAddPost() {
    const post = {
      title: this.state.title,
      by: this.state.by,
      datePosted: moment().format('MMM Do YYYY, HH:mm'),
      content: this.state.content,
      thumbnail: this.state.thumbnail
    };

    console.log(post);

    firebase
      .database()
      .ref('learnPosts/postList')
      .push(post)
      .then(() => alert('Posted!'))
      .catch(err => alert(err.message));
  }

  render() {
    return (
      <div>
        <div className="row">
          <input
            type="text"
            placeholder="title"
            value={this.state.title}
            onChange={this.onTitleChange.bind(this)}
          />
        </div>
        <div className="row">
          <input
            type="text"
            placeholder="by"
            value={this.state.by}
            onChange={this.onAuthorChange.bind(this)}
          />
        </div>
        <div className="row">
          <img className="img-fluid" src={this.state.thumbnail} alt="" />
        </div>
        <button onClick={this.openModalThumbAdd}>Thumbnail</button>
        <Modal
          open={this.state.modalThumbAdd}
          onClose={this.closeModalThumbAdd}
          center
        >
          <ImageManagement
            category="thumbnails"
            closeModal={this.closeModalThumbAdd}
            pick={this.onThumbChange.bind(this)}
          />
        </Modal>
        <ReactQuill
          value={this.state.content}
          onChange={this.onContentChange}
          modules={modules}
          formats={formats}
        />
        <button onClick={this.props.closeModal}>Close</button>
        <button
          onClick={() => {
            this.onAddPost();
            this.props.closeModal();
          }}
        >
          Post
        </button>
      </div>
    );
  }
}

export default AddPost;
