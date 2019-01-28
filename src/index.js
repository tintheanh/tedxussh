import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import 'react-datepicker/dist/react-datepicker.css';
import { ParallaxProvider } from 'react-scroll-parallax';
import config from './config/initializeFirebase';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

firebase.initializeApp(config);

ReactDOM.render(
  <ParallaxProvider>
    <App />
  </ParallaxProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

serviceWorker.unregister();
