import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const config = {
  apiKey: 'AIzaSyBtQ7Qt_tHfIpZTSvEAluq2-74WjbwZlJk',
  authDomain: 'tedxussh-e39fb.firebaseapp.com',
  databaseURL: 'https://tedxussh-e39fb.firebaseio.com',
  projectId: 'tedxussh-e39fb',
  storageBucket: 'tedxussh-e39fb.appspot.com',
  messagingSenderId: '72017848214'
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

serviceWorker.unregister();
