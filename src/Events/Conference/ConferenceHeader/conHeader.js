import React from 'react'
import { Parallax } from 'react-parallax'
import { modifyObj } from '../../../config/functions'

const toVNDate = inputDate => {
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

const ConferenceHeader = props => {
  const { isVN } = props
  const overview = modifyObj(isVN, props.overview, 'overview')
  const {
    picture, date, description, startTime, endTime, address, title
  } = overview
  return (
    <Parallax bgImage={picture} strength={500} className="overview-parallax">
      <div className="container" style={{ height: '100%' }}>
        <div className="row align-items-center" style={{ height: '100%' }}>
          <div className="header-wrapper">
            <div className="col-lg-12 col-md-12 text-vertical-center">
              <h1 className="event-title mb-1">{title}</h1>
              <p className="p-2 event-description">{description}</p>
              <p className="p-2 event-description">
                <span style={{ fontWeight: '500' }}>{isVN ? 'Địa điểm:' : 'Location:'}</span> {address}
              </p>
              <p className="p-2 event-description">
                <span style={{ fontWeight: '500' }}>{isVN ? 'Thời gian:' : 'Time:'}</span> {startTime} - {endTime} {isVN ? 'ngày' : 'on'} {toVNDate(date)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Parallax>
  )
}

export default ConferenceHeader
