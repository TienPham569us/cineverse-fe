import { AnyAction } from "@reduxjs/toolkit";
import { AuthActionTypes, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_FAILURE } from "../constants/authConstants";
import { AuthState, authInitialState } from "../initialStates/authInitialState";
import { saveAuthState } from "../localStorageUtil/local_storage_utils";

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
  
      default:
        return state;
    }
  };
  
  export default authReducer;