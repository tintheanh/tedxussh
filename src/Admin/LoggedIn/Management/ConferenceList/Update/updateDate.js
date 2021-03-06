import React from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import TimePicker from 'react-time-picker'
import { updateData } from 'config/firebase'

export default class UpdateDate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: {
        startTime: moment.unix(this.props.date.startTime.seconds).toDate(),
        endTime: moment.unix(this.props.date.endTime.seconds).toDate()
      },
      toggle: false
    }
  }

  cancel() {
    const date = {
      startTime: moment.unix(this.props.date.startTime.seconds).toDate(),
      endTime: moment.unix(this.props.date.endTime.seconds).toDate()
    }
    this.setState({ toggle: false, date })
  }

  toDate(inputDate) {
    const date = moment(inputDate).format('D/M/YYYY, h:mm a')
    return date
  }

  toHours(inputTime) {
    const hours = moment(inputTime).format('HH:mm')
    return hours
  }

  onStartDateChange(newDate) {
    const date = {
      ...this.state.date,
      startTime: newDate
    }
    this.setState({ date })
  }

  onStartTimeChange(hour) {
    const h = moment(hour, 'hh:mm:ss')
    const start = moment(this.state.date.startTime.toISOString())
    start.set({
      hour: h.get('hour'),
      minute: h.get('minute'),
      second: h.get('second')
    })

    const date = {
      ...this.state.date,
      startTime: start.toDate()
    }
    this.setState({ date })
  }

  onEndDateChange(newDate) {
    const date = {
      ...this.state.date,
      endTime: newDate
    }
    this.setState({ date })
  }

  onEndTimeChange(hour) {
    const h = moment(hour, 'hh:mm:ss')
    const end = moment(this.state.date.endTime.toISOString())
    end.set({
      hour: h.get('hour'),
      minute: h.get('minute'),
      second: h.get('second')
    })

    const date = {
      ...this.state.date,
      endTime: end.toDate()
    }
    this.setState({ date })
  }

  onUpdate() {
    const update = {
      overview: {
        startTime: this.state.date.startTime,
        endTime: this.state.date.endTime
      }
    }

    updateData('conference', update).catch(err => alert(err.message))
    this.setState({ toggle: false })
  }

  render() {
    const { startTime, endTime } = this.state.date
    if (!this.state.toggle) {
      return (
        <div className="col-12">
          <h5>Start</h5>
          <p>{this.toDate(startTime)}</p>
          <h5>End</h5>
          <p>{this.toDate(endTime)}</p>
          <button onClick={() => this.setState({ toggle: true })}>Edit</button>
        </div>
      )
    }
    return (
      <div className="col-12">
        <h5>Start</h5>
        <DatePicker dateFormat="d/M/YYYY" selected={startTime} onChange={this.onStartDateChange.bind(this)} />
        <br />
        <TimePicker disableClock clockIcon={null} value={this.toHours(startTime)} onChange={this.onStartTimeChange.bind(this)} />
        <h5>End</h5>
        <DatePicker dateFormat="d/M/YYYY" selected={endTime} onChange={this.onEndDateChange.bind(this)} />
        <br />
        <TimePicker disableClock clockIcon={null} value={this.toHours(endTime)} onChange={this.onEndTimeChange.bind(this)} />
        <br />
        <button onClick={this.onUpdate.bind(this)}>Save</button>
        <button onClick={this.cancel.bind(this)}>Cancel</button>
      </div>
    )
  }
}
