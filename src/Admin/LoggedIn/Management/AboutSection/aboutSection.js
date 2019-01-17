import React from 'react';
import firebase from 'firebase';
import YouTube from 'react-youtube';
import Modal from 'react-responsive-modal';
import ImageManagement from '../ImageMangement/imageManagement';

class AboutSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.fetchData();
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
      <div className="page-wrapper">
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-12 d-flex no-block align-items-center">
              <h4 className="page-title">Dashboard</h4>
            </div>
          </div>
          {/* ----------------------------------------------------------------------BACKGROUND */}
          <img className="img-fluid" src={background} alt="" />
          <button onClick={this.openModalEditBackground}>
            Edit background
          </button>
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
          {/* ----------------------------------------------------------------------HEADER */}
          {!this.state.toggleEditHeader ? (
            <div>
              <p>{header}</p>
              <button onClick={() => this.setState({ toggleEditHeader: true })}>
                Edit header
              </button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={header}
                onChange={e => this.setState({ header: e.target.value })}
              />
              <button
                onClick={() =>
                  this.setState({ toggleEditHeader: false }, () =>
                    this.fetchData()
                  )
                }
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  this.onUpdateText('header');
                  this.setState({ toggleEditHeader: false });
                }}
              >
                Save
              </button>
            </div>
          )}

          <h1>Left</h1>
          {/* ----------------------------------------------------------------------LEFTPIC */}
          <img className="img-fluid" src={leftPicture} alt="" />
          <button onClick={this.openModalEditLeftPic}>Edit left picture</button>
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
          {/* ----------------------------------------------------------------------LEFTTITLE */}
          {!this.state.toggleEditLeftTitle ? (
            <div>
              <p>{leftTitle}</p>
              <button
                onClick={() => this.setState({ toggleEditLeftTitle: true })}
              >
                Edit left title
              </button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={leftTitle}
                onChange={e => this.setState({ leftTitle: e.target.value })}
              />
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
          )}
          {/* ----------------------------------------------------------------------LEFTDESCRIPTION */}
          {!this.state.toggleEditLeftDesc ? (
            <div>
              <p>{leftDescription}</p>
              <button
                onClick={() => this.setState({ toggleEditLeftDesc: true })}
              >
                Edit left description
              </button>
            </div>
          ) : (
            <div>
              <textarea
                value={leftDescription}
                onChange={e =>
                  this.setState({ leftDescription: e.target.value })
                }
              />
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
          )}
          <h1>Middle</h1>
          {/* ----------------------------------------------------------------------VIDEO */}

          {!this.state.toggleEditVideo ? (
            <div>
              <YouTube
                videoId={this.youtube_parser(video)}
                onReady={this.onReady}
                className="img-fluid"
              />
              <button onClick={() => this.setState({ toggleEditVideo: true })}>
                Edit video
              </button>
            </div>
          ) : (
            <div>
              <input
                value={video}
                onChange={e => this.setState({ video: e.target.value })}
              />
              <button
                onClick={() =>
                  this.setState({ toggleEditVideo: false }, () =>
                    this.fetchData()
                  )
                }
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  this.onUpdateText('video');
                  this.setState({ toggleEditVideo: false });
                }}
              >
                Save
              </button>
            </div>
          )}
          {/* ----------------------------------------------------------------------MIDDLETITLE */}
          {!this.state.toggleEditMidTitle ? (
            <div>
              <p>{middleTitle}</p>
              <button
                onClick={() => this.setState({ toggleEditMidTitle: true })}
              >
                Edit middle title
              </button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={middleTitle}
                onChange={e => this.setState({ middleTitle: e.target.value })}
              />
              <button
                onClick={() =>
                  this.setState({ toggleEditMidTitle: false }, () =>
                    this.fetchData()
                  )
                }
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  this.onUpdateText('middle-title');
                  this.setState({ toggleEditMidTitle: false });
                }}
              >
                Save
              </button>
            </div>
          )}
          {/* ----------------------------------------------------------------------MIDDLEDESCRIPTION */}
          {!this.state.toggleEditMidDesc ? (
            <div>
              <p>{middleDescription}</p>
              <button
                onClick={() => this.setState({ toggleEditMidDesc: true })}
              >
                Edit middle description
              </button>
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
          <h1>Right</h1>
          {/* ----------------------------------------------------------------------RIGHTPIC */}
          <img className="img-fluid" src={rightPicture} alt="" />
          <button onClick={this.openModalEditRightPic}>
            Edit right picture
          </button>
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
          {/* ----------------------------------------------------------------------RIGHTTITLE */}
          {!this.state.toggleEditRightTitle ? (
            <div>
              <p>{rightTitle}</p>
              <button
                onClick={() => this.setState({ toggleEditRightTitle: true })}
              >
                Edit right title
              </button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={rightTitle}
                onChange={e => this.setState({ rightTitle: e.target.value })}
              />
              <button
                onClick={() =>
                  this.setState({ toggleEditRightTitle: false }, () =>
                    this.fetchData()
                  )
                }
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  this.onUpdateText('right-title');
                  this.setState({ toggleEditRightTitle: false });
                }}
              >
                Save
              </button>
            </div>
          )}
          {/* ----------------------------------------------------------------------RIGHTDESCRIPTION */}
          {!this.state.toggleEditRightDesc ? (
            <div>
              <p>{rightDescription}</p>
              <button
                onClick={() => this.setState({ toggleEditRightDesc: true })}
              >
                Edit right description
              </button>
            </div>
          ) : (
            <div>
              <textarea
                value={rightDescription}
                onChange={e =>
                  this.setState({ rightDescription: e.target.value })
                }
              />
              <button
                onClick={() =>
                  this.setState({ toggleEditRightDesc: false }, () =>
                    this.fetchData()
                  )
                }
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  this.onUpdateText('right-description');
                  this.setState({ toggleEditRightDesc: false });
                }}
              >
                Save
              </button>
            </div>
          )}

          {/* ----------------------------------------------------------------------VISION */}
          <h1>Vision and goals</h1>
          {!this.state.toggleEditVision ? (
            <div>
              {' '}
              <p>{vision_1_title}</p>
              <p>{vision_1_description}</p>
              <p>{vision_2_title}</p>
              <p>{vision_2_description}</p>
              <p>{vision_3_title}</p>
              <p>{vision_3_description}</p>
              <button onClick={() => this.setState({ toggleEditVision: true })}>
                Edit vision
              </button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={vision_1_title}
                onChange={e =>
                  this.setState({ vision_1_title: e.target.value })
                }
              />
              <br />
              <textarea
                value={vision_1_description}
                onChange={e =>
                  this.setState({ vision_1_description: e.target.value })
                }
              />
              <br />
              <input
                type="text"
                value={vision_2_title}
                onChange={e =>
                  this.setState({ vision_2_title: e.target.value })
                }
              />
              <br />
              <textarea
                value={vision_2_description}
                onChange={e =>
                  this.setState({ vision_2_description: e.target.value })
                }
              />
              <br />
              <input
                type="text"
                value={vision_3_title}
                onChange={e =>
                  this.setState({ vision_3_title: e.target.value })
                }
              />
              <br />
              <textarea
                value={vision_3_description}
                onChange={e =>
                  this.setState({ vision_3_description: e.target.value })
                }
              />
              <br />
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
          )}
        </div>
      </div>
    );
  }
}

export default AboutSection;
