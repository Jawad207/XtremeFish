import apiClient from "./ApiClient"; // Import the Axios instance

import {
  GET_COUNT_INIT,
  GET_COUNT_SUCCESS,
  GET_COUNT_FAILURE,
  GET_LOGINATTEMPT_FAILURE,
  GET_LOGINATTEMPT_SUCCESS,
  GET_LOGINATTEMPT_INIT,
  CREATE_POST_INIT,
  CREATE_POST_FAILURE,
  CREATE_POST_SUCCESS,
  GET_POST_INIT,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  GET_POSTS_INIT,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  UPDATE_POST_INIT,
  UPDATE_POST_FAILURE,
  UPDATE_POST_SUCCESS,
  DELETE_POST_INIT,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
} from "../redux/types";

export const getAlluserCount = async (dispatch: any) => {
  try {
    dispatch({ type: GET_COUNT_INIT });
    const response = await apiClient.get("/dashboard/getAllUser");

    // If the request was successful
    if (response.status === 200) {
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

export const createPost = async (data: any, dispatch: any) => {
  try {
    dispatch({ type: CREATE_POST_INIT });
    const response = await apiClient.post("/dashboard/createPost", data);

    // If the request was successful
    if (response.status === 200) {
      dispatch({ type: CREATE_POST_SUCCESS, payload: response.data });
    }
    return response.data.loginAttempts;
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: CREATE_POST_FAILURE,
        payload: error.response.data.message,
      });
      console.error("Login failed:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: CREATE_POST_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};
export const getPosts = async (data: any, dispatch: any) => {
  try {
    dispatch({ type: GET_POSTS_INIT });
    const response = await apiClient.get("/dashboard/getPosts");

    // If the request was successful
    if (response.status === 200) {
      dispatch({ type: GET_POSTS_SUCCESS, payload: response.data });
    }
    return response.data.loginAttempts;
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: GET_POSTS_FAILURE,
        payload: error.response.data.message,
      });
      console.error("Login failed:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: GET_POSTS_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};
export const getPostsById = async (data: any, dispatch: any) => {
  try {
    dispatch({ type: GET_POST_INIT });
    const response = await apiClient.get("/dashboard/getPost", {
      params: { id: data?.id },
    });

    // If the request was successful
    if (response.status === 200) {
      dispatch({ type: GET_POST_SUCCESS, payload: response.data });
    }
    return response.data.loginAttempts;
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: GET_POST_FAILURE,
        payload: error.response.data.message,
      });
      console.error("Login failed:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: GET_POST_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};
export const updatePost = async (data: any, dispatch: any) => {
  try {
    dispatch({ type: UPDATE_POST_INIT });
    const response = await apiClient.put("/dashboard/updatePost", {
      params: { id: data?.id },
    });

    // If the request was successful
    if (response.status === 200) {
      dispatch({ type: UPDATE_POST_SUCCESS, payload: response.data });
    }
    return response.data.loginAttempts;
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: UPDATE_POST_FAILURE,
        payload: error.response.data.message,
      });
      console.error("Login failed:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: UPDATE_POST_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};
export const deletePost = async (data: any, dispatch: any) => {
  try {
    dispatch({ type: DELETE_POST_INIT });
    const response = await apiClient.delete("/dashboard/deletepost", {
      params: { id: data?.id },
    });

    // If the request was successful
    if (response.status === 200) {
      dispatch({ type: DELETE_POST_SUCCESS, payload: response.data });
    }
    return response.data.loginAttempts;
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: DELETE_POST_FAILURE,
        payload: error.response.data.message,
      });
      console.error("Login failed:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: DELETE_POST_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};
export const getLoginAttempts = async (data: any, dispatch: any) => {
  try {
    dispatch({ type: GET_LOGINATTEMPT_INIT });
    const response = await apiClient.get("/dashboard/getLoginAttempts", {
      params: { id: data?.id, page: data?.page, limit: data?.limit },
    });

    // If the request was successful
    if (response.status === 200) {
      dispatch({ type: GET_LOGINATTEMPT_SUCCESS, payload: response.data });
    }
    return response.data.loginAttempts;
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: GET_LOGINATTEMPT_FAILURE,
        payload: error.response.data.message,
      });
      console.error("Login failed:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: GET_LOGINATTEMPT_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};
