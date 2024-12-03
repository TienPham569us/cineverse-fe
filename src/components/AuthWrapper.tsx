'use client'

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { useGetProfileDataQuery } from '@/lib/redux/features/authApi';
import { useEffect } from 'react';
import { logout } from '@/lib/redux/features/authSlice';
import { useRouter } from 'next/navigation';
import UnauthorizedAccessPage from './UnauthorizedAccessPage';
import { getAuthState, getAuthToken } from '@/lib/redux/localStorageUtil/local_storage_utils';


export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const dispatch = useDispatch();
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
        if (typeof window !== 'undefined' && (!authState || !authState.idToken)) {
          router.push('/login?notificationCode=403');
          
          dispatch(logout());
        }
    }, [authState, router, dispatch]);// 
    
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

