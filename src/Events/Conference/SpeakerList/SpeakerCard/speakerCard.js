import React from 'react';
import Modal from 'react-responsive-modal';
import SpeakerInfo from '../SpeakerInfo/speakerInfo';

export default class SpeakerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalSpeaker: false
    };
  }

  openModalSpeaker() {
    this.setState({ modalSpeaker: true });
  }

  closeModalSpeaker() {
    this.setState({ modalSpeaker: false });
  }

  render() {
    const { speaker } = this.props;
    return (
      <div className="col-sm-6 col-lg-3 speaker">
        <div
          className="hotel-room text-center notransition"
          onClick={() => this.openModalSpeaker()}
        >
          <div className="d-block mb-2 thumbnail notransition">
            <img
              src={speaker.picture}
              alt=""
              className="img-fluid notransition"
            />
          </div>
          <div className="hotel-room-body">
            <h3 className="heading mb-2">{speaker.name}</h3>
            <strong className="price">{speaker.occupation}</strong>
          </div>
        </div>
        <Modal
          open={this.state.modalSpeaker}
          onClose={this.closeModalSpeaker.bind(this)}
          center
        >
          <SpeakerInfo speaker={speaker} />
        </Modal>
      </div>
    );
  }
}
