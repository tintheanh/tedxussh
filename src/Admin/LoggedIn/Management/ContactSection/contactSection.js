import React from 'react';
import firebase from 'firebase';
import Modal from 'react-responsive-modal';
import ImageManagement from '../ImageMangement/imageManagement';

class ContactSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      background: '',
      comment: '',
      hqName: '',

      toggleEditHQName: false,
      toggleEditHQAddress: false,
      toggleEditComment: false,

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
      case 'comment':
        this.setState({ comment: e.target.value });
        break;
      case 'hqName':
        this.setState({ hqName: e.target.value });
        break;
      case 'hqAddress':
        this.setState({ hqAddress: e.target.value });
        break;
      default:
        break;
    }
  }

  fetchData() {
    firebase
      .database()
      .ref('contact')
      .on('value', snapshot => {
        const contactObj = snapshot.val();
        if (contactObj) {
          this.setState({
            background: contactObj.background,
            comment: contactObj.comment,
            hqName: contactObj.hqName,
            hqAddress: contactObj.hqAddress
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
      .ref('contact')
      .update(update)
      .catch(err => alert(err.message));
  }

  onUpdateText(type) {
    let update = {};
    if (type === 'hqName') {
      update = {
        hqName: this.state.hqName
      };
    }
    if (type === 'hqAddress') {
      update = {
        hqAddress: this.state.hqAddress
      };
    }
    if (type === 'comment') {
      update = {
        comment: this.state.comment
      };
    }
    firebase
      .database()
      .ref('contact')
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
              <h2 className="page-hqName">Contact Edit Section</h2>
            </div>
          </div>
          <div>
            <div className="row style-section">
              <div className="col-12">
                <h5>Cover picture</h5>
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
            {!this.state.toggleEditHQName ? (
              <div className="row style-section">
                <div className="col-12">
                  <h5>Headquarter name</h5>
                </div>
                <div className="col-12">
                  <p>{this.state.hqName}</p>
                </div>
                <div className="col-12">
                  <button
                    onClick={() => this.setState({ toggleEditHQName: true })}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <div className="row style-section">
                <div className="col-12">
                  <h5>Headquarter name</h5>
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    value={this.state.hqName}
                    onChange={e => this.onChangeTextInput(e, 'hqName')}
                  />
                </div>
                <div className="col-12">
                  <button
                    onClick={() => {
                      this.onUpdateText('hqName');
                      this.setState({ toggleEditHQName: false });
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      this.setState({ toggleEditHQName: false });
                      this.fetchData();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {!this.state.toggleEditHQAddress ? (
              <div className="row style-section">
                <div className="col-12">
                  <h5>Headquarter address</h5>
                </div>
                <div className="col-12">
                  <p>{this.state.hqAddress}</p>
                </div>
                <div className="col-12">
                  <button
                    onClick={() => this.setState({ toggleEditHQAddress: true })}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <div className="row style-section">
                <div className="col-12">
                  <input
                    type="text"
                    value={this.state.hqAddress}
                    onChange={e => this.onChangeTextInput(e, 'hqAddress')}
                  />
                </div>
                <div className="col-12">
                  <button
                    onClick={() => {
                      this.onUpdateText('hqAddress');
                      this.setState({ toggleEditHQAddress: false });
                    }}
                  >
                    Save
                  </button>

                  <button
                    onClick={() => {
                      this.setState({ toggleEditHQAddress: false });
                      this.fetchData();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {!this.state.toggleEditComment ? (
              <div
                className="row style-section"
                style={{ marginBottom: '54px' }}
              >
                <div className="col-12">
                  <h5>Comment</h5>
                </div>
                <div className="col-12">
                  <p>{this.state.comment}</p>
                </div>
                <div className="col-12">
                  <button
                    onClick={() => this.setState({ toggleEditComment: true })}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="row style-section"
                style={{ marginBottom: '54px' }}
              >
                <div className="col-12">
                  <textarea
                    value={this.state.comment}
                    onChange={e => this.onChangeTextInput(e, 'comment')}
                  />
                </div>
                <div className="col-12">
                  <button
                    onClick={() => {
                      this.onUpdateText('comment');
                      this.setState({ toggleEditComment: false });
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      this.setState({ toggleEditComment: false });
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

export default ContactSection;
