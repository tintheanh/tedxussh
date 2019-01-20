import React from 'react';
import firebase from 'firebase';
import moment from 'moment';
import DatePicker from 'react-datepicker';

class GetEventUpdateSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,

      description: '',
      link: '',
      startDate: '',
      endDate: '',
      twitter: '',
      linkedin: '',
      playlist: '',
      sentence: '',
      quote: '',
      sourceQuote: '',

      toggleEdit: false,

      toggleEditDesc: false,
      toggleEditLink: false,
      toggleEditStartDate: false,
      toggleEditEndDate: false
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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

  toVNDate(inputDate) {
    if (inputDate) {
      const date = inputDate.split('-');
      const year = date[0];
      let month = date[1];
      let day = date[2];
      if (parseInt(month) < 10) {
        month = month.substring(1, 2);
      }
      if (parseInt(day) < 10) {
        day = day.substring(1, 2);
      }
      return `${day}/${month}/${year}`;
    }
    return '';
  }

  onChangeTextInput(e, arg) {
    switch (arg) {
      case 'link':
        this.setState({ link: e.target.value });
        break;
      case 'startDate':
        this.setState({ startDate: e.target.value });
        break;
      case 'twitter':
        this.setState({ twitter: e.target.value });
        break;
      case 'endDate':
        this.setState({ endDate: e.target.value });
        break;
      case 'linkedin':
        this.setState({ linkedin: e.target.value });
        break;
      case 'playlist':
        this.setState({ playlist: e.target.value });
        break;
      case 'sentence':
        this.setState({ sentence: e.target.value });
        break;
      case 'quote':
        this.setState({ quote: e.target.value });
        break;
      case 'sourceQuote':
        this.setState({ sourceQuote: e.target.value });
        break;
      case 'description':
        this.setState({ description: e.target.value });
        break;
      default:
        break;
    }
  }

  fetchData() {
    firebase
      .database()
      .ref('getEventUpdate')
      .on('value', snapshot => {
        const footerObj = snapshot.val();
        if (footerObj) {
          this.setState({
            description: footerObj.description,
            link: footerObj.link,
            startDate: footerObj.startDate,
            endDate: footerObj.endDate
          });
        }
      });
  }

  onUpdateText(type) {
    let update = {};
    if (type === 'description') {
      update = {
        description: this.state.description
      };
    }

    if (type === 'link') {
      update = {
        link: this.state.link
      };
    }

    if (type === 'startDate') {
      update = {
        startDate: this.state.startDate
      };
    }

    if (type === 'endDate') {
      update = {
        endDate: this.state.endDate
      };
    }

    firebase
      .database()
      .ref('getEventUpdate')
      .update(update)
      .then(() => alert('Saved!'))
      .catch(err => alert(err.message));
  }

  onStartDateChange(date) {
    this.setState({ startDate: moment(date).format('YYYY-MM-DD') });
  }

  onEndDateChange(date) {
    this.setState({ endDate: moment(date).format('YYYY-MM-DD') });
  }

  renderShowOrEdit() {
    const { description, link, startDate, endDate, sourceQuote } = this.state;
    if (this.state.toggleEdit) {
      return (
        <div className="row style-section">
          <div className="col-12">
            <textarea
              value={description}
              onChange={e => this.onChangeTextInput(e, 'description')}
            />
          </div>
          <div className="col-12">
            <input
              type="text"
              value={link}
              onChange={e => this.onChangeTextInput(e, 'link')}
            />
          </div>
          <button
            type="button"
            onClick={() =>
              this.setState({ toggleEdit: false }, () => this.fetchData())
            }
          >
            Cancel
          </button>
          <button type="button" onClick={() => this.onUpdate()}>
            Save
          </button>
        </div>
      );
    }
    return (
      <div>
        <div className="row style-section">
          <div className="col-12">
            <h3>Description</h3>
            <p>{description}</p>
          </div>
        </div>
        <div className="row style-section">
          <div className="col-12">
            <p>{link}</p>
          </div>
        </div>
        <div className="row style-section">
          <div className="col-12">
            <p>{this.toVNDate(this.state.startDate)}</p>
          </div>
        </div>
        <div className="row style-section">
          <div className="col-12">
            <p>{this.toVNDate(this.state.endDate)}</p>
          </div>
        </div>
        <div className="row style-section">
          <button
            type="button"
            onClick={() =>
              this.setState({
                toggleEdit: true
              })
            }
          >
            Edit
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div
        className="page-wrapper"
        style={{
          height: `${this.state.height - 64}px`,
          overflowY: 'scroll'
        }}
      >
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-12 d-flex no-block align-items-center">
              <h2 className="page-title">Get Event Update Edit Section</h2>
            </div>
          </div>
          <div>
            <div className="row style-section">
              {!this.state.toggleEditDesc ? (
                <div className="col-12">
                  <h3>Description</h3>
                  <p>{this.state.description}</p>
                  <button
                    onClick={() => this.setState({ toggleEditDesc: true })}
                  >
                    Edit description
                  </button>
                </div>
              ) : (
                <div className="col-12">
                  <h3>Description</h3>
                  <textarea
                    value={this.state.description}
                    onChange={e => this.onChangeTextInput(e, 'description')}
                  />
                  <button
                    onClick={() => {
                      this.onUpdateText('description');
                      this.setState({ toggleEditDesc: false });
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() =>
                      this.setState({ toggleEditDesc: false }, () =>
                        this.fetchData()
                      )
                    }
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <div className="row style-section">
              <div className="col-12">
                {!this.state.toggleEditLink ? (
                  <div className="col-12">
                    <h3>Link</h3>
                    <p>{this.state.link}</p>
                    <button
                      onClick={() => this.setState({ toggleEditLink: true })}
                    >
                      Edit link
                    </button>
                  </div>
                ) : (
                  <div className="col-12">
                    <h3>Link</h3>
                    <input
                      type="text"
                      value={this.state.link}
                      onChange={e => this.onChangeTextInput(e, 'link')}
                    />
                    <button
                      onClick={() => {
                        this.onUpdateText('link');
                        this.setState({ toggleEditLink: false });
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() =>
                        this.setState({ toggleEditLink: false }, () =>
                          this.fetchData()
                        )
                      }
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="row style-section">
              <div className="col-12">
                {!this.state.toggleEditStartDate ? (
                  <div className="col-12">
                    <h3>Start Date</h3>
                    <p>{this.toVNDate(this.state.startDate)}</p>
                    <button
                      onClick={() =>
                        this.setState({ toggleEditStartDate: true })
                      }
                    >
                      Edit start date
                    </button>
                  </div>
                ) : (
                  <div className="col-12">
                    <h3>Start Date</h3>
                    <DatePicker
                      dateFormat="d/M/YYYY"
                      selected={moment(this.state.startDate).toDate()}
                      onChange={this.onStartDateChange.bind(this)}
                    />
                    <button
                      onClick={() => {
                        this.onUpdateText('startDate');
                        this.setState({ toggleEditStartDate: false });
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() =>
                        this.setState({ toggleEditStartDate: false }, () =>
                          this.fetchData()
                        )
                      }
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="row style-section">
              <div className="col-12">
                {!this.state.toggleEditEndDate ? (
                  <div className="col-12">
                    <h3>End Date</h3>
                    <p>{this.toVNDate(this.state.endDate)}</p>
                    <button
                      onClick={() => this.setState({ toggleEditEndDate: true })}
                    >
                      Edit end date
                    </button>
                  </div>
                ) : (
                  <div className="col-12">
                    <h3>End Date</h3>
                    <DatePicker
                      dateFormat="d/M/YYYY"
                      selected={moment(this.state.endDate).toDate()}
                      onChange={this.onEndDateChange.bind(this)}
                    />
                    <button
                      onClick={() => {
                        this.onUpdateText('endDate');
                        this.setState({ toggleEditEndDate: false });
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() =>
                        this.setState({ toggleEditEndDate: false }, () =>
                          this.fetchData()
                        )
                      }
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GetEventUpdateSection;
