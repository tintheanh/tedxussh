import React from 'react'
import firebase from 'firebase'
import Modal from 'react-responsive-modal'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import TimePicker from 'react-time-picker'
import ImageManagement from '../ImageMangement/imageManagement'
import EditSpeakers from './EditSpeakers/editSpeaker'
import EditHosts from './EditHosts/editHosts'
import EditPerformers from './EditPerformers/editPerformers'
import EditAdventures from './EditAdventures/editAdventures'
import MapView from '../../../../MapView/mapView'
import MapWithSearch from '../../../../MapWithSearch/mapWithSearch'
import EditAgenda from './EditAgenda/editAgenda'
import EditSponsors from './EditSponsors/editSponsors'
import EditHighlight from './EditHighlight/editHighlight'

import { root } from '../../../../config/firebase'
import UpdateBackground from './updateBackground'
import UpdateTitle from './updateTitle'
import UpdateDescription from './updateDescription'
import UpdateDate from './updateDate'

import UpdateSpeakers from './updateSpeakers'
import UpdateHosts from './updateHosts'
import UpdatePerformers from './updatePerformers'
import UpdateAgenda from './updateAgenda'

class ConferenceList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0,

      conference: null,

      address: '',
      conferencePicture: '',
      date: '',
      startTime: '',
      endTime: '',
      description: '',
      title: '',
      agenda: [],
      highlight: [],
      lat: '',
      lng: '',
      speakers: [],
      speakerDesc: '',
      adventures: [],
      hosts: [],
      hostDesc: '',
      performers: [],
      performerDesc: '',
      sponsors: [],
      sponsorDesc: '',

      speakerList: null,

      gapHeader: '',
      gapDetail: '',
      gapPic: '',

      toggleEditTitle: false,
      toggleEditDate: false,
      toggleEditDescription: false,
      toggleEditAddress: false,
      toggleEditAdventureHeader: false,
      toggleEditAdventureDesc: false,
      toggleEditGapHeader: false,
      toggleEditGapDetail: false,
      toggleEditSpeakerDesc: false,
      toggleEditHostDesc: false,
      toggleEditPerformerDesc: false,
      toggleEditSponsorDesc: false,

      modalGapPic: false,
      modalSpeakers: false,
      modalHosts: false,
      modalPerformers: false,
      modalAdventures: false,
      modalPicture: false,
      modalLocation: false,
      modalAgenda: false,
      modalSponsors: false,
      modalHighLight: false
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)

    this.openModalLocation = this.openModalLocation.bind(this)
    this.closeModalLocation = this.closeModalLocation.bind(this)

    this.openModalPicture = this.openModalPicture.bind(this)
    this.closeModalPicture = this.closeModalPicture.bind(this)

    this.openModalSpeakers = this.openModalSpeakers.bind(this)
    this.closeModalSpeakers = this.closeModalSpeakers.bind(this)

    this.openModalHosts = this.openModalHosts.bind(this)
    this.closeModalHosts = this.closeModalHosts.bind(this)

    this.openModalPerformers = this.openModalPerformers.bind(this)
    this.closeModalPerformers = this.closeModalPerformers.bind(this)

    this.openModalAdventures = this.openModalAdventures.bind(this)
    this.closeModalAdventures = this.closeModalAdventures.bind(this)

    this.openModalAgenda = this.openModalAgenda.bind(this)
    this.closeModalAgenda = this.closeModalAgenda.bind(this)

    this.openModalSponsors = this.openModalSponsors.bind(this)
    this.closeModalSponsors = this.closeModalSponsors.bind(this)

    this.openModalHighLight = this.openModalHighLight.bind(this)
    this.closeModalHighLight = this.closeModalHighLight.bind(this)

    this.openModalGapPic = this.openModalGapPic.bind(this)
    this.closeModalGapPic = this.closeModalGapPic.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    // this.fetchData();

    // root.doc('conference').onSnapshot(doc => {
    //   if (doc.exists) {
    //     const conferenceObj = doc.data();
    //     this.setState({ conference: conferenceObj });
    //     // root
    //     //   .doc('conference')
    //     //   .collection('adventureList')
    //     //   .orderBy('createdDate')
    //     //   .onSnapshot(querySnapshot => {
    //     //     querySnapshot.forEach(adv => {
    //     //       const adventure = { ...adv.data(), id: adv.id };
    //     //       adventureArray.push(adventure);
    //     //     });
    //     //   });

    //     // root
    //     //   .doc('conference')
    //     //   .collection('agendaList')
    //     //   .orderBy('time')
    //     //   .onSnapshot(querySnapshot => {
    //     //     querySnapshot.forEach(agd => {
    //     //       const agenda = { ...agd.data(), id: agd.id };
    //     //       agendaArray.push(agenda);
    //     //     });
    //     //   });

    //     // root
    //     //   .doc('conference')
    //     //   .collection('hostList')
    //     //   .orderBy('createdDate')
    //     //   .onSnapshot(querySnapshot => {
    //     //     querySnapshot.forEach(ht => {
    //     //       const host = { ...ht.data(), id: ht.id };
    //     //       hostArray.push(host);
    //     //     });
    //     //   });

    //     // root
    //     //   .doc('conference')
    //     //   .collection('performerList')
    //     //   .orderBy('createdDate')
    //     //   .onSnapshot(querySnapshot => {
    //     //     querySnapshot.forEach(pm => {
    //     //       const performer = { ...pm.data(), id: pm.id };
    //     //       performerArray.push(performer);
    //     //     });
    //     //   });

    //     // root
    //     //   .doc('conference')
    //     //   .collection('speakerList')
    //     //   .orderBy('createdDate')
    //     //   .onSnapshot(querySnapshot => {
    //     //     querySnapshot.forEach(sp => {
    //     //       const speaker = { ...sp.data(), id: sp.id };
    //     //       speakerArray.push(speaker);
    //     //     });
    //     //   });

    //     // root
    //     //   .doc('conference')
    //     //   .collection('sponsorList')
    //     //   .orderBy('createdDate')
    //     //   .onSnapshot(querySnapshot => {
    //     //     querySnapshot.forEach(ss => {
    //     //       const sponsor = { ...ss.data(), id: ss.id };
    //     //       sponsorArray.push(sponsor);
    //     //     });
    //     //     conference = {
    //     //       ...conferenceObj,
    //     //       adventures: {
    //     //         ...conferenceObj.adventures,
    //     //         adventureList: adventureArray
    //     //       },
    //     //       agendaList: agendaArray,
    //     //       host: {
    //     //         ...conferenceObj.host,
    //     //         hostList: hostArray
    //     //       },
    //     //       performer: {
    //     //         ...conferenceObj.performer,
    //     //         performerList: performerArray
    //     //       },
    //     //       speakers: {
    //     //         ...conferenceObj.speakers,
    //     //         speakerList: speakerArray
    //     //       },
    //     //       sponsors: {
    //     //         ...conferenceObj.sponsors,
    //     //         sponsorList: sponsorArray
    //     //       }
    //     //     };
    //     //     this.setState({ conference });
    //     //   });
    //   }
    // });

    root.doc('conference').onSnapshot(doc => {
      if (doc.exists) {
        let conference
        let speakerArray
        let hostArray
        let performerArray
        let agendaArray
        const adventureArray = []

        const sponsorArray = []
        const conferenceObj = doc.data()
        root
          .doc('conference')
          .collection('speakerList')
          .orderBy('createdDate')
          .onSnapshot(
            speakerSnapshot => {
              speakerArray = []
              speakerSnapshot.forEach(sp => {
                const speaker = { ...sp.data(), id: sp.id }
                speakerArray.push(speaker)
              })
              root
                .doc('conference')
                .collection('hostList')
                .orderBy('createdDate')
                .onSnapshot(hostSnapshot => {
                  hostArray = []
                  hostSnapshot.forEach(hs => {
                    const host = { ...hs.data(), id: hs.id }
                    hostArray.push(host)
                  })
                  root
                    .doc('conference')
                    .collection('performerList')
                    .orderBy('createdDate')
                    .onSnapshot(performerSnapshot => {
                      performerArray = []
                      performerSnapshot.forEach(pf => {
                        const performer = { ...pf.data(), id: pf.id }
                        performerArray.push(performer)
                      })
                      root
                        .doc('conference')
                        .collection('agendaList')
                        .orderBy('time')
                        .onSnapshot(agendaSnapshot => {
                          agendaArray = []
                          agendaSnapshot.forEach(agd => {
                            const agenda = { ...agd.data(), id: agd.id }
                            agendaArray.push(agenda)
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
                            agendaList: agendaArray
                          }
                          this.setState({ conference })
                        })
                    })
                })
            },
            err => alert(err.message)
          )
      }
    })

    // root
    //   .doc('conference')
    //   .collection('speakerList')
    //   .onSnapshot(
    //     querySnapshot => {
    //       const speakerArray = [];
    //       querySnapshot.forEach(doc => {
    //         const speaker = { ...doc.data(), id: doc.id };
    //         speakerArray.push(speaker);
    //       });
    //       this.setState({ speakerList: speakerArray });
    //     },
    //     err => alert(err.message)
    //   );
    // conference.speakers = {
    //   ...conference.speaker,
    //   speakerList: speakerArray
    // };
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ height: window.innerHeight })
  }

  openModalLocation() {
    this.setState({ modalLocation: true })
  }

  closeModalLocation() {
    this.setState({ modalLocation: false })
  }

  openModalPicture() {
    this.setState({ modalPicture: true })
  }

  closeModalPicture() {
    this.setState({ modalPicture: false })
  }

  openModalSpeakers() {
    this.setState({ modalSpeakers: true })
  }

  closeModalSpeakers() {
    this.setState({ modalSpeakers: false })
  }

  openModalAdventures() {
    this.setState({ modalAdventures: true })
  }

  closeModalAdventures() {
    this.setState({ modalAdventures: false })
  }

  openModalHosts() {
    this.setState({ modalHosts: true })
  }

  closeModalHosts() {
    this.setState({ modalHosts: false })
  }

  openModalPerformers() {
    this.setState({ modalPerformers: true })
  }

  closeModalPerformers() {
    this.setState({ modalPerformers: false })
  }

  openModalAgenda() {
    this.setState({ modalAgenda: true })
  }

  closeModalAgenda() {
    this.setState({ modalAgenda: false })
  }

  openModalSponsors() {
    this.setState({ modalSponsors: true })
  }

  closeModalSponsors() {
    this.setState({ modalSponsors: false })
  }

  openModalHighLight() {
    this.setState({ modalHighLight: true })
  }

  closeModalHighLight() {
    this.setState({ modalHighLight: false })
  }

  openModalGapPic() {
    this.setState({ modalGapPic: true })
  }

  closeModalGapPic() {
    this.setState({ modalGapPic: false })
  }

  onChangeTextInput(e, arg) {
    switch (arg) {
      case 'conferencePicture':
        this.setState({ conferencePicture: e.target.value })
        break
      case 'date':
        this.setState({ date: e.target.value })
        break
      case 'title':
        this.setState({ title: e.target.value })
        break
      case 'description':
        this.setState({ description: e.target.value })
        break
      case 'lat':
        this.setState({ lat: e.target.value })
        break
      case 'lng':
        this.setState({ lng: e.target.value })
        break
      case 'address':
        this.setState({ address: e.target.value })
        break
      case 'adventureHeader':
        this.setState({ adventureHeader: e.target.value })
        break
      case 'adventureDescription':
        this.setState({ adventureDescription: e.target.value })
        break
      case 'gapHeader':
        this.setState({ gapHeader: e.target.value })
        break
      case 'gapDetail':
        this.setState({ gapDetail: e.target.value })
        break
      case 'speakerDesc':
        this.setState({ speakerDesc: e.target.value })
        break
      case 'hostDesc':
        this.setState({ hostDesc: e.target.value })
        break
      case 'performerDesc':
        this.setState({ performerDesc: e.target.value })
        break
      case 'sponsorDesc':
        this.setState({ sponsorDesc: e.target.value })
        break
      default:
        break
    }
  }

  toObject(arr) {
    const obj = {}
    for (let i = 0; i < arr.length; ++i) obj[arr[i].id] = arr[i]
    Object.keys(arr).forEach(e => {
      delete arr[e].id
    })
    return obj
  }

  toVNDate(inputDate) {
    if (inputDate) {
      const date = inputDate.split('-')
      const year = date[0]
      let month = date[1]
      let day = date[2]
      if (parseInt(month) < 10) {
        month = month.substring(1, 2)
      }
      if (parseInt(day) < 10) {
        day = day.substring(1, 2)
      }
      return `${day}/${month}/${year}`
    }
    return ''
  }

  onUpdate(type) {
    let update = {}
    if (type === 'location') {
      update = {
        lat: this.state.lat,
        lng: this.state.lng,
        address: this.state.address
      }
      firebase
        .database()
        .ref('conference/overview/location')
        .update(update)
        .then(() => {
          console.log('Updated')
          // this.setState({ toggleEdit: false });
        })
        .catch(err => {
          console.error(err)
          alert('Error occured!')
        })
    }

    if (type === 'conferencePicture') {
      update = {
        conferencePicture: this.state.conferencePicture
      }
    }

    if (type === 'gapPicture') {
      update = {
        picture: this.state.gapPic
      }
      firebase
        .database()
        .ref('conference/theme')
        .update(update)
        .then(() => {
          console.log('Updated')
          // this.setState({ toggleEdit: false });
        })
        .catch(err => {
          console.error(err)
          alert('Error occured!')
        })
    }
    if (type === 'gapHeader') {
      update = {
        header: this.state.gapHeader
      }
      firebase
        .database()
        .ref('conference/theme')
        .update(update)
        .then(() => {
          console.log('Updated')
          // this.setState({ toggleEdit: false });
        })
        .catch(err => {
          console.error(err)
          alert('Error occured!')
        })
    }

    if (type === 'gapDetail') {
      update = {
        detail: this.state.gapDetail
      }
      firebase
        .database()
        .ref('conference/theme')
        .update(update)
        .then(() => {
          console.log('Updated')
          // this.setState({ toggleEdit: false });
        })
        .catch(err => {
          console.error(err)
          alert('Error occured!')
        })
    }

    if (type === 'speakerDesc') {
      update = {
        description: this.state.speakerDesc
      }
      firebase
        .database()
        .ref('conference/speakers')
        .update(update)
        .then(() => {
          console.log('Updated')
          // this.setState({ toggleEdit: false });
        })
        .catch(err => {
          console.error(err)
          alert('Error occured!')
        })
    }

    if (type === 'hostDesc') {
      update = {
        description: this.state.hostDesc
      }
      firebase
        .database()
        .ref('conference/hosts')
        .update(update)
        .then(() => {
          console.log('Updated')
          // this.setState({ toggleEdit: false });
        })
        .catch(err => {
          console.error(err)
          alert('Error occured!')
        })
    }

    if (type === 'performerDesc') {
      update = {
        description: this.state.performerDesc
      }
      firebase
        .database()
        .ref('conference/performers')
        .update(update)
        .then(() => {
          console.log('Updated')
          // this.setState({ toggleEdit: false });
        })
        .catch(err => {
          console.error(err)
          alert('Error occured!')
        })
    }

    if (type === 'title') {
      update = {
        title: this.state.title
      }
    }

    if (type === 'description') {
      update = {
        description: this.state.description
      }
    }

    if (type === 'date') {
      update = {
        date: this.state.date
      }
    }

    if (type === 'startTime') {
      update = {
        startTime: this.state.startTime
      }
    }

    if (type === 'endTime') {
      update = {
        endTime: this.state.endTime
      }
    }

    if (type === 'adventureHeader') {
      update = {
        header: this.state.adventureHeader
      }
      firebase
        .database()
        .ref('conference/adventures')
        .update(update)
        .then(() => {
          console.log('Updated')
          // this.setState({ toggleEdit: false });
        })
        .catch(err => {
          console.error(err)
          alert('Error occured!')
        })
    }

    if (type === 'adventureDescription') {
      update = {
        description: this.state.adventureDescription
      }
      firebase
        .database()
        .ref('conference/adventures')
        .update(update)
        .then(() => {
          console.log('Updated')
          // this.setState({ toggleEdit: false });
        })
        .catch(err => {
          console.error(err)
          alert('Error occured!')
        })
    }

    if (type === 'sponsorDesc') {
      update = {
        description: this.state.sponsorDesc
      }
      firebase
        .database()
        .ref('conference/sponsors')
        .update(update)
        .then(() => {
          console.log('Updated')
          // this.setState({ toggleEdit: false });
        })
        .catch(err => {
          console.error(err)
          alert('Error occured!')
        })
    }

    if (type === 'address') {
      update = {
        address: this.state.address
      }
      firebase
        .database()
        .ref('conference/overview/location')
        .update(update)
        .then(() => {
          console.log('Updated')
          // this.setState({ toggleEdit: false });
        })
        .catch(err => {
          console.error(err)
          alert('Error occured!')
        })
    }
    if (
      type !== 'address' &&
      type !== 'location' &&
      type !== 'adventureHeader' &&
      type !== 'adventureDescription' &&
      type !== 'gapPicture' &&
      type !== 'gapHeader' &&
      type !== 'gapDetail' &&
      type !== 'speakerDesc' &&
      type !== 'hostDesc' &&
      type !== 'performerDesc' &&
      type !== 'sponsorDesc'
    ) {
      firebase
        .database()
        .ref('conference')
        .update(update)
        .then(() => {
          console.log('Updated')
          // this.setState({ toggleEdit: false });
        })
        .catch(err => {
          console.error(err)
          alert('Error occured!')
        })
    }
  }

  sortAgenda(agenda) {
    return agenda.sort((a, b) => this.convertTime(a.time) - this.convertTime(b.time))
  }

  convertTime(time) {
    const hour = parseInt(time.substring(0, 2))
    const min = parseInt(time.substring(3, 5))

    const decimalMin = min / 60
    return hour + decimalMin
  }

  fetchData() {
    firebase
      .database()
      .ref('conference')
      .on('value', snapshot => {
        const conferenceObj = snapshot.val()
        if (conferenceObj !== undefined) {
          const agenda = []
          const highlight = []
          const speakers = []
          const hosts = []
          const performers = []
          const sponsors = []
          const adventures = []
          if (conferenceObj.agenda) {
            Object.keys(conferenceObj.agenda).forEach(e => {
              const oneAgenda = {
                id: e,
                header: conferenceObj.agenda[e].header,
                detail: conferenceObj.agenda[e].detail,
                participants: conferenceObj.agenda[e].participants,
                time: conferenceObj.agenda[e].time
              }
              agenda.push(oneAgenda)
            })
            this.sortAgenda(agenda)
          }
          if (conferenceObj.speakers && conferenceObj.speakers.speakerList) {
            Object.keys(conferenceObj.speakers.speakerList).forEach(e => {
              const speaker = {
                id: e,
                introduction: conferenceObj.speakers.speakerList[e].introduction,
                name: conferenceObj.speakers.speakerList[e].name,
                occupation: conferenceObj.speakers.speakerList[e].occupation,
                picture: conferenceObj.speakers.speakerList[e].picture
              }
              speakers.push(speaker)
            })
          }

          if (conferenceObj.hosts && conferenceObj.hosts.hostList) {
            Object.keys(conferenceObj.hosts.hostList).forEach(e => {
              const host = {
                id: e,
                introduction: conferenceObj.hosts.hostList[e].introduction,
                name: conferenceObj.hosts.hostList[e].name,
                occupation: conferenceObj.hosts.hostList[e].occupation,
                picture: conferenceObj.hosts.hostList[e].picture
              }
              hosts.push(host)
            })
          }

          if (conferenceObj.performers && conferenceObj.performers.performerList) {
            Object.keys(conferenceObj.performers.performerList).forEach(e => {
              const performer = {
                id: e,
                introduction: conferenceObj.performers.performerList[e].introduction,
                name: conferenceObj.performers.performerList[e].name,
                occupation: conferenceObj.performers.performerList[e].occupation,
                picture: conferenceObj.performers.performerList[e].picture
              }
              performers.push(performer)
            })
          }
          if (conferenceObj.adventures.adventureList) {
            Object.keys(conferenceObj.adventures.adventureList).forEach(e => {
              const adventure = {
                id: e,
                name: conferenceObj.adventures.adventureList[e].name,
                detail: conferenceObj.adventures.adventureList[e].detail,
                picture: conferenceObj.adventures.adventureList[e].picture
              }
              adventures.push(adventure)
            })
          }
          if (conferenceObj.sponsors.sponsorList) {
            Object.keys(conferenceObj.sponsors.sponsorList).forEach(e => {
              const sponsor = {
                id: e,
                logo: conferenceObj.sponsors.sponsorList[e].logo,
                website: conferenceObj.sponsors.sponsorList[e].website
              }
              sponsors.push(sponsor)
            })
          }

          if (conferenceObj.highlight) {
            Object.keys(conferenceObj.highlight).forEach(e => {
              const oneHighlight = {
                id: e,
                name: conferenceObj.highlight[e].name,
                url: conferenceObj.highlight[e].url
              }
              highlight.push(oneHighlight)
            })
          }

          this.setState({
            address: conferenceObj.overview.location.address,
            conferencePicture: conferenceObj.overview.conferencePicture,
            date: conferenceObj.overview.date,
            startTime: conferenceObj.overview.startTime,
            endTime: conferenceObj.overview.endTime,
            description: conferenceObj.overview.description,
            title: conferenceObj.overview.title,
            lat: conferenceObj.overview.location.lat,
            lng: conferenceObj.overview.location.lng,
            agenda,
            speakers,
            speakerDesc: conferenceObj.speakers.description,
            adventures,
            adventureHeader: conferenceObj.adventures.header,
            adventureDescription: conferenceObj.adventures.description,
            gapHeader: conferenceObj.theme.header,
            gapDetail: conferenceObj.theme.detail,
            gapPic: conferenceObj.theme.picture,
            hosts,
            hostDesc: conferenceObj.hosts.description,
            performers,
            performerDesc: conferenceObj.performers.description,
            sponsors,
            sponsorDesc: conferenceObj.sponsors.description,
            highlight,

            speakerSelected: false

            // toggleEditTitle: false,
            // toggleEditDate: false,
            // toggleEditDescription: false,

            // modalSpeakers: false,
            // modalPicture: false,
            // modalLocation: false
          })
        }
      })
  }

  removeSpeaker(speaker) {
    const ask = window.confirm(`Are you sure to remove ${speaker.name}`)
    if (ask) {
      const newSpeakers = this.state.speakers.filter(e => e.id !== speaker.id)

      this.setState({ speakers: newSpeakers }, () => console.log(this.state.speakers))
    }
  }

  removeOneSponsor(sponsor) {
    const ask = window.confirm('Are you sure to remove ?')
    if (ask) {
      const newSponsors = this.state.sponsors.filter(e => e.id !== sponsor.id)

      this.setState({ sponsors: newSponsors }, () => console.log(this.state.sponsors))
    }
  }

  updateOneSpeaker(update) {
    // const speakers = [...this.state.speakers];

    // const foundIndex = speakers.indexOf(
    //   speakers.find(speaker => speaker.id === updated.id)
    // );

    // // console.log(foundIndex, updated);

    // speakers[foundIndex] = updated;

    // console.log('new', speakers);
    // this.setState({ speakers }, () => this.onUpdate('speakers'));

    firebase
      .database()
      .ref(`conference/speakers/${update.id}`)
      .update(update)
  }

  updateOneAgenda(update) {
    // const agenda = [...this.state.agenda];
    // agenda[updated.id] = updated;
    // this.setState({ agenda }, () => this.onUpdate('agenda'));

    firebase
      .database()
      .ref(`conference/agenda/${update.id}`)
      .update(update)
  }

  updateOneSponsor(sponsorUpdated) {
    // console.log(sponsorUpdated);
    const sponsors = [...this.state.sponsors]
    sponsors[sponsorUpdated.id] = sponsorUpdated

    this.setState({ sponsors }, () => this.onUpdate('sponsors'))
  }

  updateOneSponsor2(id, propName, value) {
    const sponsors = [...this.state.sponsors]
    const sponsor = sponsors.find(s => s.id === id)
    if (sponsor && sponsor.hasOwnProperty(propName)) {
      sponsor[propName] = value
    }
    if (propName !== 'website') this.setState({ sponsors }, () => this.onUpdate('sponsors'))
    else this.setState({ sponsors })
  }

  renderRow(startIndex, endIndex, imgs, check) {
    if (check === 'speakers') {
      return imgs.slice(startIndex, endIndex).map(e => (
        <div className="col-3" key={e.id}>
          <div className="hotel-room text-center notransition">
            <div className="d-block mb-0 thumbnail notransition">
              <img src={e.picture} className="img-fluid notransition" alt="" />
            </div>
            <div className="hotel-room-body">
              <div>
                <h3 className="heading mb-0">{e.name}</h3>
                <strong className="price">{e.occupation}</strong>
              </div>
            </div>
          </div>
        </div>
      ))
    }

    if (check === 'hosts') {
      return imgs.slice(startIndex, endIndex).map(e => (
        <div className="col-3" key={e.id}>
          <div className="hotel-room text-center notransition">
            <div className="d-block mb-0 thumbnail notransition">
              <img src={e.picture} className="img-fluid notransition" alt="" />
            </div>
            <div className="hotel-room-body">
              <div>
                <h3 className="heading mb-0">{e.name}</h3>
                <strong className="price">{e.occupation}</strong>
              </div>
            </div>
          </div>
        </div>
      ))
    }

    if (check === 'performers') {
      return imgs.slice(startIndex, endIndex).map(e => (
        <div className="col-3" key={e.id}>
          <div className="hotel-room text-center notransition">
            <div className="d-block mb-0 thumbnail notransition">
              <img src={e.picture} className="img-fluid notransition" alt="" />
            </div>
            <div className="hotel-room-body">
              <div>
                <h3 className="heading mb-0">{e.name}</h3>
                <strong className="price">{e.occupation}</strong>
              </div>
            </div>
          </div>
        </div>
      ))
    }

    if (check === 'adventures') {
      return imgs.slice(startIndex, endIndex).map(e => (
        <div className="col-3" key={e.id}>
          <div className="hotel-room text-center notransition">
            <div className="d-block mb-0 thumbnail notransition">
              <img src={e.picture} className="img-fluid notransition" alt="" />
            </div>
            <div className="hotel-room-body">
              <div>
                <h3 className="heading mb-0">{e.name}</h3>
                <p>{e.detail}</p>
              </div>
            </div>
          </div>
        </div>
      ))
    }

    if (check === 'sponsors') {
      return imgs.slice(startIndex, endIndex).map(e => (
        <div className="col-3" key={e.id}>
          <div className="hotel-room text-center notransition">
            <div className="d-block mb-0 thumbnail notransition">
              <a href={e.website} target="_blank">
                <img src={e.logo} className="img-fluid notransition" alt="" />
              </a>
            </div>
          </div>
        </div>
      ))
    }

    if (check === 'highlight') {
      return imgs.slice(startIndex, endIndex).map(e => (
        <div className="col-3" key={e.id}>
          <div className="hotel-room text-center notransition">
            <div className="d-block mb-0 thumbnail notransition">
              <img src={e.url} className="img-fluid notransition" alt="" />
            </div>
          </div>
        </div>
      ))
    }
    return null
  }

  renderImg(totalRows, imgs, check) {
    let startIndex = -4
    let endIndex = startIndex + 4
    const temp = Array.from({ length: totalRows }, () => Math.floor(Math.random()))

    return temp.map((_, i) => {
      startIndex += 4
      endIndex += 4
      return (
        <div className="row" key={i}>
          {this.renderRow(startIndex, endIndex, imgs, check)}
        </div>
      )
    })
  }

  renderFirstRow(totalRows, imgs, check) {
    let startIndex = -4
    let endIndex = startIndex + 4
    const temp = Array.from({ length: totalRows }, () => Math.floor(Math.random()))

    return temp.map((_, i) => {
      startIndex += 4
      endIndex += 4
      return (
        <div className="row" key={i}>
          {/* {this.renderRow(startIndex, endIndex, imgs, check)} */}
          {imgs.slice(startIndex, endIndex).map(e => (
            <div className="col-3" key={e.id}>
              <div className="hotel-room text-center notransition">
                <div className="d-block mb-0 thumbnail notransition">
                  <img src={e.picture} className="img-fluid notransition" alt="" />
                </div>
                <div className="hotel-room-body">
                  <div>
                    <h3 className="heading mb-0">{e.name}</h3>
                    <strong className="price">{e.occupation}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    })
  }

  renderAllImg(imgs, check) {
    if (imgs.length > 0) {
      if (imgs.length % 4 === 0) {
        return this.renderImg(imgs.length / 4, imgs, check)
      }
      return this.renderImg(imgs.length / 4 + 1, imgs, check)
    }
    return <h2>No imgs available</h2>
  }

  renderAgenda(agenda) {
    return (
      <div>
        {agenda.map(e => (
          <div className="col-12" key={e.id}>
            <p>
              <strong>{e.time}</strong> - {e.header}
            </p>
            <p>{e.detail}</p>
            <p>{e.participants}</p>
          </div>
        ))}
      </div>
    )
  }

  renderMap(lat, lng) {
    return (
      <MapView
        lat={lat}
        lng={lng}
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD0vm0l85I8sXbIj2s7WxxoCImg1fjXDgw&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ width: '100%', height: '100%' }} />}
        containerElement={<div style={{ height: '400px', width: '100%' }} />}
        mapElement={<div style={{ width: '100%', height: '100%' }} />}
      />
    )
  }

  updateConferencePicture(url) {
    this.setState({ conferencePicture: url }, () => this.onUpdate('conferencePicture'))
  }

  updateGapPic(url) {
    this.setState({ gapPic: url }, () => this.onUpdate('gapPicture'))
  }

  handleDateChange(date) {
    this.setState({ date: moment(date).format('YYYY-MM-DD') })
  }

  removeAgenda(agendaID) {
    const ask = window.confirm('Are you sure to remove this?')
    if (ask) {
      const newAgenda = this.state.agenda.filter(a => a.id !== agendaID)

      this.setState({ agenda: newAgenda }, () => console.log(this.state.agenda))
    }
  }

  handleStartTimeChange(startTime) {
    this.setState({ startTime })
  }

  handleEndTimeChange(endTime) {
    this.setState({ endTime })
  }

  setNewLocation(lat, lng, address) {
    this.setState({ lat, lng, address }, () => this.onUpdate('location'))
  }

  render() {
    if (this.state.conference !== null) {
      const { conference } = this.state
      return (
        <div className="page-wrapper" style={{ height: `${this.state.height - 64}px`, overflowY: 'scroll' }}>
          <div className="page-breadcrumb">
            <div className="row">
              <div className="col-12 d-flex no-block align-items-center">
                <h2 className="page-title">Conference Edit Section</h2>
              </div>
            </div>
            <UpdateBackground background={conference.overview.picture} />
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
          </div>
        </div>
      )
    }
    return null
  }
}

export default ConferenceList
