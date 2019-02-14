import React from 'react';
import Modal from 'react-responsive-modal';
import ImageManagement from '../../ImageMangement/imageManagement';
import { updateData } from '../../../../../config/firebase';

export default class UpdateMiddleCover extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cover: this.props.cover, modal: false };
  }

  onUpdate(newPic) {
    const update = {
      middle: {
        cover: newPic
      }
    };
    this.setState({ cover: newPic });
    updateData('home', update).catch(err => alert(err.message));
  }

  render() {
    return (
      <div>
        <div className="col-12">
          <img src={this.state.cover} alt="" className="img-fluid" />
        </div>
        <div className="col-12">
          <button onClick={() => this.setState({ modal: true })}>
            Edit cover
          </button>
        </div>
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
