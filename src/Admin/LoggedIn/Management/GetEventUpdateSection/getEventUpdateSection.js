import React from 'react'
import { getDataRealtime } from 'config/firebase'

import {
  PageTitle, PageWrapper, SectionWrapper, SectionTitle, Loading
} from 'utils/components/PageComponents'

import { UpdateText } from 'utils/components/Updates'
import UpdateStartDate from './Update/updateStartDate'
import UpdateEndDate from './Update/updateEndDate'

export default class GetEventUpdateSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      getEventUpdate: null
    }
  }

  componentDidMount() {
    getDataRealtime('getEventUpdate', doc => {
      if (doc.exists) {
        const geuObj = doc.data()
        this.setState({ getEventUpdate: geuObj })
      }
    })
  }

  render() {
    const { getEventUpdate } = this.state
    if (getEventUpdate !== null) {
      return (
        <PageWrapper>
          <PageTitle title="Get event update edit section" />
          <SectionWrapper>
            <SectionTitle title="Information" />
            <UpdateText
              name="Description"
              data={getEventUpdate.description}
              useTextarea
              field="description"
              updateTo="getEventUpdate"
            />
            <UpdateStartDate startDate={getEventUpdate.startDate} />
            <UpdateEndDate endDate={getEventUpdate.endDate} />
            <UpdateText
              name="Ticket link"
              data={getEventUpdate.ticket_link}
              field="ticket_link"
              updateTo="getEventUpdate"
            />
          </SectionWrapper>
        </PageWrapper>
      )
    }
    return <Loading />
  }
}
