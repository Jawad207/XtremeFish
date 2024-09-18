import apiClient from "../Api/ApiClient";

export const ThemeChanger = (value: any) => async (dispatch: any) => {
  dispatch({
    type: "ThemeChanger",
    payload: value,
  });
};

export const testreducer = (value: any) => async (dispatch: any) => {
  try {
    // Initiate the register process
    dispatch({ type: "REGISTERED_INIT" });

    // Make the API call
    const response = await apiClient.post("/auth/Sign-Up", value);

    // If the API call is successful, dispatch the success action
    if (response.status === 200) {
      console.log("response in here brother before reducer", response.data);

      dispatch({ type: "REGISTERED_SUCCESS", payload: response.data });

      console.log("response in here brother after reducer", response.data);

      return response;
    }
  } catch (error: any) {
    // If there's an error from the API
    if (error.response) {
      dispatch({
        type: "REGISTERED_FAILURE",
        payload: error.response.data.message,
      });
      return error.response.data.message;
    } else {
      // Handle any other errors
      console.error("Error:", error.message);
      dispatch({
        type: "REGISTERED_FAILURE",
        payload: error.message,
      });
      return error.message;
    }
  }
};
