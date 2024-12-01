'use client'

import { useDispatch, useSelector } from 'react-redux';
import { getAuthToken } from '@/lib/auth_token';
import { RootState } from '@/lib/redux/store';
import { useGetProfileDataQuery } from '@/lib/redux/features/authApi';
import { useEffect } from 'react';
import { logout } from '@/lib/redux/features/auth-slice';
import { useRouter } from 'next/navigation';
import UnauthorizedAccessPage from './UnauthorizedAccessPage';


export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    //const token = getAuthToken('auth_token');
    const token = typeof window !== 'undefined' ? getAuthToken('auth_token') : null;
    const profileData = useSelector((state: RootState) => state.auth);

    const { error, isLoading } = useGetProfileDataQuery(
        { token: token || '' },
        {
          // The useGetAuthDataQuery hook will not execute the query at all if these values are falsy
          skip: !token,
        }
      );

    // if (!token) {
    //     router.push('/login');
    //     return null;
    // }

    useEffect(() => {
        if (typeof window !== 'undefined' && !token) {
          router.push('/login?notificationCode=403');
          
          dispatch(logout());
        }
    }, [token, router, dispatch]);// 
    
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

