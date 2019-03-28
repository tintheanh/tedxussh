import React from 'react'
import Modal from 'react-responsive-modal'
import PerformerInfo from '../PerformerInfo/performerInfo'

export default class PerformerCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalPerformer: false
    }
  }

  openModalPerformer() {
    this.setState({ modalPerformer: true })
  }

  closeModalPerformer() {
    this.setState({ modalPerformer: false })
  }

  render() {
    const { performer } = this.props
    return (
      <div className="col-sm-6 col-lg-3 performer">
        <div className="hotel-room text-center notransition" onClick={() => this.openModalPerformer()}>
          <div className="d-block mb-2 thumbnail notransition">
            <img src={performer.picture} alt="" className="img-fluid notransition" />
          </div>
          <div className="hotel-room-body">
            <h3 className="heading mb-2">{performer.name}</h3>
            <strong className="price">{performer.occupation}</strong>
          </div>
        </div>
        <Modal
          open={this.state.modalPerformer}
          onClose={this.closeModalPerformer.bind(this)}
          center
        >
          <PerformerInfo performer={performer} />
        </Modal>
      </div>
    )
  }
}
