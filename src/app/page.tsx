'use client';

import CustomHeader from "@/components/header";
import CustomFooter from "@/components/footer";
import { fetchLatestTrailer, fetchTrendingMovies, fetchPoplarMovies } from "@/lib/redux/actions/movieActions";
import { AppDispatch, RootState, useAppSelector } from "@/lib/redux/store";
import { Movie } from "@/types/movie/movie.response";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatDate } from "@/utils/dateUtils";
import MovieCard from "@/components/MovieCard";
import { backdrop_base_url } from "@/constants/app_api";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import TrendingMoviesCarousel from "@/components/TrendingMoviesCarousel/TrendingMoviesCarousel";
import { LatestTrailerResponse } from "@/types/movie/video.response";
import LatestTrailersSection from "@/components/LatestTrailersSection/LatestTrailersSection";
import SmallSpinner from "@/components/SmallSpinner";

interface HomePageProps {
  loadingTrendingMovies: boolean;
  errorTrendingMovies: string | null;
  trendingMovies: Movie[];
  fetchTrendingMovies: (timeWindow: string) => void;
}

const HomeContent: React.FC<HomePageProps> = props => {
  const dispatch = useDispatch<AppDispatch>();
  const [isClient, setIsClient] = useState(false);
  const auth = useAppSelector((state: RootState) => state.auth);
  const [timeWindow, setTimeWindow] = useState("day");
  const [query, setQuery] = useState("");
  const { loadingTrendingMovies, errorTrendingMovies, trendingMovies, fetchTrendingMovies } = props;
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [listLastestTrailer, setListLastestTrailer] = useState<LatestTrailerResponse[] | null>(null);
  const [listPopularMovies, setListPopularMovies] = useState<Movie[] | null>(null);

  const _fetchLatestTrailer = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result: LatestTrailerResponse[] | null = await fetchLatestTrailer();
      setIsLoading(false);
      setListLastestTrailer(result);
    } catch (error : any)
    {
      setIsLoading(false);
      setError(error.message);
      console.error("Error fetching video:", error);
    }
  }

  const _fetchPopularMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result: Movie[] | null = await fetchPoplarMovies();
      setIsLoading(false);
      setListPopularMovies(result);
    } catch (error : any)
    {
      setIsLoading(false);
      setError(error.message);
      console.error("Error fetching video:", error);
    }
  }

  useEffect(() => {
    setIsClient(true);
    fetchTrendingMovies(timeWindow);
    // const savedAuthState = loadAuthState();
    // if (savedAuthState) {
    //   dispatch({ type: 'auth/loadState', payload: savedAuthState });
    // }
  }, [dispatch, timeWindow]);

  useEffect(() => {
    _fetchLatestTrailer();
    _fetchPopularMovies();
  }, []);
  
  if (!isClient) {
    return null; // Render nothing on the server
  }

  const randomBackdropPath = trendingMovies?.length > 0
      ? trendingMovies[Math.floor(Math.random() * trendingMovies.length)].posterPath
      : null;
  
  // const handleSearch = () => {
  //   if (query.trim()) {
  //     router.push(`/search-movies?query=${encodeURIComponent(query)}&page=1`);
  //   }
  // };
  return (
  <div className="bg-darkBlue"> 
    <CustomHeader />
    <div className="relative flex items-center justify-center w-full h-[450px] md:h-[700px]">
      {
        (loadingTrendingMovies && !randomBackdropPath)
        ? (
          <div className="flex items-center justify-center text-white">
            Loading...
          </div>
        ) : errorTrendingMovies == null ? (
          <div className="absolute top-0 left-0 w-full h-full opacity-50">
            <img
              src="https://image.tmdb.org/t/p/original/9iw4a6AQkxUO3EuRn59Vgrqf0zO.jpg"
              alt="Backdrop"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="flex flex-row">
            <h1 className="text-[#dc2626]">Error: {errorTrendingMovies}</h1>
          </div>
        )
      }
      <div className="absolute bottom-0 left-0 w-full h-[250px] bg-gradient-to-b from-transparent to-darkBlue"></div>
      <div className="relative text-center text-white max-w-[800px] mx-auto">
        <h1 className="text-4xl md:text-7xl font-bold mb-4">Welcome</h1>
        <p className="text-sm md:text-lg font-medium tracking-wide mb-10">
          Millions of movies, TV shows, and people to discover. Explore now.
        </p>
        <div className="flex items-center justify-center">
          <input
            type="search"
            className="w-[calc(100%-100px)] md:w-[calc(100%-150px)] h-[50px] md:h-[60px] rounded-l-full px-4 text-black text-sm md:text-lg outline-none"
            placeholder="Search for a movie or TV show..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={() => {}}
          />
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
    </div>
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="w-full container mx-auto py-4 px-8" aria-readonly>
        <div className="flex flex-row flex-wrap justify-between">
          <h1 className="text-2xl font-bold text-white me-2 " aria-readonly>Trending</h1>
          <Tabs defaultValue="day" className="w-[400px]" 
            onValueChange={(value) => setTimeWindow(value)}>

            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="day" aria-readonly>Today</TabsTrigger>
              <TabsTrigger value="week" aria-readonly>This Week</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <main className="container mx-auto p-4">
        {
          (loadingTrendingMovies) 
          ? (
            <Spinner />
          ) : (
            trendingMovies && <div className="flex flex-row text-black">
              <div className="container mx-auto p-4">
                  <TrendingMoviesCarousel trendingMovies={trendingMovies}/>
                </div>
            </div>
          )
        
        }

        {
           (errorTrendingMovies) && (
            <div className="flex flex-row">
              <h1 className="text-[#dc2626]">Error: {errorTrendingMovies}</h1>
            </div>
           )
        }
      
      </main>

      <div className="w-full container mx-auto py-4 px-8" aria-readonly>
        <h1 className="text-2xl font-bold text-white me-2 " aria-readonly>Latest Trailers</h1>
      </div>

      { 
      (isLoading) ? (
        <Spinner/>
      ) : error === null ?  (
        <div className="container mx-auto p-4">
          <div id="video">
            <LatestTrailersSection data={listLastestTrailer} loading={loadingTrendingMovies} />
          </div>
        </div>
      ) : (
        <div className="flex flex-row">
          <h1 className="text-[#dc2626]">Error: {error}</h1>
        </div>
      )
      }

      <div className="w-full container mx-auto py-4 px-8" aria-readonly>
        <h1 className="text-2xl font-bold text-white me-2 " aria-readonly>Popular Movies</h1>
      </div>

      <main className="container mx-auto p-4">
        {
          (isLoading && listPopularMovies === null) ? (
            <Spinner/>
          ) : error === null ? (
            <div className="flex flex-row text-black">
              <div className="container mx-auto p-4">
                  <TrendingMoviesCarousel trendingMovies={listPopularMovies!}/>
                </div>
            </div>
          ) : (
            <div className="flex flex-row">
              <h1 className="text-[#dc2626]">Error: {error}</h1>
            </div>
          )
        
        }
      </main>
    </div>
    <CustomFooter />
  </div>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    loadingTrendingMovies: state.trendingMovies.loading,
    errorTrendingMovies: state.trendingMovies.error,
    trendingMovies: state.trendingMovies.trendingMovies
  };
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    fetchTrendingMovies: (timeWindow: string) => dispatch(fetchTrendingMovies(timeWindow))
  };
}

const ConnectedHomePageContent = connect(mapStateToProps, mapDispatchToProps)(HomeContent);

export default function Home() {
  return (
    <ConnectedHomePageContent />
  );
}

/* 
        */
/*{auth.idToken ? (
          <div className="flex flex-col items-center text-black">
            <h1>Welcome, {auth.email}!</h1>
            <p>Email: {auth.email}</p>
            <Link href={"/profile"} className="text-center flex flex-row justify-center">
              <button className="button-auth">Go to Profile</button>
            </Link>
          </div>
        ) : (<><div className="flex flex-row text-black">
          <h1>This is Home Page, please login or register to continue...</h1>
        </div>
        
        </>)}*/