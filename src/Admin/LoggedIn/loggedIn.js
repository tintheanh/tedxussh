import React from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './Header/header';
import LeftSideBar from './LeftSideBar/leftSideBar';
import ConferenceList from './Management/ConferenceList/conferenceList';
import LearnSection from './Management/LearnSection/learnSection';
import FooterSection from './Management/FooterSection/footerSection';
import HomeSection from './Management/HomeSection/homeSection';
import AboutSection from './Management/AboutSection/aboutSection';
import ImageSection from './Management/ImageSection/imageSection';
import GetEventUpdateSection from './Management/GetEventUpdateSection/getEventUpdateSection';
import Organizers from './Management/OrganizersSection/organizersSection';
import ContactSection from './Management/ContactSection/contactSection';

class LoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState(
      { width: window.innerWidth, height: window.innerHeight },
      () => console.log(this.state.width, this.state.height)
    );
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
          <Route exact path="/admin" component={HomeSection} />
          <Route path="/admin/conference" component={ConferenceList} />
          <Route path="/admin/learn" component={LearnSection} />
          <Route path="/admin/footer" component={FooterSection} />
          <Route path="/admin/home" component={HomeSection} />
          <Route path="/admin/about" component={AboutSection} />
          <Route path="/admin/images" component={ImageSection} />
          <Route
            path="/admin/get-event-update"
            component={GetEventUpdateSection}
          />
          <Route path="/admin/organizers" component={Organizers} />
          <Route path="/admin/contact" component={ContactSection} />
        </div>
      </Router>
    );
  }
}

export default LoggedIn;
