import React from 'react'
import Modal from 'react-responsive-modal'
import Agenda from './EditAgenda/Agenda/agenda'
import AddAgenda from './EditAgenda/AddAgenda/addAgenda'

export default class UpdateAgenda extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }

  renderAgendas(agendas) {
    return agendas.map(agd => <Agenda key={agd.id} agenda={agd} />)
  }

  render() {
    const { agendas } = this.props
    return (
      <div className="row style-section-pictures">
        <div className="col-12">
          <h3>Agenda</h3>
        </div>
        <div className="col-12">{this.renderAgendas(agendas)}</div>
        <div className="col-12">
          <button onClick={() => this.setState({ modal: true })}>Add agenda</button>
          <Modal open={this.state.modal} onClose={() => this.setState({ modal: false })} center>
            <AddAgenda closeModalAdd={() => this.setState({ modal: false })} />
          </Modal>
        </div>
      </div>
    )
  }
}
