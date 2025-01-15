'use client';

import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import CustomFooter from "@/components/footer";
import CustomHeader from "@/components/header";
import MovieListItem from "@/components/MovieListItem/MovieListItem";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { Movie } from "@/types/movie/movie.response";
import { Profile } from "@/types/profile/profile.response";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import BreadCrumbMovieList from "@/components/BreadCrumbMovieList/BreadCrumbMovieList";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchWatchList } from "@/lib/redux/actions/profileAction";
import { UserMovie, UserMoviePagination } from "@/types/profile/UserMovie.response";
import SmallSpinner from "@/components/SmallSpinner";
import { WATCHLIST } from "@/lib/redux/constants/listMovieConstants";
import { getUserInfo } from "@/lib/redux/actions/authActions";

const userDataTemp: Profile = {
  uid: "",
  name: "pham tien",
  email: "maiantiem@gmail.com",
  createdAt: "2024-12-26T11:37:24.722+00:00",
  updatedAt: "2024-12-27T13:10:12.165+00:00",
  profilePath: null
}

const WatchListPageContent = () => {
    const [userData, setUserData] = useState<Profile>(userDataTemp);
    const [error, setError] = useState("");
    const [isClient, setIsClient] = useState(false);
    const [movies, setMovies] = useState<UserMovie[] | null>([]);
    const [userMovies, setUserMovies] = useState<UserMoviePagination | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const [userData, setUserData] = useState<Profile | null>(null);
    const profileData = useSelector((state: RootState) => state.auth);
    const [totalPages, setTotalPages] = useState<number>(1);
        
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const _fetchUserMovies = async () => {
        try {
          const response = await fetchWatchList(profileData.idToken ?? '', page, 10);
          setUserMovies(response);
          if (response && response.results) {
            const newMovies: UserMovie[] = response.results.map((userMovie: UserMovie) => {
                userMovie.movie.posterPath = 'https://image.tmdb.org/t/p/w780' +  userMovie.movie.posterPath;
                return userMovie;
            });
            setMovies((prevMovies) => [...prevMovies ?? [], ...newMovies ?? []]);
      
          }
        } catch (error: any) {
          setError(error.message);
        }
      }

    const removeMovieById =  (movieId: number): void => {
        setMovies((prevMovies) => prevMovies!.filter((movie) => movie.movie.id !== movieId));
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
        _fetchUserMovies();
        _getProfileData();
    }, []);


    // increase page number
    const increasePage = () => {
        setPage(page + 1);
    }

    const isHasMore = () => {
        return userMovies?.totalPages ? userMovies?.totalPages > page : false;
    }

    if (!isClient) {
        return null; // Render nothing on the server
    }

    return (<>
        <CustomHeader />
        <div className="wrapper ">
            <main className=""> 
            {userData != null && 
                <ProfileCard profile={userData} />
            }
                <div><ToastContainer /></div>
            
                <div className="profilePage w-full bg-whiet pt-1 mb-12 md:mb-0 md:pt-2 md:min-h-[700px] relative">
                    <ContentWrapper className2="max-w-screen-3xl">
                        <BreadCrumbMovieList title={"Watch List"}/>

                        <div className="content flex flex-col relative gap-6 md:gap-12 md:flex-row">
                            <div className="left flex-shrink-2 text-lg">
                                <ProfileCard profile={userData} />
                            </div>

                            <div className="right text-white bg-darkBlue flex-shrink-4 w-full">
                                <Card className="bg-darkBlue w-full">

                                    <CardContent className="w-full p-4">
                                        <div className="container mx-auto px-4 w-full">
                                            <InfiniteScroll
                                                next={increasePage} 
                                                hasMore={isHasMore()} 
                                                loader={<SmallSpinner />} 
                                                dataLength={0}
                                                endMessage={<p className="text-center text-white">No more movies</p>}
                                            >
                                                <ul className="flex flex-col space-y-4 w-full">
                                                    {movies?.map((userMovie: UserMovie) => (
                                                        <MovieListItem 
                                                            key={userMovie.movie.id}
                                                            movie={userMovie.movie}
                                                            handleClick={() => { } }
                                                            userMovie={userMovie} 
                                                            listType={WATCHLIST} 
                                                            removeFromList={removeMovieById} />
                                                    ))}
                                                </ul>
                                            </InfiniteScroll>
                                            
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </ContentWrapper>
                </div>       
                
            
            </main>
        </div>
        
        <CustomFooter />
    </>);
}

export default WatchListPageContent;