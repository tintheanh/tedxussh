import React from 'react';
import firebase from 'firebase';
import Modal from 'react-responsive-modal';
import ImageManagement from '../ImageMangement/imageManagement';

class HomeSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      description: '',
      title: '',

      toggleEditTitle: '',
      toggleEditDesc: false,

      modalEditPic: false
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.openModalEditPic = this.openModalEditPic.bind(this);
    this.closeModalEditPic = this.closeModalEditPic.bind(this);
  }

  openModalEditPic() {
    this.setState({ modalEditPic: true });
  }

  closeModalEditPic() {
    this.setState({ modalEditPic: false });
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
      default:
        break;
    }
  }

  fetchData() {
    firebase
      .database()
      .ref('home')
      .on('value', snapshot =>
        this.setState({
          background: snapshot.val().background,
          description: snapshot.val().description,
          title: snapshot.val().title
        })
      );
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
                <h3>Cover picture</h3>
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
                <p>{this.state.title}</p>
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
              <div
                className="row style-section"
                style={{ marginBottom: '54px' }}
              >
                <p>{this.state.description}</p>
                <div className="col-12">
                  <button
                    onClick={() => this.setState({ toggleEditDesc: true })}
                  >
                    Edit description
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="row style-section"
                style={{ marginBottom: '54px' }}
              >
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
          </div>
        </div>
      </div>
    );
  }
}

export default HomeSection;
