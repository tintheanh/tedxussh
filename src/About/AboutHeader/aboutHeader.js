import React from 'react'
import PropTypes from 'prop-types'

const AboutHeader = props => (
  <div
    className="about-header text-vertical-center"
    style={{
		  backgroundImage: `url(${props.cover_picture})`
    }}
  >
    <div className="row" style={{ width: '100%', margin: '0' }}>
      <div className="col-md-12">
        <h1 className="about-title">{props.title}</h1>
      </div>
    </div>
  </div>
)

AboutHeader.propTypes = {
  cover_picture: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default AboutHeader
