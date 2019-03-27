import React from 'react'
import TimePicker from 'react-time-picker'
import { root, addUnit } from 'config/firebase'

class AddAgenda extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      header: '',
      detail: '',
      participants: '',
      time: ''
    }
  }

  getCurrentHours() {
    const d = new Date()
    const hour = d.getHours()
    const min = d.getMinutes()
    let minformatted = min.toString()
    if (min < 10) {
      minformatted = `0${min.toString()}`
    }
    return `${hour}:${minformatted}`
  }

  onHeaderChange(e) {
    this.setState({ header: e.target.value })
  }

  onDetailChange(e) {
    this.setState({ detail: e.target.value })
  }

  onParticipantsChange(e) {
    this.setState({ participants: e.target.value })
  }

  onTimeChange(time) {
    this.setState({ time })
  }

  onAddAgenda() {
    const newAgenda = {
      header: this.state.header,
      detail: this.state.detail,
      participants: this.state.participants,
      time: this.state.time
    }

    addUnit('conference', 'agendaList', newAgenda)
      .then(() => {
        alert('Added')
        this.props.closeModalAdd()
      })
      .catch(err => alert(err.message))
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="header" value={this.state.header} onChange={this.onHeaderChange.bind(this)} />
        <br />
        <input type="text" placeholder="detail" value={this.state.detail} onChange={this.onDetailChange.bind(this)} />
        <br />
        <textarea placeholder="participants" value={this.state.participants} onChange={this.onParticipantsChange.bind(this)} />
        <br />
        <TimePicker disableClock clockIcon={null} onChange={this.onTimeChange.bind(this)} />
        <br />
        <button onClick={this.onAddAgenda.bind(this)}>Add</button>
        <button onClick={() => this.props.closeModalAdd()}>Cancel</button>
      </div>
    )
  }
}

export default AddAgenda
