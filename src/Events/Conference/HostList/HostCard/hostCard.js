import React from 'react';
import Modal from 'react-responsive-modal';
import HostInfo from '../HostInfo/hostInfo';

export default class HostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalHost: false
    };
  }

  openModalHost() {
    this.setState({ modalHost: true });
  }

  closeModalHost() {
    this.setState({ modalHost: false });
  }

  render() {
    const { host } = this.props;
    return (
      <div className="col-sm-6 col-lg-3 host">
        <div
          className="hotel-room text-center notransition"
          onClick={() => this.openModalHost()}
        >
          <div className="d-block mb-2 thumbnail notransition">
            <img
              src={host.picture}
              alt=""
              className="img-fluid notransition"
            />
          </div>
          <div className="hotel-room-body">
            <h3 className="heading mb-2">{host.name}</h3>
            <strong className="price">{host.occupation}</strong>
          </div>
        </div>
        <Modal
          open={this.state.modalHost}
          onClose={this.closeModalHost.bind(this)}
          center
        >
          <HostInfo host={host} />
        </Modal>
      </div>
    );
  }
}
