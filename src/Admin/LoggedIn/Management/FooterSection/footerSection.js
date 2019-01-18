import React from 'react';
import firebase from 'firebase';

class FooterSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      copyright: '',
      facebook: '',
      youtube: '',
      sentence: '',
      quote: '',

      toggleEditLeft: false,
      toggleEditMid: false,
      toggleEditRight: false
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

  onChangeTextInput(e, arg) {
    switch (arg) {
      case 'facebook':
        this.setState({ facebook: e.target.value });
        break;
      case 'youtube':
        this.setState({ youtube: e.target.value });
        break;
      case 'sentence':
        this.setState({ sentence: e.target.value });
        break;
      case 'quote':
        this.setState({ quote: e.target.value });
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
            facebook: footerObj.left.links.facebook,
            youtube: footerObj.left.links.youtube,
            sentence: footerObj.middle.sentence,
            quote: footerObj.right.quote
          });
        }
      });
  }

  onUpdate() {
    const update = {
      copyright: this.state.copyright,
      left: {
        links: {
          facebook: this.state.facebook,
          youtube: this.state.youtube
        }
      },
      middle: {
        sentence: this.state.sentence
      },
      right: {
        quote: this.state.quote
      }
    };

    firebase
      .database()
      .ref('footer')
      .update(update)
      .then(() => {
        alert('Saved!');
      })
      .catch(err => {
        console.error(err);
        alert('Error occured!');
      });
  }

  render() {
    const { copyright, facebook, youtube, sentence, quote } = this.state;
    return (
      <div
        className="page-wrapper"
        style={{ height: `${this.state.height - 64}px`, overflowY: 'scroll' }}
      >
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-12 d-flex no-block align-items-center">
              <h2 className="page-title">Footer Edit Section</h2>
            </div>
          </div>
          <div>
            {!this.state.toggleEditLeft ? (
              <div className="row style-section">
                <div className="col-12">
                  <h3>Left</h3>
                </div>
                <div className="col-12">
                  <h5>Facebook link</h5>
                </div>
                <div className="col-12">
                  <p>{facebook}</p>
                </div>
                <div className="col-12">
                  <h5>Youtube link</h5>
                </div>
                <div className="col-12">
                  <p>{youtube}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    this.setState({
                      toggleEditLeft: true
                    })
                  }
                >
                  Edit
                </button>
              </div>
            ) : (
              <div className="row style-section">
                <div className="col-12">
                  <h3>Left</h3>
                </div>
                <div className="col-12">
                  <h5>Facebook link</h5>
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    value={facebook}
                    onChange={e => this.onChangeTextInput(e, 'facebook')}
                  />
                </div>
                <div className="col-12">
                  <h5>Youtube link</h5>
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    value={youtube}
                    onChange={e => this.onChangeTextInput(e, 'youtube')}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    this.onUpdate();
                    this.setState({ toggleEditLeft: false });
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() =>
                    this.setState({ toggleEditLeft: false }, () =>
                      this.fetchData()
                    )
                  }
                >
                  Cancel
                </button>
              </div>
            )}
            {!this.state.toggleEditMid ? (
              <div className="row style-section">
                <div className="col-12">
                  <h3>Middle</h3>
                </div>
                <div className="col-12">
                  <h5>Sentence</h5>
                </div>
                <div className="col-12">
                  <p>{sentence}</p>
                </div>
                <div className="col-12">
                  <p>{copyright}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    this.setState({
                      toggleEditMid: true
                    })
                  }
                >
                  Edit
                </button>
              </div>
            ) : (
              <div className="row style-section">
                <div className="col-12">
                  <h3>Middle</h3>
                </div>
                <div className="col-12">
                  <h5>Sentence</h5>
                </div>
                <div className="col-12">
                  <textarea
                    value={sentence}
                    onChange={e => this.onChangeTextInput(e, 'sentence')}
                  />
                </div>
                <div className="col-12">
                  <textarea
                    value={copyright}
                    onChange={e => this.onChangeTextInput(e, 'copyright')}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    this.onUpdate();
                    this.setState({ toggleEditMid: false });
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() =>
                    this.setState({ toggleEditMid: false }, () =>
                      this.fetchData()
                    )
                  }
                >
                  Cancel
                </button>
              </div>
            )}
            {!this.state.toggleEditRight ? (
              <div className="row style-section">
                <div className="col-12">
                  <h3>Right</h3>
                </div>
                <div className="col-12">
                  <h5>Sentence</h5>
                </div>
                <div className="col-12">
                  <p>{quote}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    this.setState({
                      toggleEditRight: true
                    })
                  }
                >
                  Edit
                </button>
              </div>
            ) : (
              <div className="row style-section">
                <div className="col-12">
                  <h3>Right</h3>
                </div>
                <div className="col-12">
                  <h5>Sentence</h5>
                </div>
                <div className="col-12">
                  <textarea
                    value={quote}
                    onChange={e => this.onChangeTextInput(e, 'quote')}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    this.onUpdate();
                    this.setState({ toggleEditRight: false });
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() =>
                    this.setState({ toggleEditRight: false }, () =>
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
    );
  }
}

export default FooterSection;
