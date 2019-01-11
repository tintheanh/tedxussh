import React from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NavBar from './NavBar/layout';
import Home from './Home/layout';
import Conference from './Events/Conference/layout';
import Salons from './Events/Salons/layout';
import Footer from './Footer/layout';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home: {},
      conference: {},
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
      .ref('conference')
      .on('value', snapshot =>
        this.setState({ conference: snapshot.val() }, () =>
          console.log(this.state.conference)
        )
      );

    firebase
      .database()
      .ref('footer')
      .on('value', snapshot =>
        this.setState({ footer: snapshot.val() }, () =>
          console.log(this.state.footer)
        )
      );
  }

  render() {
    const { footer, home, conference } = this.state;
    return (
      <Router>
        <div>
          <NavBar />
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/" render={() => <Home home={home} />} />
          <Route
            path="/conference"
            render={() => <Conference conference={conference} />}
          />
          <Route path="/salons" component={Salons} />
          <Footer {...footer} />
        </div>
      </Router>
    );
  }
}

export default Main;
