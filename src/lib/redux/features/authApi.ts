import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginResponse } from './auth-slice';
import { ProfileResponse } from '@/types/profile.response';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3001',//'https://be-week04-tienpham569us-projects.vercel.app', //'http://localhost:3001',//
    prepareHeaders: (headers, { getState }) => {
      // Add any custom headers here if needed
      return headers;
    },
    responseHandler: async (response) => {
      const data = await response.json();
      //console.log('data: ', data);
      //console.log('response: ', response.ok);
      
      //console.log('status: ', response.status);
      // if (!response.ok) {
      //   throw new Error(data.message || null);
      // }
      // const temp = {
      //   data: data,
      //   status: response.status,
      // }
      // console.log('temp: ', temp);
      return { data: data, status: response.status };
    },
    // typeof window === 'undefined'
    // ? 'http://localhost:3001'
    // : window.location.origin,
 }),
  endpoints: (builder) => ({
    login: builder.mutation<{data: LoginResponse, status: number}, { email: string, password: string }>({
      query: ({ email, password }) => ({
        url: 'user/login',
        method: 'POST',
        body: {
            email,
            password,
        },
        
      }),
    }),

    register: builder.mutation<{data: LoginResponse, status: number}, { email: string, password: string }>({
      query: ({ email, password }) => ({
        url: 'user/register',
        method: 'POST',
        body: {
            email,
            password,
        },
      }),
    }),

    getProfileData: builder.query<{data: ProfileResponse, status: number}, { token: string }>({
        query: ({ token }) => ({
            url: 'user/profile',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetProfileDataQuery } = authApi;