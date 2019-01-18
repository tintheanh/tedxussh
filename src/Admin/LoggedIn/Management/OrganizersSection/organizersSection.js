import React from 'react';
import firebase from 'firebase';
import Modal from 'react-responsive-modal';
import ImageManagement from '../ImageMangement/imageManagement';
import EditTeamMem from './EditTeamMem/editTeamMem';

class Organizers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      background: '',
      title: '',
      teamMem: [],

      modalEditPic: false,
      modalEditTeam: false,

      toggleEditTitle: false
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.openModalEditPic = this.openModalEditPic.bind(this);
    this.closeModalEditPic = this.closeModalEditPic.bind(this);

    this.openModalEditTeam = this.openModalEditTeam.bind(this);
    this.closeModalEditTeam = this.closeModalEditTeam.bind(this);
  }

  openModalEditPic() {
    this.setState({ modalEditPic: true });
  }

  closeModalEditPic() {
    this.setState({ modalEditPic: false });
  }

  openModalEditTeam() {
    this.setState({ modalEditTeam: true });
  }

  closeModalEditTeam() {
    this.setState({ modalEditTeam: false });
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

  renderImg(totalRows, imgs) {
    let startIndex = -4;
    let endIndex = startIndex + 4;
    const temp = Array.from({ length: totalRows }, () =>
      Math.floor(Math.random())
    );

    return temp.map((_, i) => {
      startIndex += 4;
      endIndex += 4;
      return (
        <div className="row sponsors-section" key={i}>
          {this.renderRow(startIndex, endIndex, imgs)}
        </div>
      );
    });
  }

  renderRow(startIndex, endIndex, imgs) {
    return imgs.slice(startIndex, endIndex).map(e => (
      <div className="col-md-6 col-lg-3 mb-2" key={e.id}>
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={e.picture} alt="" className="img-fluid notransition" />
          </div>
          <div className="hotel-room-body">
            <h3 className="text-left" style={{ margin: '0' }}>
              {e.name}
            </h3>
            <p className="text-left" style={{ margin: '0' }}>
              {e.role}
            </p>
            <p
              className="text-left"
              style={{
                margin: '0',
                fontWeight: '500',
                color: 'red',
                cursor: 'pointer'
              }}
            >
              {e.socialLink}
            </p>
          </div>
        </div>
      </div>
    ));
  }

  fetchData() {
    firebase
      .database()
      .ref('organizers')
      .on('value', snapshot => {
        const organizersObj = snapshot.val();
        if (organizersObj) {
          const teamMem = [];
          Object.keys(organizersObj.teamMem).forEach(e => {
            const organizer = {
              id: e,
              name: organizersObj.teamMem[e].name,
              role: organizersObj.teamMem[e].role,
              picture: organizersObj.teamMem[e].picture,
              socialLink: organizersObj.teamMem[e].socialLink
            };
            teamMem.push(organizer);
          });
          this.setState({
            background: organizersObj.background,
            title: organizersObj.title,
            teamMem
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
      .ref('organizers')
      .update(update)
      .catch(err => alert(err.message));
  }

  onUpdateText() {
    const update = {
      title: this.state.title
    };

    firebase
      .database()
      .ref('organizers')
      .update(update)
      .catch(err => alert(err.message));
  }

  render() {
    return (
      <div
        className="page-wrapper"
        style={{ height: `${this.state.height - 64}px`, overflowY: 'scroll' }}
      >
        <div className="page-breadcrumb" style={{ paddingBottom: '54px' }}>
          <div className="row">
            <div className="col-12 d-flex no-block align-items-center">
              <h2 className="page-title">Organizers Edit Section</h2>
            </div>
          </div>
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
                onChange={e => this.setState({ title: e.target.value })}
              />
              <div className="col-12">
                <button
                  onClick={() => {
                    this.onUpdateText();
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
          <div className="row style-section-pictures">
            {this.renderImg(1, this.state.teamMem)}
            <button onClick={this.openModalEditTeam}>
              Edit team members...
            </button>
            <Modal
              open={this.state.modalEditTeam}
              onClose={this.closeModalEditTeam}
              center
            >
              <EditTeamMem
                teamMem={this.state.teamMem}
                closeModal={this.closeModalEditTeam}
              />
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default Organizers;
