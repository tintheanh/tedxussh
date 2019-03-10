import React from 'react'
import firebase from 'firebase'
import LoggedIn from './LoggedIn/loggedIn'
import LoggedOut from './LoggedOut/loggedOut'
import './style.css'

export default class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: null
    }
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ auth: true })
      } else {
        this.setState({ auth: false })
      }
    })
  }

  render() {
    const { auth } = this.state
    if (auth !== null) {
      return auth ? <LoggedIn /> : <LoggedOut />
    }
    return null
  }
}
