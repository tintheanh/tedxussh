import React from 'react';
import firebase from 'firebase';
import Modal from 'react-responsive-modal';
import ImageManagement from './ImageMangement/layout';

class HomeSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // footer: {
      //   left: {
      //     links: {
      //       title: ''
      //     }
      //   }
      // },
      // test: {
      //   another: 'bla'
      // }
      background: '',
      description: '',
      title: '',
      modalIsOpen: false,
      toggleEdit: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  componentDidMount() {
    this.fetchData();
  }

  onChangeTextInput(e, arg) {
    switch (arg) {
      case 'description':
        this.setState({ description: e.target.value });
        break;
      case 'title':
        this.setState({ title: e.target.value });
        break;
      case 'background':
        this.setState({ background: e.target.value });
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

  onUpdate() {
    const update = {
      background: this.state.background,
      title: this.state.title,
      description: this.state.description
    };

    firebase
      .database()
      .ref('home')
      .update(update)
      .then(() => {
        alert('Saved!');
        this.setState({ toggleEdit: false });
      })
      .catch(err => {
        console.error(err);
        alert('Error occured!');
      });
  }

  pickImg(url) {
    this.setState({ background: url }, () => console.log(this.state.background));
  }

  renderShowOrEdit() {
    const { background, description, title } = this.state;
    if (this.state.toggleEdit) {
      return (
        <div>
          <div className="row">
            <input
              type="text"
              value={description}
              onChange={e => this.onChangeTextInput(e, 'description')}
            />
          </div>
          <div className="row">
            <input
              type="text"
              value={title}
              onChange={e => this.onChangeTextInput(e, 'title')}
            />
          </div>
          <div className="row">
            <div style={{ height: '50%', width: '50%' }}>
              <img src={background} alt="" className="img-fluid" />
            </div>
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

          <button onClick={this.openModal}>Edit image</button>
          <Modal open={this.state.modalIsOpen} onClose={this.closeModal} center>
            <ImageManagement pick={this.pickImg.bind(this)} />
          </Modal>
        </div>
      );
    }
    return (
      <div>
        <div className="row">
          <p>{description}</p>
        </div>
        <div className="row">
          <p>{title}</p>
        </div>
        <div className="row">
          <div style={{ height: '50%', width: '50%' }}>
            <img src={background} alt="" className="img-fluid" />
          </div>
        </div>
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
    );
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

export default HomeSection;
