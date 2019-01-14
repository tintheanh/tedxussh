import React from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NavBar from './NavBar/navBar';
import Home from './Home/home';
import Conference from './Events/Conference/conference';
import Salons from './Events/Salons/salons';
import Learn from './Learn/learn';
import About from './About/about';
import Footer from './Footer/footer';
import ScrollToTop from './ScrollToTop/scrollToTop';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home: {},
      about: {},
      footer: {}
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
          this.setState({ about: aboutObj });
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
  }

  render() {
    const { footer, home, about } = this.state;
    return (
      <Router>
        <ScrollToTop>
          <div>
            <NavBar />
            {/* <Route exact path="/" component={Home} /> */}
            <Route exact path="/" render={() => <Home home={home} />} />
            <Route path="/conference" component={Conference} />
            <Route path="/salons" component={Salons} />
            <Route path="/learn" component={Learn} />
            <Route path="/about" render={() => <About {...about} />} />
            <Footer {...footer} />
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}

export default Main;
