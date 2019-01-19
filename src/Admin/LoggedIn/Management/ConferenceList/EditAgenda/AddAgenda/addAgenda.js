import React from 'react';
import TimePicker from 'react-time-picker';
import firebase from 'firebase';

class AddAgenda extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: '',
      detail: '',
      participants: '',
      time: this.getCurrentHours()
    };
  }

  getCurrentHours() {
    const d = new Date();
    const hour = d.getHours();
    const min = d.getMinutes();
    let minformatted = min.toString();
    if (min < 10) {
      minformatted = `0${min.toString()}`;
    }
    return `${hour}:${minformatted}`;
  }

  onHeaderChange(e) {
    this.setState({ header: e.target.value });
  }

  onDetailChange(e) {
    this.setState({ detail: e.target.value });
  }

  onParticipantsChange(e) {
    this.setState({ participants: e.target.value });
  }

  onTimeChange(time) {
    this.setState({ time });
  }

  onAddAgenda() {
    const agendaRef = firebase.database().ref('conference/agenda');
    const newAgenda = {
      header: this.state.header,
      detail: this.state.detail,
      participants: this.state.participants,
      time: this.state.time
    };
    agendaRef
      .push(newAgenda)
      .then(() => alert('Agenda added'))
      .catch(err => {
        console.error(err);
        alert('Error');
      });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="header"
          value={this.state.header}
          onChange={this.onHeaderChange.bind(this)}
        />
        <br />
        <input
          type="text"
          placeholder="detail"
          value={this.state.detail}
          onChange={this.onDetailChange.bind(this)}
        />
        <br />
        <textarea
          placeholder="participants"
          value={this.state.participants}
          onChange={this.onParticipantsChange.bind(this)}
        />
        <br />
        <TimePicker
          disableClock
          clockIcon={null}
          value={this.state.time}
          onChange={this.onTimeChange.bind(this)}
        />
        <br />
        <button
          onClick={() => {
            this.onAddAgenda();
            this.props.closeModalAdd();
          }}
        >
          Add
        </button>
        <button onClick={() => this.props.closeModalAdd()}>Cancel</button>
      </div>
    );
  }
}

export default AddAgenda;
