'use client';
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { logout } from "@/lib/redux/features/auth-slice";

const CustomHeader = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  
  const handleLogout = () => {
    window.location.href = '/login';
    //router.push('/');
    dispatch(logout());
    
  };

  return (
    <header>
      <div className="flex flex-row items-center justify-between bg-[#d4d4d8] p-6">
        <Link href={"/"} className="flex items-center text-black mr-6 p-3 rounded-lg hover:border hover:border-black">
          <span className="font-semibold text-xl tracking-tight">Home</span>
        </Link>
        
        <div className="text-black">
          <div className="flex flex-row">
            {auth.isAuth ? (
              <div className="flex items-center">
                <span className="mr-4">Welcome, {auth.username}!</span>
                <Link href={"/profile"} className="text-center flex flex-row justify-center mx-3">
                  <button className="button-auth">Profile</button>
                </Link>
                <button className="font-bold py-2 px-4 rounded bg-[#dc2626] text-white rounded-lg my-2 hover:bg-white 
                        hover:text-[#dc2626] hover:border border-[#dc2626]" 
                        onClick={() => handleLogout()}>
                          Logout
                  </button>
              </div>
            ) : (
              <>
                <Link href={"/login"} className="text-center flex flex-row justify-center mx-3">
                  <button className="button-auth">Login</button>
                </Link>
                <Link href={"/register"} className="text-center flex flex-row justify-center">
                  <button className="button-auth">Register</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default CustomHeader;
