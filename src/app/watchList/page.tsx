'use client';

import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import CustomFooter from "@/components/footer";
import CustomHeader from "@/components/header";
import MovieListItem from "@/components/MovieListItem/MovieListItem";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { logout } from "@/lib/redux/actions/authActions";
import { fetchFavouriteMovies } from "@/lib/redux/actions/movieActions";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { Movie } from "@/types/movie/movie.response";
import { Profile } from "@/types/profile/profile.response";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import BreadCrumbMovieList from "@/components/BreadCrumbMovieList/BreadCrumbMovieList";
import InfiniteScroll from "react-infinite-scroll-component";

const userData: Profile = {
  id: "",
  name: "pham tien",
  email: "maiantiem@gmail.com",
  createdAt: "2024-12-26T11:37:24.722+00:00",
  updatedAt: "2024-12-27T13:10:12.165+00:00",
  profilePath: null
}

const WatchListPageContent = () => {
    const [error, setError] = useState("");
    const [isClient, setIsClient] = useState(false);
    const [movies, setMovies] = useState<Movie[] | null>([]);
    const dispatch = useDispatch<AppDispatch>();
    const profileData = useSelector((state: RootState) => state.auth);
        
    const [page, setPage] = useState<number>(1);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);

    const _fetchMovies = async () => {
        try {
          const response = await fetchFavouriteMovies();
          setMovies(response);
        } catch (error: any) {
          setError(error.message);
        }
      }

    useEffect(() => {
        setIsClient(true);
        _fetchMovies();
    }, []);

    // increase page number
    const increasePage = () => {
        setPage(page + 1);
    }

    if (!isClient) {
        return null; // Render nothing on the server
    }

    return (<>
        <CustomHeader />
        <div className="wrapper ">
            <main className=""> 
                <div><ToastContainer /></div>
                
                <div className="profilePage w-full bg-whiet pt-1 mb-12 md:mb-0 md:pt-2 md:min-h-[700px] relative">
                    <ContentWrapper className2="max-w-screen-3xl mx-5">
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
                                                hasMore={false} 
                                                loader={undefined} 
                                                dataLength={0}
                                                endMessage={<p className="text-center text-white">No more movies</p>}
                                            >
                                                <ul className="flex flex-col space-y-4 w-full">
                                                    {movies?.map((movie: Movie) => (
                                                        <MovieListItem key={movie.id} movie={movie} handleClick={() => {}} />
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