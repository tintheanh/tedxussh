import React from 'react';
import firebase from 'firebase';
import ConferenceHeader from './ConferenceHeader/conHeader';
import Overview from './Overview/overview';
import SpeakerList from './SpeakerList/speakerList';
import HostList from './HostList/hostList';
import PerformerList from './PerformerList/performerList';
import Agenda from './Agenda/agenda';
import SponsorList from './SponsorList/sponsorList';
import Location from './Location/location';
import Highlight from './Highlight/highlight';
import Gap from './Gap/gap';
import Adventures from './Adventures/adventures';

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
      hosts: [],
      performers: [],
      sponsors: [],
      adventures: [],
      adventureHeader: '',
      adventureDesc: '',
      title: '',
      gap: ''
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
          const hosts = [];
          const performers = [];
          const sponsors = [];
          const adventures = [];

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

          const {
            conferencePicture,
            date,
            description,
            title,
            gap
          } = conferenceObj;

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

          Object.keys(conferenceObj.hosts).forEach(e => {
            const host = {
              id: e,
              introduction: conferenceObj.hosts[e].introduction,
              name: conferenceObj.hosts[e].name,
              occupation: conferenceObj.hosts[e].occupation,
              picture: conferenceObj.hosts[e].picture
            };
            hosts.push(host);
          });

          Object.keys(conferenceObj.performers).forEach(e => {
            const performer = {
              id: e,
              introduction: conferenceObj.performers[e].introduction,
              name: conferenceObj.performers[e].name,
              occupation: conferenceObj.performers[e].occupation,
              picture: conferenceObj.performers[e].picture
            };
            performers.push(performer);
          });

          Object.keys(conferenceObj.adventures.listAdventures).forEach(e => {
            const adventure = {
              id: e,
              name: conferenceObj.adventures.listAdventures[e].name,
              detail: conferenceObj.adventures.listAdventures[e].detail,
              picture: conferenceObj.adventures.listAdventures[e].picture
            };
            adventures.push(adventure);
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
            hosts,
            performers,
            sponsors,
            title,
            gap,
            adventures,
            adventureHeader: conferenceObj.adventures.adventureHeader,
            adventureDesc: conferenceObj.adventures.adventureDesc
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
      hosts,
      performers,
      sponsors,
      title,
      gap,
      adventures,
      adventureHeader,
      adventureDesc
    } = this.state;
    return (
      <div>
        <ConferenceHeader
          background={conferencePicture}
          title={title}
          description={description}
        />
        {/* <Overview description={description} /> */}
        <SpeakerList speakers={speakers} />
        <HostList hosts={hosts} />
        <PerformerList performers={performers} />
        <Agenda date={date} agenda={agenda} />
        <Gap gap={gap} />
        <Adventures
          adventures={adventures}
          adventureHeader={adventureHeader}
          adventureDesc={adventureDesc}
        />
        <SponsorList sponsors={sponsors} />
        <Location lat={lat} lng={lng} address={address} />
        <Highlight highlight={highlight} />
      </div>
    );
  }
}

export default Conference;
