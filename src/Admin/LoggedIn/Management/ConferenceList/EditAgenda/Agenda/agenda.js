import React from 'react'
import moment from 'moment'
import TimePicker from 'react-time-picker'
import { root } from '../../../../../../config/firebase'

export default class Agenda extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      agenda: {
        ...this.props.agenda,
        time: moment.unix(this.props.agenda.time.seconds).toDate()
      },
      toggleEdit: false
    }
  }

  toTime(inputTime) {
    const date = moment(inputTime).format('h:mm A')
    return date
  }

  toHours(inputTime) {
    const hours = moment(inputTime).format('hh:mm')
    return hours
  }

  cancel() {
    this.setState({
      toggleEdit: false,
      agenda: {
        ...this.props.agenda,
        time: moment.unix(this.props.agenda.time.seconds).toDate()
      }
    })
  }

  onTimeChange(hour) {
    const h = moment(hour, 'hh:mm:ss')
    const time = moment(this.state.agenda.time.toISOString())
    time.set({
      hour: h.get('hour'),
      minute: h.get('minute'),
      second: h.get('second')
    })

    const agenda = {
      ...this.state.agenda,
      time
    }
    this.setState({ agenda })
  }

  onHeaderChange(e) {
    const agenda = {
      ...this.state.agenda,
      header: e.target.value
    }

    this.setState({ agenda })
  }

  onDetailChange(e) {
    const agenda = {
      ...this.state.agenda,
      detail: e.target.value
    }

    this.setState({ agenda })
  }

  onParticipantsChange(e) {
    const agenda = {
      ...this.state.agenda,
      participants: e.target.value
    }

    this.setState({ agenda })
  }

  onUpdate(id) {
    const { agenda } = this.state
    const update = {
      header: agenda.header,
      detail: agenda.detail,
      participants: agenda.participants,
      time: agenda.time.toDate()
    }

    root
      .doc('conference')
      .collection('agendaList')
      .doc(id)
      .set(update, { merge: true })
      .then(() => this.setState({ toggleEdit: false }))
      .catch(err => alert(err.message))
  }

  onDelete(id) {
    const ask = window.confirm('Sure to delete?')
    if (ask) {
      root
        .doc('conference')
        .collection('agendaList')
        .doc(id)
        .delete()
        .then(() => this.setState({ toggleEdit: false }))
        .catch(err => alert(err.message))
    }
  }

  render() {
    const { agenda, toggleEdit } = this.state
    return !toggleEdit ? (
      <div>
        <strong>{this.toTime(agenda.time)}</strong>
        <div>{agenda.header}</div>
        <p>{agenda.detail}</p>
        <p>{agenda.participants}</p>
        <button onClick={() => this.setState({ toggleEdit: true })}>Edit</button>
        <button onClick={this.onDelete.bind(this, agenda.id)}>Delete</button>
      </div>
    ) : (
      <div>
        <TimePicker disableClock clockIcon={null} value={this.toHours(agenda.time)} onChange={this.onTimeChange.bind(this)} />
        <input type="text" value={agenda.header} onChange={e => this.onHeaderChange(e)} />
        <textarea value={agenda.detail} onChange={e => this.onDetailChange(e)} />
        <textarea value={agenda.participants} onChange={e => this.onParticipantsChange(e)} />
        <button onClick={this.onUpdate.bind(this, agenda.id)}>Save</button>
        <button onClick={this.cancel.bind(this)}>Cancel</button>
      </div>
    )
  }
}
