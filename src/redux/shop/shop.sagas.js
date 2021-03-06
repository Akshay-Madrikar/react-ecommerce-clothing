import { takeLatest, call, put, all } from 'redux-saga/effects';

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
    yield takeLatest( 
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync 
    );
}

export function* shopSagas() {
    yield all([
        call( fetchCollectionsStart )
    ]);
}