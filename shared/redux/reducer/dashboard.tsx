import {
  DashActionTypes,
  GET_COUNT_INIT,
  GET_COUNT_FAILURE,
  GET_COUNT_SUCCESS,
  GET_LOGINATTEMPT_FAILURE,
  GET_LOGINATTEMPT_INIT,
  GET_LOGINATTEMPT_SUCCESS,
  GET_POSTS_INIT,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  CREATE_POST_INIT,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  GET_POST_INIT,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  UPDATE_POST_INIT,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST_INIT,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  GET_ACCOUNTS_FAILURE,
  GET_ACCOUNTS_INIT,
  GET_ACCOUNTS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATIONS_INIT,
  GET_NOTIFICATIONS_SUCCESS,
} from "../types";

interface LoginAttempt {
  _id: any;
  status: string;
  userId: string;
  description: string;
  timestamp: Date;
}
interface Posts {
  _id: any;
  status: string;
  user: any;
  description: string;
  title: string;
}
interface DashState {
  userCount: number;
  loading: boolean;
  totalPages: number;
  currentPage: number;
  loginAttempts: LoginAttempt[];
  error: string | null;
  posts: Posts[];
  post: null;
  accounts: any;
  notifications: any;
}

const initialState: DashState = {
  userCount: 0,
  loginAttempts: [],
  totalPages: 1,
  currentPage: 1,
  loading: false,
  error: null,
  posts: [],
  post: null,
  accounts: [],
  notifications: [],
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

    case GET_POSTS_INIT:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action?.payload,
      };

    case GET_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_POST_INIT:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.payload],
      };

    case CREATE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_POST_INIT:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
      };

    case GET_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_POST_INIT:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case UPDATE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_POST_INIT:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DELETE_POST_SUCCESS:
      console.log("deleted post", action?.payload);
      return {
        ...state,
        loading: false,
        posts: state.posts.filter(
          (post) => post._id !== action.payload.post._id
        ),
      };

    case DELETE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_ACCOUNTS_INIT:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: action.payload,
      };

    case GET_ACCOUNTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_NOTIFICATIONS_INIT:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: action.payload,
      };

    case GET_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
