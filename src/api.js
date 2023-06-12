import axios from "axios";

const API_URL = "https://3hjyx4-3001.csb.app/";

export const getCafes = async () => {
  try {
    const response = await axios.get(`${API_URL}/cafes`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const addCafe = async (cafe) => {
  try {
    const response = await axios.post(`${API_URL}/cafes`, cafe);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateCafe = async (id, cafe) => {
  try {
    const response = await axios.put(`${API_URL}/cafes/${id}`, cafe);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteCafe = async (id) => {
  try {
    await axios.delete(`${API_URL}/cafes/${id}`);
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/employees`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const addEmployee = async (employee) => {
  try {
    const response = await axios.post(`${API_URL}/employees`, cafe);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateEmployee = async (id, employee) => {
  try {
    const response = await axios.put(`${API_URL}/employees/${id}`, cafe);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
export const deleteEmployee = async (id) => {
  try {
    await axios.delete(`${API_URL}/employees/${id}`);
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
