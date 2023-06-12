import {
  FETCH_CAFES,
  ADD_CAFE,
  UPDATE_CAFE,
  DELETE_CAFE
} from "../actions/types";

const initialState = [];

const cafeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CAFES:
      // Implement fetch cafes logic
      return state;
    case ADD_CAFE:
      // Implement add cafe logic
      return state;
    case UPDATE_CAFE:
      // Implement update cafe logic
      return state;
    case DELETE_CAFE:
      // Implement delete cafe logic
      return state;
    default:
      return state;
  }
};

export default cafeReducer;
