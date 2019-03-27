import React from 'react'
import { getDataRealtime, getListRealtime } from 'config/firebase'
import {
  PageTitle, PageWrapper, SectionWrapper, SectionTitle, Loading
} from 'utils/components/PageComponents'

import { UpdateText, UpdatePicture, UpdateUnitSection } from 'utils/components/Updates'

export default class Organizers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      organizers: null
    }
  }

  componentDidMount() {
    getDataRealtime('organizers', doc => {
      const organizersObj = doc.data()
      getListRealtime('organizers', 'teamMemList', 'createdDate', querySnapshot => {
        const organizerArray = []
        querySnapshot.forEach(org => {
          const organizer = { ...org.data(), id: org.id }
          organizerArray.push(organizer)
        })
        const organizers = {
          ...organizersObj,
          members: {
            teamMemList: organizerArray
          }
        }
        this.setState({ organizers })
      })
    })
  }

  render() {
    const { organizers } = this.state
    if (organizers !== null) {
      return (
        <PageWrapper>
          <PageTitle title="Get event update edit section" />
          <SectionWrapper>
            <SectionTitle title="Cover" />
            <UpdatePicture
              name="Picture"
              data={organizers.cover_picture}
              field="cover_picture"
              updateTo="organizers"
            />
            <UpdateText
              name="Title"
              data={organizers.title}
              field="title"
              updateTo="organizers"
            />
          </SectionWrapper>
          <SectionWrapper>
            <SectionTitle title="Team members" />
            <UpdateUnitSection
              unitData={organizers.members}
              list="teamMemList"
              updateTo="organizers"
            />
          </SectionWrapper>
        </PageWrapper>
      )
    }
    return <Loading />
  }
}
