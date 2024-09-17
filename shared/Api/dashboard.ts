import apiClient from "./ApiClient"; // Import the Axios instance

import {
  GET_COUNT_INIT,
  GET_COUNT_SUCCESS,
  GET_COUNT_FAILURE,
} from "../redux/types";

export const getAlluserCount = async (dispatch: any) => {
  try {
    dispatch({ type: GET_COUNT_INIT });
    const response = await apiClient.get("/dashboard/getAllUser");

    // If the request was successful
    if (response.status === 200) {
        console.log('response in here brother', response)
      dispatch({ type: GET_COUNT_SUCCESS, payload: response.data });
    }
    return response.data.TotalUser;
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: GET_COUNT_FAILURE,
        payload: error.response.data.message,
      });
      console.error("Login failed:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: GET_COUNT_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};
