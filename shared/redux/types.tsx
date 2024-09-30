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

export const CREATE_POST_INIT = "CREATE_POST_INIT";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAILURE = "CREATE_POST_FAILURE";

export const GET_POSTS_INIT = "GET_POSTS_INIT";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILURE = "GET_POSTS_FAILURE";

export const GET_POST_INIT = "GET_POST_INIT";
export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
export const GET_POST_FAILURE = "GET_POST_FAILURE";

export const UPDATE_POST_INIT = "UPDATE_POST_INIT";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILURE = "UPDATE_POST_FAILURE";

export const DELETE_POST_INIT = "DELETE_POST_INIT";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";

export const GET_LOGINATTEMPT_INIT = "GET_LOGINATTEMPT_INIT";
export const GET_LOGINATTEMPT_SUCCESS = "GET_LOGINATTEMPT_SUCCESS";
export const GET_LOGINATTEMPT_FAILURE = "GET_LOGINATTEMPT_FAILURE";

export const GET_ACCOUNTS_INIT = "GET_ACCOUNTS_INIT";
export const GET_ACCOUNTS_SUCCESS = "GET_ACCOUNTS_SUCCESS";
export const GET_ACCOUNTS_FAILURE = "GET_ACCOUNTS_FAILURE";

export const DELETE_ACCOUNTS_INIT = "DELETE_ACCOUNTS_INIT";
export const DELETE_ACCOUNTS_SUCCESS = "DELETE_ACCOUNTS_SUCCESS";
export const DELETE_ACCOUNTS_FAILURE = "DELETE_ACCOUNTS_FAILURE";

export const GET_NOTIFICATIONS_INIT = "GET_NOTIFICATIONS_INIT";
export const GET_NOTIFICATIONS_SUCCESS = "GET_NOTIFICATIONS_SUCCESS";
export const GET_NOTIFICATIONS_FAILURE = "GET_NOTIFICATIONS_FAILURE";

export const DELETE_NOTIFICATIONS_INIT = "DELETE_NOTIFICATIONS_INIT";
export const DELETE_NOTIFICATIONS_SUCCESS = "DELETE_NOTIFICATIONS_SUCCESS";
export const DELETE_NOTIFICATIONS_FAILURE = "DELETE_NOTIFICATIONS_FAILURE";

interface deleteAccountInitAction {
  type: typeof DELETE_ACCOUNTS_INIT;
}
interface deleteAccountSuccessAction {
  type: typeof DELETE_ACCOUNTS_SUCCESS;
  payload: any;
}

interface deleteAccountfailureAction {
  type: typeof DELETE_ACCOUNTS_FAILURE;
  payload: any;
}

interface deleteNotificationsInitAction {
  type: typeof DELETE_NOTIFICATIONS_INIT;
}
interface deleteNotificationsSuccessAction {
  type: typeof DELETE_NOTIFICATIONS_SUCCESS;
  payload: any;
}

interface deleteNotificationsfailureAction {
  type: typeof DELETE_NOTIFICATIONS_FAILURE;
  payload: any;
}

interface getNotificationsInitAction {
  type: typeof GET_NOTIFICATIONS_INIT;
}
interface getNotificationsSuccessAction {
  type: typeof GET_NOTIFICATIONS_SUCCESS;
  payload: any;
}

interface getNotificationsfailureAction {
  type: typeof GET_NOTIFICATIONS_FAILURE;
  payload: any;
}

interface getAccountsSuccessAction {
  type: typeof GET_ACCOUNTS_SUCCESS;
  payload: any;
}
interface getAccountsFailreAction {
  type: typeof GET_ACCOUNTS_FAILURE;
  payload: any;
}

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
interface GetLoginAttemptInitAction {
  type: typeof GET_LOGINATTEMPT_INIT;
}

interface GetLoginAttemptSuccessAction {
  type: typeof GET_LOGINATTEMPT_SUCCESS;
  payload: any;
}

interface GetLoginAttemptFailureAction {
  type: typeof GET_LOGINATTEMPT_FAILURE;
  payload: any;
}

interface CreatePostInitAction {
  type: typeof CREATE_POST_INIT;
}

interface CreatePostSuccessAction {
  type: typeof CREATE_POST_SUCCESS;
  payload: any;
}

interface CreatePostFailureAction {
  type: typeof CREATE_POST_FAILURE;
  payload: any;
}

interface GetPostsInitAction {
  type: typeof GET_POSTS_INIT;
}

interface GetPostsSuccessAction {
  type: typeof GET_POSTS_SUCCESS;
  payload: any;
}

interface GetPostsFailureAction {
  type: typeof GET_POSTS_FAILURE;
  payload: any;
}

interface GetPostInitAction {
  type: typeof GET_POST_INIT;
}

interface GetPostSuccessAction {
  type: typeof GET_POST_SUCCESS;
  payload: any;
}

interface GetPostFailureAction {
  type: typeof GET_POST_FAILURE;
  payload: any;
}

interface UpdatePostInitAction {
  type: typeof UPDATE_POST_INIT;
}

interface UpdatePostSuccessAction {
  type: typeof UPDATE_POST_SUCCESS;
  payload: any;
}

interface UpdatePostFailureAction {
  type: typeof UPDATE_POST_FAILURE;
  payload: any;
}

interface DeletePostInitAction {
  type: typeof DELETE_POST_INIT;
}

interface DeletePostSuccessAction {
  type: typeof DELETE_POST_SUCCESS;
  payload: any;
}

interface DeletePostFailureAction {
  type: typeof DELETE_POST_FAILURE;
  payload: any;
}

interface GetLoginAttemptInitAction {
  type: typeof GET_LOGINATTEMPT_INIT;
}

interface GetLoginAttemptSuccessAction {
  type: typeof GET_LOGINATTEMPT_SUCCESS;
  payload: any;
}

interface GetLoginAttemptFailureAction {
  type: typeof GET_LOGINATTEMPT_FAILURE;
  payload: any;
}

interface getAccountsInitAction {
  type: typeof GET_ACCOUNTS_INIT;
}
interface getAccountsSuccessAction {
  type: typeof GET_ACCOUNTS_SUCCESS;
  payload: any;
}
interface getAccountsFailreAction {
  type: typeof GET_ACCOUNTS_FAILURE;
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
  | GetCountFailureAction
  | GetLoginAttemptFailureAction
  | GetLoginAttemptSuccessAction
  | GetLoginAttemptInitAction
  | CreatePostInitAction
  | CreatePostSuccessAction
  | CreatePostFailureAction
  | GetPostsInitAction
  | GetPostsSuccessAction
  | GetPostsFailureAction
  | GetPostInitAction
  | GetPostSuccessAction
  | GetPostFailureAction
  | UpdatePostInitAction
  | UpdatePostSuccessAction
  | UpdatePostFailureAction
  | DeletePostInitAction
  | DeletePostSuccessAction
  | DeletePostFailureAction
  | GetLoginAttemptInitAction
  | GetLoginAttemptSuccessAction
  | GetLoginAttemptFailureAction
  | getAccountsInitAction
  | getAccountsSuccessAction
  | getAccountsFailreAction
  | getNotificationsInitAction
  | getNotificationsSuccessAction
  | getNotificationsfailureAction
  | deleteNotificationsInitAction
  | deleteNotificationsSuccessAction
  | deleteNotificationsfailureAction
  | deleteAccountInitAction
  | deleteAccountSuccessAction
  | deleteAccountfailureAction;
