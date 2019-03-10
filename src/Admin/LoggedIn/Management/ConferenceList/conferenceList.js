import React from 'react'
import { getDataRealtime, getListRealtime, root } from 'config/firebase'
import {
  PageTitle, PageWrapper, SectionWrapper, SectionTitle
} from 'utils/components/PageComponents'

import { UpdateText, UpdatePicture, UpdatePeopleSection } from 'utils/components/Updates'

import UpdateBackground from './updateBackground'
import UpdateTitle from './updateTitle'
import UpdateDescription from './updateDescription'
import UpdateDate from './updateDate'

import UpdateSpeakers from './updateSpeakers'
import UpdateHosts from './updateHosts'
import UpdatePerformers from './updatePerformers'
import UpdateAgenda from './updateAgenda'
import UpdateTheme from './updateTheme'
import UpdateAdventures from './updateAdventures'
import UpdateSponsors from './updateSponsors'
import UpdateLocation from './updateLocation'
import UpdateHighlight from './updateHighlight'

export default class ConferenceList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      conference: null
    }
  }

  componentDidMount() {
    let conference
    let speakerArray
    let hostArray
    let performerArray
    let agendaArray
    let adventureArray
    let sponsorArray
    let highlightArray
    let conferenceObj

    // CALLBACK HELL This needs to fix
    getDataRealtime('conference', doc => {
      conferenceObj = doc.data()
      getListRealtime('conference', 'speakerList', 'createdDate', querySnapshot => {
        speakerArray = []
        querySnapshot.forEach(doc => {
          const speaker = { ...doc.data(), id: doc.id }
          speakerArray.push(speaker)
        })
        getListRealtime('conference', 'hostList', 'createdDate', querySnapshot => {
          hostArray = []
          querySnapshot.forEach(doc => {
            const host = { ...doc.data(), id: doc.id }
            hostArray.push(host)
          })
          getListRealtime('conference', 'performerList', 'createdDate', querySnapshot => {
            performerArray = []
            querySnapshot.forEach(doc => {
              const performer = { ...doc.data(), id: doc.id }
              performerArray.push(performer)
            })
            getListRealtime('conference', 'agendaList', 'createdDate', querySnapshot => {
              agendaArray = []
              querySnapshot.forEach(doc => {
                const agenda = { ...doc.data(), id: doc.id }
                agendaArray.push(agenda)
              })
              getListRealtime('conference', 'adventureList', 'createdDate', querySnapshot => {
                adventureArray = []
                querySnapshot.forEach(doc => {
                  const adventure = { ...doc.data(), id: doc.id }
                  adventureArray.push(adventure)
                })
                getListRealtime('conference', 'sponsorList', 'createdDate', querySnapshot => {
                  sponsorArray = []
                  querySnapshot.forEach(doc => {
                    const sponsor = { ...doc.data(), id: doc.id }
                    sponsorArray.push(sponsor)
                  })
                  getListRealtime('conference', 'highlightList', 'createdDate', querySnapshot => {
                    highlightArray = []
                    querySnapshot.forEach(doc => {
                      const highlight = { ...doc.data(), id: doc.id }
                      highlightArray.push(highlight)
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
                      },
                      agendaList: agendaArray,
                      theme: {
                        ...conferenceObj.theme
                      },
                      adventures: {
                        ...conferenceObj.adventures,
                        adventureList: adventureArray
                      },
                      sponsors: {
                        ...conferenceObj.sponsors,
                        sponsorList: sponsorArray
                      },
                      highlight: highlightArray
                    }
                    this.setState({ conference })
                  })
                })
              })
            })
          })
        })
      })
    })
  }

  render() {
    const { conference } = this.state
    if (conference !== null) {
      return (
        <PageWrapper>
          <PageTitle title="Event edit section" />
          <SectionWrapper>
            <SectionTitle title="Overview" />
            <UpdatePicture
              name="Picture"
              data={conference.overview.cover_picture}
              outer="overview"
              field="cover_picture"
              updateTo="conference"
            />
            <UpdateText
              name="Title"
              data={conference.overview.title}
              outer="overview"
              field="title"
              updateTo="conference"
            />
            <UpdateText
              name="Description"
              data={conference.overview.description}
              useTextarea
              outer="overview"
              field="description"
              updateTo="conference"
            />
            <UpdateDate
              date={{
                startTime: conference.overview.startTime,
                endTime: conference.overview.endTime
              }}
            />
          </SectionWrapper>
          <SectionWrapper>
            <SectionTitle title="Speakers" />
            <UpdatePeopleSection
              peopleData={conference.speakers}
              list="speakerList"
              outer="speakers"
              field="description"
              updateTo="conference"
            />
          </SectionWrapper>
          <SectionWrapper>
            <SectionTitle title="Hosts" />
            <UpdatePeopleSection
              peopleData={conference.hosts}
              list="hostList"
              outer="hosts"
              field="description"
              updateTo="conference"
            />
          </SectionWrapper>
          <SectionWrapper>
            <SectionTitle title="Performers" />
            <UpdatePeopleSection
              peopleData={conference.performers}
              list="performerList"
              outer="performers"
              field="description"
              updateTo="conference"
            />
          </SectionWrapper>
          {/* <UpdateBackground background={conference.overview.picture} />
          <UpdateTitle title={conference.overview.title} />
          <UpdateDescription description={conference.overview.description} />
          <UpdateDate
            date={{
              startTime: conference.overview.startTime,
              endTime: conference.overview.endTime
            }}
          />
          <UpdateSpeakers speakerData={conference.speakers} />
          <UpdateHosts hostData={conference.hosts} />
          <UpdatePerformers performerData={conference.performers} />
          <UpdateAgenda agendas={conference.agendaList} />
          <UpdateTheme theme={conference.theme} />
          <UpdateAdventures adventureData={conference.adventures} />
          <UpdateSponsors sponsorData={conference.sponsors} />
          <UpdateLocation locationData={conference.overview.location} />
          <UpdateHighlight highlight={conference.highlight} /> */}
        </PageWrapper>
      )
    }
    return null
  }
}
