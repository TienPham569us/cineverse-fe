'use client';

import CustomHeader from "@/components/header";
import { loadAuthState } from "@/lib/redux/features/auth-slice";
import { RootState } from "@/lib/redux/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setIsClient(true);
    const savedAuthState = loadAuthState();
    if (savedAuthState) {
      dispatch({ type: 'auth/loadState', payload: savedAuthState });
    }
  }, [dispatch]);

  if (!isClient) {
    return null; // Render nothing on the server
  }
  
  return (<div>
  <CustomHeader />
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
      {auth.access_token ? (
          <div className="flex flex-col items-center text-black">
            <h1>Welcome, {auth.username}!</h1>
            <p>Email: {auth.email}</p>
            <Link href={"/profile"} className="text-center flex flex-row justify-center">
              <button className="button-auth">Go to Profile</button>
            </Link>
          </div>
        ) : (<><div className="flex flex-row text-black">
          <h1>This is Home Page, please login or register to continue...</h1>
        </div>
        
        </>)}
      </main>
    </div>
    </div>
  );
}

//"react-spinners": "^0.14.1",