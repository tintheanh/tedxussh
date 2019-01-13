import React from 'react';
import SmoothCollapse from 'react-smooth-collapse';

class Agenda extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      selectedAgenda: ''
    };
  }

  toggle(agdID) {
    this.setState(prevState => ({
      expanded: !prevState.expanded,
      selectedAgenda: agdID
    }));
  }

  renderAgenda(agenda) {
    return agenda.map(agd => {
      if (this.state.selectedAgenda === agd.id) {
        return (
          <li key={agd.id}>
            <div className="row">
              <div className="col-md-4">
                <h1>{agd.time}</h1>
              </div>
              <div className="col-md-8">
                <h1 onClick={this.toggle.bind(this, agd.id)}>{agd.header}</h1>
                <SmoothCollapse expanded={this.state.expanded}>
                  <p>{agd.detail}</p>
                  <p>{agd.participants}</p>
                </SmoothCollapse>
              </div>
            </div>
          </li>
        );
      }
      return (
        <li key={agd.id}>
          <div className="row">
            <div className="col-md-4">
              <h1>{agd.time}</h1>
            </div>
            <div className="col-md-8">
              <h1 onClick={this.toggle.bind(this, agd.id)}>{agd.header}</h1>
              <SmoothCollapse expanded={this.state.expanded} />
            </div>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="site-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto text-center mb-5 section-heading">
              <h2 className="mb-5">Agenda</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mx-auto text-center mb-5">
              <h4 className="mb-5">{this.props.date}</h4>
            </div>
          </div>
          <ul>{this.renderAgenda(this.props.agenda)}</ul>
        </div>
      </div>
    );
  }
}

export default Agenda;
