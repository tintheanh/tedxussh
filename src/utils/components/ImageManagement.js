import React from 'react'
import { Loading } from 'utils/components/PageComponents'
import { getListRealtime } from 'config/firebase'

export default class ImageManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imgs: [],
      pickedImgUrl: '',
      pickedImgName: ''
    }
  }

  componentDidMount() {
    getListRealtime('images', this.props.category, 'dateAdded', querySnapshot => {
      const imgs = []
      querySnapshot.forEach(doc => {
        const img = { ...doc.data(), id: doc.id }
        imgs.push(img)
      })
      this.setState({ imgs })
    })
  }

  renderImg(totalRows, imgs) {
    let startIndex = -4
    let endIndex = startIndex + 4
    const temp = Array.from({ length: totalRows }, () => Math.floor(Math.random()))

    return temp.map((_, i) => {
      startIndex += 4
      endIndex += 4
      return (
        <div className="row" key={i}>
          {this.renderRow(startIndex, endIndex, imgs)}
        </div>
      )
    })
  }

  shorten(string) {
    if (string && string.length > 10)
      return `${string.substring(0, 10)}...`
    return string
  }

  renderRow(startIndex, endIndex, imgs) {
    return imgs.slice(startIndex, endIndex).map(e => (
      <div
        className="col-3"
        key={e.id}
        onClick={() => {
          // this.props.pick(e.url);
          this.pickImg(e)
        }}
      >
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={e.url} className="img-fluid notransition" />
          </div>
          <div
            className="hotel-room-body"
            style={{
              backgroundColor: this.state.pickedImgUrl === e.url ? 'cyan' : ''
            }}
          >
            <strong className="price">{this.shorten(e.name)}</strong>
          </div>
        </div>
      </div>
    ))
  }

  renderAllImg(imgs) {
    if (imgs.length > 0) {
      if (imgs.length % 4 === 0) {
        return this.renderImg(imgs.length / 4, imgs)
      }
      return this.renderImg(imgs.length / 4 + 1, imgs)
    }
    return <h2>No imgs available</h2>
  }

  pickImg(img) {
    this.setState({ pickedImgUrl: img.url, pickedImgName: img.name })
  }

  render() {
    if (this.state.imgs[0]) {
      const { imgs } = this.state
      return (
        <div>
          <div className="row">{this.renderAllImg(imgs)}</div>
          <button
            type="button"
            onClick={() => {
              // if (this.props.speakerID !== null)
              //   this.props.pick(
              //     this.props.speakerID,
              //     'picture',
              //     this.state.pickedImgUrl
              //   );
              // else this.props.pick(this.state.pickedImgUrl);
              // this.props.closeModal();
              this.props.pick(this.state.pickedImgUrl, this.state.pickedImgName)
              this.props.closeModal()
            }}
          >
            Save
          </button>
          <button onClick={() => this.props.closeModal()}>Cancel</button>
        </div>
      )
    }
    return <Loading forPicture />
  }
}
