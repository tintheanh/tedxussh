import React from 'react'
import Modal from 'react-responsive-modal'
import GetEventUpdate from './getEventUpdate'

class LiGetEventUpdate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalGetUpdate: false
    }
    this.openModalGetUpdate = this.openModalGetUpdate.bind(this)
    this.closeModalGetUpdate = this.closeModalGetUpdate.bind(this)
  }

  openModalGetUpdate() {
    this.setState({ modalGetUpdate: true })
  }

  closeModalGetUpdate() {
    this.setState({ modalGetUpdate: false })
  }

  render() {
    const { isVN } = this.props
    return (
      <li>
        <a className="get-event-update" onClick={this.openModalGetUpdate}>
					Get event update
        </a>
        <Modal open={this.state.modalGetUpdate} onClose={this.closeModalGetUpdate} center>
          <GetEventUpdate isVN={isVN} getEventUpdate={this.props.getEventUpdate} />
        </Modal>
      </li>
    )
  }
}

export default LiGetEventUpdate
