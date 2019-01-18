import React from 'react';
import firebase from 'firebase';
import YouTube from 'react-youtube';
import Modal from 'react-responsive-modal';
import ImageManagement from '../ImageMangement/imageManagement';

class AboutSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      background: '',
      header: '',
      leftDescription: '',
      middleDescription: '',
      rightDescription: '',
      leftTitle: '',
      middleTitle: '',
      rightTitle: '',
      video: '',
      leftPicture: '',
      rightPicture: '',
      vision_1_title: '',
      vision_1_description: '',
      vision_2_title: '',
      vision_2_description: '',
      vision_3_title: '',
      vision_3_description: '',

      modalEditBackground: false,
      modalEditLeftPic: false,
      modalEditRightPic: false,

      toggleEditHeader: false,
      toggleEditLeftTitle: false,
      toggleEditLeftDesc: false,
      toggleEditVideo: false,
      toggleEditMidTitle: false,
      toggleEditMidDesc: false,
      toggleEditRightTitle: false,
      toggleEditRightDesc: false,
      toggleEditVision: false
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.openModalEditBackground = this.openModalEditBackground.bind(this);
    this.closeModalEditBackground = this.closeModalEditBackground.bind(this);

    this.openModalEditLeftPic = this.openModalEditLeftPic.bind(this);
    this.closeModalEditLeftPic = this.closeModalEditLeftPic.bind(this);

    this.openModalEditRightPic = this.openModalEditRightPic.bind(this);
    this.closeModalEditRightPic = this.closeModalEditRightPic.bind(this);
  }

  openModalEditBackground() {
    this.setState({ modalEditBackground: true });
  }

  closeModalEditBackground() {
    this.setState({ modalEditBackground: false });
  }

  openModalEditLeftPic() {
    this.setState({ modalEditLeftPic: true });
  }

  closeModalEditLeftPic() {
    this.setState({ modalEditLeftPic: false });
  }

  openModalEditRightPic() {
    this.setState({ modalEditRightPic: true });
  }

  closeModalEditRightPic() {
    this.setState({ modalEditRightPic: false });
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

  fetchData() {
    firebase
      .database()
      .ref('about')
      .on('value', snapshot => {
        const aboutObj = snapshot.val();
        if (aboutObj) {
          this.setState(
            {
              background: aboutObj.background,
              header: aboutObj.header,
              leftDescription: aboutObj.left.description,
              middleDescription: aboutObj.middle.description,
              rightDescription: aboutObj.right.description,
              leftTitle: aboutObj.left.title,
              middleTitle: aboutObj.middle.title,
              rightTitle: aboutObj.right.title,
              video: aboutObj.middle.video,
              leftPicture: aboutObj.left.picture,
              rightPicture: aboutObj.right.picture,
              vision_1_title: aboutObj.visions[0].title,
              vision_1_description: aboutObj.visions[0].description,
              vision_2_title: aboutObj.visions[1].title,
              vision_2_description: aboutObj.visions[1].description,
              vision_3_title: aboutObj.visions[2].title,
              vision_3_description: aboutObj.visions[2].description
            },
            () => console.log(this.state)
          );
        }
      });
  }

  onReady(event) {
    event.target.pauseVideo();
  }

  youtube_parser(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : '';
  }

  onSaveBackground(newBackground) {
    const update = {
      background: newBackground
    };
    firebase
      .database()
      .ref('about')
      .update(update)
      .catch(err => alert(err.message));
  }

  onSaveLeftPic(newLeftPic) {
    const update = {
      left: {
        picture: newLeftPic,
        title: this.state.leftTitle,
        description: this.state.leftDescription
      }
    };
    firebase
      .database()
      .ref('about')
      .update(update)
      .catch(err => alert(err.message));
  }

  onSaveRightPic(newRightPic) {
    const update = {
      right: {
        picture: newRightPic,
        title: this.state.rightTitle,
        description: this.state.rightDescription
      }
    };
    firebase
      .database()
      .ref('about')
      .update(update)
      .catch(err => alert(err.message));
  }

  onUpdateText(type) {
    let update = {};
    if (type === 'header') {
      update = {
        header: this.state.header
      };
    }

    if (type === 'left-title' || type === 'left-description') {
      update = {
        left: {
          picture: this.state.leftPicture,
          title: this.state.leftTitle,
          description: this.state.leftDescription
        }
      };
    }

    if (
      type === 'video' ||
      type === 'middle-title' ||
      type === 'middle-description'
    ) {
      update = {
        middle: {
          video: this.state.video,
          title: this.state.middleTitle,
          description: this.state.middleDescription
        }
      };
    }

    if (type === 'right-title' || type === 'right-description') {
      update = {
        right: {
          picture: this.state.rightPicture,
          title: this.state.rightTitle,
          description: this.state.rightDescription
        }
      };
    }

    if (type === 'vision') {
      update = {
        visions: [
          {
            title: this.state.vision_1_title,
            description: this.state.vision_1_description
          },
          {
            title: this.state.vision_2_title,
            description: this.state.vision_2_description
          },
          {
            title: this.state.vision_3_title,
            description: this.state.vision_3_description
          }
        ]
      };
    }

    firebase
      .database()
      .ref('about')
      .update(update)
      .catch(err => alert(err.message));
  }

  render() {
    const {
      background,
      header,
      leftDescription,
      middleDescription,
      rightDescription,
      leftTitle,
      middleTitle,
      rightTitle,
      video,
      leftPicture,
      rightPicture,
      vision_1_title,
      vision_1_description,
      vision_2_title,
      vision_2_description,
      vision_3_title,
      vision_3_description
    } = this.state;
    return (
      <div
        className="page-wrapper"
        style={{ height: `${this.state.height - 64}px`, overflowY: 'scroll' }}
      >
        <div className="page-breadcrumb" style={{ paddingBottom: '54px' }}>
          <div className="row">
            <div className="col-12 d-flex no-block align-items-center">
              <h2 className="page-title">About edit section</h2>
            </div>
          </div>
          {/* ----------------------------------------------------------------------BACKGROUND */}
          <div className="row style-section">
            <div className="col-12">
              <h3>Background picture</h3>
            </div>
            <div className="col-12">
              <img className="img-fluid" src={background} alt="" />
            </div>
            <button onClick={this.openModalEditBackground}>Edit</button>
            <Modal
              open={this.state.modalEditBackground}
              onClose={this.closeModalEditBackground}
              center
            >
              <ImageManagement
                category="stockImages"
                pick={this.onSaveBackground.bind(this)}
                closeModal={this.closeModalEditBackground}
              />
            </Modal>
          </div>
          {/* ----------------------------------------------------------------------HEADER */}
          {!this.state.toggleEditHeader ? (
            <div className="row style-section">
              <div className="col-12">
                <h3>Title</h3>
              </div>
              <div className="col-12">
                <p>{header}</p>
              </div>
              <button onClick={() => this.setState({ toggleEditHeader: true })}>
                Edit
              </button>
            </div>
          ) : (
            <div className="row style-section">
              <div className="col-12">
                <h3>Title</h3>
              </div>
              <div className="col-12">
                <input
                  type="text"
                  value={header}
                  onChange={e => this.setState({ header: e.target.value })}
                />
              </div>
              <button
                onClick={() => {
                  this.onUpdateText('header');
                  this.setState({ toggleEditHeader: false });
                }}
              >
                Save
              </button>
              <button
                onClick={() =>
                  this.setState({ toggleEditHeader: false }, () =>
                    this.fetchData()
                  )
                }
              >
                Cancel
              </button>
            </div>
          )}

          {/* ----------------------------------------------------------------------LEFTPIC */}
          <div className="row style-section">
            <div className="col-12">
              <div>
                <h3>Left</h3>
              </div>
              <div>
                <h5>Left pic</h5>
              </div>
              <div>
                <img className="img-fluid" src={leftPicture} alt="" />
              </div>
              <button onClick={this.openModalEditLeftPic}>Edit</button>
              <Modal
                open={this.state.modalEditLeftPic}
                onClose={this.closeModalEditLeftPic}
                center
              >
                <ImageManagement
                  category="stockImages"
                  pick={this.onSaveLeftPic.bind(this)}
                  closeModal={this.closeModalEditLeftPic}
                />
              </Modal>
            </div>
            {/* ----------------------------------------------------------------------LEFTTITLE */}
            {!this.state.toggleEditLeftTitle ? (
              <div className="col-12">
                <div>
                  <h5>Left title</h5>
                </div>
                <div>
                  <p>{leftTitle}</p>
                </div>
                <div>
                  <button
                    onClick={() => this.setState({ toggleEditLeftTitle: true })}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <div className="col-12">
                <div>
                  <input
                    type="text"
                    value={leftTitle}
                    onChange={e => this.setState({ leftTitle: e.target.value })}
                  />
                </div>
                <div>
                  <button
                    onClick={() =>
                      this.setState({ toggleEditLeftTitle: false }, () =>
                        this.fetchData()
                      )
                    }
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      this.onUpdateText('left-title');
                      this.setState({ toggleEditLeftTitle: false });
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
            {/* ----------------------------------------------------------------------LEFTDESCRIPTION */}
            {!this.state.toggleEditLeftDesc ? (
              <div className="col-12">
                <div>
                  <h5>Left description</h5>
                </div>
                <div>
                  <p>{leftDescription}</p>
                </div>
                <div>
                  <button
                    onClick={() => this.setState({ toggleEditLeftDesc: true })}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <div className="col-12">
                <div>
                  <textarea
                    value={leftDescription}
                    onChange={e =>
                      this.setState({ leftDescription: e.target.value })
                    }
                  />
                </div>
                <div>
                  <button
                    onClick={() =>
                      this.setState({ toggleEditLeftDesc: false }, () =>
                        this.fetchData()
                      )
                    }
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      this.onUpdateText('left-description');
                      this.setState({ toggleEditLeftDesc: false });
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* ----------------------------------------------------------------------VIDEO */}
          <div className="row style-section">
            {!this.state.toggleEditVideo ? (
              <div className="col-12">
                <div>
                  <h3>Middle</h3>
                </div>
                <div>
                  <h5>Youtube video</h5>
                </div>
                <div>
                  <YouTube
                    videoId={this.youtube_parser(video)}
                    onReady={this.onReady}
                  />
                </div>
                <div>
                  <button
                    onClick={() => this.setState({ toggleEditVideo: true })}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <div className="col-12">
                <div>
                  <input
                    value={video}
                    onChange={e => this.setState({ video: e.target.value })}
                  />
                </div>
                <div>
                  <button
                    onClick={() => {
                      this.onUpdateText('video');
                      this.setState({ toggleEditVideo: false });
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() =>
                      this.setState({ toggleEditVideo: false }, () =>
                        this.fetchData()
                      )
                    }
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {/* ----------------------------------------------------------------------MIDDLETITLE */}
            {!this.state.toggleEditMidTitle ? (
              <div className="col-12">
                <div>
                  <h5>Title</h5>
                </div>
                <div>
                  <p>{middleTitle}</p>
                </div>
                <div>
                  <button
                    onClick={() => this.setState({ toggleEditMidTitle: true })}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <div className="col-12">
                <div>
                  <input
                    type="text"
                    value={middleTitle}
                    onChange={e =>
                      this.setState({ middleTitle: e.target.value })
                    }
                  />
                </div>
                <div>
                  <button
                    onClick={() => {
                      this.onUpdateText('middle-title');
                      this.setState({ toggleEditMidTitle: false });
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() =>
                      this.setState({ toggleEditMidTitle: false }, () =>
                        this.fetchData()
                      )
                    }
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------------MIDDLEDESCRIPTION */}
            {!this.state.toggleEditMidDesc ? (
              <div className="col-12">
                <div>
                  <h5>Description</h5>
                </div>
                <div>
                  <p>{middleDescription}</p>
                </div>
                <div>
                  <button
                    onClick={() => this.setState({ toggleEditMidDesc: true })}
                  >
                    Edit middle description
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <textarea
                  value={middleDescription}
                  onChange={e =>
                    this.setState({ middleDescription: e.target.value })
                  }
                />
                <button
                  onClick={() =>
                    this.setState({ toggleEditMidDesc: false }, () =>
                      this.fetchData()
                    )
                  }
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    this.onUpdateText('middle-description');
                    this.setState({ toggleEditMidDesc: false });
                  }}
                >
                  Save
                </button>
              </div>
            )}
          </div>
          {/* ----------------------------------------------------------------------RIGHTPIC */}
          <div className="row style-section">
            <div className="col-12">
              <div>
                <h3>Right</h3>
              </div>
              <div>
                <h5>Right picture</h5>
              </div>
              <div>
                <img className="img-fluid" src={rightPicture} alt="" />
              </div>
              <div>
                <button onClick={this.openModalEditRightPic}>Edit</button>
              </div>
              <Modal
                open={this.state.modalEditRightPic}
                onClose={this.closeModalEditRightPic}
                center
              >
                <ImageManagement
                  category="stockImages"
                  pick={this.onSaveRightPic.bind(this)}
                  closeModal={this.closeModalEditRightPic}
                />
              </Modal>
            </div>
            {/* ----------------------------------------------------------------------RIGHTTITLE */}
            {!this.state.toggleEditRightTitle ? (
              <div className="col-12">
                <div>
                  <h5>Right title</h5>
                </div>
                <div>
                  <p>{rightTitle}</p>
                </div>
                <div>
                  <button
                    onClick={() =>
                      this.setState({ toggleEditRightTitle: true })
                    }
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <div className="col-12">
                <div>
                  <h5>Right title</h5>
                </div>
                <div>
                  <input
                    type="text"
                    value={rightTitle}
                    onChange={e =>
                      this.setState({ rightTitle: e.target.value })
                    }
                  />
                </div>
                <div>
                  <button
                    onClick={() => {
                      this.onUpdateText('right-title');
                      this.setState({ toggleEditRightTitle: false });
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() =>
                      this.setState({ toggleEditRightTitle: false }, () =>
                        this.fetchData()
                      )
                    }
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {/* ----------------------------------------------------------------------RIGHTDESCRIPTION */}
            {!this.state.toggleEditRightDesc ? (
              <div className="col-12">
                <div>
                  <p>{rightDescription}</p>
                </div>
                <div>
                  <button
                    onClick={() => this.setState({ toggleEditRightDesc: true })}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <div className="col-12">
                <div>
                  <textarea
                    value={rightDescription}
                    onChange={e =>
                      this.setState({ rightDescription: e.target.value })
                    }
                  />
                </div>
                <div>
                  <button
                    onClick={() => {
                      this.onUpdateText('right-description');
                      this.setState({ toggleEditRightDesc: false });
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() =>
                      this.setState({ toggleEditRightDesc: false }, () =>
                        this.fetchData()
                      )
                    }
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* ----------------------------------------------------------------------VISION */}
          <div className="row style-section">
            {!this.state.toggleEditVision ? (
              <div className="col-12">
                <h3>Vision and goals</h3>{' '}
                <div>
                  <h5>Vision 1 title</h5>
                  <p>{vision_1_title}</p>
                </div>
                <div>
                  <h5>Vision 1 description</h5>
                  <p>{vision_1_description}</p>
                </div>
                <div>
                  <h5>Vision 2 title</h5>
                  <p>{vision_2_title}</p>
                </div>
                <div>
                  <h5>Vision 2 description</h5>
                  <p>{vision_2_description}</p>
                </div>
                <div>
                  <h5>Vision 3 title</h5>
                  <p>{vision_3_title}</p>
                </div>
                <div>
                  <h5>Vision 3 description</h5>
                  <p>{vision_3_description}</p>
                </div>
                <button
                  onClick={() => this.setState({ toggleEditVision: true })}
                >
                  Edit
                </button>
              </div>
            ) : (
              <div className="col-12">
                <div>
                  <input
                    type="text"
                    value={vision_1_title}
                    onChange={e =>
                      this.setState({ vision_1_title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <textarea
                    value={vision_1_description}
                    onChange={e =>
                      this.setState({ vision_1_description: e.target.value })
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={vision_2_title}
                    onChange={e =>
                      this.setState({ vision_2_title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <textarea
                    value={vision_2_description}
                    onChange={e =>
                      this.setState({ vision_2_description: e.target.value })
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={vision_3_title}
                    onChange={e =>
                      this.setState({ vision_3_title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <textarea
                    value={vision_3_description}
                    onChange={e =>
                      this.setState({ vision_3_description: e.target.value })
                    }
                  />
                </div>
                <div>
                  <button
                    onClick={() => {
                      this.onUpdateText('vision');
                      this.setState({ toggleEditVision: false });
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => this.setState({ toggleEditVision: false })}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AboutSection;
