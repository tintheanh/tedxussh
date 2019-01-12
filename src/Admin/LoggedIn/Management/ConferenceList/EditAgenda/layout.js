import React from 'react';
import TimePicker from 'react-time-picker';

class EditAgenda extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keySelected: '',
      changedHeader: '',
      changedDetail: '',
      changedParticipants: '',
      changedTime: '',
      focus: []
    };
  }

  onTimeChange(time) {
    this.setState({
      changedTime: time,
      focus: this.state.focus.push('time')
    });
  }

  render() {
    return this.props.agenda.map(a => {
      if (this.state.keySelected !== a.id) {
        return (
          <div key={a.id}>
            <h1>{a.header}</h1>
            <p>{a.detail}</p>
            <p>{a.participants}</p>
            <p>{a.time}</p>
            <button onClick={() => this.setState({ keySelected: a.id })}>
              Edit
            </button>
          </div>
        );
      }
      return (
        <div key={a.id}>
          <input
            type="text"
            defaultValue={a.header}
            onChange={e => {
              this.setState(
                {
                  changedHeader: e.target.value,
                  focus: this.state.focus.push('header')
                },
                () => console.log(this.state.focus)
              );
            }}
          />
          <br />
          <input
            type="text"
            defaultValue={a.detail}
            onChange={e =>
              this.setState(
                {
                  changedDetail: e.target.value,
                  focus: this.state.focus.push('detail')
                },
                () => console.log(this.state.focus)
              )
            }
          />
          <br />
          <input
            type="text"
            defaultValue={a.participants}
            onChange={e =>
              this.setState({
                changedParticipants: e.target.value,
                focus: this.state.focus.push('participants')
              })
            }
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
                  this.state.focus !== 'header'
                    ? a.header
                    : this.state.changedHeader,
                detail:
                  this.state.changedDetail === '' &&
                  this.state.focus !== 'detail'
                    ? a.detail
                    : this.state.changedDetail,
                participants:
                  this.state.changedParticipants === '' &&
                  this.state.focus !== 'participants'
                    ? a.participants
                    : this.state.changedParticipants,
                time:
                  this.state.changedTime === '' && this.state.focus !== 'time'
                    ? a.time
                    : this.state.changedTime
              };
              this.props.updateOneAgenda(updated);
              this.setState({
                keySelected: '',
                changedDetail: '',
                changedHeader: '',
                changedParticipants: '',
                changedTime: ''
              });
            }}
          >
            Save
          </button>
          <button onClick={() => this.setState({ keySelected: '' })}>
            Cancel
          </button>
        </div>
      );
    });
  }
}

export default EditAgenda;
