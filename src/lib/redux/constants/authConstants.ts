export const LOGIN_START = 'LOGIN_START';
 export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
 export const LOGIN_FAILURE = 'LOGIN_FAILURE';
 export const LOGOUT_START = 'LOGOUT_START';
 export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
 export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS'
export const REFRESH_TOKEN_FAIL = 'REFRESH_TOKEN_FAIL'

export const VERIFY_ID_TOKEN_SUCCESS = 'VERIFY_ID_TOKEN_SUCCESS'
export const VERIFY_ID_TOKEN_FAIL = 'VERIFY_ID_TOKEN_FAIL'

export type LoginStartAction = { type: typeof LOGIN_START };
export type LoginSuccessAction = { type: typeof LOGIN_SUCCESS, payload: { idToken: string, refreshToken: string, userUid: string, email: string } }
export type LoginFailureAction = { type: typeof LOGIN_FAILURE, payload: string }
export type LogoutStartAction = { type: typeof LOGOUT_START };
export type LogoutSuccessAction = { type: typeof LOGOUT_SUCCESS };
export type LogoutFailureAction = { type: typeof LOGOUT_FAILURE, payload: string };
 
export type SignupStartAction = { type: typeof SIGNUP_START };
export type SignupSuccessAction = { type: typeof SIGNUP_SUCCESS, payload: string }
export type SignupFailureAction = { type: typeof SIGNUP_FAILURE, payload: string }

export type RefreshTokenSuccessAction = { type: typeof REFRESH_TOKEN_SUCCESS, payload: { idToken: string, refreshToken: string} }
export type RefreshTokenFailAction = { type: typeof REFRESH_TOKEN_FAIL, payload: string }

export type VerifyIdTokenSuccessAction = { type: typeof VERIFY_ID_TOKEN_SUCCESS, payload: string }
export type VerifyIdTokenFailAction = { type: typeof VERIFY_ID_TOKEN_FAIL, payload: string }

export type AuthActionTypes =
 | LoginStartAction
 | LoginSuccessAction
 | LoginFailureAction
 | LogoutStartAction
 | LogoutSuccessAction
 | LogoutFailureAction
  | SignupStartAction
  | SignupSuccessAction
  | SignupFailureAction
  | RefreshTokenSuccessAction
  | RefreshTokenFailAction
  | VerifyIdTokenSuccessAction
  | VerifyIdTokenFailAction