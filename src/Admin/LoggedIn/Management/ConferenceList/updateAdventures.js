import React from 'react'
import Modal from 'react-responsive-modal'
import EditAdventures from './EditAdventures/editAdventures'
import { updateData } from '../../../../config/firebase'

export default class UpdateAdventures extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      adventureData: this.props.adventureData,
      toggleEditHeader: false,
      toggleEditDescription: false,
      modal: false
    }
  }

  renderAdventure(startIndex, endIndex, adventures) {
    return adventures.slice(startIndex, endIndex).map(e => (
      <div className="col-3" key={e.id}>
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={e.picture} className="img-fluid notransition" alt="" />
          </div>
          <div className="hotel-room-body">
            <div>
              <h3 className="heading mb-0">{e.name}</h3>
              <strong className="price">{e.detail}</strong>
            </div>
          </div>
        </div>
      </div>
    ))
  }

  renderAdventureRow(totalRows, adventures) {
    let startIndex = -4
    let endIndex = startIndex + 4
    const temp = Array.from({ length: totalRows }, () => Math.floor(Math.random()))

    return temp.map((_, i) => {
      startIndex += 4
      endIndex += 4
      return (
        <div className="row" key={i}>
          {this.renderAdventure(startIndex, endIndex, adventures)}
        </div>
      )
    })
  }

  onDescriptionChange(e) {
    const adventureData = {
      ...this.state.adventureData,
      description: e.target.value
    }
    this.setState({ adventureData })
  }

  onHeaderChange(e) {
    const adventureData = {
      ...this.state.adventureData,
      header: e.target.value
    }
    this.setState({ adventureData })
  }

  onUpdate() {
    const update = {
      adventures: {
        header: this.state.adventureData.header,
        description: this.state.adventureData.description
      }
    }
    updateData('conference', update).catch(err => alert(err.message))
  }

  render() {
    const { adventureData } = this.state
    return (
      <div className="row style-section-pictures">
        <div className="col-12">
          <h3>Adventures</h3>
        </div>
        <div className="col-12">
          <h5>Header</h5>
        </div>
        {!this.state.toggleEditHeader ? (
          <div className="col-12">
            <div>
              <p>{adventureData.header}</p>
            </div>
            <div>
              <button onClick={() => this.setState({ toggleEditHeader: true })}>Edit</button>
            </div>
          </div>
        ) : (
          <div className="col-12">
            <div>
              <textarea value={adventureData.header} onChange={e => this.onHeaderChange(e)} />
            </div>
            <div>
              <button
                onClick={() => {
                  this.onUpdate()
                  this.setState({ toggleEditHeader: false })
                }}
              >
                Save
              </button>
              <button
                onClick={() =>
                  this.setState({
                    toggleEditHeader: false,
                    adventureData: this.props.adventureData
                  })
                }
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className="col-12">
          <h5>Description</h5>
        </div>
        {!this.state.toggleEditDescription ? (
          <div className="col-12">
            <div>
              <p>{adventureData.description}</p>
            </div>
            <div>
              <button onClick={() => this.setState({ toggleEditDescription: true })}>Edit</button>
            </div>
          </div>
        ) : (
          <div className="col-12">
            <div>
              <textarea value={adventureData.description} onChange={e => this.onDescriptionChange(e)} />
            </div>
            <div>
              <button
                onClick={() => {
                  this.onUpdate()
                  this.setState({ toggleEditDescription: false })
                }}
              >
                Save
              </button>
              <button
                onClick={() =>
                  this.setState({
                    toggleEditDescription: false,
                    adventureData: this.props.adventureData
                  })
                }
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="col-12">{this.renderAdventureRow(1, this.props.adventureData.adventureList)}</div>
        <div className="col-12">
          <button onClick={() => this.setState({ modal: true })}>Edit adventures ...</button>
        </div>
        <Modal open={this.state.modal} onClose={() => this.setState({ modal: false })} center>
          <EditAdventures adventures={this.props.adventureData.adventureList} closeModal={() => this.setState({ modal: false })} />
        </Modal>
      </div>
    )
  }
}
