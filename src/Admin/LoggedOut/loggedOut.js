import React from 'react'
import firebase from 'firebase'
import './style.css'

export default class LoggedOut extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  login() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({
          email: '',
          password: ''
        })
        alert('login successfully')
      })
      .catch(err => alert(err.message))
  }

  render() {
    return (
      <div className="login-wrapper">
        <div id="loginbox">
          <form id="loginform" className="form-vertical" action="index.html">
            <div className="control-group">
              <div className="controls">
                <div className="main_input_box">
                  <span className="add-on bg_lg">
                    <i className="icon-user" />
                  </span>
                  <input type="text" placeholder="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="control-group">
              <div className="controls">
                <div className="main_input_box">
                  <span className="add-on bg_ly">
                    <i className="icon-lock" />
                  </span>
                  <input type="password" placeholder="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="form-actions" style={{ margin: 'auto', textAlign: 'center' }}>
              <span className="pull-right">
                <input className="btn btn-success" type="button" value="Login" onClick={this.login.bind(this)} />
              </span>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
