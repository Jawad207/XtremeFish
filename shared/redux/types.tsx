export const LOGIN_INIT = "LOGIN_INIT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT = "LOGOUT";

export const REGISTERED_INIT = "REGISTERED_INIT";
export const REGISTERED_SUCCESS = "REGISTERED_SUCCESS";
export const REGISTERED_FAILURE = "REGISTERED_FAILURE";

export const FORGET_INIT = "FORGET_INIT";
export const FORGET_SUCCESS = "FORGET_SUCCESS";
export const FORGET_FAILURE = "FORGET_FAILURE";

export const OTP_INIT = "OTP_INIT";
export const OTP_SUCCESS = "OTP_SUCCESS";
export const OTP_FAILURE = "OTP_FAILURE";

export const RESET_INIT = "RESET_INIT";
export const RESET_SUCCESS = "RESET_SUCCESS";
export const RESET_FAILURE = "RESET_FAILURE";

export const GET_COUNT_INIT = "GET_COUNT_INIT";
export const GET_COUNT_SUCCESS = "GET_COUNT_SUCCESS";
export const GET_COUNT_FAILURE = "GET_COUNT_FAILURE";

interface LoginInitAction {
  type: typeof LOGIN_INIT;
}

interface LogOutAction {
  type: typeof LOGOUT;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: any;
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: any;
}

interface ForgetInitAction {
  type: typeof FORGET_INIT;
}

interface ForgetSuccessAction {
  type: typeof FORGET_SUCCESS;
  payload: any;
}

interface ForgetFailureAction {
  type: typeof FORGET_FAILURE;
  payload: any;
}

interface VerifyInitAction {
  type: typeof OTP_INIT;
}

interface VerifySuccessAction {
  type: typeof OTP_SUCCESS;
  payload: any;
}

interface VerifyFailureAction {
  type: typeof OTP_FAILURE;
  payload: any;
}

interface SignUpStartAction {
  type: typeof REGISTERED_INIT;
}
interface SignUpSuccesstAction {
  type: typeof REGISTERED_SUCCESS;
  payload: any;
}
interface SignUpFailureAction {
  type: typeof REGISTERED_FAILURE;
  payload: any;
}

interface GetCountInitAction {
  type: typeof GET_COUNT_INIT;
}

interface GetCountSuccessAction {
  type: typeof GET_COUNT_SUCCESS;
  payload: any;
}

interface GetCountFailureAction {
  type: typeof GET_COUNT_FAILURE;
  payload: any;
}

export type AuthActionTypes =
  | LogOutAction
  | VerifyInitAction
  | LoginInitAction
  | VerifySuccessAction
  | VerifyFailureAction
  | ForgetInitAction
  | ForgetSuccessAction
  | ForgetFailureAction
  | LoginSuccessAction
  | LoginFailureAction
  | SignUpStartAction
  | SignUpSuccesstAction
  | SignUpFailureAction;

export type DashActionTypes =
  | GetCountInitAction
  | GetCountSuccessAction
  | GetCountFailureAction;
