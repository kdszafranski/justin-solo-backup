import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getBets(action) {

    try {
        const response = yield axios.get('/database/bets');
        console.log(response.data);
        yield put({ type: 'SET_BET_HISTORY', payload: response.data });

      } catch (error) {
        console.log('User get request failed', error);
      }
}

function* deleteBet(action) {
    try {
        yield axios.delete(`/database/bets/${action.payload}`)
        yield put({ type: 'GET_BET_HISTORY' });
    } catch (error) {
        console.log(error);
    }
}

function* getBetsSaga() {
    yield takeEvery('GET_BET_HISTORY', getBets);
    yield takeEvery('DELETE_BET', deleteBet)
}

export default getBetsSaga;