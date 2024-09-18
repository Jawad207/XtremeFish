import {
  DashActionTypes,
  GET_COUNT_INIT,
  GET_COUNT_FAILURE,
  GET_COUNT_SUCCESS,
} from "../types";

interface DashState {
  userCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: DashState = {
  userCount: 0,
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

    default:
      return state;
  }
};
