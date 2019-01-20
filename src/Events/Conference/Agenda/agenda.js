import React from 'react';
import OneAgd from './OneAgd/oneAgd';

class Agenda extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderAgenda(agenda) {
    return agenda.map(agd => {
      return <OneAgd agd={agd} key={agd.id} />;
    });
  }

  toVNDate(inputDate) {
    if (inputDate) {
      const date = inputDate.split('-');
      const year = date[0];
      let month = date[1];
      let day = date[2];
      if (parseInt(month) < 10) {
        month = month.substring(1, 2);
      }
      if (parseInt(day) < 10) {
        day = day.substring(1, 2);
      }
      return `${day}/${month}/${year}`;
    }
    return '';
  }

  render() {
    return (
      <div className="site-section bg-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto text-center mb-5 section-heading">
              <h2 className="mb-5">Agenda</h2>
            </div>
          </div>
          <div className="row">
            <div className="mx-auto text-center mb-5">
              <h4
                className="mb-5"
                style={{
                  backgroundColor: '#e62b1e',
                  padding: '14px 44px',
                  color: '#fff',
                  fontFamily: 'Oswald'
                }}
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
