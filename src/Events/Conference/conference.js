import React from 'react';
import firebase from 'firebase';
import ConferenceHeader from './ConferenceHeader/conHeader';
import Overview from './Overview/overview';
import SpeakerList from './SpeakerList/speakerList';
import Agenda from './Agenda/agenda';
import SponsorList from './SponsorList/sponsorList';
import Location from './Location/location';
import Highlight from './Highlight/highlight';

class Conference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agenda: [],
      conferencePicture: '',
      date: '',
      description: '',
      highlight: [],
      address: '',
      lat: 0,
      lng: 0,
      speakers: [],
      sponsors: [],
      title: ''
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref('conference')
      .on('value', snapshot => {
        const conferenceObj = snapshot.val();
        if (conferenceObj) {
          const agenda = [];
          const highlight = [];
          const speakers = [];
          const sponsors = [];

          Object.keys(conferenceObj.agenda).forEach(e => {
            const oneAgenda = {
              id: e,
              header: conferenceObj.agenda[e].header,
              detail: conferenceObj.agenda[e].detail,
              participants: conferenceObj.agenda[e].participants,
              time: conferenceObj.agenda[e].time
            };
            agenda.push(oneAgenda);
          });
          this.sortAgenda(agenda);

          const { conferencePicture, date, description, title } = conferenceObj;

          const { address, lat, lng } = conferenceObj.location;

          Object.keys(conferenceObj.highlight).forEach(e => {
            const oneHighlight = {
              id: e,
              name: conferenceObj.highlight[e].name,
              url: conferenceObj.highlight[e].url,
              width: conferenceObj.highlight[e].width,
              height: conferenceObj.highlight[e].height
            };
            highlight.push(oneHighlight);
          });

          Object.keys(conferenceObj.speakers).forEach(e => {
            const speaker = {
              id: e,
              introduction: conferenceObj.speakers[e].introduction,
              name: conferenceObj.speakers[e].name,
              occupation: conferenceObj.speakers[e].occupation,
              picture: conferenceObj.speakers[e].picture
            };
            speakers.push(speaker);
          });

          Object.keys(conferenceObj.sponsors).forEach(e => {
            const sponsor = {
              id: e,
              logo: conferenceObj.sponsors[e].logo,
              website: conferenceObj.sponsors[e].website
            };
            sponsors.push(sponsor);
          });

          this.setState({
            agenda,
            conferencePicture,
            date,
            description,
            highlight,
            address,
            lat,
            lng,
            speakers,
            sponsors,
            title
          });
        }
      });
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
    const {
      agenda,
      conferencePicture,
      date,
      description,
      highlight,
      address,
      lat,
      lng,
      speakers,
      sponsors,
      title
    } = this.state;
    return (
      <div>
        <ConferenceHeader background={conferencePicture} />
        <Overview description={description} />
        <SpeakerList speakers={speakers} />
        <Agenda date={date} agenda={agenda} />
        <SponsorList sponsors={sponsors} />
        <Location lat={lat} lng={lng} address={address} />
        <Highlight highlight={highlight} />
      </div>
    );
  }
}

export default Conference;
