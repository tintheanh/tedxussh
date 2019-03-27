import React from 'react'
import { getDataRealtime } from 'config/firebase'

import { PageTitle, PageWrapper, SectionWrapper, SectionTitle, Loading } from 'utils/components/PageComponents'
import { UpdateText, UpdatePicture } from 'utils/components/Updates'

export default class HomeSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      home: null
    }
  }

  componentDidMount() {
    getDataRealtime('home', doc => {
      if (doc.exists) {
        const homeObj = doc.data()
        this.setState({ home: homeObj })
      }
    })
  }

  render() {
    const { home } = this.state
    if (home !== null) {
      return (
        <PageWrapper>
          <PageTitle title="Home section" />
          <SectionWrapper>
            <SectionTitle title="Cover" />
            <UpdatePicture
              name="Picture"
              data={home.cover_picture}
              field="cover_picture"
              updateTo="home"
            />
            <UpdateText
              name="Title"
              data={home.title}
              useTextarea
              field="title"
              updateTo="home"
            />
            <UpdateText
              name="Description"
              data={home.description}
              useTextarea
              field="description"
              updateTo="home"
            />
          </SectionWrapper>
          <SectionWrapper>
            <SectionTitle title="Left info" />
            <UpdatePicture
              name="Picture"
              data={home.left.cover}
              outer="left"
              field="cover"
              updateTo="home"
            />
            <UpdateText
              name="Title"
              data={home.left.title}
              outer="left"
              field="title"
              updateTo="home"
            />
            <UpdateText
              name="Description"
              data={home.left.description}
              useTextarea
              outer="left"
              field="description"
              updateTo="home"
            />
          </SectionWrapper>
          <SectionWrapper>
            <SectionTitle title="Middle info" />
            <UpdatePicture
              name="Picture"
              data={home.middle.cover}
              outer="middle"
              field="cover"
              updateTo="home"
            />
            <UpdateText
              name="Title"
              data={home.middle.title}
              outer="middle"
              field="title"
              updateTo="home"
            />
            <UpdateText
              name="Description"
              data={home.middle.description}
              useTextarea
              outer="middle"
              field="description"
              updateTo="home"
            />
          </SectionWrapper>
          <SectionWrapper>
            <SectionTitle title="Right info" />
            <UpdatePicture
              name="Picture"
              data={home.right.cover}
              outer="right"
              field="cover"
              updateTo="home"
            />
            <UpdateText
              name="Title"
              data={home.right.title}
              outer="right"
              field="title"
              updateTo="home"
            />
            <UpdateText
              name="Description"
              data={home.right.description}
              useTextarea
              outer="right"
              field="description"
              updateTo="home"
            />
          </SectionWrapper>
        </PageWrapper>
      )
    }
    return <Loading />
  }
}
