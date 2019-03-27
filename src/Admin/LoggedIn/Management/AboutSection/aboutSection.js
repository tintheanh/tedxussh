import React from 'react'
import { getDataRealtime } from 'config/firebase'

import {
  PageTitle, PageWrapper, SectionWrapper, SectionTitle, Loading
} from 'utils/components/PageComponents'

import { UpdateText, UpdatePicture } from 'utils/components/Updates'

import UpdateMiddleYT from './Update/UpdateMiddleYT'

import UpdateVisions from './Update/UpdateVisions/updateVisions'

export default class AboutSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      about: null
    }
  }

  componentDidMount() {
    getDataRealtime('about', doc => {
      if (doc.exists) {
        const aboutObj = doc.data()
        this.setState({ about: aboutObj })
      }
    })
  }

  render() {
    const { about } = this.state
    if (about !== null) {
      return (
        <PageWrapper>
          <PageTitle title="About section" />
          <SectionWrapper>
            <SectionTitle title="Cover" />
            <UpdatePicture
              name="Picture"
              data={about.cover_picture}
              field="cover_picture"
              updateTo="about"
            />
            <UpdateText
              name="Title"
              data={about.title}
              field="title"
              updateTo="about"
            />
          </SectionWrapper>
          <SectionWrapper>
            <SectionTitle title="Left info" />
            <UpdatePicture
              name="Picture"
              data={about.left.picture}
              outer="left"
              field="picture"
              updateTo="about"
            />
            <UpdateText
              name="Title"
              data={about.left.title}
              outer="left"
              field="title"
              updateTo="about"
            />
            <UpdateText
              name="Description"
              data={about.left.description}
              useTextarea
              outer="left"
              field="description"
              updateTo="about"
            />
          </SectionWrapper>
          <SectionWrapper>
            <SectionTitle title="Middle info" />
            <UpdateMiddleYT video={about.middle.video} />
            <UpdateText
              name="Title"
              data={about.middle.title}
              outer="middle"
              field="title"
              updateTo="about"
            />
            <UpdateText
              name="Description"
              data={about.middle.description}
              useTextarea
              outer="middle"
              field="description"
              updateTo="about"
            />
          </SectionWrapper>
          <SectionWrapper>
            <SectionTitle title="Right info" />
            <UpdatePicture
              name="Picture"
              data={about.right.picture}
              outer="right"
              field="picture"
              updateTo="about"
            />
            <UpdateText
              name="Title"
              data={about.right.title}
              outer="middle"
              field="title"
              updateTo="about"
            />
            <UpdateText
              name="Description"
              data={about.right.description}
              useTextarea
              outer="right"
              field="description"
              updateTo="about"
            />
          </SectionWrapper>
          <SectionWrapper>
            <SectionTitle title="Visions" />
            <UpdateVisions visions={about.visions} />
          </SectionWrapper>
        </PageWrapper>
      )
    }
    return <Loading />
  }
}
