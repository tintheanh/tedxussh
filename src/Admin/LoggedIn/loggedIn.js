import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Header/header'
import LeftSideBar from './LeftSideBar/leftSideBar'
import ConferenceList from './Management/ConferenceList/conferenceList'
import LearnSection from './Management/LearnSection/learnSection'
import FooterSection from './Management/FooterSection/footerSection'
import HomeSection from './Management/HomeSection/homeSection'
import AboutSection from './Management/AboutSection/aboutSection'
import ImageSection from './Management/ImageSection/imageSection'
import GetEventUpdateSection from './Management/GetEventUpdateSection/getEventUpdateSection'
import Organizers from './Management/OrganizersSection/organizersSection'
import ContactSection from './Management/ContactSection/contactSection'

const LoggedIn = () => (
  <Router>
    <div>
      <Header />
      <LeftSideBar />
      <Route exact path="/admin" component={HomeSection} />
      <Route path="/admin/conference" component={ConferenceList} />
      <Route path="/admin/learn" component={LearnSection} />
      <Route path="/admin/footer" component={FooterSection} />
      <Route path="/admin/home" component={HomeSection} />
      <Route path="/admin/about" component={AboutSection} />
      <Route path="/admin/images" component={ImageSection} />
      <Route path="/admin/get-event-update" component={GetEventUpdateSection} />
      <Route path="/admin/organizers" component={Organizers} />
      <Route path="/admin/contact" component={ContactSection} />
    </div>
  </Router>
)

export default LoggedIn
