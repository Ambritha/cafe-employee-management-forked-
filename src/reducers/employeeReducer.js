import {
  FETCH_EMPLOYEES,
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE
} from "../actions/types";

const initialState = [];

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      // Implement fetch employees logic
      return state;
    case ADD_EMPLOYEE:
      // Implement add employee logic
      return state;
    case UPDATE_EMPLOYEE:
      // Implement update employee logic
      return state;
    case DELETE_EMPLOYEE:
      // Implement delete employee logic
      return state;
    default:
      return state;
  }
};

export default employeeReducer;
