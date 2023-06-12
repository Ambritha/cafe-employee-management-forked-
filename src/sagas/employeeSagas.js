import { takeEvery, put, call } from "redux-saga/effects";
import { fetchEmployees } from "../actions/employeeActions";
import { getEmployees } from "../api";

function* fetchEmployeesSaga() {
  try {
    const employees = yield call(getEmployees); // Make the API call using the getEmployees function from the API file
  } catch (error) {}
}

export function* watchEmployeeActions() {
  yield takeEvery(fetchEmployees, fetchEmployeesSaga);
}
