import React from 'react';
import firebase from 'firebase';

class LoggedOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
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

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="email"
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
        />
        <input type="button" value="Login" onClick={this.login.bind(this)} />
      </form>
    );
  }
}

export default LoggedOut;
