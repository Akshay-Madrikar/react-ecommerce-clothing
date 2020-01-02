import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBL1JK_Ie61RMpuVU60-Z-Oq4azE0WINsg",
    authDomain: "crwn-db-18616.firebaseapp.com",
    databaseURL: "https://crwn-db-18616.firebaseio.com",
    projectId: "crwn-db-18616",
    storageBucket: "crwn-db-18616.appspot.com",
    messagingSenderId: "47452577604",
    appId: "1:47452577604:web:7fc54c6858d1020a5c4111",
    measurementId: "G-6MC6LNJVGT"
};

firebase.initializeApp( config );

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters( { prompt: 'select_account' } );
export const signInWithGoogle = () => auth.signInWithPopup( provider );

export default firebase;