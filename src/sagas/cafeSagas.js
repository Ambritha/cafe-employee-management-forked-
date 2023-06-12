import { takeEvery, put, call } from "redux-saga/effects";
import { fetchCafes } from "../actions/cafeActions";
import { getCafes } from "../api";

function* fetchCafesSaga() {
  try {
    const cafes = yield call(getCafes); // Make the API call using the getCafes function from the API file
  } catch (error) {
    // Handle error
  }
}

export function* watchCafeActions() {
  yield takeEvery(fetchCafes, fetchCafesSaga);
}
