import React from 'react'
import Modal from 'react-responsive-modal'
import EditSponsors from './EditSponsors/editSponsors'
import { updateData } from '../../../../config/firebase'

export default class UpdateSponsors extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sponsorData: this.props.sponsorData,
      toggle: false,
      modal: false
    }
  }

  renderSponsor(startIndex, endIndex, sponsors) {
    return sponsors.slice(startIndex, endIndex).map(e => (
      <div className="col-3" key={e.id}>
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={e.picture} className="img-fluid notransition" alt="" />
          </div>
          <div className="hotel-room-body">
            <div>
              <p className="price">{e.link}</p>
            </div>
          </div>
        </div>
      </div>
    ))
  }

  renderSponsorRow(totalRows, sponsors) {
    let startIndex = -4
    let endIndex = startIndex + 4
    const temp = Array.from({ length: totalRows }, () => Math.floor(Math.random()))

    return temp.map((_, i) => {
      startIndex += 4
      endIndex += 4
      return (
        <div className="row" key={i}>
          {this.renderSponsor(startIndex, endIndex, sponsors)}
        </div>
      )
    })
  }

  onDescriptionChange(e) {
    const sponsorData = {
      ...this.state.sponsorData,
      description: e.target.value
    }
    this.setState({ sponsorData })
  }

  onUpdate() {
    const update = {
      sponsors: {
        description: this.state.sponsorData.description
      }
    }
    updateData('conference', update).catch(err => alert(err.message))
  }

  render() {
    const { sponsorData } = this.state
    return (
      <div className="row style-section-pictures">
        <div className="col-12">
          <h3>Sponsors</h3>
        </div>
        {!this.state.toggle ? (
          <div className="col-12">
            <div>
              <p>{sponsorData.description}</p>
            </div>
            <div>
              <button onClick={() => this.setState({ toggle: true })}>Edit</button>
            </div>
          </div>
        ) : (
          <div className="col-12">
            <div>
              <textarea value={sponsorData.description} onChange={e => this.onDescriptionChange(e)} />
            </div>
            <div>
              <button
                onClick={() => {
                  this.onUpdate()
                  this.setState({ toggle: false })
                }}
              >
                Save
              </button>
              <button
                onClick={() =>
                  this.setState({
                    toggle: false,
                    sponsorData: this.props.sponsorData
                  })
                }
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="col-12">{this.renderSponsorRow(1, this.props.sponsorData.sponsorList)}</div>
        <div className="col-12">
          <button onClick={() => this.setState({ modal: true })}>Edit sponsors ...</button>
        </div>
        <Modal open={this.state.modal} onClose={() => this.setState({ modal: false })} center>
          <EditSponsors sponsors={this.props.sponsorData.sponsorList} closeModal={() => this.setState({ modal: false })} />
        </Modal>
      </div>
    )
  }
}
