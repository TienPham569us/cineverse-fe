'use client'

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UnauthorizedAccessPage from './UnauthorizedAccessPage';
import { getAuthState, getAuthToken } from '@/lib/redux/localStorageUtil/local_storage_utils';
import { logout, refreshToken } from '@/lib/redux/actions/authActions';
import { ApiManager } from '@/api_manager/ApiManager';
import { ENDPOINTS } from '@/api_manager/EndPoints';


export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    //const token = getAuthToken('auth_token');
    const authState = typeof window !== 'undefined' ? getAuthState() : null;
    const profileData = useSelector((state: RootState) => state.auth);

    // const { error, isLoading } = useGetProfileDataQuery(
    //     { token: token || '' },
    //     {
    //       // The useGetAuthDataQuery hook will not execute the query at all if these values are falsy
    //       skip: !token,
    //     }
    //   );

    // if (!token) {
    //     router.push('/login');
    //     return null;
    // }

    useEffect(() => {
      
        checkAuth();
    }, [authState, router, dispatch]);// 
    
    async function checkAuth() {
      if (typeof window !== 'undefined' && (!authState || !authState.idToken)) {
        router.push('/login?notificationCode=403');
        
        dispatch(logout());
      } 
      // else if (typeof window  !== 'undefined' && authState 
      //   && profileData && profileData.idToken) {
      //     const validToken: boolean = await verifyToken();

      //     if (validToken===false) {
      //       router.push('/login?notificationCode=403');
      //       dispatch(logout());
      //     }
      // }
    }

    async function verifyToken(): Promise<boolean> {
      try {
        const headers = {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${authState.idToken}`
        };

        const response = await ApiManager.get(ENDPOINTS.VERIFY_TOKEN, headers);
        const data = await response.json();
        console.log("Data: ", data);
        return true;
      } catch (error) {
        await dispatch(refreshToken(authState.refreshToken));
        if (authState.idToken) {
          return true;
        }
        return false;
      }
    }
    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }
    // if (typeof window !== 'undefined' && !token) {
    //   return (<>
    //     <UnauthorizedAccessPage/>
    //   </>);
    // }

    return <>{children}</>;
};

