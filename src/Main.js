import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { getData, getList, getPostList } from 'config/firebase'
import _ from 'lodash'
import { Loading } from 'utils/components/PageComponents'
import NavBar from './NavBar/navBar'
import Home from './Home/home'
import Conference from './Events/Conference/conference'
import Learn from './Learn/learn'
import About from './About/about'
import Footer from './Footer/footer'
import Organizers from './Organizers/organizers'
import Contact from './Contact/contact'
import ScrollToTop from './ScrollToTop/scrollToTop'

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      getEventUpdate: null,
      home: null,
      about: null,
      footer: null,
      conference: null,
      learn: null,
      organizers: null,
      contact: null,
      isVN: true
    }
  }

  componentDidMount() {
    getData('getEventUpdate').then(doc => {
      if (doc.exists) {
        this.setState({ getEventUpdate: doc.data() })
      }
    })
    getData('home').then(doc => {
      if (doc.exists) {
        this.setState({ home: doc.data() })
      }
    })

    getData('about').then(doc => {
      if (doc.exists) {
        this.setState({ about: doc.data() })
      }
    })

    getData('organizers').then(doc => {
      if (doc.exists) {
        const organizerObj = doc.data()
        getList('organizers', 'teamMemList', 'createdDate').then(querySnapshot => {
          const organizerArr = []
          querySnapshot.forEach(doc => {
            const organizer = { ...doc.data(), id: doc.id }
            organizerArr.push(organizer)
          })
          const organizers = {
            ...organizerObj,
            teamMemList: organizerArr
          }
          this.setState({ organizers })
        })
      }
    })

    getData('footer').then(doc => {
      if (doc.exists) {
        this.setState({ footer: doc.data() })
      }
    })

    getData('contact').then(doc => {
      if (doc.exists) {
        this.setState({ contact: doc.data() })
      }
    })

    getData('conference').then(doc => {
      const conferenceObj = doc.data()
      getList('conference', 'speakerList', 'createdDate').then(querySnapshot => {
        const speakerArray = []
        querySnapshot.forEach(doc => {
          const speaker = { ...doc.data(), id: doc.id }
          speakerArray.push(speaker)
        })
        getList('conference', 'hostList', 'createdDate').then(querySnapshot => {
          const hostArray = []
          querySnapshot.forEach(doc => {
            const host = { ...doc.data(), id: doc.id }
            hostArray.push(host)
          })
          getList('conference', 'performerList', 'createdDate').then(querySnapshot => {
            const performerArray = []
            querySnapshot.forEach(doc => {
              const performer = { ...doc.data(), id: doc.id }
              performerArray.push(performer)
            })
            getList('conference', 'agendaList', 'time').then(querySnapshot => {
              const agendaArray = []
              querySnapshot.forEach(doc => {
                const agenda = { ...doc.data(), id: doc.id }
                agendaArray.push(agenda)
              })
              getList('conference', 'adventureList', 'createdDate').then(querySnapshot => {
                const adventureArray = []
                querySnapshot.forEach(doc => {
                  const adventure = { ...doc.data(), id: doc.id }
                  adventureArray.push(adventure)
                })
                getList('conference', 'sponsorList', 'createdDate').then(querySnapshot => {
                  const sponsorArray = []
                  querySnapshot.forEach(doc => {
                    const sponsor = { ...doc.data(), id: doc.id }
                    sponsorArray.push(sponsor)
                  })
                  getList('conference', 'highlightList', 'createdDate').then(querySnapshot => {
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

    getData('learn').then(doc => {
      const learnObj = doc.data()
      getList('learn', 'videoList', 'createdDate').then(querySnapshot => {
        const videoList = []
        querySnapshot.forEach(doc => {
          const video = { ...doc.data(), id: doc.id }
          videoList.push(video)
        })
        getPostList(snapshot => {
          const obj = snapshot.val()
          if (obj) {
            const posts = []
            Object.keys(obj).forEach(e => {
              const post = {
                id: e,
                thumbnail: obj[e].thumbnail,
                by: obj[e].by,
                datePosted: obj[e].datePosted,
                title: obj[e].title,
                description: obj[e].description,
                content: obj[e].content
              }
              posts.push(post)
            })
            const sorted = _.sortBy(posts, ['datePosted'])
            const learn = {
              ...learnObj,
              videoSection: {
                ...learnObj.videoSection,
                videoList
              },
              postSection: {
                ...learnObj.postSection,
                postList: sorted.reverse()
              }
            }
            this.setState({ learn })
          }
        })
      })
    })
  }

  toggleVN() {
    this.setState({ isVN: true })
  }

  toggleEN() {
    this.setState({ isVN: false })
  }

  render() {
    const {
      footer, home, about, isVN, conference, learn, contact, organizers, getEventUpdate
    } = this.state
    if (getEventUpdate && about && home && conference && footer && learn && organizers) {
      return (
        <Router>
          <ScrollToTop>
            <div>
              <NavBar toggleVN={this.toggleVN.bind(this)} toggleEN={this.toggleEN.bind(this)} isVN={isVN} getEventUpdate={getEventUpdate} />
              <Route exact path="/" render={() => <Home isVN={isVN} home={home} />} />
              <Route path="/attend" render={() => <Conference isVN={isVN} conference={conference} />} />
              <Route path="/learn" render={() => <Learn isVN={isVN} learn={learn} />} />
              <Route path="/about" render={() => <About isVN={isVN} about={about} />} />
              <Route path="/contact" render={() => <Contact isVN={isVN} contact={contact} />} />
              <Route path="/organizers" render={() => <Organizers organizers={organizers} />} />
              <Footer isVN={isVN} footer={footer} getEventUpdate={getEventUpdate} />
              {/* <Route path="/attend" render={() => <Conference isVN={isVN} />} />
              <Route path="/learn" render={() => <Learn isVN={isVN} />} />
              <Route path="/about" render={() => <About isVN={isVN} about={about} />} />
              <Route path="/organizers" render={() => <Organizers organizers={this.state.organizers} />} />
              <Route path="/contact" render={() => <Contact isVN={isVN} contact={this.state.contact} />} />
              <Footer isVN={isVN} footer={footer} /> */}
              
            </div>
          </ScrollToTop>
        </Router>
      )
    } return <Loading forPicture />
  }
}
