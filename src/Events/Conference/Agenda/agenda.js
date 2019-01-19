import React from 'react';
import SmoothCollapse from 'react-smooth-collapse';
import moment from 'moment';
import OneAgd from './OneAgd/oneAgd';

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

  renderParticipants(string) {
    const splitted = string.split('//');
    return splitted.map((e, i) => (
      <p id={i} style={{ textAlign: 'center' }}>
        {e}
      </p>
    ));
  }

  renderHeaders(string, agd) {
    const splitted = string.split('//');
    return splitted.map((e, i) => {
      if (i === 0) {
        return (
          <div
            key={i}
            onClick={this.toggle.bind(this, agd.id)}
            style={{ paddingBottom: '24px' }}
          >
            <h1
              className="agd-header"
              style={{ cursor: agd.detail !== '' ? 'pointer' : '' }}
            >
              {e}{' '}
              {agd.detail !== '' ? (
                <i className="bounce fa fa-arrow-down" />
              ) : null}
            </h1>

            {this.state.selectedAgenda === agd.id && agd.detail !== '' ? (
              <SmoothCollapse expanded={this.state.expanded}>
                <p>{agd.detail}</p>
                {this.renderParticipants(agd.participants)}
              </SmoothCollapse>
            ) : (
              <SmoothCollapse expanded={this.state.expanded} />
            )}
          </div>
        );
      }
      return (
        <div key={i} style={{ paddingBottom: '24px' }}>
          <h1 className="agd-header">{e}</h1>
        </div>
      );
    });
  }

  renderAgenda(agenda) {
    return agenda.map(agd => {
      return <OneAgd agd={agd} key={agd.id} />;
    });
  }

  toVNDate(inputDate) {
    const date = inputDate.split('-');
    return `${date[2]}/${date[1]}/${date[0]}`;
  }

  render() {
    return (
      <div className="site-section bg-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto text-center mb-5 section-heading">
              <h2 className="mb-5" style={{ fontFamily: 'Roboto' }}>
                Agenda
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="mx-auto text-center mb-5">
              <h4
                className="mb-5"
                style={{ backgroundColor: '#ffdc1a', padding: '14px 44px' }}
              >
                {this.toVNDate(this.props.date)}
              </h4>
            </div>
          </div>
          <ul
            className="agenda-section"
            style={{ padding: 0, listStyleType: 'none' }}
          >
            {this.renderAgenda(this.props.agenda)}
          </ul>
        </div>
      </div>
    );
  }
}

export default Agenda;
