import React from 'react';
import TimePicker from 'react-time-picker';
import firebase from 'firebase';
import Modal from 'react-responsive-modal';
import AddAgenda from './AddAgenda/addAgenda';

class EditAgenda extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keySelected: '',
      changedHeader: '',
      changedDetail: '',
      changedParticipants: '',
      changedTime: '',

      focus: [],

      modalAdd: false
    };
    this.openModalAdd = this.openModalAdd.bind(this);
    this.closeModalAdd = this.closeModalAdd.bind(this);
  }

  openModalAdd() {
    this.setState({ modalAdd: true });
  }

  closeModalAdd() {
    this.setState({ modalAdd: false });
  }

  onHeaderChange(e) {
    e.preventDefault();
    const focus = [...this.state.focus];
    if (!focus.includes('header')) {
      focus.push('header');
    }
    this.setState({ changedHeader: e.target.value, focus }, () =>
      console.log(this.state.changedHeader, this.state.focus)
    );
  }

  onDetailChange(e) {
    e.preventDefault();
    const focus = [...this.state.focus];
    if (!focus.includes('detail')) {
      focus.push('detail');
    }
    this.setState({ changedDetail: e.target.value, focus }, () =>
      console.log(this.state.changedDetail, this.state.focus)
    );
  }

  onParticipantsChange(e) {
    e.preventDefault();
    const focus = [...this.state.focus];
    if (!focus.includes('participants')) {
      focus.push('participants');
    }
    this.setState({ changedParticipants: e.target.value, focus }, () =>
      console.log(this.state.changedParticipants, this.state.focus)
    );
  }

  onTimeChange(time) {
    const focus = [...this.state.focus];
    if (!focus.includes('time')) {
      focus.push('time');
    }
    this.setState({ changedTime: time, focus });
  }

  onSaveChanges(agd) {
    const update = {
      id: agd.id,
      header:
        this.state.changedHeader === '' && !this.state.focus.includes('header')
          ? agd.header
          : this.state.changedHeader,
      detail:
        this.state.changedDetail === '' && !this.state.focus.includes('detail')
          ? agd.detail
          : this.state.changedDetail,
      participants:
        this.state.changedParticipants === '' &&
        !this.state.focus.includes('participants')
          ? agd.participants
          : this.state.changedParticipants,
      time:
        this.state.changedTime === '' && !this.state.focus.includes('time')
          ? agd.time
          : this.state.changedTime
    };

    this.props.updateOneAgenda(update);
    this.setState({
      keySelected: ''
    });
  }

  deleteAgenda(agdID) {
    firebase
      .database()
      .ref(`conference/agenda/${agdID}`)
      .remove();
  }

  render() {
    return (
      <div>
        {this.props.agenda.map(agd => {
          if (this.state.keySelected !== agd.id) {
            return (
              <div key={agd.id} style={{ borderBottom: '2px solid #ccc' }}>
                <strong>{agd.header}</strong>
                <p>{agd.detail}</p>
                <p>{agd.participants}</p>
                <p>{agd.time}</p>
                <button
                  onClick={() =>
                    this.setState({
                      keySelected: agd.id,
                      changedDetail: '',
                      changedHeader: '',
                      changedParticipants: '',
                      changedTime: '',
                      focus: []
                    })
                  }
                >
                  Edit
                </button>
                <button onClick={this.deleteAgenda.bind(this, agd.id)}>
                  Delete
                </button>
              </div>
            );
          }
          return (
            <div key={agd.id}>
              <input
                type="text"
                defaultValue={agd.header}
                onChange={this.onHeaderChange.bind(this)}
              />
              <br />
              <input
                type="text"
                defaultValue={agd.detail}
                onChange={this.onDetailChange.bind(this)}
              />
              <br />
              <input
                type="text"
                defaultValue={agd.participants}
                onChange={this.onParticipantsChange.bind(this)}
              />
              <br />
              <TimePicker
                disableClock
                clockIcon={null}
                value={agd.time}
                onChange={this.onTimeChange.bind(this)}
              />
              <button
                type="button"
                onClick={this.onSaveChanges.bind(this, agd)}
              >
                Save
              </button>
              <button
                onClick={() =>
                  this.setState({
                    keySelected: '',
                    header: agd.header,
                    detail: agd.detail,
                    participants: agd.participants,
                    time: agd.time
                  })
                }
              >
                Cancel
              </button>
            </div>
          );
        })}
        <button
          onClick={() => {
            this.props.closeModalAgenda();
          }}
        >
          Done
        </button>
        <button onClick={this.openModalAdd}>Add</button>
        <Modal open={this.state.modalAdd} onClose={this.closeModalAdd} center>
          <AddAgenda closeModalAdd={this.closeModalAdd} />
        </Modal>
      </div>
    );
  }
}

export default EditAgenda;
