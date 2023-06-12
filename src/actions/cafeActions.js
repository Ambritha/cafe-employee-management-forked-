import { FETCH_CAFES, ADD_CAFE, UPDATE_CAFE, DELETE_CAFE } from "./types";
import * as api from "../api";

export const fetchCafes = () => async (dispatch) => {
  try {
    const cafes = await api.getCafes();
    dispatch({ type: FETCH_CAFES, payload: cafes });
  } catch (error) {
    console.error("Failed to fetch cafes:", error.message);
  }
};

export const addCafe = (cafe) => async (dispatch) => {
  try {
    const newCafe = await api.addCafe(cafe);
    dispatch({ type: ADD_CAFE, payload: newCafe });
  } catch (error) {
    console.error("Failed to add cafe:", error.message);
  }
};

export const updateCafe = (id, cafe) => async (dispatch) => {
  try {
    const updatedCafe = await api.updateCafe(id, cafe);
    dispatch({ type: UPDATE_CAFE, payload: updatedCafe });
  } catch (error) {
    console.error("Failed to update cafe:", error.message);
  }
};

export const deleteCafe = (id) => async (dispatch) => {
  try {
    await api.deleteCafe(id);
    dispatch({ type: DELETE_CAFE, payload: id });
  } catch (error) {
    console.error("Failed to delete cafe:", error.message);
  }
};
