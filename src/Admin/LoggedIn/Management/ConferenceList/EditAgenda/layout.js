import React from 'react';
import TimePicker from 'react-time-picker';
import Modal from 'react-responsive-modal';
import AddAgenda from './AddAgenda/layout';

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

  render() {
    return (
      <div>
        {this.props.agenda.map(a => {
          if (this.state.keySelected !== a.id) {
            return (
              <div key={a.id}>
                <h1>{a.header}</h1>
                <p>{a.detail}</p>
                <p>{a.participants}</p>
                <p>{a.time}</p>
                <button
                  onClick={() =>
                    this.setState({
                      keySelected: a.id,
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
                <button onClick={() => this.props.removeAgenda(a.id)}>
                  Delete
                </button>
              </div>
            );
          }
          return (
            <div key={a.id}>
              <input
                type="text"
                defaultValue={a.header}
                onChange={this.onHeaderChange.bind(this)}
              />
              <br />
              <input
                type="text"
                defaultValue={a.detail}
                onChange={this.onDetailChange.bind(this)}
              />
              <br />
              <input
                type="text"
                defaultValue={a.participants}
                onChange={this.onParticipantsChange.bind(this)}
              />
              <br />
              <TimePicker
                disableClock
                clockIcon={null}
                value={a.time}
                onChange={this.onTimeChange.bind(this)}
              />
              <button
                type="button"
                onClick={() => {
                  const updated = {
                    id: a.id,
                    header:
                      this.state.changedHeader === '' &&
                      !this.state.focus.includes('header')
                        ? a.header
                        : this.state.changedHeader,
                    detail:
                      this.state.changedDetail === '' &&
                      !this.state.focus.includes('detail')
                        ? a.detail
                        : this.state.changedDetail,
                    participants:
                      this.state.changedParticipants === '' &&
                      !this.state.focus.includes('participants')
                        ? a.participants
                        : this.state.changedParticipants,
                    time:
                      this.state.changedTime === '' &&
                      !this.state.focus.includes('time')
                        ? a.time
                        : this.state.changedTime
                  };
                  this.props.updateOneAgenda(updated);
                  this.setState({
                    keySelected: ''
                  });
                }}
              >
                Save
              </button>
              <button
                onClick={() =>
                  this.setState({
                    keySelected: '',
                    header: a.header,
                    detail: a.detail,
                    participants: a.participants,
                    time: a.time
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
            this.props.refetchAfterClosed();
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            this.props.onUpdateAgenda('agenda');
            this.props.closeModalAgenda();
          }}
        >
          Save
        </button>
        <button onClick={this.openModalAdd}>Add</button>
        <Modal open={this.state.modalAdd} onClose={this.closeModalAdd} center>
          <AddAgenda
            closeModalAdd={this.closeModalAdd}
          />
        </Modal>
      </div>
    );
  }
}

export default EditAgenda;
