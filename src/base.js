import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyD3WGkX435xj3FLxhGN8zUXcJ1TbS5Pi6o",
    authDomain: "crypto-d4cf9.firebaseapp.com",
    databaseURL: "https://crypto-d4cf9.firebaseio.com",
    projectId: "crypto-d4cf9",
    storageBucket: "crypto-d4cf9.appspot.com",
    messagingSenderId: "582257754458"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;