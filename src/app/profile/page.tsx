'use client';
import Link from "next/link";
import { FormEvent, useState, FocusEvent, use, useEffect } from "react";
//import { login, logOut } from "@/lib/redux/features/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
//import { logout } from "@/lib/redux/features/authSlice";
import { AuthWrapper } from "@/components/AuthWrapper";
import { useRouter } from "next/navigation";
import CustomHeader from "@/components/header";
import { getUserInfo, logout } from "@/lib/redux/actions/authActions";
import { ToastContainer, toast } from 'react-toastify';
import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import { Profile } from "@/types/profile/profile.response";
import Img from "@/components/Img";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import CustomFooter from "@/components/footer";
import { fetchFavouriteMovies } from "@/lib/redux/actions/movieActions";
import { Movie } from "@/types/movie/movie.response";
import { User } from "lucide-react";
import UserMovieList from "@/components/UserMovieList/UserMovieList";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import { AuthState } from "@/lib/redux/initialStates/authInitialState";

const userDataTemp: Profile = {
  uid: "",
  name: "pham tien",
  email: "maiantiem@gmail.com",
  createdAt: "2024-12-26T11:37:24.722+00:00",
  updatedAt: "2024-12-27T13:10:12.165+00:00",
  profilePath: null
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<Profile>(userDataTemp);
  const [error, setError] = useState("");
  
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [favouriteMovies, setFavouriteMovies] = useState<Movie[] | null>([]);
  const profileData: AuthState = useSelector((state: RootState) => state.auth);

  const _fetchFavouriteMovies = async () => {
    try {
      const response = await fetchFavouriteMovies();
      setFavouriteMovies(response);
    } catch (error: any) {
      setError(error.message);
    }
  }

  const _getProfileData = async () => { 
    try {
      const response = await getUserInfo(profileData.idToken ?? '');

      if (response) {
        setUserData(response);
      }
    } catch (error: any) {
      setError(error.message);
    }
  }

  useEffect(() => {
    setIsClient(true);
    _fetchFavouriteMovies();
    _getProfileData();
  }, [dispatch]);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (<>
    <CustomHeader />
    <div className="wrapper ">
      <main className=""> 
        <div className="profilePage w-full bg-whiet pt-15 mb-12 md:mb-0 md:pt-20 md:min-h-[700px] relative">
        <ContentWrapper className2="max-w-screen-3xl mx-5">
          <div className="content flex flex-col relative gap-6 md:gap-12 md:flex-row">
            <div className="left flex-shrink-2 text-lg">
              <ProfileCard profile={userData} />
              
            </div>
            <div className="right text-white bg-darkBlue">
              <Card className="bg-darkBlue">
                <CardContent>
                  <div className="watchList">
                    <UserMovieList movies={favouriteMovies} title={"Watch List"} seeMoreHref={"watchList"} />
                  </div>

                  <div className="favouriteList">
                    <UserMovieList movies={favouriteMovies} title={"Favourite List"} seeMoreHref={"favourite-list"} />
                  </div>

                  <div className="ratingList">
                    <UserMovieList movies={favouriteMovies} title={"Rating List"} seeMoreHref={"rating-list"} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </ContentWrapper>
        </div>       
        <div><ToastContainer /></div>
    
      </main>
    </div>
    <CustomFooter />
    </>
  );
}


