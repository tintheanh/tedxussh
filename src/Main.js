import React from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NavBar from './NavBar/navBar';
import Home from './Home/home';
import Conference from './Events/Conference/conference';
import Learn from './Learn/learn';
import About from './About/about';
import Footer from './Footer/footer';
import Organizers from './Organizers/organizers';
import Contact from './Contact/contact';
import ScrollToTop from './ScrollToTop/scrollToTop';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home: {},
      about: {},
      footer: {},
      organizers: {
        background: '',
        title: '',
        teamMem: []
      },
      contact: {},
      abtBackground: '',
      abtHeader: '',
      leftDesc: '',
      leftTitle: '',
      leftPic: '',
      midVideo: '',
      midTitle: '',
      midDesc: '',
      rightDesc: '',
      rightTitle: '',
      rightPic: '',
      vision: []
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref('home')
      .on('value', snapshot => {
        const homeObj = snapshot.val();
        if (homeObj) {
          this.setState({ home: homeObj });
        }
      });

    firebase
      .database()
      .ref('about')
      .on('value', snapshot => {
        const aboutObj = snapshot.val();
        if (aboutObj) {
          this.setState({
            abtBackground: aboutObj.background,
            abtHeader: aboutObj.header,
            leftDesc: aboutObj.left.description,
            leftTitle: aboutObj.left.title,
            leftPic: aboutObj.left.picture,
            midVideo: aboutObj.middle.video,
            midDesc: aboutObj.middle.description,
            midTitle: aboutObj.middle.title,
            rightDesc: aboutObj.right.description,
            rightPic: aboutObj.right.picture,
            rightTitle: aboutObj.right.title,
            vision: aboutObj.visions
          });
        }
      });

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
            organizers: {
              background: organizersObj.background,
              title: organizersObj.title,
              teamMem
            }
          });
        }
      });

    firebase
      .database()
      .ref('footer')
      .on('value', snapshot => {
        const footerObj = snapshot.val();
        if (footerObj) {
          this.setState({ footer: footerObj });
        }
      });

    firebase
      .database()
      .ref('contact')
      .on('value', snapshot => {
        const contactObj = snapshot.val();
        if (contactObj) {
          this.setState({ contact: contactObj });
        }
      });
  }

  render() {
    const { footer, home, about } = this.state;
    const {
      abtBackground,
      abtHeader,
      leftDesc,
      leftTitle,
      leftPic,
      midVideo,
      midTitle,
      midDesc,
      rightDesc,
      rightTitle,
      rightPic,
      vision
    } = this.state;
    return (
      <Router>
        <ScrollToTop>
          <div>
            <NavBar />
            <Route exact path="/" render={() => <Home home={home} />} />
            <Route path="/attend" component={Conference} />
            <Route path="/learn" component={Learn} />
            <Route
              path="/about"
              render={() => (
                <About
                  abtBackground={abtBackground}
                  abtHeader={abtHeader}
                  leftDesc={leftDesc}
                  leftPic={leftPic}
                  leftTitle={leftTitle}
                  midVideo={midVideo}
                  midTitle={midTitle}
                  midDesc={midDesc}
                  rightDesc={rightDesc}
                  rightTitle={rightTitle}
                  rightPic={rightPic}
                  vision={vision}
                />
              )}
            />
            <Route
              path="/organizers"
              render={() => <Organizers organizers={this.state.organizers} />}
            />
            <Route
              path="/contact"
              render={() => <Contact contact={this.state.contact} />}
            />
            <Footer {...footer} />
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}

export default Main;
