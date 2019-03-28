import React from 'react'
import moment from 'moment'
import { getData } from 'config/firebase'

class GetEventUpdate extends React.Component {
  toEpoch(inputDate) {
    const date = moment(inputDate)
    const unix = moment(date).unix()

    return unix
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

  openTicketPage(url) {
    window.open(url, '_blank')
  }

  render() {
    const { isVN } = this.props
    const { getEventUpdate } = this.props
    
    const description = getEventUpdate.description.split('||')
      return (
        <div>
          <p
            style={{
						  textAlign: 'center',
						  margin: '44px',
						  fontFamily: 'Montserrat'
            }}
          >
            {isVN ? description[0] : description[1]}
          </p>
          <p
            style={{
						  textAlign: 'center',
						  fontWeight: '700',
						  fontFamily: 'Montserrat'
            }}
          >
            {this.toVNDate(getEventUpdate.startDate)} - {this.toVNDate(getEventUpdate.endDate)}
          </p>
          <div style={{ margin: 'auto', textAlign: 'center' }}>
            {moment().unix() >= this.toEpoch(getEventUpdate.startDate) &&
						moment().unix() <= this.toEpoch(getEventUpdate.endDate) ? (
  <button
    className="ticket-btn"
    onClick={this.openTicketPage.bind(this, getEventUpdate.ticket_link)}
    style={{ fontFamily: 'Montserrat' }}
  >
								GET ONE NOW
  </button>
						  ) : (
  <button disabled className="ticket-btn" style={{ fontFamily: 'Montserrat' }}>
								GET ONE NOW
  </button>
						  )}
          </div>
        </div>
      )
  }
}

export default GetEventUpdate
