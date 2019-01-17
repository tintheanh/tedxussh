import React from 'react';
import firebase from 'firebase';
import Modal from 'react-responsive-modal';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import ImageManagement from '../ImageMangement/imageManagement';
import EditSpeakers from './EditSpeakers/editSpeaker';
import EditHosts from './EditHosts/editHosts';
import EditPerformers from './EditPerformers/editPerformers';
import EditAdventures from './EditAdventures/editAdventures';
import MapView from '../../../../MapView/mapView';
import MapWithSearch from '../../../../MapWithSearch/mapWithSearch';
import EditAgenda from './EditAgenda/editAgenda';
import EditSponsors from './EditSponsors/editSponsors';
import EditHighlight from './EditHighlight/editHighlight';

class ConferenceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,

      address: '',
      conferencePicture: '',
      date: '',
      description: '',
      title: '',
      agenda: [],
      highlight: [],
      lat: '',
      lng: '',
      speakers: [],
      adventures: [],
      hosts: [],
      performers: [],
      sponsors: [],

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
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.openModalLocation = this.openModalLocation.bind(this);
    this.closeModalLocation = this.closeModalLocation.bind(this);

    this.openModalPicture = this.openModalPicture.bind(this);
    this.closeModalPicture = this.closeModalPicture.bind(this);

    this.openModalSpeakers = this.openModalSpeakers.bind(this);
    this.closeModalSpeakers = this.closeModalSpeakers.bind(this);

    this.openModalHosts = this.openModalHosts.bind(this);
    this.closeModalHosts = this.closeModalHosts.bind(this);

    this.openModalPerformers = this.openModalPerformers.bind(this);
    this.closeModalPerformers = this.closeModalPerformers.bind(this);

    this.openModalAdventures = this.openModalAdventures.bind(this);
    this.closeModalAdventures = this.closeModalAdventures.bind(this);

    this.openModalAgenda = this.openModalAgenda.bind(this);
    this.closeModalAgenda = this.closeModalAgenda.bind(this);

    this.openModalSponsors = this.openModalSponsors.bind(this);
    this.closeModalSponsors = this.closeModalSponsors.bind(this);

    this.openModalHighLight = this.openModalHighLight.bind(this);
    this.closeModalHighLight = this.closeModalHighLight.bind(this);

    this.openModalGapPic = this.openModalGapPic.bind(this);
    this.closeModalGapPic = this.closeModalGapPic.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.fetchData();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ height: window.innerHeight });
  }

  openModalLocation() {
    this.setState({ modalLocation: true });
  }

  closeModalLocation() {
    this.setState({ modalLocation: false });
  }

  openModalPicture() {
    this.setState({ modalPicture: true });
  }

  closeModalPicture() {
    this.setState({ modalPicture: false });
  }

  openModalSpeakers() {
    this.setState({ modalSpeakers: true });
  }

  closeModalSpeakers() {
    this.setState({ modalSpeakers: false });
  }

  openModalAdventures() {
    this.setState({ modalAdventures: true });
  }

  closeModalAdventures() {
    this.setState({ modalAdventures: false });
  }

  openModalHosts() {
    this.setState({ modalHosts: true });
  }

  closeModalHosts() {
    this.setState({ modalHosts: false });
  }

  openModalPerformers() {
    this.setState({ modalPerformers: true });
  }

  closeModalPerformers() {
    this.setState({ modalPerformers: false });
  }

  openModalAgenda() {
    this.setState({ modalAgenda: true });
  }

  closeModalAgenda() {
    this.setState({ modalAgenda: false });
  }

  openModalSponsors() {
    this.setState({ modalSponsors: true });
  }

  closeModalSponsors() {
    this.setState({ modalSponsors: false });
  }

  openModalHighLight() {
    this.setState({ modalHighLight: true });
  }

  closeModalHighLight() {
    this.setState({ modalHighLight: false });
  }

  openModalGapPic() {
    this.setState({ modalGapPic: true });
  }

  closeModalGapPic() {
    this.setState({ modalGapPic: false });
  }

  onChangeTextInput(e, arg) {
    switch (arg) {
      case 'conferencePicture':
        this.setState({ conferencePicture: e.target.value });
        break;
      case 'date':
        this.setState({ date: e.target.value });
        break;
      case 'title':
        this.setState({ title: e.target.value });
        break;
      case 'description':
        this.setState({ description: e.target.value });
        break;
      case 'lat':
        this.setState({ lat: e.target.value });
        break;
      case 'lng':
        this.setState({ lng: e.target.value });
        break;
      case 'address':
        this.setState({ address: e.target.value });
        break;
      case 'adventureHeader':
        this.setState({ adventureHeader: e.target.value });
        break;
      case 'adventureDescription':
        this.setState({ adventureDescription: e.target.value });
        break;
      case 'gapHeader':
        this.setState({ gapHeader: e.target.value });
        break;
      case 'gapDetail':
        this.setState({ gapDetail: e.target.value });
        break;
      default:
        break;
    }
  }

  toObject(arr) {
    const obj = {};
    for (let i = 0; i < arr.length; ++i) obj[arr[i].id] = arr[i];
    Object.keys(arr).forEach(e => {
      delete arr[e].id;
    });
    return obj;
  }

  onUpdate(type) {
    let update = {};
    if (type === 'location') {
      update = {
        location: {
          lat: this.state.lat,
          lng: this.state.lng,
          address: this.state.address
        }
      };
    }

    if (type === 'conferencePicture') {
      update = {
        conferencePicture: this.state.conferencePicture
      };
    }

    if (type === 'gapPicture') {
      update = {
        picture: this.state.gapPic
      };
      firebase
        .database()
        .ref('conference/gap')
        .update(update)
        .then(() => {
          console.log('Updated');
          // this.setState({ toggleEdit: false });
        })
        .catch(err => {
          console.error(err);
          alert('Error occured!');
        });
    }
    if (type === 'gapHeader') {
      update = {
        header: this.state.gapHeader
      };
      firebase
        .database()
        .ref('conference/gap')
        .update(update)
        .then(() => {
          console.log('Updated');
          // this.setState({ toggleEdit: false });
        })
        .catch(err => {
          console.error(err);
          alert('Error occured!');
        });
    }

    if (type === 'gapDetail') {
      update = {
        detail: this.state.gapDetail
      };
      firebase
        .database()
        .ref('conference/gap')
        .update(update)
        .then(() => {
          console.log('Updated');
          // this.setState({ toggleEdit: false });
        })
        .catch(err => {
          console.error(err);
          alert('Error occured!');
        });
    }

    if (type === 'title') {
      update = {
        title: this.state.title
      };
    }

    if (type === 'description') {
      update = {
        description: this.state.description
      };
    }

    if (type === 'date') {
      update = {
        date: this.state.date.toDateString()
      };
    }

    if (type === 'adventureHeader') {
      update = {
        adventureHeader: this.state.adventureHeader
      };
      firebase
        .database()
        .ref('conference/adventures')
        .update(update)
        .then(() => {
          console.log('Updated');
          // this.setState({ toggleEdit: false });
        })
        .catch(err => {
          console.error(err);
          alert('Error occured!');
        });
    }

    if (type === 'adventureDescription') {
      update = {
        adventureDesc: this.state.adventureDescription
      };
      firebase
        .database()
        .ref('conference/adventures')
        .update(update)
        .then(() => {
          console.log('Updated');
          // this.setState({ toggleEdit: false });
        })
        .catch(err => {
          console.error(err);
          alert('Error occured!');
        });
    }

    if (type === 'address') {
      update = {
        address: this.state.address
      };
      firebase
        .database()
        .ref('conference/location')
        .update(update)
        .then(() => {
          console.log('Updated');
          // this.setState({ toggleEdit: false });
        })
        .catch(err => {
          console.error(err);
          alert('Error occured!');
        });
    }
    if (
      type !== 'address' &&
      type !== 'adventureHeader' &&
      type !== 'adventureDescription' &&
      type !== 'gapPicture' &&
      type !== 'gapHeader' &&
      type !== 'gapDetail'
    ) {
      firebase
        .database()
        .ref('conference')
        .update(update)
        .then(() => {
          console.log('Updated');
          // this.setState({ toggleEdit: false });
        })
        .catch(err => {
          console.error(err);
          alert('Error occured!');
        });
    }
  }

  sortAgenda(agenda) {
    return agenda.sort(
      (a, b) => this.convertTime(a.time) - this.convertTime(b.time)
    );
  }

  convertTime(time) {
    const hour = parseInt(time.substring(0, 2));
    const min = parseInt(time.substring(3, 5));

    const decimalMin = min / 60;
    return hour + decimalMin;
  }

  fetchData() {
    firebase
      .database()
      .ref('conference')
      .on('value', snapshot => {
        const conferenceObj = snapshot.val();
        if (conferenceObj !== undefined) {
          const agenda = [];
          const highlight = [];
          const speakers = [];
          const hosts = [];
          const performers = [];
          const sponsors = [];
          const adventures = [];

          Object.keys(conferenceObj.agenda).forEach(e => {
            const oneAgenda = {
              id: e,
              header: conferenceObj.agenda[e].header,
              detail: conferenceObj.agenda[e].detail,
              participants: conferenceObj.agenda[e].participants,
              time: conferenceObj.agenda[e].time
            };
            agenda.push(oneAgenda);
          });
          this.sortAgenda(agenda);

          Object.keys(conferenceObj.speakers).forEach(e => {
            const speaker = {
              id: e,
              introduction: conferenceObj.speakers[e].introduction,
              name: conferenceObj.speakers[e].name,
              occupation: conferenceObj.speakers[e].occupation,
              picture: conferenceObj.speakers[e].picture
            };
            speakers.push(speaker);
          });

          Object.keys(conferenceObj.hosts).forEach(e => {
            const host = {
              id: e,
              introduction: conferenceObj.hosts[e].introduction,
              name: conferenceObj.hosts[e].name,
              occupation: conferenceObj.hosts[e].occupation,
              picture: conferenceObj.hosts[e].picture
            };
            hosts.push(host);
          });

          Object.keys(conferenceObj.performers).forEach(e => {
            const performer = {
              id: e,
              introduction: conferenceObj.performers[e].introduction,
              name: conferenceObj.performers[e].name,
              occupation: conferenceObj.performers[e].occupation,
              picture: conferenceObj.performers[e].picture
            };
            performers.push(performer);
          });
          if (conferenceObj.adventures) {
            Object.keys(conferenceObj.adventures.listAdventures).forEach(e => {
              const adventure = {
                id: e,
                name: conferenceObj.adventures.listAdventures[e].name,
                detail: conferenceObj.adventures.listAdventures[e].detail,
                picture: conferenceObj.adventures.listAdventures[e].picture
              };
              adventures.push(adventure);
            });
          }

          Object.keys(conferenceObj.sponsors).forEach(e => {
            const sponsor = {
              id: e,
              logo: conferenceObj.sponsors[e].logo,
              website: conferenceObj.sponsors[e].website
            };
            sponsors.push(sponsor);
          });

          Object.keys(conferenceObj.highlight).forEach(e => {
            const oneHighlight = {
              id: e,
              name: conferenceObj.highlight[e].name,
              url: conferenceObj.highlight[e].url
            };
            highlight.push(oneHighlight);
          });

          this.setState({
            address: conferenceObj.location.address,
            conferencePicture: conferenceObj.conferencePicture,
            date: conferenceObj.date,
            description: conferenceObj.description,
            title: conferenceObj.title,
            lat: conferenceObj.location.lat,
            lng: conferenceObj.location.lng,
            agenda,
            speakers,
            adventures,
            adventureHeader: conferenceObj.adventures.adventureHeader,
            adventureDescription: conferenceObj.adventures.adventureDesc,
            gapHeader: conferenceObj.gap.header,
            gapDetail: conferenceObj.gap.detail,
            gapPic: conferenceObj.gap.picture,
            hosts,
            performers,
            sponsors,
            highlight,

            speakerSelected: false

            // toggleEditTitle: false,
            // toggleEditDate: false,
            // toggleEditDescription: false,

            // modalSpeakers: false,
            // modalPicture: false,
            // modalLocation: false
          });
        }
      });
  }

  removeSpeaker(speaker) {
    const ask = window.confirm(`Are you sure to remove ${speaker.name}`);
    if (ask) {
      const newSpeakers = this.state.speakers.filter(e => {
        return e.id !== speaker.id;
      });

      this.setState({ speakers: newSpeakers }, () =>
        console.log(this.state.speakers)
      );
    }
  }

  removeOneSponsor(sponsor) {
    const ask = window.confirm(`Are you sure to remove ?`);
    if (ask) {
      const newSponsors = this.state.sponsors.filter(e => {
        return e.id !== sponsor.id;
      });

      this.setState({ sponsors: newSponsors }, () =>
        console.log(this.state.sponsors)
      );
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
      .update(update);
  }

  updateOneAgenda(update) {
    // const agenda = [...this.state.agenda];
    // agenda[updated.id] = updated;
    // this.setState({ agenda }, () => this.onUpdate('agenda'));

    firebase
      .database()
      .ref(`conference/agenda/${update.id}`)
      .update(update);
  }

  updateOneSponsor(sponsorUpdated) {
    // console.log(sponsorUpdated);
    const sponsors = [...this.state.sponsors];
    sponsors[sponsorUpdated.id] = sponsorUpdated;

    this.setState({ sponsors }, () => this.onUpdate('sponsors'));
  }

  updateOneSponsor2(id, propName, value) {
    const sponsors = [...this.state.sponsors];
    const sponsor = sponsors.find(s => s.id === id);
    if (sponsor && sponsor.hasOwnProperty(propName)) {
      sponsor[propName] = value;
    }
    if (propName !== 'website')
      this.setState({ sponsors }, () => this.onUpdate('sponsors'));
    else this.setState({ sponsors });
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
      ));
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
      ));
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
      ));
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
      ));
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
      ));
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
      ));
    }
    return null;
  }

  renderImg(totalRows, imgs, check) {
    let startIndex = -4;
    let endIndex = startIndex + 4;
    const temp = Array.from({ length: totalRows }, () =>
      Math.floor(Math.random())
    );

    return temp.map((_, i) => {
      startIndex += 4;
      endIndex += 4;
      return (
        <div className="row" key={i}>
          {this.renderRow(startIndex, endIndex, imgs, check)}
        </div>
      );
    });
  }

  renderFirstRow(totalRows, imgs, check) {
    let startIndex = -4;
    let endIndex = startIndex + 4;
    const temp = Array.from({ length: totalRows }, () =>
      Math.floor(Math.random())
    );

    return temp.map((_, i) => {
      startIndex += 4;
      endIndex += 4;
      return (
        <div className="row" key={i}>
          {/* {this.renderRow(startIndex, endIndex, imgs, check)} */}
          {imgs.slice(startIndex, endIndex).map(e => (
            <div className="col-3" key={e.id}>
              <div className="hotel-room text-center notransition">
                <div className="d-block mb-0 thumbnail notransition">
                  <img
                    src={e.picture}
                    className="img-fluid notransition"
                    alt=""
                  />
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
      );
    });
  }

  renderAllImg(imgs, check) {
    if (imgs.length > 0) {
      if (imgs.length % 4 === 0) {
        return this.renderImg(imgs.length / 4, imgs, check);
      }
      return this.renderImg(imgs.length / 4 + 1, imgs, check);
    }
    return <h2>No imgs available</h2>;
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
    );
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
    );
  }

  updateConferencePicture(url) {
    this.setState({ conferencePicture: url }, () =>
      this.onUpdate('conferencePicture')
    );
  }

  updateGapPic(url) {
    this.setState({ gapPic: url }, () => this.onUpdate('gapPicture'));
  }

  handleDateChange(date) {
    this.setState({ date });
  }

  removeAgenda(agendaID) {
    const ask = window.confirm(`Are you sure to remove this?`);
    if (ask) {
      const newAgenda = this.state.agenda.filter(a => {
        return a.id !== agendaID;
      });

      this.setState({ agenda: newAgenda }, () =>
        console.log(this.state.agenda)
      );
    }
  }

  renderShowOrEdit() {
    const {
      address,
      conferencePicture,
      date,
      description,
      title,
      agenda,
      highlight,
      lat,
      lng,
      speakers,
      gapPic,
      gapHeader,
      gapDetail,
      adventures,
      adventureHeader,
      adventureDescription,
      hosts,
      performers,
      sponsors,
      toggleEditTitle,
      toggleEditDate,
      toggleEditDescription,
      toggleEditAddress
    } = this.state;
    return (
      //  --------------------------------------------------------------------Main Picture
      <div>
        <div className="row style-section">
          <div className="col-12">
            <h3>Cover picture</h3>
          </div>
          <div className="col-12">
            <img src={conferencePicture} alt="" className="img-fluid" />
          </div>
          <div>
            <div className="col-12">
              <button type="button" onClick={this.openModalPicture}>
                Edit Picture
              </button>
            </div>
            <Modal
              open={this.state.modalPicture}
              onClose={this.closeModalPicture}
              center
            >
              <ImageManagement
                category="conferenceImages"
                closeModal={this.closeModalPicture}
                pick={this.updateConferencePicture.bind(this)}
              />
            </Modal>
          </div>
        </div>

        {/* --------------------------------------------------------------------Date */}
        {!toggleEditDate ? (
          <div className="row style-section">
            <div className="col-12">
              <h3>Event date</h3>
            </div>
            <div className="col-12">
              <p>{date}</p>
            </div>
            <div className="col-12">
              <button
                type="button"
                onClick={() => this.setState({ toggleEditDate: true })}
              >
                Edit date
              </button>
            </div>
          </div>
        ) : (
          <div className="row style-section">
            <div className="col-12">
              <DatePicker
                selected={moment(date).toDate()}
                onChange={this.handleDateChange.bind(this)}
              />
            </div>
            <div className="col-12">
              <button
                type="button"
                onClick={() => {
                  this.onUpdate('date');
                  this.setState({ toggleEditDate: false });
                }}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  this.fetchData();
                  this.setState({ toggleEditDate: false });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------------Title */}
        {!toggleEditTitle ? (
          <div className="row style-section">
            <div className="col-12">
              <h3>Event title</h3>
            </div>
            <div className="col-12">
              <p>{title}</p>
            </div>
            <div className="col-12">
              <button
                type="button"
                onClick={() => this.setState({ toggleEditTitle: true })}
              >
                Edit title
              </button>
            </div>
          </div>
        ) : (
          <div className="row style-section">
            <div className="col-12">
              <input
                type="text"
                value={title}
                onChange={e => this.onChangeTextInput(e, 'title')}
              />
            </div>
            <div className="col-12">
              <button
                type="button"
                onClick={() => {
                  this.onUpdate('title');
                  this.setState({ toggleEditTitle: false });
                }}
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => {
                  this.fetchData();
                  this.setState({ toggleEditTitle: false });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------------Description */}
        {!toggleEditDescription ? (
          <div className="row style-section">
            <div className="col-12">
              <h3>Event description</h3>
            </div>
            <div className="col-12">
              <p>{description}</p>
            </div>
            <div className="col-12">
              <button
                type="button"
                onClick={() => this.setState({ toggleEditDescription: true })}
              >
                Edit description
              </button>
            </div>
          </div>
        ) : (
          <div className="row style-section">
            <div className="col-12">
              <textarea
                type="text"
                value={description}
                onChange={e => this.onChangeTextInput(e, 'description')}
              />
            </div>
            <div className="col-12">
              <button
                type="button"
                onClick={() => {
                  this.onUpdate('description');
                  this.setState({ toggleEditDescription: false });
                }}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  this.fetchData();
                  this.setState({ toggleEditDescription: false });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {/* --------------------------------------------------------------------Speakers */}
        <div className="row style-section-pictures">
          <div className="col-12">
            <h3>Speakers</h3>
          </div>
          {this.renderImg(1, speakers, 'speakers')}
          <div className="row">
            <button onClick={this.openModalSpeakers}>Edit speakers ...</button>
          </div>
          <Modal
            open={this.state.modalSpeakers}
            onClose={this.closeModalSpeakers}
            center
          >
            <div style={{ width: '700px' }}>
              <EditSpeakers
                speakers={speakers}
                closeModal={this.closeModalSpeakers}
              />
            </div>
          </Modal>
        </div>
        {/* --------------------------------------------------------------------Hosts */}
        <div className="row style-section-pictures">
          <div className="col-12">
            <h3>Hosts</h3>
          </div>
          {this.renderImg(1, hosts, 'hosts')}
          <div className="row">
            <button onClick={this.openModalHosts}>Edit Hosts ...</button>
          </div>
          <Modal
            open={this.state.modalHosts}
            onClose={this.closeModalHosts}
            center
          >
            <div style={{ width: '700px' }}>
              <EditHosts hosts={hosts} closeModal={this.closeModalHosts} />
            </div>
          </Modal>
        </div>
        {/* --------------------------------------------------------------------Performers */}
        <div className="row style-section-pictures">
          <div className="col-12">
            <h3>Performers</h3>
          </div>
          {this.renderImg(1, performers, 'performers')}
          <div className="row">
            <button onClick={this.openModalPerformers}>
              Edit Performers ...
            </button>
          </div>
          <Modal
            open={this.state.modalPerformers}
            onClose={this.closeModalPerformers}
            center
          >
            <div style={{ width: '700px' }}>
              <EditPerformers
                performers={performers}
                closeModal={this.closeModalPerformers}
              />
            </div>
          </Modal>
        </div>
        {/* --------------------------------------------------------------------Adventures */}
        <div className="row style-section-pictures">
          <div className="col-12">
            <h3>Adventures</h3>
          </div>
          <div className="col-12">
            {!this.state.toggleEditAdventureHeader ? (
              <div className="row">
                <div className="col-2">
                  <p>{adventureHeader}</p>
                </div>
                <div className="col-10">
                  <button
                    onClick={() =>
                      this.setState({ toggleEditAdventureHeader: true })
                    }
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-2">
                  <input
                    type="text"
                    value={adventureHeader}
                    onChange={e => this.onChangeTextInput(e, 'adventureHeader')}
                  />
                </div>
                <div className="col-10">
                  <button
                    type="button"
                    onClick={() => {
                      this.onUpdate('adventureHeader');
                      this.setState({ toggleEditAdventureHeader: false });
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      this.fetchData();
                      this.setState({ toggleEditAdventureHeader: false });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="col-12">
            {!this.state.toggleEditAdventureDesc ? (
              <div className="row">
                <div className="col-2">
                  <p>{adventureDescription}</p>
                </div>
                <div className="col-10">
                  <button
                    onClick={() =>
                      this.setState({ toggleEditAdventureDesc: true })
                    }
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-2">
                  <textarea
                    value={adventureDescription}
                    onChange={e =>
                      this.onChangeTextInput(e, 'adventureDescription')
                    }
                  />
                </div>
                <div className="col-10">
                  <button
                    type="button"
                    onClick={() => {
                      this.onUpdate('adventureDescription');
                      this.setState({ toggleEditAdventureDesc: false });
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      this.fetchData();
                      this.setState({ toggleEditAdventureDesc: false });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          {this.renderImg(1, adventures, 'adventures')}
          <div className="row">
            <button onClick={this.openModalAdventures}>
              Edit Adventures ...
            </button>
          </div>
          <Modal
            open={this.state.modalAdventures}
            onClose={this.closeModalAdventures}
            center
          >
            <div style={{ width: '700px' }}>
              <EditAdventures
                adventures={adventures}
                closeModal={this.closeModalAdventures}
              />
            </div>
          </Modal>
        </div>

        {/* --------------------------------------------------------------------Agenda */}
        <div className="row style-section">
          <div className="col-12">
            <h2>Agenda</h2>
            <p>(Each agenda header is seperated by '//')</p>
          </div>
          {this.renderAgenda(agenda)}
          <div className="col-12">
            <button onClick={this.openModalAgenda}>Edit agenda</button>
          </div>
          <Modal
            open={this.state.modalAgenda}
            onClose={this.closeModalAgenda}
            center
          >
            <EditAgenda
              agenda={this.state.agenda}
              updateOneAgenda={this.updateOneAgenda.bind(this)}
              // removeAgenda={this.removeAgenda.bind(this)}
              closeModalAgenda={this.closeModalAgenda}
              // onUpdateAgenda={this.onUpdate.bind(this)}
              // refetchAfterClosed={this.fetchData.bind(this)}
            />
          </Modal>
        </div>
        {/* --------------------------------------------------------------------Gap */}
        <div className="row style-section">
          <div className="col-12">
            <h3>Gap</h3>
          </div>
          <div className="col-12">
            {!this.state.toggleEditGapHeader ? (
              <div className="row">
                <div className="col-2">
                  <p>{gapHeader}</p>
                </div>
                <div className="col-10">
                  <button
                    onClick={() => this.setState({ toggleEditGapHeader: true })}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-2">
                  <input
                    type="text"
                    value={gapHeader}
                    onChange={e => this.onChangeTextInput(e, 'gapHeader')}
                  />
                </div>
                <div className="col-10">
                  <button
                    type="button"
                    onClick={() => {
                      this.onUpdate('gapHeader');
                      this.setState({ toggleEditGapHeader: false });
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      this.fetchData();
                      this.setState({ toggleEditGapHeader: false });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="col-12">
            {!this.state.toggleEditGapDetail ? (
              <div className="row">
                <div className="col-2">
                  <p>{gapDetail}</p>
                </div>
                <div className="col-10">
                  <button
                    onClick={() => this.setState({ toggleEditGapDetail: true })}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-2">
                  <textarea
                    value={gapDetail}
                    onChange={e => this.onChangeTextInput(e, 'gapDetail')}
                  />
                </div>
                <div className="col-10">
                  <button
                    type="button"
                    onClick={() => {
                      this.onUpdate('gapDetail');
                      this.setState({ toggleEditGapDetail: false });
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      this.fetchData();
                      this.setState({ toggleEditGapDetail: false });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="col-12">
            <img src={gapPic} alt="" className="img-fluid" />
          </div>
          <div>
            <div className="col-12">
              <button type="button" onClick={this.openModalGapPic}>
                Edit Picture
              </button>
            </div>
            <Modal
              open={this.state.modalGapPic}
              onClose={this.closeModalGapPic}
              center
            >
              <ImageManagement
                category="stockImages"
                closeModal={this.closeModalGapPic}
                pick={this.updateGapPic.bind(this)}
              />
            </Modal>
          </div>
        </div>

        {/* --------------------------------------------------------------------Sponsors */}
        <div className="row style-section-pictures">
          <div className="col-12">
            <h3>Sponsors</h3>
          </div>
          {this.renderImg(1, sponsors, 'sponsors')}

          <button onClick={this.openModalSponsors}>Edit sponsors ...</button>
          <Modal
            open={this.state.modalSponsors}
            onClose={this.closeModalSponsors}
            center
          >
            <EditSponsors
              sponsors={this.state.sponsors}
              // updateSponsors={this.onUpdate.bind(this)}
              closeModal={this.closeModalSponsors}
            />
          </Modal>
        </div>
        {/* --------------------------------------------------------------------Location */}
        <div className="row style-section-pictures">
          <div className="col-12">
            <h2>Location</h2>
          </div>
          {!toggleEditAddress ? (
            <div className="row">
              <div className="col-12">
                <p>{address}</p>
              </div>
              <div className="col-12">
                <button
                  onClick={() => this.setState({ toggleEditAddress: true })}
                >
                  Edit address
                </button>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-12">
                <input
                  type="text"
                  value={address}
                  onChange={e => this.onChangeTextInput(e, 'address')}
                />
              </div>
              <div className="col-12">
                <button
                  type="button"
                  onClick={() => {
                    this.onUpdate('address');
                    this.setState({ toggleEditAddress: false });
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    this.fetchData();
                    this.setState({ toggleEditAddress: false });
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="col-12">{this.renderMap(lat, lng)}</div>
          <div className="col-12">
            <button onClick={this.openModalLocation}>Edit location</button>
            <Modal
              open={this.state.modalLocation}
              onClose={this.closeModalLocation}
              center
            >
              <div style={{ width: '700px' }}>
                <MapWithSearch
                  lat={lat}
                  lng={lng}
                  closeModal={this.closeModalLocation}
                  setNewLocation={this.setNewLocation.bind(this)}
                />
              </div>
            </Modal>
          </div>
        </div>
        {/* --------------------------------------------------------------------Highlight */}
        <div
          className="row style-section-pictures"
          style={{ marginBottom: '54px' }}
        >
          <div className="col-12">
            <h2>Location</h2>
          </div>
          {this.renderImg(1, this.state.highlight, 'highlight')}
          <button onClick={this.openModalHighLight}>Edit highlight</button>
          <Modal
            open={this.state.modalHighLight}
            onClose={this.closeModalHighLight}
            center
          >
            <EditHighlight
              highlight={this.state.highlight}
              closeModal={this.closeModalHighLight}
            />
          </Modal>
        </div>
      </div>
    );
  }

  setNewLocation(lat, lng, address) {
    this.setState({ lat, lng, address }, () => this.onUpdate('location'));
  }

  render() {
    return (
      <div
        className="page-wrapper"
        style={{ height: `${this.state.height - 64}px`, overflowY: 'scroll' }}
      >
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-12 d-flex no-block align-items-center">
              <h2 className="page-title">Conference Edit Section</h2>
            </div>
          </div>
          {this.renderShowOrEdit()}
        </div>
      </div>
    );
  }
}

export default ConferenceList;
