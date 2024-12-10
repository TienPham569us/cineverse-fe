import { AnyAction } from "@reduxjs/toolkit";
import { AuthActionTypes, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_FAILURE, SignupStartAction, SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAILURE, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAIL, VERIFY_ID_TOKEN_SUCCESS, VERIFY_ID_TOKEN_FAIL } from "../constants/authConstants";
import { AuthState, authInitialState } from "../initialStates/authInitialState";
import { saveAuthState } from "../localStorageUtil/local_storage_utils";
import { signUpInitialState, SignupState } from "../initialStates/signupInitialState";

const authReducer = (state: AuthState = authInitialState, action: AuthActionTypes  | any ): AuthState => {
    switch (action.type) {
      case LOGIN_START:
        return { ...state, loading: true, error: null };
      case LOGIN_SUCCESS:
        saveAuthState({ 
          ...state, 
          idToken: action.payload.idToken, 
          refreshToken: action.payload.refreshToken,
          userUid: action.payload.userUid,
          email: action.payload.email,
          isAuthenticated: true, loading: false 
        });
        
        return { ...state, 
          idToken: action.payload.idToken, 
          refreshToken: action.payload.refreshToken,
          userUid: action.payload.userUid,
          email: action.payload.email,
          isAuthenticated: true, loading: false 
        };

      case LOGIN_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      case LOGOUT_START:
        return { ...state, loading: true, error: null };
      case LOGOUT_SUCCESS:
        return { ...state, idToken: null, isAuthenticated: false, loading: false };
      case LOGOUT_FAILURE:
        return { ...state, loading: false, error: action.payload };
      
      case REFRESH_TOKEN_SUCCESS:
        return { ...state, idToken: action.payload.idToken, refreshToken: action.payload.refreshToken, isAuthenticated: true, loading: false };
      case REFRESH_TOKEN_FAIL:
        return { ...state, idToken: null,  isAuthenticated: false, loading: false };

      case VERIFY_ID_TOKEN_SUCCESS:
        return { ...state, isAuthenticated: true, loading: false};
      case VERIFY_ID_TOKEN_FAIL:
        return { ...state, idToken: null, loading: false};

      default:
        return state;
    }
  };
  
  export const userSignupReducer = (state: SignupState = signUpInitialState, action: AuthActionTypes | any): SignupState  => {
    switch (action.type) {
      case SIGNUP_START:
        return { ...state, loading: true};
      case SIGNUP_SUCCESS:
        return { ...state, loading: false, message: action.payload, error: null };
      case SIGNUP_FAILURE:
        return { ...state, loading: false, error: action.payload, message: null };
      default:
        return state;
    }
  }
  export default authReducer;