import React from 'react'
import TimePicker from 'react-time-picker'
import moment from 'moment'
import { root } from '../../../../../../config/firebase'

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
    // this.setState({ time })

    const hr = time.substring(0, 2)
    const min = time.substring(3, 5)
    const dateTime = moment(new Date().toISOString())
    dateTime.set({
      hour: hr,
      minute: min,
      second: '00'
    })

    console.log(dateTime)

    // const date = {
    //   ...this.state.date,
    //   endTime: end.toDate()
    // }
    this.setState({ time: dateTime })
  }

  onAddAgenda() {
    const newAgenda = {
      header: this.state.header,
      detail: this.state.detail,
      participants: this.state.participants,
      time: new Date(this.state.time),
      createdDate: new Date()
    }

    root
      .doc('conference')
      .collection('agendaList')
      .add(newAgenda)
      .then(() => alert('Agenda added'))
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
        <button
          onClick={() => {
            this.onAddAgenda()
            this.props.closeModalAdd()
          }}
        >
          Add
        </button>
        <button onClick={() => this.props.closeModalAdd()}>Cancel</button>
      </div>
    )
  }
}

export default AddAgenda
