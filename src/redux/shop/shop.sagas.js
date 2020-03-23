import { takeEvery, call, put } from 'redux-saga/effects';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {

    try {
        const collectionRef = firestore.collection('collections');
        const snapShot = yield collectionRef.get();
        const collectionsMap = yield call( convertCollectionSnapshotToMap, snapShot );

        yield put( fetchCollectionsSuccess( collectionsMap ) );
    } catch( error ) {
        yield put( fetchCollectionsFailure( error.message ) );
    }

    // ------ Thunk example ---------
    //     collectionRef.get().then(snapShot => {
    //         const collectionsMap = convertCollectionSnapshotToMap( snapShot );
    //         dispatch( fetchCollectionsSuccess( collectionsMap ) );
    // } ).catch( error => dispatch( fetchCollectionsFailure( error.message ) ) );
}

export function* fetchCollectionsStart() {
    yield takeEvery( 
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync 
    );
}