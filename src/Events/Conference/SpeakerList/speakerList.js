import React from 'react';
import Modal from 'react-responsive-modal';
import SmoothCollapse from 'react-smooth-collapse';
import { ReactHeight } from 'react-height';
import SpeakerInfo from './SpeakerInfo/speakerInfo';

class SpeakerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speakerSelected: '',
      modalSpeaker: false,
      expanded: false,
      collapsedHeight: 0
    };
    this.openModalSpeaker = this.openModalSpeaker.bind(this);
    this.closeModalSpeaker = this.closeModalSpeaker.bind(this);
  }

  openModalSpeaker(speakerID) {
    this.setState({ modalSpeaker: true, speakerSelected: speakerID });
  }

  closeModalSpeaker() {
    this.setState({ modalSpeaker: false });
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
        <div
          className="row speakers-section"
          key={i}
          // style={{ width: '100%', margin: '0 142px', paddingBottom: '24px' }}
        >
          {this.renderRow(startIndex, endIndex, imgs)}
        </div>
      );
    });
  }

  renderRow(startIndex, endIndex, imgs) {
    return imgs.slice(startIndex, endIndex).map(e => {
      if (this.state.speakerSelected === e.id) {
        return (
          <div className="col-md-6 col-lg-3 mb-2" key={e.id}>
            <div
              className="hotel-room text-center notransition"
              onClick={() => this.openModalSpeaker(e.id)}
            >
              <div className="d-block mb-2 thumbnail notransition">
                <img
                  src={e.picture}
                  alt=""
                  className="img-fluid notransition"
                />
              </div>
              <div className="hotel-room-body">
                <h3 class="heading mb-2">{e.name}</h3>
                <strong class="price">{e.occupation}</strong>
              </div>
            </div>
            <Modal
              open={this.state.modalSpeaker}
              onClose={this.closeModalSpeaker}
              center
            >
              <SpeakerInfo speaker={e} />
            </Modal>
          </div>
        );
      }
      return (
        <div className="col-md-6 col-lg-3 mb-2 speaker" key={e.id}>
          <div
            className="hotel-room text-center notransition"
            onClick={() => this.openModalSpeaker(e.id)}
          >
            <div className="d-block mb-2 thumbnail notransition">
              <img src={e.picture} alt="" className="img-fluid notransition" />
            </div>
            <div className="hotel-room-body">
              <h3 class="heading mb-2">{e.name}</h3>
              <strong class="price">{e.occupation}</strong>
            </div>
          </div>
        </div>
      );
    });
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
  toggle() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    return (
      <div className="site-section bg-light">
        <div className="container">
          <ReactHeight
            onHeightReady={height =>
              this.setState({ collapsedHeight: height + 160 })
            }
          >
            <div className="row">
              <div className="col-md-6 mx-auto text-center mb-5 section-heading">
                <h2 className="mb-5" style={{ fontFamily: 'Roboto' }}>
                  Speakers
                </h2>
              </div>
            </div>
          </ReactHeight>
          <SmoothCollapse
            expanded={this.state.expanded}
            collapsedHeight={`${this.state.collapsedHeight}px`}
          >
            <div className="row">{this.renderAllImg(this.props.speakers)}</div>
          </SmoothCollapse>
          <div className="row">
            {!this.state.expanded ? (
              <button className="view-btn" onClick={this.toggle.bind(this)}>
                View All
              </button>
            ) : (
              <button className="view-btn" onClick={this.toggle.bind(this)}>
                View Less
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SpeakerList;
