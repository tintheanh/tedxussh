import React from 'react';
import Modal from 'react-responsive-modal';
import SmoothCollapse from 'react-smooth-collapse';
import SpeakerInfo from './SpeakerInfo/speakerInfo';

class SpeakerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speakerSelected: '',
      modalSpeaker: false,
      expanded: false
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

  renderFirstRow(totalRows, imgs) {
    let startIndex = -4;
    let endIndex = startIndex + 4;
    const temp = Array.from({ length: totalRows }, () =>
      Math.floor(Math.random())
    );

    return temp.map((_, i) => {
      startIndex += 4;
      endIndex += 4;
      if (i === 0) {
        return (
          <div
            className="row speakers-section first-roll-speakers"
            key={i}
            // style={{ margin: '0 10px' }}
          >
            {this.renderRow(startIndex, endIndex, imgs)}
          </div>
        );
      }
      return null;
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
      if (i !== 0) {
        return (
          // <ReactHeight
          //   onHeightReady={height => this.setState({ collapsedHeight: height })}
          //   className="myComponent"
          // >
          <div className="row speakers-section" key={i}>
            {this.renderRow(startIndex, endIndex, imgs)}
          </div>
          // </ReactHeight>
        );
      }
      return null;
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
          <div className="row">
            <div className="col-md-6 mx-auto text-center mb-5 section-heading">
              <h2 className="mb-5" style={{ fontFamily: 'Roboto' }}>
                Speakers
              </h2>
            </div>
          </div>
          {this.props.speakers.length <= 4 ? (
            <div className="row">{this.renderImg(1, this.props.speakers)}</div>
          ) : (
            <div>
              <div className="row">
                {this.renderFirstRow(1, this.props.speakers)}
              </div>
              <SmoothCollapse expanded={this.state.expanded}>
                <div className="row">
                  {this.renderAllImg(this.props.speakers)}
                </div>
              </SmoothCollapse>
              <div className="row">
                {!this.state.expanded ? (
                  <button
                    className="view-btn"
                    onClick={this.toggle.bind(this)}
                    style={{ textDecoration: 'none' }}
                  >
                    View All
                  </button>
                ) : (
                  <button
                    className="view-btn"
                    onClick={this.toggle.bind(this)}
                    style={{ textDecoration: 'none' }}
                  >
                    View Less
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SpeakerList;