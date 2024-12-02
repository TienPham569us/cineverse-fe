import { ApiManager } from '@/api_manager/ApiManager';
import { Dispatch } from 'redux';
import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess } from '../actionCreators/authActionCreators';
const api = new ApiManager();
export const login = (credentials: { username: string; password: string }) => {
    return async (dispatch: Dispatch) => {
      try {
          dispatch(loginStart());
  
          // Define the data you want to send as an object
          const data = {
              grant_type: '',
              username: credentials.username,
              password: credentials.password,
              scope: '',
              client_id: '',
              client_secret: '',
          };
          
          // Define headers
          const headers = {
              'accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
          };
  
          const response = await api.post('/users/token', data); //, {headers});
          dispatch(loginSuccess(response.data.access_token));
      } catch (error: any) {
          dispatch(loginFailure(error.response.data.detail));
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
  
        const response = await api.post('/users/logout', {}); //, {headers});
  
        if(response.data.status_code === 200) dispatch(logoutSuccess());
        else dispatch(logoutFailure("Could not log out!"));
      } catch (error: any) {
        dispatch(logoutFailure(error.response.data.detail));
      }
    };
  };