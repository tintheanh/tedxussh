import React from 'react';
import OneAgd from './OneAgd/oneAgd';
import { modifyObj } from '../../../config/functions';

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

  convertTime(time) {
    const hour = parseInt(time.substring(0, 2));
    const min = parseInt(time.substring(3, 5));

    const decimalMin = min / 60;
    return hour + decimalMin;
  }

  sortAgenda(agenda) {
    return agenda.sort(
      (a, b) => this.convertTime(a.time) - this.convertTime(b.time)
    );
  }

  render() {
    const { isVN } = this.props;
    const agenda = modifyObj(isVN, this.props.agenda, 'agenda');
    if (agenda.agendaList) {
      const agendaList = this.sortAgenda(agenda.agendaList);
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
                  {this.toVNDate(agenda.date)}
                </h4>
              </div>
            </div>
            <ul
              className="agenda-section"
              style={{ padding: 0, listStyleType: 'none' }}
            >
              {this.renderAgenda(agendaList)}
            </ul>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default Agenda;
