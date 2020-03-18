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

export const createUserProfileDocument = async ( userAuth, additionalData ) => {

    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const{displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('Error creating user', error.message);
        }
    }

    return userRef;
 };

firebase.initializeApp( config );

export const addCollectionsAndDocuments = async ( collectionKey, objectsToAdd ) => {
    const collectionRef = firestore.collection( collectionKey );
    console.log( collectionRef );

    const batch = firestore.batch();
    objectsToAdd.forEach( obj => {
        const newDocRef = collectionRef.doc();
        batch.set( newDocRef, obj );
    });

    return await batch.commit();

};

export const convertCollectionSnapshotToMap = ( collections ) => {
    const transformedCollection  = collections.docs.map( doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI( title.toLowerCase() ),
            id: doc.id,
            title,
            items
        };
    } );
    return transformedCollection.reduce( ( accumulator, collection ) => {
        accumulator[ collection.title.toLowerCase() ] = collection;
        return accumulator;
    }, {})
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters( { prompt: 'select_account' } );
export const signInWithGoogle = () => auth.signInWithPopup( provider );

export default firebase;