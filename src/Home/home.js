import React from 'react'
import PropTypes from 'prop-types'
import HomeHeader from './HomeHeader/homeHeader'
import LinkSection from './LinkSection/linkSection'
import { modifyObj } from '../config/functions'

const Home = props => {
  if (props.home.left && props.home.middle && props.home.right) {
    const modifyHome = modifyObj(props.isVN, props.home, 'home')
    const {
      cover_picture, title, description, left, middle, right
    } = modifyHome
    return (
      <div>
        <HomeHeader isVN={props.isVN} background={cover_picture} title={title} description={description} />

        <div className="site-section bg-white">
          <div className="container">
            <div className="row">
              <LinkSection
                to="/attend"
                cover={left.cover}
                title={left.title}
                description={left.description}
              />

              <LinkSection
                to="/learn"
                cover={middle.cover}
                title={middle.title}
                description={middle.description}
              />

              <LinkSection
                to="/about"
                cover={right.cover}
                title={right.title}
                description={right.description}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
  return null
}

Home.propTypes = {
  isVN: PropTypes.bool.isRequired,
  home: PropTypes.shape({
    background: PropTypes.string,
    title: PropTypes.string,
    left: PropTypes.objectOf(PropTypes.string),
    middle: PropTypes.objectOf(PropTypes.string),
    right: PropTypes.objectOf(PropTypes.string)
  }).isRequired
}

export default Home
