import React from 'react'
import { getDataRealtime, getListRealtime } from 'config/firebase'
import {
  PageTitle, PageWrapper, SectionWrapper, SectionTitle, Loading
} from 'utils/components/PageComponents'

import { UpdateText, UpdatePicture, UpdateUnitSection } from 'utils/components/Updates'

import UpdateDate from './Update/updateDate'
import UpdateAgenda from './Update/updateAgenda'
import UpdateLocation from './Update/updateLocation'
import UpdateHighlight from './Update/updateHighlight'

export default class ConferenceList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      conference: null
    }
  }

  componentDidMount() {
    // CALLBACK HELL This needs to fix
    getDataRealtime('conference', doc => {
      const conferenceObj = doc.data()
      getListRealtime('conference', 'speakerList', 'createdDate', querySnapshot => {
        const speakerArray = []
        querySnapshot.forEach(doc => {
          const speaker = { ...doc.data(), id: doc.id }
          speakerArray.push(speaker)
        })
        getListRealtime('conference', 'hostList', 'createdDate', querySnapshot => {
          const hostArray = []
          querySnapshot.forEach(doc => {
            const host = { ...doc.data(), id: doc.id }
            hostArray.push(host)
          })
          getListRealtime('conference', 'performerList', 'createdDate', querySnapshot => {
            const performerArray = []
            querySnapshot.forEach(doc => {
              const performer = { ...doc.data(), id: doc.id }
              performerArray.push(performer)
            })
            getListRealtime('conference', 'agendaList', 'time', querySnapshot => {
              const agendaArray = []
              querySnapshot.forEach(doc => {
                const agenda = { ...doc.data(), id: doc.id }
                agendaArray.push(agenda)
              })
              getListRealtime('conference', 'adventureList', 'createdDate', querySnapshot => {
                const adventureArray = []
                querySnapshot.forEach(doc => {
                  const adventure = { ...doc.data(), id: doc.id }
                  adventureArray.push(adventure)
                })
                getListRealtime('conference', 'sponsorList', 'createdDate', querySnapshot => {
                  const sponsorArray = []
                  querySnapshot.forEach(doc => {
                    const sponsor = { ...doc.data(), id: doc.id }
                    sponsorArray.push(sponsor)
                  })
                  getListRealtime('conference', 'highlightList', 'createdDate', querySnapshot => {
                    const highlightArray = []
                    querySnapshot.forEach(doc => {
                      const highlight = { ...doc.data(), id: doc.id }
                      highlightArray.push(highlight)
                    })
                    const conference = {
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
          <SectionWrapper forPicture>
            <SectionTitle title="Speakers" />
            <UpdateUnitSection
              unitData={conference.speakers}
              list="speakerList"
              outer="speakers"
              field="description"
              updateTo="conference"
            />
          </SectionWrapper>
          <SectionWrapper forPicture>
            <SectionTitle title="Hosts" />
            <UpdateUnitSection
              unitData={conference.hosts}
              list="hostList"
              outer="hosts"
              field="description"
              updateTo="conference"
            />
          </SectionWrapper>
          <SectionWrapper forPicture>
            <SectionTitle title="Performers" />
            <UpdateUnitSection
              unitData={conference.performers}
              list="performerList"
              outer="performers"
              field="description"
              updateTo="conference"
            />
          </SectionWrapper>
          <SectionWrapper>
            <SectionTitle title="Agenda" />
            <UpdateAgenda agendas={conference.agendaList} />
          </SectionWrapper>
          <SectionWrapper>
            <SectionTitle title="Theme" />
            <UpdatePicture
              name="Picture"
              data={conference.theme.picture}
              outer="theme"
              field="picture"
              updateTo="conference"
            />
            <UpdateText
              name="Title"
              data={conference.theme.title}
              outer="theme"
              field="title"
              updateTo="conference"
            />
            <UpdateText
              name="Description"
              data={conference.theme.description}
              outer="theme"
              field="description"
              updateTo="conference"
            />
          </SectionWrapper>
          <SectionWrapper forPicture>
            <SectionTitle title="Adventures" />
            <UpdateUnitSection
              unitData={conference.adventures}
              list="adventureList"
              outer="adventures"
              field="description"
              updateTo="conference"
            />
          </SectionWrapper>
          <SectionWrapper forPicture>
            <SectionTitle title="Sponsors" />
            <UpdateUnitSection
              unitData={conference.sponsors}
              list="sponsorList"
              outer="sponsors"
              field="description"
              updateTo="conference"
            />
          </SectionWrapper>
          <SectionWrapper>
            <SectionTitle title="Location" />
            <UpdateLocation locationData={conference.overview.location} />
          </SectionWrapper>
          <SectionWrapper forPicture>
            <SectionTitle title="Highlight" />
            <UpdateHighlight highlight={conference.highlight} />
          </SectionWrapper>
        </PageWrapper>
      )
    }
    return <Loading />
  }
}
