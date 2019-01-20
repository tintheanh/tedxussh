import React from 'react';
import moment from 'moment';
import firebase from 'firebase';

class GetEventUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      link: '',
      startDate: '',
      endDate: ''
    };
  }

  toEpoch(inputDate) {
    const date = moment(inputDate);
    const unix = moment(date).unix();

    return unix;
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

  openTicketPage(url) {
    window.open(url, '_blank');
  }

  componentDidMount() {
    firebase
      .database()
      .ref('getEventUpdate')
      .on('value', snapshot => {
        const getEventUpdateObj = snapshot.val();
        if (getEventUpdateObj) {
          this.setState({
            description: getEventUpdateObj.description,
            link: getEventUpdateObj.link,
            startDate: getEventUpdateObj.startDate,
            endDate: getEventUpdateObj.endDate
          });
        }
      });
  }

  render() {
    return (
      <div>
        <p style={{ textAlign: 'center', margin: '44px', fontFamily: 'Montserrat' }}>
          {this.state.description}
        </p>
        <p style={{ textAlign: 'center', fontWeight: '700', fontFamily: 'Montserrat' }}>
          {this.toVNDate(this.state.startDate)} -{' '}
          {this.toVNDate(this.state.endDate)}
        </p>
        <div style={{ margin: 'auto', textAlign: 'center' }}>
          {moment().unix() >= this.toEpoch(this.state.startDate) &&
          moment().unix() <= this.toEpoch(this.state.endDate) ? (
            <button
              className="ticket-btn"
              onClick={this.openTicketPage.bind(this, this.state.link)}
            >
              Get ticket
            </button>
          ) : (
            <button disabled className="ticket-btn">
              Get ticket
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default GetEventUpdate;
