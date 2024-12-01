'use client';
import { ApiManager } from "@/api_manager/ApiManager";
//import Loading from "@/components/loading";
import Link from "next/link";
import { FormEvent, useState, FocusEvent, useActionState, CSSProperties } from "react";
import validator from "validator";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomHeader from "@/components/header";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    //event.preventDefault();
    setMessage("");
    setError("");
    if (!email || !validator.isEmail(email)) {
      setLoading(false);
      return;
    }
    try {
      const response = await ApiManager.register({ email, password, username });
      const data = await response.json();
      //console.log(response);
      console.log(data);
      console.log(response.status);
      setLoading(false);
      if (400 <= response.status && response.status < 500) {
        if (data.message && Array.isArray(data.message)) {

          const formattedMessages = data.message.map((msg: string) => {
            if (msg.includes("username must match /^[a-zA-Z0-9_]+$/ regular expression")) {
              return "invalid username";
            }
            return msg;
          });

          setError(formattedMessages.join(", \n "));
          setMessage("");
        } else if (data.message && typeof data.message === "string") {
          setError(data.message);
          setMessage("");
        } else {
          setError('An unknown error occurred.');
        }
      } else if (200 <= response.status && response.status < 300) {
        setError("");
        setMessage(data.data.success);
        setPassword("");
        //window.location.href = '/login';
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
      //setLoading(false);
      return;
    } finally {
      setLoading(false);
    }

    
  } 

  return (<div>
      <CustomHeader/>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white">
        <main className="min-w-[calc(100vw/3)] flex flex-col gap-8 row-start-2 items-center sm:items-center p-5 border border-black border-solid rounded">
          <div className="flex flex-row text-black">
            <h1 className="text-black font-bold">Register Page</h1>
          </div>
          <form method="POST" //action={"/api/register"}
            
            onSubmit={e => (onSubmit(e))}
            className="flex flex-col justify-center flex-wrap min-w-[calc(100vw/3)]">
            <label className="label-style">Email</label>
            <input type="text" id="email" name="email" 
              className="input-style"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => validateEmail(e)}
              required/>
            {
            (invalidEmail && invalidEmail.length!=0) 
            ? (<text className="text-error">
              {invalidEmail}
            </text>)
              : null
            }

            <label className="label-style">Username</label>
            <input type="text" id="username" name="username" 
              className="input-style"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required/>
          
            

            <label className="label-style">Password</label>
            <input type="password" id="password" name="password" className="input-style"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required/>

            <button className={` ${!loading ? 'button-style' : 'button-style-disabled'}`}
              type="submit" 
              disabled={loading}>
                Register
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
            <p>Already have account?</p>
            <span className="mx-1"></span>
            <Link href="/login"
              className="text-[#1d4ed8]">
              Login now!
            </Link>
          </div>
          
        </main>
      </div>
    </div>
  );
}
