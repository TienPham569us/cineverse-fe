'use client';

import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import CustomFooter from "@/components/footer";
import CustomHeader from "@/components/header";
import MovieListItem from "@/components/MovieListItem/MovieListItem";
import { Card, CardContent  } from "@/components/ui/card";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { Profile } from "@/types/profile/profile.response";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import BreadCrumbMovieList from "@/components/BreadCrumbMovieList/BreadCrumbMovieList";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchRatingList } from "@/lib/redux/actions/profileAction";
import { UserMovie, UserMoviePagination } from "@/types/profile/UserMovie.response";
import SmallSpinner from "@/components/SmallSpinner";
import { FAVOURITE_LIST, RATING_LIST } from "@/lib/redux/constants/listMovieConstants";
import { getUserInfo } from "@/lib/redux/actions/authActions";

const RatingListPageContent = () => {
    const [userData, setUserData] = useState<Profile | null>(null);
    const [error, setError] = useState("");
    const [isClient, setIsClient] = useState(false);
    const [movies, setMovies] = useState<UserMovie[] | null>([]);
    const [userMovies, setUserMovies] = useState<UserMoviePagination | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const profileData = useSelector((state: RootState) => state.auth);
        
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(1);

    const _fetchUserMovies = async () => {
        try {
          const response = await fetchRatingList(profileData.idToken ?? '', page);
          if (response && response.results) {
            setMovies(response.results);
            setTotalPages(response.totalPages);
            setHasMore(1 < response.totalPages);
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

    const loadMoreMovies = async () => {
        try {
            console.log(page)
            const nextPage = page + 1;
    
            if (nextPage > totalPages) {
                setHasMore(false);
                return;
            }
    
            const newResponse = await fetchRatingList(profileData.idToken ?? '', nextPage);
    
            if(newResponse && newResponse.results){
                const newMovies: UserMovie[] = newResponse.results.map((userMovie: UserMovie) => {
                    userMovie.movie.posterPath = 'https://image.tmdb.org/t/p/w780' +  userMovie.movie.posterPath;
                    return userMovie;
                });
                setMovies((prevMovies) => [...prevMovies ?? [], ...newMovies ?? []]);
            }
            setPage(nextPage);
            console.log(page)
            // Kiểm tra nếu trang hiện tại đã là trang cuối
            if (nextPage >= totalPages) {
                setHasMore(false);
            }
        } catch (error: any) {
            setError(error.message);
        }
    };

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
                    <ContentWrapper className2="max-w-screen-3xl mx-5">
                        <BreadCrumbMovieList title={"Rating List"}/>

                        <div className="right text-white bg-darkBlue flex-shrink-4 w-full">
                                <div className="bg-darkBlue w-full">
                                    <div className="w-full p-4">
                                    { movies && 
                                        <div className="container mx-auto px-4 w-full">
                                            <InfiniteScroll
                                                next={loadMoreMovies} 
                                                hasMore={hasMore} 
                                                loader={<SmallSpinner />} 
                                                dataLength={movies.length}
                                            >
                                                <ul className="flex flex-col space-y-4 w-full">
                                                    {movies?.map((userMovie: UserMovie) => (
                                                        <MovieListItem 
                                                            key={userMovie.movie.id}
                                                            movie={userMovie.movie}
                                                            handleClick={() => { } }
                                                            userMovie={userMovie} 
                                                            listType={RATING_LIST} 
                                                            removeFromList={removeMovieById} />
                                                    ))}
                                                </ul>
                                            </InfiniteScroll> 
                                        </div>
                                    }
                                    </div>
                                </div>
                            </div>
                    </ContentWrapper>
                </div>       
                
            
            </main>
        </div>
        
        <CustomFooter />
    </>);
}

export default RatingListPageContent;