'use client';
import Link from "next/link";
import { FormEvent, useState, FocusEvent, use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import CustomHeader from "@/components/header";
import { getUserInfo, logout } from "@/lib/redux/actions/authActions";
import { ToastContainer, toast } from 'react-toastify';
import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import { Profile } from "@/types/profile/profile.response";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import CustomFooter from "@/components/footer";
import { fetchFavouriteMovies, fetchRatingListdMovies, fetchWatchListdMovies } from "@/lib/redux/actions/movieActions";
import { Movie } from "@/types/movie/movie.response";
import UserMovieList from "@/components/UserMovieList/UserMovieList";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import { AuthState } from "@/lib/redux/initialStates/authInitialState";
import Spinner from "@/components/Spinner";
import dayjs from "dayjs";

// const userDataTemp: Profile = {
//   uid: "",
//   name: "pham tien",
//   email: "maiantiem@gmail.com",
//   createdAt: "2024-12-26T11:37:24.722+00:00",
//   updatedAt: "2024-12-27T13:10:12.165+00:00",
//   profilePath: null
// }

export default function ProfilePage() {
  const [userData, setUserData] = useState<Profile | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [favouriteMovies, setFavouriteMovies] = useState<Movie[] | null>([]);
  const [watchListMovies, setWatchListMovies] = useState<Movie[] | null>([]);
  const [ratingListMovies, setRatingListMovies] = useState<Movie[] | null>([]);
  const profileData: AuthState = useSelector((state: RootState) => state.auth);

  const _fetchFavouriteMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetchFavouriteMovies(1, profileData.idToken);
      setIsLoading(false)
      setFavouriteMovies(response?.movies || []);
    } catch (error: any) {
      setIsLoading(false)
      setError(error.message);
    }
  }

  const _fetchWatchListMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetchWatchListdMovies(1, profileData.idToken);
      setIsLoading(false)
      setWatchListMovies(response?.movies || []);
    } catch (error: any) {
      setIsLoading(false)
      setError(error.message);
    }
  }

  const _fetchRatingListMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetchRatingListdMovies(1, profileData.idToken);
      setRatingListMovies(response?.movies || []);
    } catch (error: any) {
      setIsLoading(false)
      setError(error.message);
    }
  }

  const _getProfileData = async () => { 
    try {
      console.log('idToken: ' + profileData.idToken)
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
    _getProfileData();
    _fetchFavouriteMovies();
    _fetchWatchListMovies();
    _fetchRatingListMovies();
  }, [dispatch]);

  if (!isClient) {
    return null; // Render nothing on the server
  }
  return (<>
    <CustomHeader />
    <div className="wrapper ">
      {isLoading ? (
        <Spinner />
      ) : error === null ? (
      <main className=""> 
        {userData != null && 
          <ProfileCard profile={userData} />
        }

        <div className="w-full bg-whiet pt-1 mb-12 md:mb-0 md:pt-20 md:min-h-[700px] relative">
        <ContentWrapper className2="max-w-screen-3xl mx-5">
          <div className="right text-white bg-darkBlue">
            <div className="bg-darkBlue">
              <div>
                <div className="watchList">
                  <UserMovieList movies={watchListMovies} title={"Watch List"} seeMoreHref={"watchList"} />
                </div>

                <div className="favouriteList">
                  <UserMovieList movies={favouriteMovies} title={"Favourite List"} seeMoreHref={"userFavouriteList"} />
                </div>

                <div className="ratingList">
                  <UserMovieList movies={ratingListMovies} title={"Rating List"} seeMoreHref={"userRatingList"} />
                </div>
              </div>
            </div>
          </div>
        </ContentWrapper>
        </div>       
        <div><ToastContainer /></div>
    
      </main>
      ): (
        <div className="flex flex-row">
          <h1 className="text-[#dc2626]">Error: {error}</h1>
        </div>
      )}
    </div>
    <CustomFooter />
    </>
  );
}


