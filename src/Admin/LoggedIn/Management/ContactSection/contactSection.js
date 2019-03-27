import React from 'react'
import { getDataRealtime } from 'config/firebase'

import {
  PageTitle, PageWrapper, SectionWrapper, SectionTitle, Loading
} from 'utils/components/PageComponents'

import { UpdateText, UpdatePicture } from 'utils/components/Updates'

export default class ContactSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contact: null
    }
  }

  componentDidMount() {
    getDataRealtime('contact', doc => {
      if (doc.exists) {
        const contactObj = doc.data()
        this.setState({ contact: contactObj })
      }
    })
  }

  render() {
    const { contact } = this.state
    if (contact !== null) {
      return (
        <PageWrapper>
          <PageTitle title="Contact section" />
          <SectionWrapper>
            <SectionTitle title="Cover" />
            <UpdatePicture
              name="Picture"
              data={contact.cover_picture}
              field="cover_picture"
              updateTo="contact"
            />
          </SectionWrapper>
          <SectionWrapper>
            <SectionTitle title="Infomation" />
            <UpdateText
              name="Introduction"
              data={contact.introduction}
              useTextarea
              field="introduction"
              updateTo="contact"
            />
            <UpdateText
              name="Location description"
              data={contact.location_description}
              useTextarea
              field="location_description"
              updateTo="contact"
            />
            <UpdateText
              name="Email"
              data={contact.email_contact}
              useTextarea
              field="email_contact"
              updateTo="contact"
            />
          </SectionWrapper>
        </PageWrapper>
      )
    }
    return <Loading />
  }
}
