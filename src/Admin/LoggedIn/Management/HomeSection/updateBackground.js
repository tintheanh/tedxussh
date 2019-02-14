import React from 'react';
import Modal from 'react-responsive-modal';
import ImageManagement from '../ImageMangement/imageManagement';
import { updateData } from '../../../../config/firebase';

export default class UpdateBackground extends React.Component {
  constructor(props) {
    super(props);
    this.state = { background: this.props.background, modalEditPic: false };
  }

  onUpdate(newPic) {
    const update = {
      background: newPic
    };
    this.setState({ background: newPic });
    updateData('home', update).catch(err => alert(err.message));
  }

  render() {
    return (
      <div className="row style-section">
        <div className="col-12">
          <h3>Background picture</h3>
        </div>
        <div className="col-12">
          <img src={this.state.background} alt="" className="img-fluid" />
        </div>
        <div className="col-12">
          <button onClick={() => this.setState({ modalEditPic: true })}>
            Edit cover
          </button>
        </div>
        <Modal
          open={this.state.modalEditPic}
          onClose={() => this.setState({ modalEditPic: false })}
          center
        >
          <ImageManagement
            category="stockImages"
            pick={this.onUpdate.bind(this)}
            closeModal={() => this.setState({ modalEditPic: false })}
          />
        </Modal>
      </div>
    );
  }
}
