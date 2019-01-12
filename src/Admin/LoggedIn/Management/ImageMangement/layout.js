import React from 'react';
import firebase from 'firebase';

class ImageManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgs: [],
      pickedImg: ''
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref(`images/${this.props.category}`)
      .on('value', snapshot => {
        const imgObj = snapshot.val();
        const imgs = [];
        if (imgObj) {
          Object.keys(imgObj).forEach(e => {
            const img = {
              id: e,
              name: imgObj[e].name,
              url: imgObj[e].url
            };
            imgs.push(img);
          });
          this.setState({ imgs });
        }
      });
  }

  renderImg(totalRows, imgs) {
    let startIndex = -4;
    let endIndex = startIndex + 4;
    const temp = Array.from({ length: totalRows }, () =>
      Math.floor(Math.random())
    );

    return temp.map((_, i) => {
      startIndex += 4;
      endIndex += 4;
      return (
        <div className="row" key={i}>
          {this.renderRow(startIndex, endIndex, imgs)}
        </div>
      );
    });
  }

  renderRow(startIndex, endIndex, imgs) {
    return imgs.slice(startIndex, endIndex).map(e => (
      <div
        className="col-3"
        key={e.id}
        onClick={() => {
          // this.props.pick(e.url);
          this.pickImg(e.url);
        }}
      >
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={e.url} className="img-fluid notransition" />
          </div>
          <div
            className="hotel-room-body"
            style={{
              backgroundColor: this.state.pickedImg === e.url ? 'cyan' : ''
            }}
          >
            <strong className="price">{e.name}</strong>
          </div>
        </div>
      </div>
    ));
  }

  renderAllImg(imgs) {
    if (imgs.length > 0) {
      if (imgs.length % 4 === 0) {
        return this.renderImg(imgs.length / 4, imgs);
      }
      return this.renderImg(imgs.length / 4 + 1, imgs);
    }
    return <h2>No imgs available</h2>;
  }

  pickImg(url) {
    this.setState({ pickedImg: url });
  }

  render() {
    if (this.state.imgs[0]) {
      const { imgs } = this.state;
      return (
        <div>
          <div className="row">{this.renderAllImg(imgs)}</div>
          <button
            type="button"
            onClick={() => {
              if (this.props.speakerID !== null)
                this.props.pick(
                  this.props.speakerID,
                  'picture',
                  this.state.pickedImg
                );
              else this.props.pick(this.state.pickedImg);
              this.props.closeModal();
            }}
          >
            Save
          </button>
          <button onClick={() => this.props.closeModal()}>Cancel</button>
        </div>
      );
    }
    return null;
  }
}

export default ImageManagement;
