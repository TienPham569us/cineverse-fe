import { AuthActionTypes, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_FAILURE } from "../constants/authConstants";
import { AuthState, authInitialState } from "../initialStates/authInitialState";

const authReducer = (state: AuthState = authInitialState, action: AuthActionTypes) => {
    switch (action.type) {
      case LOGIN_START:
        return { ...state, loading: true, error: null };
      case LOGIN_SUCCESS:
        return { ...state, token: action.payload, isAuthenticated: true, loading: false };
      case LOGIN_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      case LOGOUT_START:
        return { ...state, loading: true, error: null };
      case LOGOUT_SUCCESS:
        return { ...state, token: null, isAuthenticated: false, loading: false };
      case LOGOUT_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default authReducer;