'use client';

import Link from "next/link";
import { FormEvent, useState, FocusEvent, useActionState, CSSProperties, Suspense, useEffect, use } from "react";
import validator from "validator";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomHeader from "@/components/header";
import { AppDispatch, RootState, useAppSelector } from "@/lib/redux/store";
import { connect, useDispatch } from "react-redux";
import { signup } from "@/lib/redux/actions/authActions";

interface RegisterPageProps {
  loading: boolean;
  error: string | null;
  message: string | null;
  signup: (credentials: { email: string; password: string, username: string }) => void;
}

const  RegisterPageContent: React.FC<RegisterPageProps> = props => {
  const { loading, error, message } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [invalidEmail, setInvalidEmail] = useState("");
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const idToken = useAppSelector((state: RootState) => state.auth.idToken);
  // const [error, setError] = useState("");
  // const [message, setMessage] = useState("");
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (error===null && !loading && message?.length!=0) {
      console.log('success');
      //setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  }, []);
  useEffect(() => {
    if (idToken!=null) {
      setPassword("");
      window.location.href = "/profile";
      //console.log("Login successful! Now you can navigate to your profile page.");
      // toast.success('Login successful! Now you can navigate to your profile page.', {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined
      // });
    }
  },  [dispatch, idToken]);
  
  const validateEmail = (e: FocusEvent<HTMLInputElement>) => {
    if (!email) {

      setInvalidEmail("Email is required");

    } else if (!validator.isEmail(email)) {

      setInvalidEmail("Email has invalid format");
      
    } else {
      setInvalidEmail("");
    }
  }

  const validateUsername = (value: string): boolean => {
    const usernamePattern = /^[a-zA-Z0-9_]{3,16}$/;
    if (!usernamePattern.test(value)) {
      setUsernameError('Username must be 3-16 characters long and can only contain letters, numbers, and underscores.');
      return false;
    } else {
      setUsernameError('');
      return true;
    }
  };

  const validatePassword = (value: string): boolean => {
   
    if (!value || value.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  }

  const validateConfirmPassword = (value: string): boolean => {
    if (value !== password) {
      setConfirmPasswordError('Passwords do not match.');
      return false;
    } else {
      setConfirmPasswordError('');
      return true;
    }
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    //setLoading(true);
    //event.preventDefault();
    //setMessage("");
   // setError("");
    if (!email || !validator.isEmail(email) 
      || !validateUsername(username) || !validatePassword(password) 
      || !validateConfirmPassword(confirmPassword)) {
      //setLoading(false);
      return;
    }
    try {
      //const response = await ApiManager.register({ email, password, username });
      //const data = await response.json();
      //console.log(response);
      //console.log(data);
      //console.log(response.status);

      await dispatch(signup({ email, password, username }));
      
      //setLoading(false);

    } catch (error) {
      console.error(error);
      // if (data.message && Array.isArray(data.message)) {

      //   const formattedMessages = data.message.map((msg: string) => {
      //     if (msg.includes("username must match /^[a-zA-Z0-9_]+$/ regular expression")) {
      //       return "invalid username";
      //     }
      //     return msg;
      //   });

      //   setError(formattedMessages.join(", \n "));
      //   setMessage("");
      // } else if (data.message && typeof data.message === "string") {
      //   setError(data.message);
      //   setMessage("");
      // } else {
      //   setError('An unknown error occurred.');
      // }
      //setError("An error occurred. Please try again later.");
      //setLoading(false);
      return;
    } finally {
      //setLoading(false);
    }

    
  } 

  return (<div>
      <CustomHeader/>
      <div className="bg-darkBlue grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="bg-white min-w-[calc(100vw/3)] flex flex-col gap-8 row-start-2 items-center sm:items-center p-5 border border-black border-solid rounded">
          <div className="flex flex-row text-black items-center">
            <h1 className="text-black text-2xl font-bold pr-2">Register </h1>
            <img
              src="https://support.cineverse.com/hc/theming_assets/01HZPNGWTKGXJYMVYQDT6GAQYB"
              alt="Logo"
              className="w-20 h-8 bg-darkBlue"
            />
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
            ? (<div className="text-error">
              {invalidEmail}
            </div>)
              : null
            }

            <label className="label-style">Username</label>
            <input type="text" id="username" name="username" 
              className="input-style"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={(e) => validateUsername(e.target.value)}
              required/>
          
            {usernameError && <div className="text-error">{usernameError}</div>}


            <label className="label-style">Password</label>
            <input type="password" id="password" name="password" className="input-style"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => validatePassword(e.target.value)}
              required/>
            {passwordError && <div className="text-error">{passwordError}</div>}

            <label className="label-style">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" className="input-style"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={(e) => validateConfirmPassword(e.target.value)}
              required/>
            {confirmPasswordError && <div className="text-error">{confirmPasswordError}</div>}

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

const mapStateToProps = (state: RootState) => {
  return {
      loading: state.userSignup.loading,
      error: state.userSignup.error,
      message: state.userSignup.message,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
      signup: (credentials: { email: string; password: string, username: string }) => dispatch(signup(credentials)),
  };
};

const ConnectedRegisterPageContent = connect(mapStateToProps, mapDispatchToProps)(RegisterPageContent)


export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}> 
      <ConnectedRegisterPageContent/>
    </Suspense>
  )
}