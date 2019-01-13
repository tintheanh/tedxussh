import React from 'react';
import firebase from 'firebase';
import Modal from 'react-responsive-modal';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import ImageManagement from '../ImageMangement/layout';
import EditSpeakers from './EditSpeakers/layout';
import MapView from '../../../../MapView/layout';
import MapWithSearch from '../../../../MapWithSearch/layout';
import EditAgenda from './EditAgenda/layout';
import EditSponsors from './EditSponsors/layout';

class ConferenceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      sponsors: [],

      speakerSelected: '',
      sponsorSelected: '',

      nameUpdated: '',
      occupationUpdated: '',
      introductionUpdated: '',

      tempSpeakerID: '',
      tempSponsorID: '',

      websiteUpdated: '',

      toggleEditTitle: false,
      toggleEditDate: false,
      toggleEditDescription: false,

      modalSpeakers: false,
      modalPicture: false,
      modalLocation: false,
      modalChangeImg: false,
      modalChangeSponsorImg: false,
      modalAgenda: false,
      modalSponsors: false
    };
    this.openModalLocation = this.openModalLocation.bind(this);
    this.closeModalLocation = this.closeModalLocation.bind(this);

    this.openModalPicture = this.openModalPicture.bind(this);
    this.closeModalPicture = this.closeModalPicture.bind(this);

    this.openModalSpeakers = this.openModalSpeakers.bind(this);
    this.closeModalSpeakers = this.closeModalSpeakers.bind(this);

    this.openModalChangeImg = this.openModalChangeImg.bind(this);
    this.closeModalChangeImg = this.closeModalChangeImg.bind(this);

    this.openModalChangeSponsorImg = this.openModalChangeSponsorImg.bind(this);
    this.closeModalChangeSponsorImg = this.closeModalChangeSponsorImg.bind(
      this
    );

    this.openModalAgenda = this.openModalAgenda.bind(this);
    this.closeModalAgenda = this.closeModalAgenda.bind(this);

    this.openModalSponsors = this.openModalSponsors.bind(this);
    this.closeModalSponsors = this.closeModalSponsors.bind(this);
  }

  componentDidMount() {
    this.fetchData();
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

  openModalChangeImg(speakerID) {
    this.setState({ modalChangeImg: true, tempSpeakerID: speakerID });
  }

  closeModalChangeImg() {
    this.setState({ modalChangeImg: false });
  }

  openModalChangeSponsorImg(speakerID) {
    this.setState({ modalChangeSponsorImg: true, tempSponsorID: speakerID });
  }

  closeModalChangeSponsorImg() {
    this.setState({ modalChangeSponsorImg: false });
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
      case 'linkedin':
        this.setState({ linkedin: e.target.value });
        break;
      case 'playlist':
        this.setState({ playlist: e.target.value });
        break;
      case 'lat':
        this.setState({ lat: e.target.value });
        break;
      case 'lng':
        this.setState({ lng: e.target.value });
        break;
      case 'sourceQuote':
        this.setState({ sourceQuote: e.target.value });
        break;
      case 'address':
        this.setState({ address: e.target.value });
        break;
      default:
        break;
    }
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

    if (type === 'speakers') {
      update = {
        speakers: this.state.speakers.map(e => ({
          name: e.name,
          occupation: e.occupation,
          introduction: e.introduction,
          picture: e.picture
        }))
      };
    }

    if (type === 'agenda') {
      update = {
        agenda: this.state.agenda.map(e => ({
          header: e.header,
          detail: e.detail,
          participants: e.participants,
          time: e.time
        }))
      };
    }

    if (type === 'sponsors') {
      update = {
        sponsors: this.state.sponsors.map(e => ({
          logo: e.logo,
          website: e.website
        }))
      };
    }

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
          const highlight = [...conferenceObj.highlight];
          const speakers = [];
          const sponsors = [];

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

          Object.keys(conferenceObj.sponsors).forEach(e => {
            const sponsor = {
              id: e,
              logo: conferenceObj.sponsors[e].logo,
              website: conferenceObj.sponsors[e].website
            };
            sponsors.push(sponsor);
          });
          console.log(sponsors);

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

  updateOneSpeaker(id, propName, value) {
    const speakers = [...this.state.speakers];
    const speaker = speakers.find(s => s.id === id);
    if (speaker && speaker.hasOwnProperty(propName)) {
      speaker[propName] = value;
    }
    if (propName !== 'picture')
      this.setState({ speakers }, () => this.onUpdate('speakers'));
    else this.setState({ speakers });
  }

  updateOneAgenda(updated) {
    const agenda = [...this.state.agenda];
    agenda[updated.id] = updated;
    this.setState({ agenda }, () => this.onUpdate('agenda'));
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

  renderRow(startIndex, endIndex, imgs, check, renderBtn) {
    if (check === 'speakers') {
      return imgs.slice(startIndex, endIndex).map(e => (
        <div className="col-3" key={e.id}>
          <div className="hotel-room text-center notransition">
            <div className="d-block mb-0 thumbnail notransition">
              {!renderBtn ? (
                <img
                  src={e.picture}
                  className="img-fluid notransition"
                  alt=""
                />
              ) : (
                <div>
                  <img
                    src={e.picture}
                    className="img-fluid notransition"
                    alt=""
                    onClick={() => this.openModalChangeImg(e.id)}
                  />
                  <Modal
                    open={this.state.modalChangeImg}
                    onClose={this.closeModalChangeImg}
                    center
                  >
                    <ImageManagement
                      category="speakers"
                      speakerID={this.state.tempSpeakerID}
                      closeModal={this.closeModalChangeImg}
                      pick={this.updateOneSpeaker.bind(this)}
                    />
                  </Modal>
                </div>
              )}
            </div>
            <div className="hotel-room-body">
              {this.state.speakerSelected === e.id && renderBtn ? (
                <div>
                  <input
                    type="text"
                    defaultValue={e.name}
                    onChange={event =>
                      this.setState({ nameUpdated: event.target.value })
                    }
                  />
                  <input
                    type="text"
                    defaultValue={e.occupation}
                    onChange={event =>
                      this.setState({ occupationUpdated: event.target.value })
                    }
                  />
                  <textarea
                    defaultValue={e.introduction}
                    onChange={event =>
                      this.setState({ introductionUpdated: event.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (this.state.nameUpdated === '') {
                        this.setState(
                          { nameUpdated: e.name, speakerSelected: '' },
                          () => {
                            this.updateOneSpeaker(
                              e.id,
                              'name',
                              this.state.nameUpdated
                            );
                            this.updateOneSpeaker(
                              e.id,
                              'occupation',
                              this.state.occupationUpdated
                            );
                            this.updateOneSpeaker(
                              e.id,
                              'introduction',
                              this.state.introductionUpdated
                            );
                          }
                        );
                      }
                      if (this.state.occupationUpdated === '') {
                        this.setState(
                          {
                            occupationUpdated: e.occupation,
                            speakerSelected: ''
                          },
                          () => {
                            this.updateOneSpeaker(
                              e.id,
                              'name',
                              this.state.nameUpdated
                            );
                            this.updateOneSpeaker(
                              e.id,
                              'occupation',
                              this.state.occupationUpdated
                            );
                            this.updateOneSpeaker(
                              e.id,
                              'introduction',
                              this.state.introductionUpdated
                            );
                          }
                        );
                      }
                      if (this.state.introductionUpdated === '') {
                        this.setState(
                          {
                            introductionUpdated: e.introduction,
                            speakerSelected: ''
                          },
                          () => {
                            this.updateOneSpeaker(
                              e.id,
                              'name',
                              this.state.nameUpdated
                            );
                            this.updateOneSpeaker(
                              e.id,
                              'occupation',
                              this.state.occupationUpdated
                            );
                            this.updateOneSpeaker(
                              e.id,
                              'introduction',
                              this.state.introductionUpdated
                            );
                          }
                        );
                      }
                      if (
                        this.state.nameUpdated !== '' &&
                        this.state.occupationUpdated !== '' &&
                        this.state.introductionUpdated !== ''
                      ) {
                        this.setState({ speakerSelected: '' }, () => {
                          this.updateOneSpeaker(
                            e.id,
                            'name',
                            this.state.nameUpdated
                          );
                          this.updateOneSpeaker(
                            e.id,
                            'occupation',
                            this.state.occupationUpdated
                          );
                          this.updateOneSpeaker(
                            e.id,
                            'introduction',
                            this.state.introductionUpdated
                          );
                        });
                      }
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="heading mb-0">{e.name}</h3>
                  <strong className="price">{e.occupation}</strong>
                  <p>{e.introduction}</p>
                </div>
              )}
            </div>
          </div>
          {renderBtn ? (
            <div>
              <button
                onClick={() =>
                  this.setState({
                    speakerSelected: e.id,
                    nameUpdated: '',
                    occupationUpdated: ''
                  })
                }
              >
                Edit
              </button>
              <button onClick={this.removeSpeaker.bind(this, e)}>Delete</button>
            </div>
          ) : null}
        </div>
      ));
    }

    if (check === 'sponsors') {
      return imgs.slice(startIndex, endIndex).map(e => {
        if (!renderBtn) {
          return (
            <div className="col-3" key={e.id}>
              <div className="hotel-room text-center notransition">
                <div className="d-block mb-0 thumbnail notransition">
                  <a href={e.website} target="_blank">
                    <img
                      src={e.logo}
                      className="img-fluid notransition"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          );
        }
        return this.state.sponsorSelected === e.id ? (
          <div className="col-3" key={e.id}>
            <div className="hotel-room text-center notransition">
              <div className="d-block mb-0 thumbnail notransition">
                <img src={e.logo} className="img-fluid notransition" alt="" onClick={this.openModalChangeSponsorImg} />
                <Modal
                  open={this.state.modalChangeSponsorImg}
                  onClose={this.closeModalChangeSponsorImg}
                  center
                >
                  <ImageManagement
                    category="sponsors"
                    speakerID={this.state.tempSponsorID} // fix later
                    closeModal={this.closeModalChangeSponsorImg}
                    pick={this.updateOneSponsor2.bind(this)}
                  />
                </Modal>
                <input
                  type="text"
                  defaultValue={e.website}
                  onChange={e =>
                    this.setState({ websiteUpdated: e.target.value }, () =>
                      console.log(this.state.websiteUpdated)
                    )
                  }
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const updated = {
                  id: e.id,
                  logo: e.logo,
                  website:
                    this.state.websiteUpdated === ''
                      ? e.website
                      : this.state.websiteUpdated
                };
                this.updateOneSponsor(updated);
                this.setState({ sponsorSelected: '' });
              }}
            >
              Save
            </button>
            <button
              onClick={() =>
                this.setState({ sponsorSelected: '', websiteUpdated: '' })
              }
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="col-3" key={e.id}>
            <div className="hotel-room text-center notransition">
              <div className="d-block mb-0 thumbnail notransition">
                <img src={e.logo} className="img-fluid notransition" alt="" />
                <p>{e.website}</p>
              </div>
            </div>
            <button
              onClick={() =>
                this.setState({ sponsorSelected: e.id, websiteUpdated: '' })
              }
            >
              Edit
            </button>
            <button onClick={() => this.removeOneSponsor(e)}>Delete</button>
          </div>
        );
      });
    }
    return null;
  }

  renderImg(totalRows, imgs, check, renderBtn) {
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
          {this.renderRow(startIndex, endIndex, imgs, check, renderBtn)}
        </div>
      );
    });
  }

  renderAllImg(imgs, check, renderBtn) {
    if (imgs.length > 0) {
      if (imgs.length % 4 === 0) {
        return this.renderImg(imgs.length / 4, imgs, check, renderBtn);
      }
      return this.renderImg(imgs.length / 4 + 1, imgs, check, renderBtn);
    }
    return <h2>No imgs available</h2>;
  }

  renderAgenda(agenda) {
    return (
      <div>
        {agenda.map(e => (
          <div className="col-12" key={e.id}>
            <p>
              {e.time} - {e.header}
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
      sponsors,
      toggleEditTitle,
      toggleEditDate,
      toggleEditDescription
    } = this.state;
    return (
      // --------------------------------------------------------------------Main Picture
      <div>
        <div className="row">
          <div style={{ height: '50%', width: '50%' }}>
            <img src={conferencePicture} alt="" className="img-fluid" />
          </div>
          <div>
            <button type="button" onClick={this.openModalPicture}>
              Edit Picture
            </button>
            <Modal
              open={this.state.modalPicture}
              onClose={this.closeModalPicture}
              center
            >
              <ImageManagement
                category="conferenceImages"
                speakerID={null}
                closeModal={this.closeModalPicture}
                pick={this.updateConferencePicture.bind(this)}
              />
            </Modal>
          </div>
        </div>

        {/* --------------------------------------------------------------------Date */}
        {!toggleEditDate ? (
          <div className="row">
            <p>{date}</p>
            <button
              type="button"
              onClick={() => this.setState({ toggleEditDate: true })}
            >
              Edit date
            </button>
          </div>
        ) : (
          <div className="row">
            <DatePicker
              selected={moment(date).toDate()}
              onChange={this.handleDateChange.bind(this)}
            />
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
        )}

        {/* --------------------------------------------------------------------Title */}
        {!toggleEditTitle ? (
          <div className="row">
            <p>{title}</p>
            <button
              type="button"
              onClick={() => this.setState({ toggleEditTitle: true })}
            >
              Edit title
            </button>
          </div>
        ) : (
          <div className="row">
            <input
              type="text"
              value={title}
              onChange={e => this.onChangeTextInput(e, 'title')}
            />
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
        )}

        {/* --------------------------------------------------------------------Description */}
        {!toggleEditDescription ? (
          <div className="row">
            <p>{description}</p>
            <button
              type="button"
              onClick={() => this.setState({ toggleEditDescription: true })}
            >
              Edit description
            </button>
          </div>
        ) : (
          <div className="row">
            <textarea
              type="text"
              value={description}
              onChange={e => this.onChangeTextInput(e, 'description')}
            />
            <div>
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
        <div className="row">
          {this.renderAllImg(speakers, 'speakers', false)}
          <div className="row">
            <button onClick={this.openModalSpeakers}>Edit speakers</button>
          </div>
          <Modal
            open={this.state.modalSpeakers}
            onClose={this.closeModalSpeakers}
            center
          >
            <div style={{ width: '700px' }}>
              <EditSpeakers
                speakers={speakers}
                renderAllImg={this.renderAllImg.bind(this)}
                updateSpeakers={this.onUpdate.bind(this)}
                closeModalSpeakers={this.closeModalSpeakers}
                refetchAfterClosed={this.fetchData.bind(this)}
              />
            </div>
          </Modal>
        </div>
        {/* --------------------------------------------------------------------Agenda */}
        <div className="row">{this.renderAgenda(agenda)}</div>
        <button onClick={this.openModalAgenda}>Edit agenda</button>
        <Modal
          open={this.state.modalAgenda}
          onClose={this.closeModalAgenda}
          center
        >
          <EditAgenda
            agenda={this.state.agenda}
            updateOneAgenda={this.updateOneAgenda.bind(this)}
            removeAgenda={this.removeAgenda.bind(this)}
            closeModalAgenda={this.closeModalAgenda}
            onUpdateAgenda={this.onUpdate.bind(this)}
            refetchAfterClosed={this.fetchData.bind(this)}
          />
        </Modal>

        {/* --------------------------------------------------------------------Sponsors */}
        <div className="row">
          {this.renderAllImg(sponsors, 'sponsors', false)}
        </div>
        <button onClick={this.openModalSponsors}>Edit sponsors</button>
        <Modal
          open={this.state.modalSponsors}
          onClose={this.closeModalSponsors}
          center
        >
          <EditSponsors
            sponsors={this.state.sponsors}
            renderSponsors={this.renderAllImg.bind(this)}
            updateSponsors={this.onUpdate.bind(this)}
            closeModalSponsors={this.closeModalSponsors}
          />
        </Modal>

        {/* --------------------------------------------------------------------Location */}
        <div className="row">
          <p>{address}</p>
        </div>
        <div className="row">{this.renderMap(lat, lng)}</div>

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
    );
  }

  setNewLocation(lat, lng, address) {
    this.setState({ lat, lng, address }, () => this.onUpdate('location'));
  }

  render() {
    return (
      <div className="page-wrapper">
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-12 d-flex no-block align-items-center">
              <h4 className="page-title">Dashboard</h4>
            </div>
          </div>
          {this.renderShowOrEdit()}
        </div>
      </div>
    );
  }
}

export default ConferenceList;
