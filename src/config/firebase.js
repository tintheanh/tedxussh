import firebase from 'firebase'
import 'firebase/firestore'
import * as c from './constants'

const config = {
  apiKey: c.FIREBASE_API_KEY,
  authDomain: c.FIREBASE_AUTH_DOMAIN,
  databaseURL: c.FIREBASE_DATABASE_URL,
  projectId: c.FIREBASE_PROJECT_ID,
  storageBucket: c.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: c.FIREBASE_MESSAGING_SENDER_ID
}

firebase.initializeApp(config)

const settings = { timestampsInSnapshots: true }
firebase.firestore().settings(settings)

export const database = firebase.firestore()

export const root = database.collection('tedxhcmussh-data')

export const getData = path => root.doc(path).get()

export const getDataRealtime = (path, callback) => root.doc(path).onSnapshot(doc => callback(doc))

export const getListRealtime = (path, collection, order, callback) =>
  root
    .doc(path)
    .collection(collection)
    .orderBy(order)
    .onSnapshot(res => callback(res))

export const updateData = (path, update) => root.doc(path).set(update, { merge: true })

export const updateUnitData = (path, collection, id, update) =>
  root
    .doc(path)
    .collection(collection)
    .doc(id)
    .set(update, { merge: true })

export const addUnit = (path, collection, data) =>
  root
    .doc(path)
    .collection(collection)
    .add(data)

export const deleteUnitData = (path, collection, id) =>
  root
    .doc(path)
    .collection(collection)
    .doc(id)
    .delete()

export const getPost = postID =>
  root
    .doc('learn')
    .collection('posts')
    .doc(postID)
    .get()

export const addPost = (postID, post) =>
  root
    .doc('learn')
    .collection('posts')
    .doc(postID)
    .set(post)
