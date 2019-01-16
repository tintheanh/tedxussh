import React from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

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
        key: e.id,
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
        className="site-section removePaddingBottom"
        style={{ width: '100%', margin: '0' }}
      >
        <div
          className="row"
          style={{ width: '100%', padding: '0', margin: '0' }}
        >
          <div className="col-md-6 mx-auto text-center mb-5 section-heading">
            <h2 className="mb-5" style={{ fontFamily: 'Roboto' }}>
              Highlight
            </h2>
          </div>
        </div>
        {/* <div className="row"> */}
        <Gallery
          photos={this.processImgs(this.props.highlight)}
          // direction="column"
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
