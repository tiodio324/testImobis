import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyAD3_R5T7MZHRrPFP3x-7g0mPBhAvVdyHg",
    authDomain: "testimobis.firebaseapp.com",
    databaseURL: "https://testimobis-default-rtdb.firebaseio.com",
    projectId: "testimobis",
    storageBucket: "testimobis.firebasestorage.app",
    messagingSenderId: "974129113949",
    appId: "1:974129113949:web:aa506bd2893d95bf1516b4"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };