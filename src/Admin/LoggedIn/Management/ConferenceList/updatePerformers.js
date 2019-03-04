import React from 'react'
import Modal from 'react-responsive-modal'
import EditPerformers from './EditPerformers/editPerformers'
import { updateData } from '../../../../config/firebase'

export default class UpdatePerformers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      performerData: this.props.performerData,
      toggle: false,
      modal: false
    }
  }

  renderPerformer(startIndex, endIndex, performers) {
    return performers.slice(startIndex, endIndex).map(e => (
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

  renderPerformerRow(totalRows, performers) {
    let startIndex = -4
    let endIndex = startIndex + 4
    const temp = Array.from({ length: totalRows }, () => Math.floor(Math.random()))

    return temp.map((_, i) => {
      startIndex += 4
      endIndex += 4
      return (
        <div className="row" key={i}>
          {this.renderPerformer(startIndex, endIndex, performers)}
        </div>
      )
    })
  }

  renderAllPerformers(performers) {
    if (performers.length > 0) {
      if (performers.length % 4 === 0) {
        return this.renderPerformerRow(performers.length / 4, performers)
      }
      return this.renderPerformerRow(performers.length / 4 + 1, performers)
    }
    return null
  }

  onDescriptionChange(e) {
    const performerData = {
      ...this.state.performerData,
      description: e.target.value
    }
    this.setState({ performerData })
  }

  onUpdate() {
    const update = {
      performers: {
        description: this.state.performerData.description
      }
    }
    updateData('conference', update).catch(err => alert(err.message))
  }

  render() {
    const { performerData } = this.state
    return (
      <div className="row style-section-pictures">
        <div className="col-12">
          <h3>Hosts</h3>
        </div>
        {!this.state.toggle ? (
          <div className="col-12">
            <div>
              <p>{performerData.description}</p>
            </div>
            <div>
              <button onClick={() => this.setState({ toggle: true })}>Edit</button>
            </div>
          </div>
        ) : (
          <div className="col-12">
            <div>
              <textarea value={performerData.description} onChange={e => this.onDescriptionChange(e)} />
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
                    performerData: this.props.performerData
                  })
                }
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="col-12">{this.renderPerformerRow(1, this.props.performerData.performerList)}</div>
        <div className="col-12">
          <button onClick={() => this.setState({ modal: true })}>Edit performers ...</button>
        </div>
        <Modal open={this.state.modal} onClose={() => this.setState({ modal: false })} center>
          <EditPerformers performers={this.props.performerData.performerList} closeModal={() => this.setState({ modal: false })} />
        </Modal>
      </div>
    )
  }
}
