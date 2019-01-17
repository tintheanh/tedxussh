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
    const date = moment(inputDate).format('D/M/YYYY');
    return date;
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
        <p style={{ textAlign: 'center', margin: '44px' }}>
          {this.state.description}
        </p>
        <p style={{ textAlign: 'center', fontWeight: '700' }}>
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