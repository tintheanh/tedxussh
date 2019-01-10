import React from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NavBar from './NavBar/layout';
import Home from './Home/layout';
import Conference from './Events/Conference/layout';
import Salons from './Events/Salons/layout';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref('events')
      .on('value', snapshot => {
        const eventObj = snapshot.val();
        const events = [];
        if (eventObj) {
          Object.keys(eventObj).forEach(e => {
            const event = {
              id: e,
              title: eventObj[e].title
            };
            events.push(event);
          });
          this.setState({ events });
        }
      })
      .bind(this);
  }

  render() {
    console.log(this.state.events);
    return (
      <Router>
        <div>
          <NavBar />
          {/* <Route exact path="/" component={NavBar} /> */}
          <Route exact path="/" component={Home} />
          <Route path="/conference" component={Conference} />
          <Route path="/salons" component={Salons} />
        </div>
      </Router>
    );
  }
}

export default Main;
