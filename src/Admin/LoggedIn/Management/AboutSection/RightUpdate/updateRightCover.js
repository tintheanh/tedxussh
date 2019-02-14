import React from 'react';
import Modal from 'react-responsive-modal';
import ImageManagement from '../../ImageMangement/imageManagement';
import { updateData } from '../../../../../config/firebase';

export default class UpdateRightCover extends React.Component {
  constructor(props) {
    super(props);
    this.state = { picture: this.props.picture, modal: false };
  }

  onUpdate(newPic) {
    const update = {
      right: {
        picture: newPic
      }
    };
    this.setState({ picture: newPic });
    updateData('about', update).catch(err => alert(err.message));
  }

  render() {
    return (
      <div className="col-12">
        <div>
          <h5>Right cover</h5>
        </div>
        <div>
          <img className="img-fluid" src={this.state.picture} alt="" />
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
