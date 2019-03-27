import React from 'react'
import ReactQuill from 'react-quill'
import Modal from 'react-responsive-modal'
import ImageManagement from 'utils/components/ImageManagement'
import { addPost, getListRealtime } from 'config/firebase'

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean']
  ]
}

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
]

export default class AddPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postIDs: [],
      title: '',
      by: '',
      content: '',
      thumbnail: '',
      modalThumbAdd: false
    }

    this.onContentChange = this.onContentChange.bind(this)
    this.openModalThumbAdd = this.openModalThumbAdd.bind(this)
    this.closeModalThumbAdd = this.closeModalThumbAdd.bind(this)
  }

  componentDidMount() {
    getListRealtime('learn', 'posts', 'datePosted', querySnapshot => {
      const postIDs = []
      querySnapshot.forEach(doc => postIDs.push(doc.id))
      this.setState({ postIDs })
    })
  }

  openModalThumbAdd() {
    this.setState({ modalThumbAdd: true })
  }

  closeModalThumbAdd() {
    this.setState({ modalThumbAdd: false })
  }

  onContentChange(value) {
    this.setState({ content: value })
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value })
  }

  onAuthorChange(e) {
    this.setState({ by: e.target.value })
  }

  onThumbChange(url) {
    this.setState({ thumbnail: url })
  }

  generateID(string) {
    const signedChars =
			'àảãáạăằẳẵắặâầẩẫấậđèẻẽéẹêềểễếệìỉĩíịòỏõóọôồổỗốộơờởỡớợùủũúụưừửữứựỳỷỹýỵÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬĐÈẺẼÉẸÊỀỂỄẾỆÌỈĨÍỊÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢÙỦŨÚỤƯỪỬỮỨỰỲỶỸÝỴ'
    const unsignedChars =
			'aaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyAAAAAAAAAAAAAAAAADEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYY'
    const pattern = new RegExp(`[${signedChars}]`, 'g')
    const noSign = string.replace(pattern, (m, key, value) => unsignedChars.charAt(signedChars.indexOf(m)))
    const splitted = noSign
      .replace(/[^\w\s]/gi, '')
      .toLowerCase()
      .split(' ')
    let result = ''
    splitted.forEach((word, i) => {
      if (i === 0) result += word
      else result += `-${word}`
    })
    return result
  }

  onAddPost() {
    const { postIDs } = this.state
    const post = {
      title: this.state.title,
      by: this.state.by,
      datePosted: new Date(),
      content: this.state.content,
      thumbnail: this.state.thumbnail
    }
    const pid = this.generateID(post.title)
    if (!postIDs.includes(pid))
      addPost(pid, post)
        .then(() => this.props.closeModal())
        .catch(err => alert(err.message))
    else alert('Title post was already in the database!')
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
        <Modal open={this.state.modalThumbAdd} onClose={this.closeModalThumbAdd} center>
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
        <button onClick={() => this.onAddPost()}>Post</button>
      </div>
    )
  }
}
