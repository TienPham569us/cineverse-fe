import { ApiManager } from '@/api_manager/ApiManager';
import { Dispatch } from 'redux';
import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess } from '../actionCreators/authActionCreators';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, User, UserCredential } from "firebase/auth";
import { auth } from "@/config/firebase.config";
import { saveAuthState } from '../features/authSlice';
import { clearAuthState, saveAuthToken } from '../localStorageUtil/local_storage_utils';
import { clear } from 'console';

const api = new ApiManager();

// handle login google
const provider = new GoogleAuthProvider();

export const login = (credentials: { email: string; password: string }) => {
    return async (dispatch: Dispatch) => {
      try {
          dispatch(loginStart());
  
          // Define the data you want to send as an object
          // const data = {
          //     grant_type: '',
          //     username: credentials.username,
          //     password: credentials.password,
          //     scope: '',
          //     client_id: '',
          //     client_secret: '',
          // };
          
          // Define headers
          const headers = {
              'accept': 'application/json',
              'Content-Type': 'application/json' //'application/x-www-form-urlencoded',
          };
  
          //const response = await api.post('/users/token', data); //, {headers});
          const userCredential: UserCredential = await signInWithEmailAndPassword(auth, 
            credentials.email, 
            credentials.password);

          const user: User = userCredential.user;
          const idToken = await user.getIdToken();

          const response = await api.post('/users/login', {email: user.email, uid: user.uid, refreshToken: user.refreshToken});
          dispatch(loginSuccess(idToken, user.refreshToken, user.uid, user.email??''));

          //saveAuthToken(idToken);
          
      } catch (error: any) {
        console.log("Error: ", error);
        dispatch(loginFailure("Login failed: " + error.message));
      }
    };
};
  
export const loginGoogle = () => {
  return async (dispatch: Dispatch) => {
    try {
        dispatch(loginStart());

        // Define headers
        const headers = {
            'accept': 'application/json',
            'Content-Type': 'application/json' //'application/x-www-form-urlencoded',
        };

        const userCredential: UserCredential = await signInWithPopup(auth, provider);
        const user: User = userCredential.user;
        const idToken = await user.getIdToken();
        
        dispatch(loginSuccess(idToken, user.refreshToken, user.uid, user.email??''));

        //saveAuthToken(idToken);
        
    } catch (error: any) {
      if (error.code === "auth/popup-closed-by-user") {
        console.warn("User closed the popup without completing the sign-in.");
        dispatch(loginFailure("Login failed: " + "User closed the popup without completing the sign-in"));
      } else {
        console.error("Authentication failed:", error);
        dispatch(loginFailure("Login failed: " + error.message));
      }
    }
  };
};
  
  export const logout = (token: string) => {
    return async (dispatch: Dispatch) => {
      try {
        dispatch(logoutStart());
  
        const headers = {
          'accept': 'application/json',
          'token': token,
        };
        clearAuthState();
        dispatch(logoutSuccess());
        //const response = await api.post('/users/logout', {}); //, {headers});
  
        //if(response.data.status_code === 200) dispatch(logoutSuccess());
       // else dispatch(logoutFailure("Could not log out!"));
      } catch (error: any) {
        dispatch(logoutFailure(error.response.data.detail));
      }
    };
  };