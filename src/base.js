import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC5nyHYvMpcqm8Pkzk8_-9zue2J6QGA0bg",
  authDomain: "coinoftheday.firebaseapp.com",
  databaseURL: "https://coinoftheday.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;