import {
  DashActionTypes,
  GET_COUNT_INIT,
  GET_COUNT_FAILURE,
  GET_COUNT_SUCCESS,
  GET_LOGINATTEMPT_FAILURE,
  GET_LOGINATTEMPT_INIT,
  GET_LOGINATTEMPT_SUCCESS
} from "../types";

interface LoginAttempt {
  _id: any
  status: string,
  userId: string,
  description: string,
  timestamp: Date
}
interface DashState {
  userCount: number;
  loading: boolean;
  totalPages: number,
  currentPage: number,
  loginAttempts: LoginAttempt[],
  error: string | null;
}

const initialState: DashState = {
  userCount: 0,
  loginAttempts: [],
  totalPages: 1,
  currentPage: 1,
  loading: false,
  error: null,
};

export const dashReducer = (
  state = initialState,
  action: DashActionTypes
): DashState => {
  switch (action.type) {
    case GET_COUNT_INIT:
      return {
        ...state,
        loading: true,
      };
    case GET_COUNT_FAILURE:
      return {
        ...state,
        userCount: action.payload,
        loading: false,

        error: null,
      };
    case GET_COUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_LOGINATTEMPT_INIT:
      return {
        ...state,
        loading: true,
      };
    case GET_LOGINATTEMPT_SUCCESS:
      return {
        ...state,
        totalPages: action?.payload?.totalPages,
        currentPage: action?.payload?.currentPage,
        loginAttempts: action.payload?.loginAttempts,
        loading: false,
        error: null,
      };
    case GET_LOGINATTEMPT_FAILURE:
      return {
        ...state,
        loading: false,
        loginAttempts: [],
        error: action.payload,
      };
      //FROM HERE
    

    default:
      return state;
  }
};
