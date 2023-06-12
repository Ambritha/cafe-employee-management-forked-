import { combineReducers } from "redux";
import cafeReducer from "./reducers/cafeReducer";
import employeeReducer from "./reducers/employeeReducer";

const rootReducer = combineReducers({
  cafes: cafeReducer,
  employees: employeeReducer,
});
export default rootReducer;
