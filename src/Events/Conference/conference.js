import React from 'react'
import firebase from 'firebase'
import ConferenceHeader from './ConferenceHeader/conHeader'
import SpeakerList from './SpeakerList/speakerList'
import HostList from './HostList/hostList'
import PerformerList from './PerformerList/performerList'
import Agenda from './Agenda/agenda'
import SponsorList from './SponsorList/sponsorList'
import Location from './Location/location'
import Highlight from './Highlight/highlight'
import Theme from './Theme/theme'
import Adventures from './Adventures/adventures'
import { root } from '../../config/firebase'
import { retrieveDataForConference } from '../../config/functions'

class Conference extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      conference: null,
      agenda: null
    }
  }

  componentDidMount() {
    window.document.title = 'TEDxHCMUSSH - Event'

    root.doc('conference').onSnapshot(doc => {
      if (doc.exists) {
        let conference
        let speakerArray
        let hostArray
        let performerArray
        const adventureArray = []
        const agendaArray = []

        const sponsorArray = []
        const conferenceObj = doc.data()
        root
          .doc('conference')
          .collection('speakerList')
          .orderBy('createdDate')
          .onSnapshot(
            speakerSnapshot => {
              speakerArray = []
              speakerSnapshot.forEach(sp => {
                const speaker = { ...sp.data(), id: sp.id }
                speakerArray.push(speaker)
              })
              root
                .doc('conference')
                .collection('hostList')
                .orderBy('createdDate')
                .onSnapshot(hostSnapshot => {
                  hostArray = []
                  hostSnapshot.forEach(hs => {
                    const host = { ...hs.data(), id: hs.id }
                    hostArray.push(host)
                  })
                  root
                    .doc('conference')
                    .collection('performerList')
                    .orderBy('createdDate')
                    .onSnapshot(performerSnapshot => {
                      performerArray = []
                      performerSnapshot.forEach(pf => {
                        const performer = { ...pf.data(), id: pf.id }
                        performerArray.push(performer)
                      })
                      conference = {
                        ...conferenceObj,
                        speakers: {
                          ...conferenceObj.speakers,
                          speakerList: speakerArray
                        },
                        hosts: {
                          ...conferenceObj.hosts,
                          hostList: hostArray
                        },
                        performers: {
                          ...conferenceObj.performers,
                          performerList: performerArray
                        }
                      }
                      this.setState({ conference }, () => console.log(this.state.conference))
                    })
                })
            },
            err => alert(err.message)
          )
      }
    })
  }

  convertTime(time) {
    const hour = parseInt(time.substring(0, 2))
    const min = parseInt(time.substring(3, 5))

    const decimalMin = min / 60
    return hour + decimalMin
  }

  sortAgenda(agenda) {
    return agenda.sort((a, b) => this.convertTime(a.time) - this.convertTime(b.time))
  }

  render() {
    if (this.state.conference !== null) {
      const { isVN } = this.props
      const { conference } = this.state
      return (
        <div>
          <ConferenceHeader isVN={isVN} overview={conference.overview} />
          <SpeakerList isVN={isVN} speakers={conference.speakers} />
          <HostList isVN={isVN} hosts={conference.hosts} />
          <PerformerList isVN={isVN} performers={conference.performers} />
          {/* <Agenda isVN={isVN} agenda={this.state.agenda} /> */}
          {/* <Theme theme={conference.theme} />
          <Adventures isVN={isVN} adventures={conference.adventures} />
          <SponsorList isVN={isVN} sponsors={conference.sponsors} />
          <Location isVN={isVN} location={conference.overview.location} />
          <Highlight highlight={conference.highlight} /> */}
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
      )
    }
    return null
  }
}

export default Conference
