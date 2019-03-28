import React from 'react'
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

export default class Conference extends React.Component {
  componentDidMount() {
    window.document.title = 'TEDxHCMUSSH - Event'
  }

  render() {
    const { isVN, conference } = this.props
    return (
      <div>
        <ConferenceHeader isVN={isVN} overview={conference.overview} />
        <SpeakerList isVN={isVN} speakers={conference.speakers} />
        <HostList isVN={isVN} hosts={conference.hosts} />
        <PerformerList isVN={isVN} performers={conference.performers} />
        <Agenda isVN={isVN} agenda={conference.agendaList} date={conference.overview.startTime} />
        <Theme theme={conference.theme} />
        <Adventures isVN={isVN} adventures={conference.adventures} />
        <SponsorList isVN={isVN} sponsors={conference.sponsors} />
        <Location isVN={isVN} location={conference.overview.location} />
        <Highlight highlight={conference.highlight} />
      </div>
    )
  }
}
