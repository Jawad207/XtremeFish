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
  CREATE_URL_INIT,
  CREATE_URL_FAILURE,
  CREATE_URL_SUCCESS,
  GET_URLS_INIT,
  GET_URLS_SUCCESS,
  GET_URLS_FAILURE,
  GET_URL_INIT,
  GET_URL_SUCCESS,
  GET_URL_FAILURE,
  UPDATE_URL_INIT,
  UPDATE_URL_SUCCESS,
  UPDATE_URL_FAILURE,
  DELETE_URL_INIT,
  DELETE_URL_SUCCESS,
  DELETE_URL_FAILURE,
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
  GET_ACCOUNTS_INIT,
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNTS_FAILURE,
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATIONS_INIT,
  GET_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATIONS_INIT,
  DELETE_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATIONS_FAILURE,
  DELETE_ACCOUNTS_INIT,
  DELETE_ACCOUNTS_FAILURE,
  DELETE_ACCOUNTS_SUCCESS,
  CREATE_IP_FAILURE,
  CREATE_IP_INIT,
  CREATE_IP_SUCCESS,
  DELETE_IP_FAILURE,
  DELETE_IP_INIT,
  DELETE_IP_SUCCESS,
  GET_IP_FAILURE,
  GET_IP_INIT,
  GET_IP_SUCCESS,
  GET_TOPUSER_INIT,
  GET_TOPUSER_SUCCESS,
  GET_TOPUSER_FAILURE,
  GET_TODAY_COUNT_INIT,
  GET_TODAY_COUNT_SUCCESS,
  GET_TODAY_COUNT_FAILURE,
  GET_ACCOUNT_STATISTICS_INIT,
  GET_ACCOUNT_STATISTICS_SUCCESS,
  GET_ACCOUNT_STATISTICS_FAILURE,
} from "../redux/types";

export const getAlluserCount = async (dispatch: any) => {
  try {
    dispatch({ type: GET_COUNT_INIT });
    const response = await apiClient.get("/dashboard/getAllUser");

    // If the request was successful
    if (response.status === 200) {
      dispatch({ type: GET_COUNT_SUCCESS, payload: response.data });
    }
    return response?.data;
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
      // return error.message;
    }
  }
};
export const getTodayuserCount = async (dispatch: any) => {
  try {
    dispatch({ type: GET_TODAY_COUNT_INIT });
    const response = await apiClient.get("/dashboard/getTodayUsers");

    // If the request was successful
    if (response.status === 200) {
      dispatch({ type: GET_TODAY_COUNT_SUCCESS, payload: response.data });
    }
    return response?.data?.TotalUser;
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: GET_TODAY_COUNT_FAILURE,
        payload: error.response.data.message,
      });
      console.error("Counts failed:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: GET_TODAY_COUNT_FAILURE,
        payload: error.message,
      });
      // return error.message;
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

export const getPosts = async (dispatch: any) => {
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

export const deleteAccounts = async (data: any, dispatch: any) => {
  try {
    dispatch({ type: DELETE_ACCOUNTS_INIT });
    const response = await apiClient.delete("/dashboard/deleteAccount", {
      params: { id: data?.id },
    });

    // If the request was successful
    if (response.status === 200) {
      dispatch({ type: DELETE_ACCOUNTS_SUCCESS, payload: response.data });
    }
    return response.data.loginAttempts;
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: DELETE_ACCOUNTS_FAILURE,
        payload: error.response.data.message,
      });
      console.error("Login failed:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: DELETE_ACCOUNTS_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};

export const ThemeChanger = async (data: any, dispatch: any) => {
  try {
    dispatch({ type: "Theme_Changer", payload: data });
  } catch (error) {}
};
export const getAccounts = async (
  userId: any,
  page: number,
  limit: number,
  dispatch: any
) => {
  try {
    dispatch({ type: GET_ACCOUNTS_INIT });
    const response = await apiClient.get("/dashboard/getAccounts", {
      params: {
        id: userId,
        page,
        limit,
      },
    });

    if (response.status === 200) {
      
      const { accounts, accountsCount, totalPages, percentageChange } = response.data;
      // Dispatch success with payload containing accounts and pagination info
      dispatch({
        type: GET_ACCOUNTS_SUCCESS,
        payload: { accounts, accountsCount, currentPage: page,  },
      });

      return { accounts, totalAccounts: accountsCount, totalPages, percentageChange }; // Return necessary data
    }
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: GET_ACCOUNTS_FAILURE,
        payload: error.response.data.message,
      });
      console.error("Failed to fetch accounts:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: GET_ACCOUNTS_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};

export const getNotifications = async (dispatch: any) => {
  try {
    dispatch({ type: GET_NOTIFICATIONS_INIT });
    const response = await apiClient.get("/dashboard/getNotifications");

    // If the request was successful

    if (response.status === 200) {
      dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: response.data });
    }
    return response.data.loginAttempts;
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: GET_NOTIFICATIONS_FAILURE,
        payload: error.response.data.message,
      });
      console.error("Login failed:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: GET_NOTIFICATIONS_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};
export const deleteNotifications = async (data: any, dispatch: any) => {
  try {
    dispatch({ type: DELETE_NOTIFICATIONS_INIT });

    const response = await apiClient.patch(
      `/dashboard/deleteNotification`,
      {}, // Empty body since you're passing only params
      {
        params: { id: data?.id }, // Params go in the config object
      }
    );

    // If the request was successful

    if (response.status === 200) {
      dispatch({ type: DELETE_NOTIFICATIONS_SUCCESS, payload: response.data });
    }
    return response.data.loginAttempts;
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: DELETE_NOTIFICATIONS_FAILURE,
        payload: error.response.data.message,
      });
      console.error("Login failed:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: DELETE_NOTIFICATIONS_FAILURE,
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
    const response = await apiClient.patch(
      `/dashboard/updatePost`,
      {
        title: data?.title,
        description: data?.description,
        userId: data?.userId,
      },
      {
        params: { id: data?.id }, // Params are passed in the config object, separate from the body
      }
    );

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

export const createUrl = async (data: any, dispatch: any) => {
  try {
    dispatch({ type: CREATE_URL_INIT });
    const response = await apiClient.post("/dashboard/createUrl", data);

    // If the request was successful
    if (response.status === 200) {
      dispatch({ type: CREATE_URL_SUCCESS, payload: response.data });
    }
    return response.data.loginAttempts;
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: CREATE_URL_FAILURE,
        payload: error.response.data.message,
      });
      console.error("Login failed:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: CREATE_URL_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};

export const getUrl = async (urlId: string, dispatch: any) => {
  try {
    dispatch({ type: GET_URL_INIT });
    const response = await apiClient.get(`/dashboard/getUrl/${urlId}`);

    // If the request was successful
    if (response.status === 200) {
      dispatch({ type: GET_URL_SUCCESS, payload: response.data });
    }
    return response.data; // Return the URL for further use if needed
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: GET_URL_FAILURE,
        payload: error.response.data.message,
      });
      console.error("Get URL failed:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: GET_URL_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};

export const getUrls = async (dispatch: any) => {
  try {
    dispatch({ type: GET_URLS_INIT });
    const response = await apiClient.get("/dashboard/getUrls");

    // If the request was successful
    if (response.status === 200) {
      dispatch({ type: GET_URLS_SUCCESS, payload: response.data });
    }
    return response.data; // Return the URLs for further use if needed
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: GET_URLS_FAILURE,
        payload: error.response.data.message,
      });
      console.error("Get URLs failed:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: GET_URLS_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};

export const updateUrl = async (data: any, dispatch: any) => {
  try {
    dispatch({ type: UPDATE_URL_INIT });
    const response = await apiClient.patch(`/dashboard/updateUrl`, data, {
      params: { id: data?.id },
    });

    // If the request was successful
    if (response.status === 200) {
      dispatch({ type: UPDATE_URL_SUCCESS, payload: response.data });
    }
    return response.data; // Return the updated URL data for further use if needed
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: UPDATE_URL_FAILURE,
        payload: error.response.data.message,
      });
      console.error("Update URL failed:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: UPDATE_URL_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};

export const deleteUrl = async (data: any, dispatch: any) => {
  try {
    dispatch({ type: DELETE_URL_INIT });
    const response = await apiClient.delete("/dashboard/deleteUrl", {
      params: { id: data?.id },
    });

    // If the request was successful
    if (response.status === 200) {
      dispatch({ type: DELETE_URL_SUCCESS, payload: response.data });
    }
    return response.data.loginAttempts; // or whatever relevant data you need
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: DELETE_URL_FAILURE,
        payload: error.response.data.message || "Error deleting URL",
      });
      console.error(
        "Delete URL failed:",
        error.response.data.message || "Error deleting URL"
      );
      return error.response.data.message || "Error deleting URL";
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: DELETE_URL_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};

export const createIp = async (data: any, dispatch: any) => {
  try {
    dispatch({ type: CREATE_IP_INIT });
    const response = await apiClient.post("/dashboard/postIp", data); //data will be {blockerId: user?._id, ip: that user enter}

    // If the request was successful
    if (response.status === 200) {
      dispatch({ type: CREATE_IP_SUCCESS, payload: response.data });
    }
    return response.data.loginAttempts;
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: CREATE_IP_FAILURE,
        payload: error.response.data.message,
      });
      console.error("Login failed:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: CREATE_IP_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};

export const getIps = async (dispatch: any) => {
  try {
    dispatch({ type: GET_IP_INIT });
    const response = await apiClient.get(`/dashboard/getIps`);

    // If the request was successful
    if (response.status === 200) {
      dispatch({ type: GET_IP_SUCCESS, payload: response.data });
    }
    return response.data; // Return the ips for further use if needed
  } catch (error: any) {
    if (error.response) {
      dispatch({
        type: GET_IP_FAILURE,
        payload: error.response.data.message,
      });
      console.error("Get ip failed:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: GET_IP_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};

export const deleteIp = async (data: any, dispatch: any) => {
  try {
    dispatch({ type: DELETE_IP_INIT });
    const response = await apiClient.delete("/dashboard/deleteIp", {
      params: { id: data?.id },
    });

    // If the request was successful
    if (response.status === 200) {
      dispatch({ type: DELETE_IP_SUCCESS, payload: response.data });
    }
    return response.data.loginAttempts; // or whatever relevant data you need
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: DELETE_IP_FAILURE,
        payload: error.response.data.message || "Error deleting Ip",
      });
      console.error(
        "Delete Ip failed:",
        error.response.data.message || "Error deleting Ip"
      );
      return error.response.data.message || "Error deleting Ip";
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: DELETE_IP_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};

export const getTopUser = async (dispatch: any) => {
  try {
    dispatch({ type: GET_TOPUSER_INIT });
    const response = await apiClient.get(`/dashboard/getTopUsers`);

    // If the request was successful
    if (response.status === 200) {
      dispatch({ type: GET_TOPUSER_SUCCESS, payload: response.data });
    }

    return response.data;
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: GET_TOPUSER_FAILURE,
        payload: error.response.data.message,
      });
      console.error("Get top users failed:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: GET_TOPUSER_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};

export const getAccountsStatistics = async (dispatch: any) => {
  try {
    dispatch({ type: GET_ACCOUNT_STATISTICS_INIT });
    const response = await apiClient.get(`/dashboard/getaccountstatistics`);

    // If the request was successful
    if (response.status === 200) {
      dispatch({
        type: GET_ACCOUNT_STATISTICS_SUCCESS,
        payload: response.data,
      });
    }

    return response.data;
  } catch (error: any) {
    // Handle server or network errors
    if (error.response) {
      dispatch({
        type: GET_ACCOUNT_STATISTICS_FAILURE,
        payload: error.response.data.message,
      });
      console.error("Get ACCOUNT STATICS failed:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error:", error.message);
      dispatch({
        type: GET_ACCOUNT_STATISTICS_FAILURE,
        payload: error.message,
      });
      return error.message;
    }
  }
};
