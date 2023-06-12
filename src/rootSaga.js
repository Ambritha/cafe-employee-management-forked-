import { all } from "redux-saga/effects";
import { watchCafeActions } from "./sagas/cafeSagas";
import { watchEmployeeActions } from "./sagas/employeeSagas";

export default function* rootSaga() {
  yield all([watchCafeActions(), watchEmployeeActions()]);
}
