'use client';

import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import CustomFooter from "@/components/footer";
import CustomHeader from "@/components/header";
import MovieListItem from "@/components/MovieListItem/MovieListItem";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { getUserInfo, logout } from "@/lib/redux/actions/authActions";
import { fetchWatchListdMovies } from "@/lib/redux/actions/movieActions";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { Movie } from "@/types/movie/movie.response";
import { Profile } from "@/types/profile/profile.response";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import BreadCrumbMovieList from "@/components/BreadCrumbMovieList/BreadCrumbMovieList";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "@/components/Spinner";

// const userData: Profile = {
//   id: "",
//   name: "pham tien",
//   email: "maiantiem@gmail.com",
//   createdAt: "2024-12-26T11:37:24.722+00:00",
//   updatedAt: "2024-12-27T13:10:12.165+00:00",
//   profilePath: null
// }

const WatchListPageContent = () => {
    const [error, setError] = useState("");
    const [isClient, setIsClient] = useState(false);
    const [movies, setMovies] = useState<Movie[] | null>([]);
    const dispatch = useDispatch<AppDispatch>();
    const [userData, setUserData] = useState<Profile | null>(null);
    const profileData = useSelector((state: RootState) => state.auth);
    const [totalPages, setTotalPages] = useState<number>(1);
        
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const _fetchMovies = async (currentPage: number) => {
        try {
            const response = await fetchWatchListdMovies(currentPage, profileData.idToken);
            if(response){
                setMovies(response.movies);
                setTotalPages(response.totalPages);
                setHasMore(1 < response.totalPages);
            }
        } catch (error: any) {
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
        _getProfileData()
        _fetchMovies(1);
    }, []);


    // increase page number
    const increasePage = () => {
        setPage(page + 1);
    }

    const loadMoreMovies = async () => {
        try {
            const nextPage = page + 1;
    
            if (nextPage > totalPages) {
                setHasMore(false);
                return;
            }
    
            const newResponse = await fetchWatchListdMovies(nextPage, profileData.idToken);
    
            if(newResponse && newResponse.movies){
                setMovies((prevMovies) => [...(prevMovies || []), ...newResponse.movies]);
            }
            setPage(nextPage);
    
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
                    <ContentWrapper className2="max-w-screen-3xl">
                        <BreadCrumbMovieList title={"Watch List"}/>
                        <div className=" text-white bg-darkBlue flex-shrink-4 w-full">
                            <div className="bg-darkBlue w-full">
                                <div className="w-full p-4">
                                    {movies && 
                                    <div className="container mx-auto px-4 w-full">
                                        <InfiniteScroll
                                            next={loadMoreMovies} 
                                            hasMore={hasMore} 
                                            loader={<Spinner isLarge={false} />} 
                                            dataLength={movies.length}
                                        >
                                            <ul className="flex flex-col space-y-4 w-full">
                                                {movies?.map((movie: Movie) => (
                                                    <MovieListItem key={movie.id} movie={movie} handleClick={() => {}} />
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

export default WatchListPageContent;