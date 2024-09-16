import apiClient from "./ApiClient"; // Import the Axios instance
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTERED_SUCCESS,
  REGISTERED_FAILURE,
  REGISTERED_INIT,
  LOGIN_INIT,
  FORGET_INIT,
  FORGET_SUCCESS,
  FORGET_FAILURE,
  OTP_INIT,
  OTP_SUCCESS,
  OTP_FAILURE,
  RESET_SUCCESS,
  RESET_FAILURE,
  RESET_INIT,
} from "../redux/types";
import { Dispatch } from "redux";

export const signIn = async (data: any, dispatch: any) => {
  try {
    dispatch({ type: LOGIN_INIT });
    const response = await apiClient.post("/auth/Sign-in", data);

    // If the request was successful
    if (response.status === 200) {
      console.log("Login successful:", response.data);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    }
    return response;
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response.data.message,
      });
      console.error("Login failed:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};

// Your signUp thunk action
export const signUp = async (data: any, dispatch: any) => {
  try {
    dispatch({ type: REGISTERED_INIT });
    const response = await apiClient.post("/auth/Sign-Up", data);
    if (response.status === 200) {
      console.log("response in here brother before reducer", response.data);

      dispatch({ type: REGISTERED_SUCCESS, payload: response.data });
      console.log("response in here brother after reducer", response.data);

      return response;
    }
  } catch (error: any) {
    if (error.response) {
      dispatch({
        type: REGISTERED_FAILURE,
        payload: error.response.data.message,
      });
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: REGISTERED_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};
export const ForgotPassword = async (email: any, dispatch: any) => {
  try {
    dispatch({ type: FORGET_INIT });
    const response = await apiClient.post("/auth/forgot-password", {
      email: email,
    });
    if (response.status === 200) {
      dispatch({ type: FORGET_SUCCESS, payload: response.data });
      return response;
    }
  } catch (error: any) {
    console.log("error in here", error);
    if (error.response) {
      dispatch({
        type: FORGET_FAILURE,
        payload: error.response.data.message,
      });
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: FORGET_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};
export const VerifyOtp = async (data: any, dispatch: any) => {
  try {
    dispatch({ type: OTP_INIT });
    const response = await apiClient.post("/auth/verify-otp", data);
    if (response.status === 200) {
      dispatch({ type: OTP_SUCCESS, payload: response.data });
      return response;
    }
  } catch (error: any) {
    if (error.response) {
      dispatch({
        type: OTP_FAILURE,
        payload: error.response.data.message,
      });
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: OTP_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};

export const ResetPassword = async (data: any, dispatch: any) => {
  try {
    dispatch({ type: RESET_INIT });
    const response = await apiClient.post("/auth/reset-password", data);
    if (response.status === 200) {
      dispatch({ type: RESET_SUCCESS, payload: response.data });
      return response;
    }
  } catch (error: any) {
    console.log("error in here", error);
    if (error.response) {
      dispatch({
        type: RESET_FAILURE,
        payload: error.response.data.message,
      });
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: RESET_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};
