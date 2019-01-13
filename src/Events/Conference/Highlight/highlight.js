import React from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

const photos = [
  {
    src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
    width: 4,
    height: 3
  },
  {
    src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799',
    width: 1,
    height: 1
  },
  {
    src: 'https://source.unsplash.com/qDkso9nvCg0/600x799',
    width: 3,
    height: 4
  },
  {
    src: 'https://source.unsplash.com/iecJiKe_RNg/600x799',
    width: 3,
    height: 4
  },
  {
    src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799',
    width: 3,
    height: 4
  },
  {
    src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599',
    width: 4,
    height: 3
  },
  {
    src: 'https://source.unsplash.com/zh7GEuORbUw/600x799',
    width: 3,
    height: 4
  },
  {
    src: 'https://source.unsplash.com/PpOHJezOalU/800x599',
    width: 4,
    height: 3
  },
  {
    src: 'https://source.unsplash.com/I1ASdgphUH4/800x599',
    width: 4,
    height: 3
  }
];

class Highlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  }

  processImgs(imgs) {
    const set = [];
    imgs.forEach(e => {
      const img = {
        src: e.url,
        width: e.width,
        height: e.height
      };
      set.push(img);
    });
    // console.log(set);
    return set;
  }

  render() {
    return (
      <div
        className="site-section"
        style={{ width: '100%', padding: '0', margin: '0' }}
      >
        <div
          className="row"
          style={{ width: '100%', padding: '0', margin: '0' }}
        >
          <div className="col-md-6 mx-auto text-center mb-5 section-heading">
            <h2 className="mb-5">Highlight</h2>
          </div>
        </div>
        {/* <div className="row"> */}
        <Gallery
          photos={this.processImgs(this.props.highlight)}
          onClick={this.openLightbox}
        />
        <Lightbox
          images={this.processImgs(this.props.highlight)}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
        />
        {/* <Gallery photos={PHOTO_SET} /> */}
        {/* </div> */}
      </div>
    );
  }
}

export default Highlight;
