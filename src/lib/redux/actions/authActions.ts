import { ApiManager } from '@/api_manager/ApiManager';
import { Dispatch } from 'redux';
import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess, refreshTokenFail, refreshTokenSuccess, signupFailure, signupStart, signupSuccess } from '../actionCreators/authActionCreators';
import { GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, User, UserCredential } from "firebase/auth";
import { auth } from "@/config/firebase.config";
import { clearAuthState, saveAuthToken } from '../localStorageUtil/local_storage_utils';
import RegisterParams from '@/types/register.params';
import { ENDPOINTS } from '@/api_manager/EndPoints';
import { Profile } from '@/types/profile/profile.response';


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
          
          
  
          //const response = await api.post('/users/token', data); //, {headers});
          const userCredential: UserCredential = await signInWithEmailAndPassword(auth, 
            credentials.email, 
            credentials.password);

          const user: User = userCredential.user;

          const isEmailVerified: boolean = await user.emailVerified; 
          if (!isEmailVerified) {
            //await sendEmailVerification(user);
            dispatch(loginFailure("Login failed: " + "Please verify your email address to activate your account."));
            return;
          }
          const idToken = await user.getIdToken();

          // Define headers
          const headers = {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${idToken}`
          };
        
          const response = await ApiManager.get(ENDPOINTS.VERIFY_TOKEN, headers);//{email: user.email, uid: user.uid, refreshToken: user.refreshToken}
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
  
export const logout = () => {
    return async (dispatch: Dispatch) => {
      try {
        dispatch(logoutStart());
  
        const headers = {
          'accept': 'application/json',
          //'token': token,
        };
        const response = await signOut(auth);
        
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

export const signup = (credentials: RegisterParams) => {
  return async (dispatch: Dispatch) => {
    try {
        dispatch(signupStart());

        const headers = {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        };

        const response = await ApiManager.register(credentials);
        console.log("Response: ", response);
        
        //await sendEmailVerification(user);
        
        //const response = await ApiManager.post(ENDPOINTS.REGISTER, credentials, headers);
        //const data = await response.json();
        //console.log(response.message);
        //console.log(data);
        dispatch(signupSuccess(response.message));

        //saveAuthToken(idToken);
        
    } catch (error: any) {
      console.log("Error: ", error.message);

      let errorMessage = "Signup failed: ";
      try {
        const errorData = JSON.parse(error.message);
        
        errorMessage += errorData.message;

        if (errorData.errors) {
          const errorDetails = Object.values(errorData.errors).join(", ");
          errorMessage += ` - ${errorDetails}`;
        }
      } catch (parseError) {
        errorMessage += error.message;
      }

      dispatch(signupFailure(errorMessage));
    }
  };
};

export const refreshToken = (refreshToken: string) => {
  return async (dispatch: Dispatch) => {
    try {
      
      // const user: User | null = auth.currentUser;
      // console.log("User: ", user);
      // if (!user) {
      //   dispatch(refreshTokenFail("No user is currently signed in."));
      //   //throw new Error("No user is currently signed in.");
      //   return;
      // }

      // const idToken = await user.getIdToken();
      const headers = {
        'Content-Type': 'application/json',
      }
      const response = await ApiManager.post(ENDPOINTS.REFRESH_TOKEN, {refreshToken: refreshToken}, headers);
      console.log("Response: ", response);
      dispatch(refreshTokenSuccess(response.id_token, refreshToken));
      
      //const userCredential: UserCredential = await 
      // const response = await fetch('/api/refreshToken', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     token: refreshToken,
      //   }),
      // })
      // if (response.ok) {
      //   const data = await response.json();
      //   //localStorage.setItem('idToken', data.idToken);
      //   dispatch(refreshTokenSuccess(data.idToken, refreshToken));
      // } else {
      //   dispatch(refreshTokenFail('error when fetch api'));
      // }
      
    } catch (error: any) {
      console.log("Error: ", error.message);
      dispatch(refreshTokenFail(error.message));
    };
  };
}

export const sendResetPasswordLink = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
}

export const getUserInfo = async (idToken: string): Promise<Profile | null> => {
  try {
    const newHeaders = {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${idToken}`
    };
    const response = await ApiManager.get(`${ENDPOINTS.USER_INFO}?idToken=${idToken}`, 
      newHeaders, 
      undefined);
    
    return response.result;
  } catch (error) {
    throw error;
  }
}