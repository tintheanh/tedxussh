import React from 'react';
import firebase from 'firebase';

class FooterSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // footer: {
      //   left: {
      //     links: {
      //       facebook: ''
      //     }
      //   }
      // },
      // test: {
      //   another: 'bla'
      // }
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
      .on('value', snapshot =>
        this.setState({
          copyright: snapshot.val().copyright,
          getUpdate: snapshot.val().left.getUpdate,
          facebook: snapshot.val().left.links.facebook,
          instagram: snapshot.val().left.links.instagram,
          twitter: snapshot.val().left.links.twitter,
          linkedin: snapshot.val().left.links.linkedin,
          playlist: snapshot.val().left.playlist,
          sentence: snapshot.val().middle.sentence,
          quote: snapshot.val().right.quote,
          sourceQuote: snapshot.val().right.sourceQuote
        })
      );
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
      <div>
        <div className="row">
          <p>{getUpdate}</p>
        </div>
        <div className="row">
          <p>{facebook}</p>
        </div>
        <div className="row">
          <p>{instagram}</p>
        </div>
        <div className="row">
          <p>{twitter}</p>
        </div>
        <div className="row">
          <p>{linkedin}</p>
        </div>
        <div className="row">
          <p>{playlist}</p>
        </div>
        <div className="row">
          <p>{sentence}</p>
        </div>
        <div className="row">
          <p>{quote}</p>
        </div>
        <div className="row">
          <p>{sourceQuote}</p>
        </div>
        <div className="row">
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
              <h4 className="page-title">Dashboard</h4>
            </div>
          </div>
          {this.renderShowOrEdit()}
        </div>
      </div>
    );
  }
}

export default FooterSection;
