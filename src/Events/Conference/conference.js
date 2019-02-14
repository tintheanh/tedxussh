import React from 'react';
import firebase from 'firebase';
import ConferenceHeader from './ConferenceHeader/conHeader';
import SpeakerList from './SpeakerList/speakerList';
import HostList from './HostList/hostList';
import PerformerList from './PerformerList/performerList';
import Agenda from './Agenda/agenda';
import SponsorList from './SponsorList/sponsorList';
import Location from './Location/location';
import Highlight from './Highlight/highlight';
import Theme from './Theme/theme';
import Adventures from './Adventures/adventures';
import { getData } from '../../config/firebase';
import { retrieveDataForConference } from '../../config/functions';

class Conference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conference: null,
      agenda: null
    };
  }

  componentDidMount() {
    window.document.title = 'TEDxHCMUSSH - Event';

    getData('conference').then(doc => {
      if (doc.exists) {
        this.setState({ conference: doc.data() });
        this.setState({
          agenda: {
            agendaList: doc.data().agenda,
            date: doc.data().overview.date
          }
        });
      }
    });

    // firebase
    //   .database()
    //   .ref('conference')
    //   .on('value', snapshot => {
    //     const conferenceObj = snapshot.val();
    //     if (conferenceObj) {
    //       const agenda = [];
    //       const highlight = [];
    //       const speakers = [];
    //       const hosts = [];
    //       const performers = [];
    //       const sponsors = [];
    //       const adventures = [];

    //       if (conferenceObj.agenda) {
    //         Object.keys(conferenceObj.agenda).forEach(e => {
    //           const oneAgenda = {
    //             id: e,
    //             header: conferenceObj.agenda[e].header,
    //             detail: conferenceObj.agenda[e].detail,
    //             participants: conferenceObj.agenda[e].participants,
    //             time: conferenceObj.agenda[e].time
    //           };
    //           agenda.push(oneAgenda);
    //         });
    //         this.sortAgenda(agenda);
    //       }
    //       const {
    //         conferencePicture,
    //         audience,
    //         startTime,
    //         endTime,
    //         date,
    //         description,
    //         title,
    //         gap
    //       } = conferenceObj;

    //       const { address, lat, lng } = conferenceObj.location;

    //       if (conferenceObj.highlight) {
    //         Object.keys(conferenceObj.highlight).forEach(e => {
    //           const oneHighlight = {
    //             id: e,
    //             name: conferenceObj.highlight[e].name,
    //             url: conferenceObj.highlight[e].url,
    //             width: conferenceObj.highlight[e].width,
    //             height: conferenceObj.highlight[e].height
    //           };
    //           highlight.push(oneHighlight);
    //         });
    //       }

    //       if (conferenceObj.speakers && conferenceObj.speakers.speakerList) {
    //         Object.keys(conferenceObj.speakers.speakerList).forEach(e => {
    //           const speaker = {
    //             id: e,
    //             introduction:
    //               conferenceObj.speakers.speakerList[e].introduction,
    //             name: conferenceObj.speakers.speakerList[e].name,
    //             occupation: conferenceObj.speakers.speakerList[e].occupation,
    //             picture: conferenceObj.speakers.speakerList[e].picture
    //           };
    //           speakers.push(speaker);
    //         });
    //       }
    //       if (conferenceObj.hosts && conferenceObj.hosts.hostList) {
    //         Object.keys(conferenceObj.hosts.hostList).forEach(e => {
    //           const host = {
    //             id: e,
    //             introduction: conferenceObj.hosts.hostList[e].introduction,
    //             name: conferenceObj.hosts.hostList[e].name,
    //             occupation: conferenceObj.hosts.hostList[e].occupation,
    //             picture: conferenceObj.hosts.hostList[e].picture
    //           };
    //           hosts.push(host);
    //         });
    //       }

    //       if (
    //         conferenceObj.performers &&
    //         conferenceObj.performers.performerList
    //       ) {
    //         Object.keys(conferenceObj.performers.performerList).forEach(e => {
    //           const performer = {
    //             id: e,
    //             introduction:
    //               conferenceObj.performers.performerList[e].introduction,
    //             name: conferenceObj.performers.performerList[e].name,
    //             occupation:
    //               conferenceObj.performers.performerList[e].occupation,
    //             picture: conferenceObj.performers.performerList[e].picture
    //           };
    //           performers.push(performer);
    //         });
    //       }

    //       if (conferenceObj.adventures.listAdventures) {
    //         Object.keys(conferenceObj.adventures.listAdventures).forEach(e => {
    //           const adventure = {
    //             id: e,
    //             name: conferenceObj.adventures.listAdventures[e].name,
    //             detail: conferenceObj.adventures.listAdventures[e].detail,
    //             picture: conferenceObj.adventures.listAdventures[e].picture
    //           };
    //           adventures.push(adventure);
    //         });
    //       }
    //       if (conferenceObj.sponsors) {
    //         Object.keys(conferenceObj.sponsors).forEach(e => {
    //           const sponsor = {
    //             id: e,
    //             logo: conferenceObj.sponsors[e].logo,
    //             website: conferenceObj.sponsors[e].website
    //           };
    //           sponsors.push(sponsor);
    //         });
    //       }

    //       this.setState({
    //         agenda,
    //         conferencePicture,
    //         date,
    //         audience,
    //         endTime,
    //         startTime,
    //         description,
    //         highlight,
    //         address,
    //         lat,
    //         lng,
    //         speakers,
    //         speakerDesc: conferenceObj.speakers.description,
    //         hosts,
    //         hostDesc: conferenceObj.hosts.description,
    //         performers,
    //         performerDesc: conferenceObj.performers.description,
    //         sponsors,
    //         title,
    //         gap,
    //         adventures,
    //         adventureHeader: conferenceObj.adventures.adventureHeader,
    //         adventureDesc: conferenceObj.adventures.adventureDesc
    //       });
    //     }
    //   });
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
    if (this.state.conference !== null && this.state.agenda !== null) {
      const { isVN } = this.props;
      const { conference } = this.state;
      return (
        <div>
          <ConferenceHeader isVN={isVN} overview={conference.overview} />
          <SpeakerList isVN={isVN} speakers={conference.speakers} />
          <HostList isVN={isVN} hosts={conference.host} />
          <PerformerList isVN={isVN} performers={conference.performer} />
          <Agenda isVN={isVN} agenda={this.state.agenda} />
          <Theme theme={conference.theme} />
          <Adventures isVN={isVN} adventures={conference.adventures} />
          <SponsorList isVN={isVN} sponsors={conference.sponsors} />
          <Location isVN={isVN} location={conference.overview.location} />
          <Highlight highlight={conference.highlight} />
          {/* <SpeakerList
            isVN={isVN}
            speakers={retrieveDataForConference(conference, 'speakers')}
          />
          <HostList
            isVN={isVN}
            hosts={retrieveDataForConference(conference, 'hosts')}
          />
          <PerformerList
            isVN={isVN}
            performers={retrieveDataForConference(conference, 'performers')}
          />
          <Agenda
            isVN={isVN}
            agenda={retrieveDataForConference(conference, 'agenda')}
          />
          <Theme theme={retrieveDataForConference(conference, 'theme')} />
          <Adventures
            isVN={isVN}
            adventures={retrieveDataForConference(conference, 'adventures')}
          />
          <SponsorList
            isVN={isVN}
            sponsors={retrieveDataForConference(conference, 'sponsors')}
          />
          <Location
            isVN={isVN}
            location={retrieveDataForConference(conference, 'location')}
          />
          <Highlight
            highlight={retrieveDataForConference(conference, 'highlight')}
          /> */}
          {/* <HostList hosts={hosts} hostDesc={hostDesc} />
          <PerformerList performers={performers} performerDesc={performerDesc} />
          <Agenda date={date} agenda={agenda} />
          <Gap gap={gap} />
          <Adventures
            adventures={adventures}
            adventureHeader={adventureHeader}
            adventureDesc={adventureDesc}
          />
          <SponsorList sponsors={sponsors} />
          <Location lat={lat} lng={lng} address={address} />
          <Highlight highlight={highlight} /> */}
        </div>
      );
    }
    return null;
  }
}

export default Conference;
