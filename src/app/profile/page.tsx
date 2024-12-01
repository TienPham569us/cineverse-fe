'use client';
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState, FocusEvent, use, useEffect } from "react";
import validator from "validator";
//import { login, logOut } from "@/lib/redux/features/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { logout } from "@/lib/redux/features/auth-slice";
import { AuthWrapper } from "@/components/AuthWrapper";
import { useRouter } from "next/navigation";
import CustomHeader from "@/components/header";

export default function ProfilePage() {
  const [error, setError] = useState("");
  
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const profileData = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    window.location.href = '/login';
    //router.push('/');
    dispatch(logout());
    
  };

  useEffect(() => {
    setIsClient(true);
  }, [dispatch]);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (<>
    <CustomHeader />
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">        
        <div className="flex flex-row text-black">
          <h1 className="text-[#22d3ee]">Profile Page</h1>
        </div>
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        
          {profileData && (
            <div className="input-style">
              <p>User ID: {profileData.uid}</p>
              <p>Email: {profileData.email}</p>
              <p>Username: {profileData.username}</p>
              {/* Add more profile fields as needed */}
            </div>
          )}
          
          <button className="return-btn" onClick={handleLogout}>Logout</button>
        </div>
      </main>
    </div>
    </>
  );
}


