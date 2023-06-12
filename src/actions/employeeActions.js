import {
  FETCH_EMPLOYEES,
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
} from "./types";
import * as api from "../api";

export const fetchEmployees = () => async (dispatch) => {
  try {
    const employees = await api.getEmployees();
    dispatch({ type: FETCH_EMPLOYEES, payload: employees });
  } catch (error) {
    console.error("Failed to fetch employees:", error.message);
  }
};

export const addEmployee = (employee) => async (dispatch) => {
  try {
    const newEmployee = await api.addEmployee(employee);
    dispatch({ type: ADD_EMPLOYEE, payload: newEmployee });
  } catch (error) {
    console.error("Failed to add employee:", error.message);
  }
};

export const updateEmployee = (id, employee) => async (dispatch) => {
  try {
    const updateEmployee = await api.updateEmployee(id, employee);
    dispatch({ type: UPDATE_EMPLOYEE, payload: updateEmployee });
  } catch (error) {
    console.error("Failed to update employee:", error.message);
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    await api.deleteEmployee(id);
    dispatch({ type: DELETE_EMPLOYEE, payload: id });
  } catch (error) {
    console.error("Failed to delete employee:", error.message);
  }
};
