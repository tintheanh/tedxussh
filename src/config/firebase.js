import firebase from 'firebase';

export const getData = (path, callback) =>
  firebase
    .database()
    .ref(path)
    .once('value', data => callback(data));
