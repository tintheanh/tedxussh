import React from 'react';
import firebase from 'firebase';
import LoggedIn from './LoggedIn/loggedIn';
import LoggedOut from './LoggedOut/loggedOut';
import './style.css';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      email: '',
      password: '',
      title: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ auth: true }, () => console.log(this.state.auth));
      } else {
        this.setState({ auth: false }, () => console.log(this.state.auth));
      }
    });
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

  login() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({
          email: '',
          password: ''
        });
        alert('login successfully');
      })
      .catch(err => {
        console.error(err);
        alert('error occured');
      });
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
    return this.state.auth ? <LoggedIn /> : <LoggedOut />;
  }
}

export default Admin;
