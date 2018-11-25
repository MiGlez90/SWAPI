import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBqfptKu8-ZEMcfVhlisCRmoz_5eET8jao",
    authDomain: "swapi-api-react.firebaseapp.com",
    databaseURL: "https://swapi-api-react.firebaseio.com",
    projectId: "swapi-api-react",
    storageBucket: "swapi-api-react.appspot.com",
    messagingSenderId: "733614230801"
};

firebase.initializeApp(config);

const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});

export default db;
