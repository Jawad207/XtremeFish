import {
  AuthActionTypes,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTERED_SUCCESS,
  REGISTERED_FAILURE,
  LOGIN_INIT,
  REGISTERED_INIT,
  LOGOUT,
  EDIT_PROFILE_FAILURE,
  EDIT_PROFILE_INIT,
  EDIT_PROFILE_SUCCESS,
} from "../types";

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  token: any;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  token: null,
  error: null,
};

export const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case LOGIN_INIT:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: action?.payload?.token,
        user: action?.payload?.user,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        token: null,
        error: null,
      };

    case REGISTERED_INIT:
      return {
        ...state,
        loading: true,
      };
    case REGISTERED_SUCCESS:
      return {
        ...state,
        // isAuthenticated: true,
        loading: false,
        // token: action.payload.token,
        // user: action.payload.user,
        error: null,
      };
    case REGISTERED_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case EDIT_PROFILE_INIT:
      return {
        ...state,
        loading: true,
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
        error: null,
      };
    case EDIT_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
