import React from 'react'
import Modal from 'react-responsive-modal'
import SmoothCollapse from 'react-smooth-collapse'
import PerformerInfo from './PerformerInfo/performerInfo'
import PerformerCard from './PerformerCard/performerCard'
import { modifyObj } from '../../../config/functions'

class HostList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      performerSelected: '',
      modalPerformer: false,
      expanded: false
    }
    this.openModalPerformer = this.openModalPerformer.bind(this)
    this.closeModalPerformer = this.closeModalPerformer.bind(this)
  }

  openModalPerformer(speakerID) {
    this.setState({ modalPerformer: true, performerSelected: speakerID })
  }

  closeModalPerformer() {
    this.setState({ modalPerformer: false })
  }

  renderFirstRow(totalRows, imgs) {
    let startIndex = -4
    let endIndex = startIndex + 4
    const temp = Array.from({ length: totalRows }, () => Math.floor(Math.random()))

    return temp.map((_, i) => {
      startIndex += 4
      endIndex += 4
      if (i === 0) {
        return (
          <div
            className="row speakers-section first-roll-speakers"
            key={i}
          >
            {this.renderRow(startIndex, endIndex, imgs)}
          </div>
        )
      }
      return null
    })
  }

  renderImg(totalRows, imgs) {
    let startIndex = -4
    let endIndex = startIndex + 4
    const temp = Array.from({ length: totalRows }, () => Math.floor(Math.random()))

    return temp.map((_, i) => {
      startIndex += 4
      endIndex += 4

      return (
        <div className="row speakers-section" key={i}>
          {this.renderRow(startIndex, endIndex, imgs)}
        </div>
      )
    })
  }

  renderRow(startIndex, endIndex, imgs) {
    return imgs.slice(startIndex, endIndex).map((performer, i) => <PerformerCard key={i} performer={performer} />)
  }

  renderAllImg(imgs) {
    if (imgs.length > 0) {
      if (imgs.length % 4 === 0) {
        return this.renderImg(imgs.length / 4, imgs)
      }
      return this.renderImg(imgs.length / 4 + 1, imgs)
    }
    return null
  }

  toggle() {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const { isVN } = this.props
    const performers = modifyObj(isVN, this.props.performers, 'hosts')
    if (performers.performerList) {
      return (
        <div className="site-section bg-light">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 mx-auto text-center mb-5 section-heading">
                <h2 className="mb-5" style={{ fontFamily: 'Oswald' }}>
									Performers
                </h2>
              </div>
            </div>
            <div className="row adv-wrapper" style={{ paddingBottom: '24px' }}>
              <div className="col-12">
                <p className="text-center" style={{ fontFamily: 'Montserrat' }}>
                  {performers.description}
                </p>
              </div>
            </div>
            {performers.performerList.length <= 4 ? (
              <div className="row">{this.renderAllImg(performers.performerList)}</div>
            ) : (
              <div>
                <div className="row">{this.renderAllImg(performers.performerList.slice(0, 4))}</div>
                <SmoothCollapse expanded={this.state.expanded}>
                  <div className="row">
                    {this.renderAllImg(
										  performers.performerList.slice(4, performers.performerList.length)
                    )}
                  </div>
                </SmoothCollapse>
                <div className="row">
                  {!this.state.expanded ? (
                    <button
                      className="view-btn"
                      onClick={this.toggle.bind(this)}
                      style={{ textDecoration: 'none' }}
                    >
											View All
                    </button>
                  ) : (
                    <button
                      className="view-btn"
                      onClick={this.toggle.bind(this)}
                      style={{ textDecoration: 'none' }}
                    >
											View Less
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }
    return (
      <div className="site-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 mx-auto text-center mb-5 section-heading">
              <h2 className="mb-5" style={{ fontFamily: 'Oswald' }}>
								Performers
              </h2>
            </div>
          </div>
          <div className="row adv-wrapper" style={{ paddingBottom: '24px' }}>
            <div className="col-12">
              <p className="text-center" style={{ fontFamily: 'Montserrat' }}>
                {performers.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HostList
