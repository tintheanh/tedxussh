import React from 'react';
import Modal from 'react-responsive-modal';
import SmoothCollapse from 'react-smooth-collapse';
import SpeakerInfo from './SpeakerInfo/speakerInfo';
import { modifyObj } from '../../../config/functions';

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
        <div className="row speakers-section" key={i}>
          {this.renderRow(startIndex, endIndex, imgs)}
        </div>
      );
    });
  }

  renderRow(startIndex, endIndex, imgs) {
    return imgs.slice(startIndex, endIndex).map(e => {
      if (this.state.speakerSelected === e.id) {
        return (
          <div className="col-sm-6 col-lg-3 speaker" key={e.id}>
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
        <div className="col-sm-6 col-lg-3 speaker" key={e.id}>
          <div
            className="hotel-room text-center notransition"
            onClick={() => this.openModalSpeaker(e.id)}
          >
            <div className="d-block mb-2 thumbnail notransition">
              <img src={e.picture} alt="" className="img-fluid notransition" />
            </div>
            <div className="hotel-room-body">
              <h3 className="heading mb-2" style={{ fontFamily: 'Oswald' }}>
                {e.name}
              </h3>
              <strong className="price" style={{ fontFamily: 'Montserrat' }}>
                {e.occupation}
              </strong>
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
    return (
      <div className="col-12">
        <h5 className="text-center" style={{ fontFamily: 'Montserrat' }}>
          No speakers
        </h5>
      </div>
    );
  }
  toggle() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { isVN } = this.props;
    const speakers = modifyObj(isVN, this.props.speakers, 'speakers');
    if (speakers.speakerList) {
      return (
        <div className="site-section bg-light">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 mx-auto text-center mb-5 section-heading">
                <h2 className="mb-5">Speakers</h2>
              </div>
            </div>
            <div className="row adv-wrapper" style={{ paddingBottom: '24px' }}>
              <div className="col-12">
                <p className="text-center" style={{ fontFamily: 'Montserrat' }}>
                  {speakers.description}
                </p>
              </div>
            </div>
            {speakers.speakerList.length <= 4 ? (
              <div className="row">
                {this.renderAllImg(speakers.speakerList)}
              </div>
            ) : (
              <div>
                <div className="row">
                  {this.renderAllImg(speakers.speakerList.slice(0, 4))}
                </div>
                <SmoothCollapse expanded={this.state.expanded}>
                  <div className="row">
                    {this.renderAllImg(
                      speakers.speakerList.slice(4, speakers.speakerList.length)
                    )}
                  </div>
                </SmoothCollapse>
                <div className="row">
                  {!this.state.expanded ? (
                    <button
                      className="view-btn"
                      onClick={this.toggle.bind(this)}
                      style={{ textDecoration: 'none', cursor: 'pointer' }}
                    >
                      View All
                    </button>
                  ) : (
                    <button
                      className="view-btn"
                      onClick={this.toggle.bind(this)}
                      style={{ textDecoration: 'none', cursor: 'pointer' }}
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
    return null;
  }
}

export default SpeakerList;
