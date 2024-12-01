'use client';

import Link from "next/link";
import { FormEvent, useState, FocusEvent, useEffect } from "react";
import validator from "validator";
import { useLoginMutation } from "@/lib/redux/features/authApi";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react'
import CustomHeader from "@/components/header";

 function LoginPageContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [login] = useLoginMutation();
  const searchParams = useSearchParams();

  ///const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const notificationCode = searchParams.get('notificationCode');
    
    if (notificationCode && notificationCode === '403') {
      toast.error('Unauthorized access. Please login to continue.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  },  [searchParams]);

  const validateEmail = (e: FocusEvent<HTMLInputElement>) => {
    const tempEmail = email;
    if (!tempEmail) {

      setInvalidEmail("Email is required");

    } else if (!validator.isEmail(tempEmail)) {

      setInvalidEmail("Email has invalid format");
      
    } else {
      setInvalidEmail("");
    }
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!email || !validator.isEmail(email)) {
      //setError("Email has invalid format");
      setLoading(false);
      return;
    }
   try {
  
    const response = await login({ email, password }).unwrap();

    const data = response.data;
    
    console.log(response);

    if (response && 200<= response.status && response.status <= 300 && response.data) {
      //router.push('/profile');
      setError("");
      setMessage("Login successful! Now you can navigate to your profile page.");
      setPassword("");
    } else if (400<= response.status && response.status < 500) {
      
      setError(response.data?.message || "An error occurred.");
      setMessage("");
    } else {
      setError("Failed to login. Please check your credentials.");
      setMessage("");
    }
   } catch (error) {
     console.log("Failed to login: ", error);
     if (error && typeof error === 'object' && 'data' in error) {
       const err = error as { data: { data: { message: string } } };
       setError(err.data.data.message || "Failed to login. Please check your credentials.");
     } else {
       setError("Failed to login. Please check your credentials.");
     }
     setMessage("");
   } finally {
    setLoading(false);
    }
   
  } 

  return ( <>
  <CustomHeader />
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white">
        
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center p-5 border border-black border-solid rounded">
      <div><ToastContainer /></div>
        <div className="flex flex-row text-black">
          <h1 className="text-black font-bold">Login Page</h1>
        </div>
        <form method="POST" //action={"/api/register"}
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col justify-center flex-wrap">
          <label className="label-style">Email</label>
          <input type="text" id="email" name="email" 
            className="input-style"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => validateEmail(e)}
            required/>
          {
           (invalidEmail && invalidEmail.length!=0) 
           ? (<div className="text-error">
            {invalidEmail}
           </div>)
            : null
          }
          

          <label className="label-style">Password</label>
          <input type="password" id="password" name="password" className="input-style"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required/>

          <button className={` ${!loading ? 'button-style' : 'button-style-disabled'}`}
            type="submit"
            disabled={loading}
            >
            Login
          </button>
          {loading ? (
            <div className="flex flex-row justify-center">
              <span className="flex items-center text-black">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                <div className="text-black">Loading...</div>
              </span>
            </div>
            ) : null}

          {
            (message && message.length!=0) 
            ? (<div className="msg-success">
              {message}
            </div>)
            : null
          }

          {
            (error && error.length!=0) 
            ? (<div className="text-error font-bold">
              {error}
            </div>)
            : null
          }
        </form>
        <div className="flex flex-row text-black">
          <p>Don't have account?</p>
          <span className="mx-1"></span>
          <Link href="/register"
            className="text-[#1d4ed8]">
            Sign up now!
          </Link>
        </div>
        
      </main>
    </div>
    </>
  );
}


export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}