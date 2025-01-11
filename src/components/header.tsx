"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { logout } from "@/lib/redux/actions/authActions";
import { useState } from "react";
import { HiOutlineSearch, HiOutlineX, HiOutlineViewList } from "react-icons/hi";
//import { logout } from "@/lib/redux/features/authSlice";

const CustomHeader = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const profileData = useSelector((state: RootState) => state.auth);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchMenu, setSearchMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [show, setShow] = useState("top");

  const handleLogout = () => {
    window.location.href = "/login";
    //router.push('/');
    dispatch(logout());
  };

  return (
    <header>
      <div className={`fixed w-full z-10 transition-transform bg-[#020c1b] bg-opacity-30 backdrop-blur-md`}>
        <div className="container mx-auto px-16 flex justify-between items-center py-3">
          <Link href={"/"} className="cursor-pointer">
            <img
              src="https://support.cineverse.com/hc/theming_assets/01HZPNGWTKGXJYMVYQDT6GAQYB"
              alt="Logo"
              className="w-20"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-6 text-white">
            {auth.idToken ? (
              <div className="flex items-center">
                <span className="mr-4">Welcome, {auth.email}!</span>
                <Link
                  href={"/profile"}
                  className="text-center flex flex-row justify-center mx-3"
                >
                  <button className="cursor-pointer hover:text-pink-500">Profile</button>
                </Link>
                <button className="cursor-pointer hover:text-pink-500 px-2" onClick={() => handleLogout()}>
                  Logout
                </button>
                <button className="cursor-pointer hover:text-pink-500" onClick={() => setSearchMenu(true)}>
                  <HiOutlineSearch className="text-xl" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href={"/login"}
                  className="text-center flex flex-row justify-center mx-3"
                >
                  <button className="cursor-pointer hover:text-pink-500">Login</button>
                </Link>
                <Link
                  href={"/register"}
                  className="text-center flex flex-row justify-center"
                >
                  <button className="cursor-pointer hover:text-pink-500">Register</button>
                </Link>
                <Link
                  href={"/casts"}
                  className="text-center flex flex-row justify-center"
                >
                  <button className="cursor-pointer hover:text-pink-500">Cast</button>
                </Link>
                <button className="cursor-pointer hover:text-pink-500" onClick={() => setSearchMenu(true)}>
                  <HiOutlineSearch className="text-xl" />
                </button>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            {mobileMenu ? (
              <>
              <button className="cursor-pointer hover:text-pink-500 text-white mx-3" onClick={() => setSearchMenu(true)}>
                  <HiOutlineSearch className="text-xl" />
              </button>
              <HiOutlineX className="text-white text-2xl cursor-pointer" onClick={() => setMobileMenu(false)} />
              </>
            ) : (
              <>
              <button className="cursor-pointer hover:text-pink-500 text-white mx-3" onClick={() => setSearchMenu(true)}>
                  <HiOutlineSearch className="text-xl" />
              </button>
              <HiOutlineViewList className="text-white text-2xl cursor-pointer" onClick={() => setMobileMenu(true)} />
              </>
            )}
          </div>
        </div>
        {mobileMenu && (
        <ul className="md:hidden bg-black text-white flex flex-col space-y-4 py-4 px-6">
          <Link
            href={"/login"}
            className="text-center flex flex-row justify-center mx-3"
          >
            <button className="cursor-pointer hover:text-pink-500">Login</button>
          </Link>
          <Link
            href={"/register"}
            className="text-center flex flex-row justify-center"
          >
            <button className="cursor-pointer hover:text-pink-500">Register</button>
          </Link>
          <Link
            href={"/casts"}
            className="text-center flex flex-row justify-center"
          >
            <button className="cursor-pointer hover:text-pink-500">Cast</button>
          </Link>
        </ul>
      )}
      {searchMenu && (
        <div className="bg-white w-full py-4">
          <div className="max-w-6xl mx-auto px-4 flex items-center space-x-4">
            <input
              type="search"
              placeholder="Search for a movie or TV show..."
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none"
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={() => {}}
            />
            <HiOutlineX className="text-black text-xl cursor-pointer" onClick={() => setSearchMenu(false)} />
            <Link 
            href={{
              pathname: "/search",
              query: { query: query, page: 1 },
            }}
            className="flex items-center justify-center w-[100px] md:w-[150px] h-[50px] md:h-[60px] bg-gradient-to-r from-customOrange to-customPink text-white rounded-r-full text-base md:text-lg text-center">
            Search
          </Link >
          </div>
        </div>
      )}
      </div>
    </header>
  );
};

export default CustomHeader;
