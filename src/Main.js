import React from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NavBar from './NavBar/navBar';
import Home from './Home/home';
import Conference from './Events/Conference/conference';
import Salons from './Events/Salons/salons';
import Learn from './Learn/learn'
import Footer from './Footer/footer';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home: {},
      // conference: {},
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

    // firebase
    //   .database()
    //   .ref('conference')
    //   .on('value', snapshot =>
    //     this.setState({ conference: snapshot.val() }, () =>
    //       console.log(this.state.conference)
    //     )
    //   );

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
    const { footer, home } = this.state;
    return (
      <Router>
        <div>
          <NavBar />
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/" render={() => <Home home={home} />} />
          <Route
            path="/conference"
            component={Conference}
          />
          <Route path="/salons" component={Salons} />
          <Route path="/learn" component={Learn} />
          <Footer {...footer} />
        </div>
      </Router>
    );
  }
}

export default Main;
