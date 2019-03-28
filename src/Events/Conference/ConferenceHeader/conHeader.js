import React from 'react'
import moment from 'moment'
import { Parallax } from 'react-parallax'
import { modifyObj } from '../../../config/functions'

const toVNDate = inputDate => {
  return moment(inputDate).format('D/M/YYYY')
}

const toTime = epoch => {
  return moment.unix(epoch.seconds).format('h:mm a')
}

const ConferenceHeader = props => {
  const { isVN } = props
  const overview = modifyObj(isVN, props.overview, 'overview')
  const {
    cover_picture, date, description, startTime, endTime, location, title
  } = overview
  return (
    <Parallax bgImage={cover_picture} strength={500} className="overview-parallax">
      <div className="container" style={{ height: '100%' }}>
        <div className="row align-items-center" style={{ height: '100%' }}>
          <div className="header-wrapper">
            <div className="col-lg-12 col-md-12 text-vertical-center">
              <h1 className="event-title mb-1">{title}</h1>
              <p className="p-2 event-description">{description}</p>
              <p className="p-2 event-description">
                <span style={{ fontWeight: '500' }}>{isVN ? 'Địa điểm:' : 'Location:'}</span> {location.address}
              </p>
              <p className="p-2 event-description">
                <span style={{ fontWeight: '500' }}>{isVN ? 'Thời gian:' : 'Time:'}</span> {toTime(startTime)} -{' '}
                {toTime(endTime)} {isVN ? 'ngày' : 'on'} {toVNDate(date)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Parallax>
  )
}

export default ConferenceHeader
