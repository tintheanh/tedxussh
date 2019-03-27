import React from 'react'
import { getDataRealtime } from 'config/firebase'

import {
  PageTitle, PageWrapper, SectionWrapper, SectionTitle, Loading
} from 'utils/components/PageComponents'

import { UpdateText } from 'utils/components/Updates'

import UpdateLeftLinks from './updateLeftLinks'

export default class FooterSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      footer: null
    }
  }

  componentDidMount() {
    getDataRealtime('footer', doc => {
      if (doc.exists) {
        const footerObj = doc.data()
        this.setState({ footer: footerObj })
      }
    })
  }

  render() {
    const { footer } = this.state
    if (footer !== null) {
      return (
        <PageWrapper>
          <PageTitle title="Footer section" />
          <SectionWrapper>
            <SectionTitle title="Left info" />
            <UpdateLeftLinks data={footer.left.links} />
          </SectionWrapper>
          <SectionWrapper>
            <SectionTitle title="Middle info" />
            <UpdateText
              name="Authority"
              data={footer.middle.authority}
              useTextarea
              outer="middle"
              field="authority"
              updateTo="footer"
            />
            <UpdateText
              name="Copyright"
              data={footer.copyright}
              useTextarea
              field="copyright"
              updateTo="footer"
            />
          </SectionWrapper>
          <SectionWrapper>
            <SectionTitle title="Right info" />
            <UpdateText
              name="Navigate to event"
              data={footer.right.navigate}
              outer="right"
              field="navigate"
              updateTo="footer"
            />
          </SectionWrapper>
        </PageWrapper>
      )
    }
    return <Loading />
  }
}
