'use client';

import Link from "next/link";
import { FormEvent, useState, FocusEvent, useEffect } from "react";
import validator from "validator";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react'
import CustomHeader from "@/components/header";
import { AppDispatch, RootState, useAppSelector } from "@/lib/redux/store";
import { connect, useDispatch } from "react-redux";
import { login, loginGoogle } from "@/lib/redux/actions/authActions";

interface LoginPageProps {
  idToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  loginInProgress: boolean;
  login: (credentials: { email: string; password: string }) => void;
}

//const LoginPageContent = () => {
const LoginPageContent: React.FC<LoginPageProps> = props => {
  const { idToken, error, isAuthenticated, loginInProgress } = props;
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [error, //setError] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [passwordError, setPasswordError] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  //const [login] = useLoginMutation();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, [dispatch]);

  // if (!isClient) {
  //   return <></>; // Render nothing on the server
  // }

  useEffect(() => {
    setIsClient(true);
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
    
  }, [searchParams, dispatch] );

  useEffect(() => {
    setIsClient(true);
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
    const tempEmail = email;
    if (!tempEmail) {

      setInvalidEmail("Email is required");

    } else if (!validator.isEmail(tempEmail)) {

      setInvalidEmail("Email has invalid format");
      
    } else {
      setInvalidEmail("");
    }
  }

  const validatePassword = (value: string): boolean => {
    if (!value || value.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    ////setError("");

    if (!email || !validator.isEmail(email)
      || !validatePassword(password)) {
      setLoading(false);
      return;
    }
   try {

    //console.log("email: ", email);
    await dispatch(login({ email, password }));

   } catch (error) {
     console.log("-->Failed to login: ", error);
     setMessage("");
   } finally {
    setLoading(false);
    }
   
  } 

  // handle login google
  const handleLoginGoogle = async () => {
    try {
      setLoading(true);
      setMessage("");
      await dispatch(loginGoogle());
    } catch (error: any) {
      console.log("-->Failed to login: ", error);
      setMessage("");
    } finally {
      setLoading(false);
    }
  }

  if (!isClient) {
    return null; // Render nothing on the server
  }
  
  return ( <>
  <CustomHeader />
    <div className="bg-darkBlue grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        
      <main className="bg-white min-w-[calc(100vw/3)] flex flex-col gap-8 row-start-2 items-center sm:items-center p-5 border border-black border-solid rounded">
      <div><ToastContainer /></div>
        <div className="flex flex-row text-black">
          <h1 className="text-black text-2xl font-bold pr-2">Login to</h1>
          <img
            src="https://support.cineverse.com/hc/theming_assets/01HZPNGWTKGXJYMVYQDT6GAQYB"
            alt="Logo"
            className="w-20 bg-darkBlue"
          />
        </div>
        <form method="POST" //action={"/api/register"}
          onSubmit={(e) => handleSubmit(e)}
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
          

          <label className="label-style">Password</label>
          <input type="password" id="password" name="password" className="input-style"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => validatePassword(e.target.value)}
            required/>
          {passwordError && <div className="text-error">{passwordError}</div>}

          <div className="flex flex-row justify-end">
            <Link href="/forgot-password"
              className="text-[#1d4ed8]">
              Forgot password?
            </Link>
          </div>
          <button className={` ${!loading ? 'button-style' : 'button-style-disabled'}`}
            type="submit"
            disabled={loading}
            >
            Login
          </button>
          <button
            type="button"
            className={`flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-600 hover:bg-gray-100 focus:outline-none ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleLoginGoogle}
            disabled={loading}
          >
            <img
              src="https://png.pngtree.com/png-vector/20230817/ourmid/pngtree-google-internet-icon-vector-png-image_9183287.png" // Đường dẫn icon Google
              alt="Google"
              className="h-5 w-5"
            />
            <span>Continue with Google</span>
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
            Register now!
          </Link>
        </div>
        
      </main>
    </div>
    </>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
      idToken: state.auth.idToken,
      isAuthenticated: state.auth.isAuthenticated,
      loading: state.auth.loading,
      error: state.auth.error,
      loginInProgress: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
      login: (credentials: { email: string; password: string }) => dispatch(login(credentials)),
  };
};

const ConnectedLoginPageContent = connect(mapStateToProps, mapDispatchToProps)(LoginPageContent)

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
     <ConnectedLoginPageContent/>
    </Suspense>
  );
}

