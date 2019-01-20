import React from 'react';
import firebase from 'firebase';
import Modal from 'react-responsive-modal';
import ImageManagement from '../ImageMangement/imageManagement';

class HomeSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      background: '',
      description: '',
      title: '',
      cover1: '',
      cover2: '',
      cover3: '',
      desc1: '',
      desc2: '',
      desc3: '',
      title1: '',
      title2: '',
      title3: '',

      toggleEditTitle: false,
      toggleEditDesc: false,

      toggleEditTitle1: false,
      toggleEditTitle2: false,
      toggleEditTitle3: false,

      toggleEditDesc1: false,
      toggleEditDesc2: false,
      toggleEditDesc3: false,

      modalEditPic: false,
      modalEditCover1: false,
      modalEditCover2: false,
      modalEditCover3: false
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.openModalEditPic = this.openModalEditPic.bind(this);
    this.closeModalEditPic = this.closeModalEditPic.bind(this);

    this.openModalEditCover1 = this.openModalEditCover1.bind(this);
    this.closeModalEditCover1 = this.closeModalEditCover1.bind(this);

    this.openModalEditCover2 = this.openModalEditCover2.bind(this);
    this.closeModalEditCover2 = this.closeModalEditCover2.bind(this);

    this.openModalEditCover3 = this.openModalEditCover3.bind(this);
    this.closeModalEditCover3 = this.closeModalEditCover3.bind(this);
  }

  openModalEditPic() {
    this.setState({ modalEditPic: true });
  }

  closeModalEditPic() {
    this.setState({ modalEditPic: false });
  }

  openModalEditCover1() {
    this.setState({ modalEditCover1: true });
  }

  openModalEditCover2() {
    this.setState({ modalEditCover2: true });
  }

  openModalEditCover3() {
    this.setState({ modalEditCover3: true });
  }

  closeModalEditCover1() {
    this.setState({ modalEditCover1: false });
  }

  closeModalEditCover2() {
    this.setState({ modalEditCover2: false });
  }

  closeModalEditCover3() {
    this.setState({ modalEditCover3: false });
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

  onChangeTextInput(e, arg) {
    switch (arg) {
      case 'description':
        this.setState({ description: e.target.value });
        break;
      case 'title':
        this.setState({ title: e.target.value });
        break;
      case 'title1':
        this.setState({ title1: e.target.value });
        break;
      case 'title2':
        this.setState({ title2: e.target.value });
        break;
      case 'title3':
        this.setState({ title3: e.target.value });
        break;
      case 'desc1':
        this.setState({ desc1: e.target.value });
        break;
      case 'desc2':
        this.setState({ desc2: e.target.value });
        break;
      case 'desc3':
        this.setState({ desc3: e.target.value });
        break;
      default:
        break;
    }
  }

  fetchData() {
    firebase
      .database()
      .ref('home')
      .on('value', snapshot => {
        const homeObj = snapshot.val();
        if (homeObj) {
          this.setState({
            background: homeObj.background,
            description: homeObj.description,
            title: homeObj.title,
            cover1: homeObj.left.cover,
            cover2: homeObj.middle.cover,
            cover3: homeObj.right.cover,
            title1: homeObj.left.title,
            title2: homeObj.middle.title,
            title3: homeObj.right.title,
            desc1: homeObj.left.description,
            desc2: homeObj.middle.description,
            desc3: homeObj.right.description
          });
        }
      });
  }

  onUpdatePic(newPic) {
    const update = {
      background: newPic
    };

    firebase
      .database()
      .ref('home')
      .update(update)
      .catch(err => alert(err.message));
  }

  onUpdateCover1(newPic) {
    const update = {
      cover: newPic
    };

    firebase
      .database()
      .ref('home/left')
      .update(update)
      .catch(err => alert(err.message));
  }

  onUpdateCover2(newPic) {
    const update = {
      cover: newPic
    };

    firebase
      .database()
      .ref('home/middle')
      .update(update)
      .catch(err => alert(err.message));
  }

  onUpdateCover3(newPic) {
    const update = {
      cover: newPic
    };

    firebase
      .database()
      .ref('home/right')
      .update(update)
      .catch(err => alert(err.message));
  }

  onUpdateText(type) {
    let update = {};
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
    if (type === 'title1') {
      update = {
        title: this.state.title1
      };
      firebase
        .database()
        .ref('home/left')
        .update(update)
        .catch(err => alert(err.message));
    }
    if (type === 'title2') {
      update = {
        title: this.state.title2
      };
      firebase
        .database()
        .ref('home/middle')
        .update(update)
        .catch(err => alert(err.message));
    }
    if (type === 'title3') {
      update = {
        title: this.state.title3
      };
      firebase
        .database()
        .ref('home/right')
        .update(update)
        .catch(err => alert(err.message));
    }
    if (type === 'desc1') {
      update = {
        description: this.state.desc1
      };
      firebase
        .database()
        .ref('home/left')
        .update(update)
        .catch(err => alert(err.message));
    }
    if (type === 'desc2') {
      update = {
        description: this.state.desc2
      };
      firebase
        .database()
        .ref('home/middle')
        .update(update)
        .catch(err => alert(err.message));
    }
    if (type === 'desc3') {
      update = {
        description: this.state.desc3
      };
      firebase
        .database()
        .ref('home/right')
        .update(update)
        .catch(err => alert(err.message));
    }
    if (
      type !== 'title1' &&
      type !== 'title2' &&
      type !== 'title3' &&
      type !== 'desc1' &&
      type !== 'desc2' &&
      type !== 'desc3'
    )
      firebase
        .database()
        .ref('home')
        .update(update)
        .catch(err => alert(err.message));
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
              <h2 className="page-title">Home Edit Section</h2>
            </div>
          </div>
          <div>
            <div className="row style-section">
              <div className="col-12">
                <h3>Background picture</h3>
              </div>
              <div className="col-12">
                <img src={this.state.background} alt="" className="img-fluid" />
              </div>
              <div className="col-12">
                <button onClick={this.openModalEditPic}>Edit cover</button>
              </div>
              <Modal
                open={this.state.modalEditPic}
                onClose={this.closeModalEditPic}
                center
              >
                <ImageManagement
                  category="stockImages"
                  pick={this.onUpdatePic.bind(this)}
                  closeModal={this.closeModalEditPic}
                />
              </Modal>
            </div>
            {!this.state.toggleEditTitle ? (
              <div className="row style-section">
                <div className="col-12">
                  <h3>Home title</h3>
                </div>
                <div className="col-12">
                  <p>{this.state.title}</p>
                </div>
                <div className="col-12">
                  <button
                    onClick={() => this.setState({ toggleEditTitle: true })}
                  >
                    Edit title
                  </button>
                </div>
              </div>
            ) : (
              <div className="row style-section">
                <input
                  type="text"
                  value={this.state.title}
                  onChange={e => this.onChangeTextInput(e, 'title')}
                />
                <div className="col-12">
                  <button
                    onClick={() => {
                      this.onUpdateText('title');
                      this.setState({ toggleEditTitle: false });
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      this.setState({ toggleEditTitle: false });
                      this.fetchData();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {!this.state.toggleEditDesc ? (
              <div className="row style-section">
                <div className="col-12">
                  <h3>Home description</h3>
                </div>
                <div className="col-12">
                  <p>{this.state.description}</p>
                </div>
                <div className="col-12">
                  <button
                    onClick={() => this.setState({ toggleEditDesc: true })}
                  >
                    Edit description
                  </button>
                </div>
              </div>
            ) : (
              <div className="row style-section">
                <textarea
                  value={this.state.description}
                  onChange={e => this.onChangeTextInput(e, 'description')}
                />
                <div className="col-12">
                  <button
                    onClick={() => {
                      this.onUpdateText('description');
                      this.setState({ toggleEditDesc: false });
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      this.setState({ toggleEditDesc: false });
                      this.fetchData();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <div className="row style-section">
              <div className="col-12">
                <h3>Left</h3>
              </div>
              <div className="col-12">
                <h5>Title</h5>
              </div>
              {!this.state.toggleEditTitle1 ? (
                <div className="col-12">
                  <div>
                    <p>{this.state.title1}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => this.setState({ toggleEditTitle1: true })}
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
                      value={this.state.title1}
                      onChange={e => this.onChangeTextInput(e, 'title1')}
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        this.onUpdateText('title1');
                        this.setState({ toggleEditTitle1: false });
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        this.fetchData();
                        this.setState({ toggleEditTitle1: false });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              <div className="col-12">
                <h5>Description</h5>
              </div>
              {!this.state.toggleEditDesc1 ? (
                <div className="col-12">
                  <div>
                    <p>{this.state.desc1}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => this.setState({ toggleEditDesc1: true })}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="col-12">
                  <div>
                    <textarea
                      value={this.state.desc1}
                      onChange={e => this.onChangeTextInput(e, 'desc1')}
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        this.onUpdateText('desc1');
                        this.setState({ toggleEditDesc1: false });
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        this.fetchData();
                        this.setState({ toggleEditDesc1: false });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              <div className="col-12">
                <img src={this.state.cover1} alt="" className="img-fluid" />
              </div>
              <div className="col-12">
                <button onClick={this.openModalEditCover1}>Edit cover</button>
              </div>
              <Modal
                open={this.state.modalEditCover1}
                onClose={this.closeModalEditCover1}
                center
              >
                <ImageManagement
                  category="stockImages"
                  pick={this.onUpdateCover1.bind(this)}
                  closeModal={this.closeModalEditCover1}
                />
              </Modal>
            </div>
            <div className="row style-section">
              <div className="col-12">
                <h3>Middle</h3>
              </div>
              <div className="col-12">
                <h5>Title</h5>
              </div>
              {!this.state.toggleEditTitle2 ? (
                <div className="col-12">
                  <div>
                    <p>{this.state.title2}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => this.setState({ toggleEditTitle2: true })}
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
                      value={this.state.title2}
                      onChange={e => this.onChangeTextInput(e, 'title2')}
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        this.onUpdateText('title2');
                        this.setState({ toggleEditTitle2: false });
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        this.fetchData();
                        this.setState({ toggleEditTitle2: false });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              <div className="col-12">
                <h5>Description</h5>
              </div>
              {!this.state.toggleEditDesc2 ? (
                <div className="col-12">
                  <div>
                    <p>{this.state.desc2}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => this.setState({ toggleEditDesc2: true })}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="col-12">
                  <div>
                    <textarea
                      value={this.state.desc2}
                      onChange={e => this.onChangeTextInput(e, 'desc2')}
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        this.onUpdateText('desc2');
                        this.setState({ toggleEditDesc2: false });
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        this.fetchData();
                        this.setState({ toggleEditDesc2: false });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              <div className="col-12">
                <img src={this.state.cover2} alt="" className="img-fluid" />
              </div>
              <div className="col-12">
                <button onClick={this.openModalEditCover2}>Edit cover</button>
              </div>
              <Modal
                open={this.state.modalEditCover2}
                onClose={this.closeModalEditCover2}
                center
              >
                <ImageManagement
                  category="stockImages"
                  pick={this.onUpdateCover2.bind(this)}
                  closeModal={this.closeModalEditCover2}
                />
              </Modal>
            </div>
            <div className="row style-section" style={{ marginBottom: '54px' }}>
              <div className="col-12">
                <h3>Right</h3>
              </div>
              {!this.state.toggleEditTitle3 ? (
                <div className="col-12">
                  <div>
                    <p>{this.state.title3}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => this.setState({ toggleEditTitle3: true })}
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
                      value={this.state.title3}
                      onChange={e => this.onChangeTextInput(e, 'title3')}
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        this.onUpdateText('title3');
                        this.setState({ toggleEditTitle3: false });
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        this.fetchData();
                        this.setState({ toggleEditTitle3: false });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              <div className="col-12">
                <h5>Description</h5>
              </div>
              {!this.state.toggleEditDesc3 ? (
                <div className="col-12">
                  <div>
                    <p>{this.state.desc3}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => this.setState({ toggleEditDesc3: true })}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="col-12">
                  <div>
                    <textarea
                      value={this.state.desc3}
                      onChange={e => this.onChangeTextInput(e, 'desc3')}
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        this.onUpdateText('desc3');
                        this.setState({ toggleEditDesc3: false });
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        this.fetchData();
                        this.setState({ toggleEditDesc3: false });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              <div className="col-12">
                <img src={this.state.cover3} alt="" className="img-fluid" />
              </div>
              <div className="col-12">
                <button onClick={this.openModalEditCover3}>Edit cover</button>
              </div>
              <Modal
                open={this.state.modalEditCover3}
                onClose={this.closeModalEditCover3}
                center
              >
                <ImageManagement
                  category="stockImages"
                  pick={this.onUpdateCover3.bind(this)}
                  closeModal={this.closeModalEditCover3}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeSection;
