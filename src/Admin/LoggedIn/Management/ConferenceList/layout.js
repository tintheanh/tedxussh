import React from 'react';
import firebase from 'firebase';
import Conference from './Conference/layout';

class ConferenceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conference: []
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref('conference')
      .on('value', snapshot => {
        const eventObj = snapshot.val();
        const conference = [];
        if (eventObj) {
          Object.keys(eventObj).forEach(e => {
            const event = {
              id: e,
              title: eventObj[e].title
            };
            conference.push(event);
          });
          this.setState({ conference });
        }
      });
  }

  renderConference(totalRows, conference) {
    console.log('inside renderConference', conference);
    let startIndex = -4;
    let endIndex = startIndex + 4;
    const temp = Array.from({ length: totalRows }, () =>
      Math.floor(Math.random())
    );

    return temp.map((_, i) => {
      startIndex += 4;
      endIndex += 4;
      return (
        <div className="row" key={i}>
          {this.renderRow(startIndex, endIndex, conference)}
        </div>
      );
    });
  }

  renderRow(startIndex, endIndex, conference) {
    return conference.slice(startIndex, endIndex).map(e => (
      <div className="col-3" key={e.id}>
        <Conference title={e.title} />
      </div>
    ));
  }

  renderAllConference(conference) {
    console.log('inside renderAllConference', conference);
    if (conference.length > 0) {
      if (conference.length % 4 === 0) {
        return this.renderConference(conference.length / 4, conference);
      }
      return this.renderConference(conference.length / 4 + 1, conference);
    }
    return <h2>No conference available</h2>;
  }

  render() {
    console.log(this.state.conference);
    return (
      <div className="page-wrapper">
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-12 d-flex no-block align-items-center">
              <h4 className="page-title">Dashboard</h4>
            </div>
          </div>
          {this.renderAllConference(this.state.conference)}
        </div>
      </div>
    );
  }
}

export default ConferenceList;
