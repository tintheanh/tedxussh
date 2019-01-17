import React from 'react';
import firebase from 'firebase';

class FooterSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copyright: '',
      getUpdate: '',
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      playlist: '',
      sentence: '',
      quote: '',
      sourceQuote: '',
      toggleEdit: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  onChangeTextInput(e, arg) {
    switch (arg) {
      case 'getUpdate':
        this.setState({ getUpdate: e.target.value });
        break;
      case 'facebook':
        this.setState({ facebook: e.target.value });
        break;
      case 'twitter':
        this.setState({ twitter: e.target.value });
        break;
      case 'instagram':
        this.setState({ instagram: e.target.value });
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
      case 'copyright':
        this.setState({ copyright: e.target.value });
        break;
      default:
        break;
    }
  }

  fetchData() {
    firebase
      .database()
      .ref('footer')
      .on('value', snapshot => {
        const footerObj = snapshot.val();
        if (footerObj) {
          this.setState({
            copyright: footerObj.copyright,
            getUpdate: footerObj.left.getUpdate,
            facebook: footerObj.left.links.facebook,
            instagram: footerObj.left.links.instagram,
            twitter: footerObj.left.links.twitter,
            linkedin: footerObj.left.links.linkedin,
            playlist: footerObj.left.playlist,
            sentence: footerObj.middle.sentence,
            quote: footerObj.right.quote,
            sourceQuote: footerObj.right.sourceQuote
          });
        }
      });
  }

  onUpdate() {
    const update = {
      copyright: this.state.copyright,
      left: {
        getUpdate: this.state.getUpdate,
        links: {
          facebook: this.state.facebook,
          instagram: this.state.instagram,
          linkedin: this.state.linkedin,
          twitter: this.state.twitter
        },
        playlist: this.state.playlist
      },
      middle: {
        sentence: this.state.sentence
      },
      right: {
        sourceQuote: this.state.sourceQuote,
        quote: this.state.quote
      }
    };

    firebase
      .database()
      .ref('footer/')
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

  renderShowOrEdit() {
    const {
      copyright,
      getUpdate,
      facebook,
      instagram,
      twitter,
      linkedin,
      playlist,
      sentence,
      quote,
      sourceQuote
    } = this.state;
    if (this.state.toggleEdit) {
      return (
        <div>
          <div className="row">
            <input
              type="text"
              value={getUpdate}
              onChange={e => this.onChangeTextInput(e, 'getUpdate')}
            />
          </div>
          <div className="row">
            <input
              type="text"
              value={facebook}
              onChange={e => this.onChangeTextInput(e, 'facebook')}
            />
          </div>
          <div className="row">
            <input
              type="text"
              value={instagram}
              onChange={e => this.onChangeTextInput(e, 'instagram')}
            />
          </div>
          <div className="row">
            <input
              type="text"
              value={twitter}
              onChange={e => this.onChangeTextInput(e, 'twitter')}
            />
          </div>
          <div className="row">
            <input
              type="text"
              value={linkedin}
              onChange={e => this.onChangeTextInput(e, 'linkedin')}
            />
          </div>
          <div className="row">
            <input
              type="text"
              value={playlist}
              onChange={e => this.onChangeTextInput(e, 'playlist')}
            />
          </div>
          <div className="row">
            <input
              type="text"
              value={sentence}
              onChange={e => this.onChangeTextInput(e, 'sentence')}
            />
          </div>
          <div className="row">
            <input
              type="text"
              value={quote}
              onChange={e => this.onChangeTextInput(e, 'quote')}
            />
          </div>
          <div className="row">
            <input
              type="text"
              value={sourceQuote}
              onChange={e => this.onChangeTextInput(e, 'sourceQuote')}
            />
          </div>
          <div className="row">
            <input
              type="text"
              value={copyright}
              onChange={e => this.onChangeTextInput(e, 'copyright')}
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
      <div className="row style-section">
        <div className="col-12">
          <p>{getUpdate}</p>
        </div>
        <div className="col-12">
          <p>{facebook}</p>
        </div>
        <div className="col-12">
          <p>{instagram}</p>
        </div>
        <div className="col-12">
          <p>{twitter}</p>
        </div>
        <div className="col-12">
          <p>{linkedin}</p>
        </div>
        <div className="col-12">
          <p>{playlist}</p>
        </div>
        <div className="col-12">
          <p>{sentence}</p>
        </div>
        <div className="col-12">
          <p>{quote}</p>
        </div>
        <div className="col-12">
          <p>{sourceQuote}</p>
        </div>
        <div className="col-12">
          <p>{copyright}</p>
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
              <h2 className="page-title">Footer Edit Section</h2>
            </div>
          </div>
          {this.renderShowOrEdit()}
        </div>
      </div>
    );
  }
}

export default FooterSection;
