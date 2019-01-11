import React from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './Header/layout';
import LeftSideBar from './LeftSideBar/layout';
import ConferenceList from './Management/ConferenceList/layout';
import SalonList from './Management/SalonList/layout';
import FooterSection from './Management/FooterSection/layout';
import HomeSection from './Management/HomeSection/layout';

class LoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const eventsRef = firebase.database().ref('events');
    const data = {
      title: this.state.title
    };
    eventsRef
      .push(data)
      .then(() => alert('added successfully'))
      .catch(err => {
        console.error(err);
        alert('error occured');
      });
    event.preventDefault();
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => alert('You have been logged out.'))
      .catch(err => {
        console.error(err);
        alert('error occured');
      });
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <LeftSideBar />
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/admin" component={ConferenceList} />
          <Route path="/admin/conference" component={ConferenceList} />
          <Route path="/admin/salons" component={SalonList} />
          <Route path="/admin/footer" component={FooterSection} />
          <Route path="/admin/home" component={HomeSection} />
        </div>
      </Router>
    );
  }
}

export default LoggedIn;
