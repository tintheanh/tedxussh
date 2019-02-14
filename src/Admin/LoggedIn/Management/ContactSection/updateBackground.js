import React from 'react';
import Modal from 'react-responsive-modal';
import ImageManagement from '../ImageMangement/imageManagement';
import { updateData } from '../../../../config/firebase';

export default class UpdateBackground extends React.Component {
  constructor(props) {
    super(props);
    this.state = { background: this.props.background, modal: false };
  }

  onUpdate(newPic) {
    const update = {
      background: newPic
    };
    this.setState({ background: newPic });
    updateData('contact', update).catch(err => alert(err.message));
  }

  render() {
    return (
      <div className="row style-section">
        <div className="col-12">
          <h3>Background picture</h3>
        </div>
        <div className="col-12">
          <img className="img-fluid" src={this.state.background} alt="" />
        </div>
        <button onClick={() => this.setState({ modal: true })}>Edit</button>
        <Modal
          open={this.state.modal}
          onClose={() => this.setState({ modal: false })}
          center
        >
          <ImageManagement
            category="stockImages"
            pick={this.onUpdate.bind(this)}
            closeModal={() => this.setState({ modal: false })}
          />
        </Modal>
      </div>
    );
  }
}
