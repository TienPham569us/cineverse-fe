'use client';

import CustomHeader from "@/components/header";
import { sendResetPasswordLink } from "@/lib/redux/actions/authActions";
import { FormEvent, useState, FocusEvent, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import validator from "validator";
import './styles.css';

const ForgotPasswordPageContent = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [invalidEmail, setInvalidEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isClient, setIsClient] = useState(false);

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

  const handleForgotPassword = async (event: FormEvent) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);
    setError('');

    if (!email || !validator.isEmail(email)) {
      setLoading(false);
      return;
    }
    
    try {
      await sendResetPasswordLink(email);
      setMessage('Password reset link sent to your email');
    } catch (error) {
        console.log("Error when send reset password link: ", error);
        setError('Error sending password reset link');
    }

    setLoading(false);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (<>
    <CustomHeader />
    <div className="bg-darkBlue grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        
      <main className="bg-white min-w-[calc(100vw/3)] flex flex-col gap-8 row-start-2 items-center sm:items-center p-5 border border-black border-solid rounded">
      <div><ToastContainer /></div>
        <div className="flex flex-row text-black">
          <h1 className="text-black text-2xl font-bold pr-2">Reset Password</h1>
        </div>
        <form method="POST" //action={"/api/register"}
          onSubmit={(e) => handleForgotPassword(e)}
          className="min-w-[calc(100vw/3)] flex flex-col justify-center flex-wrap">
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

          <div className="flex flex-row justify-end">
            <span className="mx-2 text-black">Already remmembered password?</span>
            <a href="/login"
              className="text-[#1d4ed8] w-auto hover:underline hover:opacity-70">
                
              Login now
            </a>
          </div>

          <button className={` ${!loading ? 'button-style' : 'button-style-disabled'}`}
            type="submit"
            disabled={loading}
            >
            Send Password Reset Link
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
        <div className="flex flex-row text-black justify-end w-full">
          <p>Don't have account?</p>
          <span className="mx-1"></span>
          <a href="/register"
            className="text-[#1d4ed8] w-auto hover:underline hover:opacity-70">
            Register now!
          </a>
        </div>
        
      </main>
    </div>
    </>);
}


export default ForgotPasswordPageContent;