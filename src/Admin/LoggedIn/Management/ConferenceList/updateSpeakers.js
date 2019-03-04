import React from 'react'
import Modal from 'react-responsive-modal'
import EditSpeakers from './EditSpeakers/editSpeaker'
import { updateData } from '../../../../config/firebase'

export default class UpdateSpeakers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      speakerData: this.props.speakerData,
      toggle: false,
      modal: false
    }
  }

  renderSpeaker(startIndex, endIndex, speakers) {
    return speakers.slice(startIndex, endIndex).map(e => (
      <div className="col-3" key={e.id}>
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={e.picture} className="img-fluid notransition" alt="" />
          </div>
          <div className="hotel-room-body">
            <div>
              <h3 className="heading mb-0">{e.name}</h3>
              <strong className="price">{e.occupation}</strong>
            </div>
          </div>
        </div>
      </div>
    ))
  }

  renderSpeakerRow(totalRows, speakers) {
    let startIndex = -4
    let endIndex = startIndex + 4
    const temp = Array.from({ length: totalRows }, () => Math.floor(Math.random()))

    return temp.map((_, i) => {
      startIndex += 4
      endIndex += 4
      return (
        <div className="row" key={i}>
          {this.renderSpeaker(startIndex, endIndex, speakers)}
        </div>
      )
    })
  }

  onDescriptionChange(e) {
    const speakerData = {
      ...this.state.speakerData,
      description: e.target.value
    }
    this.setState({ speakerData })
  }

  onUpdate() {
    const update = {
      speakers: {
        description: this.state.speakerData.description
      }
    }
    updateData('conference', update).catch(err => alert(err.message))
  }

  render() {
    const { speakerData } = this.state
    return (
      <div className="row style-section-pictures">
        <div className="col-12">
          <h3>Speakers</h3>
        </div>
        {!this.state.toggle ? (
          <div className="col-12">
            <div>
              <p>{speakerData.description}</p>
            </div>
            <div>
              <button onClick={() => this.setState({ toggle: true })}>Edit</button>
            </div>
          </div>
        ) : (
          <div className="col-12">
            <div>
              <textarea value={speakerData.description} onChange={e => this.onDescriptionChange(e)} />
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
                    speakerData: this.props.speakerData
                  })
                }
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="col-12">{this.renderSpeakerRow(1, this.props.speakerData.speakerList)}</div>
        <div className="col-12">
          <button onClick={() => this.setState({ modal: true })}>Edit speakers ...</button>
        </div>
        <Modal open={this.state.modal} onClose={() => this.setState({ modal: false })} center>
          <EditSpeakers speakers={this.props.speakerData.speakerList} closeModal={() => this.setState({ modal: false })} />
        </Modal>
      </div>
    )
  }
}
