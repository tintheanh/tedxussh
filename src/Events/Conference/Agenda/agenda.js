import React from 'react'
import OneAgd from './OneAgd/oneAgd'
import moment from 'moment'
import { modifyObj } from '../../../config/functions'

class Agenda extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderAgenda(agenda) {
    return agenda.map((agd, i) => <OneAgd agd={agd} key={i} />)
  }

  toVNDate(inputDate) {
    return moment.unix(inputDate.seconds).format('D/M/YYYY')
  }

  convertTime(time) {
    const hour = parseInt(time.substring(0, 2))
    const min = parseInt(time.substring(3, 5))

    const decimalMin = min / 60
    return hour + decimalMin
  }

  sortAgenda(agenda) {
    return agenda.sort((a, b) => this.convertTime(a.time) - this.convertTime(b.time))
  }

  render() {
    const { isVN, date } = this.props
    const agenda = modifyObj(isVN, this.props.agenda, 'agenda')
    return (
      <div className="site-section bg-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto text-center mb-5 section-heading">
              <h2 className="mb-5">Agenda</h2>
            </div>
          </div>
          <div className="row">
            <div className="mx-auto text-center mb-5">
              <h4
                className="mb-5"
                style={{
								  backgroundColor: '#e62b1e',
								  padding: '14px 44px',
								  color: '#fff',
								  fontFamily: 'Oswald'
                }}
              >
                {this.toVNDate(date)}
              </h4>
            </div>
          </div>
          <ul className="agenda-section" style={{ padding: 0, listStyleType: 'none' }}>
            {this.renderAgenda(agenda)}
          </ul>
        </div>
      </div>
    )
  }
}

export default Agenda
