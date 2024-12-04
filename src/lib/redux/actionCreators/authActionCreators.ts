import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_START, LOGOUT_SUCCESS, REFRESH_TOKEN_FAIL, REFRESH_TOKEN_SUCCESS, SIGNUP_FAILURE, SIGNUP_START, SIGNUP_SUCCESS, VERIFY_ID_TOKEN_FAIL, VERIFY_ID_TOKEN_SUCCESS } from "../constants/authConstants";

export const loginStart = () => ({ type: LOGIN_START });
export const loginSuccess = (idToken: string, refreshToken: string, userUid: string, email: string) => 
    ({ type: LOGIN_SUCCESS, payload: {idToken, refreshToken, userUid, email} });
export const loginFailure = (error: string) => ({ type: LOGIN_FAILURE, payload: error });

export const logoutStart = () => ({ type: LOGOUT_START });
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });
export const logoutFailure = (error: string) => ({ type: LOGOUT_FAILURE, payload: error });

export const signupStart = () => ({ type: SIGNUP_START });
export const signupSuccess = (message: string) => ({ type: SIGNUP_SUCCESS, payload: message });
export const signupFailure = (error: string) => ({ type: SIGNUP_FAILURE, payload: error }); 

export const refreshTokenSuccess = (idToken: string, refreshToken: string) => 
    ({ type: REFRESH_TOKEN_SUCCESS, payload: {idToken, refreshToken} });
export const refreshTokenFail = (error: string) => ({ type: REFRESH_TOKEN_FAIL, payload: error });

export const verifyIdTokenSuccess = (message: string) => ({ type: VERIFY_ID_TOKEN_SUCCESS, payload: message });
export const verifyIdTokenFail = (error: string) => ({ type: VERIFY_ID_TOKEN_FAIL, payload: error });