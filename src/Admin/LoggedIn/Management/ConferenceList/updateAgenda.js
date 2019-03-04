import React from 'react'
import Modal from 'react-responsive-modal'
import Agenda from './EditAgenda/Agenda/agenda'

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
        <div className="col-12">
          {this.renderAgendas(agendas)}
        </div>
      </div>
    )
  }
}
