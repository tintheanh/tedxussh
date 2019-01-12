import React from 'react';
import Modal from 'react-responsive-modal';
import AddSpeaker from './AddSpeaker/layout';

class EditSpeakers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleAdd: false
    };
    this.openModalAdd = this.openModalAdd.bind(this);
    this.closeModalAdd = this.closeModalAdd.bind(this);
  }

  openModalAdd() {
    this.setState({ toggleAdd: true });
  }

  closeModalAdd() {
    this.setState({ toggleAdd: false });
  }

  render() {
    return (
      <div>
        {this.props.renderAllImg(this.props.speakers, 'speakers', true)}
        <button
          onClick={() => {
            this.props.updateSpeakers('speakers');
            this.props.closeModalSpeakers();
          }}
        >
          Save
        </button>
        <button onClick={this.openModalAdd}>Add</button>
        <Modal open={this.state.toggleAdd} onClose={this.closeModalAdd} center>
          <AddSpeaker closeModal={this.closeModalAdd} />
        </Modal>
        <button
          onClick={() => {
            this.props.refetchAfterClosed();
            this.props.closeModalSpeakers();
          }}
        >
          Cancel
        </button>
      </div>
    );
  }
}
export default EditSpeakers;
