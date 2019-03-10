import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { updateData } from 'config/firebase'

export default class UpdateStartDate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: false,
      startDate: this.props.startDate
    }
  }

  toVNDate(inputDate) {
    if (inputDate) {
      const date = inputDate.split('-')
      const year = date[0]
      let month = date[1]
      let day = date[2]
      if (parseInt(month) < 10) {
        month = month.substring(1, 2)
      }
      if (parseInt(day) < 10) {
        day = day.substring(1, 2)
      }
      return `${day}/${month}/${year}`
    }
    return ''
  }

  onStartDateChange(date) {
    this.setState({ startDate: moment(date).format('YYYY-MM-DD') })
  }

  onUpdate() {
    const update = {
      startDate: this.state.startDate
    }
    updateData('getEventUpdate', update)
      .then(() => this.setState({ toggle: false }))
      .catch(err => alert(err.message))
  }

  cancel() {
    this.setState({ toggle: false, startDate: this.props.startDate })
  }

  render() {
    const { toggle } = this.state
    return (
      <div className="col-12">
        <h5>Start Date</h5>
        {!toggle ? (
          <div>
            <p>{this.toVNDate(this.state.startDate)}</p>
            <button onClick={() => this.setState({ toggle: true })}>Edit</button>
          </div>
        ) : (
          <div>
            <DatePicker dateFormat="d/M/YYYY" selected={moment(this.state.startDate).toDate()} onChange={this.onStartDateChange.bind(this)} />
            <br />
            <button onClick={this.onUpdate.bind(this)}>Save</button>
            <button onClick={this.cancel.bind(this)}>Cancel</button>
          </div>
        )}
      </div>
    )
  }
}
