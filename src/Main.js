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

import { getData } from './config/firebase';

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
      isVN: true
    };
  }

  componentDidMount() {
    // firebase
    //   .database()
    //   .ref('home')
    //   .on('value', snapshot => {
    //     const homeObj = snapshot.val();
    //     if (homeObj) {
    //       this.setState({ home: homeObj });
    //     }
    //   });

    getData('home').then(doc => {
      if (doc.exists) {
        this.setState({ home: doc.data() });
      }
    });

    getData('about').then(doc => {
      if (doc.exists) {
        this.setState({ about: doc.data() });
      }
    });

    // getData('home', data => {
    //   const homeObj = data.val();
    //   if (homeObj) {
    //     this.setState({ home: homeObj });
    //   }
    // });

    // getData('about', data => {
    //   const aboutObj = data.val();
    //   if (aboutObj) {
    //     this.setState({ about: aboutObj });
    //   }
    // });

    // firebase
    //   .database()
    //   .ref('organizers')
    //   .on('value', snapshot => {
    //     const organizersObj = snapshot.val();
    //     if (organizersObj) {
    //       const teamMem = [];
    //       Object.keys(organizersObj.teamMem).forEach(e => {
    //         const organizer = {
    //           id: e,
    //           name: organizersObj.teamMem[e].name,
    //           role: organizersObj.teamMem[e].role,
    //           picture: organizersObj.teamMem[e].picture,
    //           socialLink: organizersObj.teamMem[e].socialLink
    //         };
    //         teamMem.push(organizer);
    //       });
    //       this.setState({
    //         organizers: {
    //           background: organizersObj.background,
    //           title: organizersObj.title,
    //           teamMem
    //         }
    //       });
    //     }
    //   });

    getData('organizer').then(doc => {
      if (doc.exists) {
        this.setState({ organizers: doc.data() });
      }
    });

    getData('footer').then(doc => {
      if (doc.exists) {
        this.setState({ footer: doc.data() });
      }
    });

    getData('contact').then(doc => {
      if (doc.exists) {
        this.setState({ contact: doc.data() });
      }
    });
  }

  toggleVN() {
    this.setState({ isVN: true });
  }

  toggleEN() {
    this.setState({ isVN: false });
  }

  render() {
    const { footer, home, about, isVN } = this.state;
    return (
      <Router>
        <ScrollToTop>
          <div>
            <NavBar
              toggleVN={this.toggleVN.bind(this)}
              toggleEN={this.toggleEN.bind(this)}
              isVN={isVN}
            />
            <Route
              exact
              path="/"
              render={() => <Home isVN={isVN} home={home} />}
            />
            <Route path="/attend" render={() => <Conference isVN={isVN} />} />
            <Route path="/learn" render={() => <Learn isVN={isVN} />} />
            <Route
              path="/about"
              render={() => <About isVN={isVN} about={about} />}
            />
            <Route
              path="/organizers"
              render={() => <Organizers organizers={this.state.organizers} />}
            />
            <Route
              path="/contact"
              render={() => (
                <Contact isVN={isVN} contact={this.state.contact} />
              )}
            />
            <Footer isVN={isVN} footer={footer} />
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}

export default Main;
