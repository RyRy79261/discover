// This file is just a stub showing a sample Api request saga.
// For more information on Saga see: https://redux-saga.js.org/

import { fork } from 'redux-saga/effects';
import { defaultListener } from './sagas/default.saga';

export default function* DappsSaga() {
  yield fork(defaultListener);
}
