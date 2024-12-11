'use client';

import CustomHeader from "@/components/header";
import { fetchTrendingMovies } from "@/lib/redux/actions/movieActions";
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

  useEffect(() => {
    setIsClient(true);
    fetchTrendingMovies(timeWindow);
    // const savedAuthState = loadAuthState();
    // if (savedAuthState) {
    //   dispatch({ type: 'auth/loadState', payload: savedAuthState });
    // }
  }, [dispatch, timeWindow]);
  
  if (!isClient) {
    return null; // Render nothing on the server
  }
  
  // const handleSearch = () => {
  //   if (query.trim()) {
  //     router.push(`/search-movies?query=${encodeURIComponent(query)}&page=1`);
  //   }
  // };

  return (<div className="bg-white"> 
    <CustomHeader />
    <div className="p-3 m-2 bg-white">
      <div className="flex items-center">
        <Input
          placeholder="Search for movies..."
          className="flex-1 text-black border border-solid border-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Link 
          href={{
            pathname: "/search",
            query: { query: query, page: 1 }, // Định dạng đúng query object
          }}
          className="ml-2 button-auth">
          Search
        </Link >
        {/* <button
          onClick={handleSearch}
          className="px-4 py-2 ml-2 text-white bg-blue-500 rounded"
        >
          Search
        </button> */}
      </div>
    </div>
    <div className="items-center justify-items-center p-8 ps-5 bg-white" aria-readonly>
        <div className="flex flex-row flex-wrap">
          <h1 className="text-3xl font-bold text-black me-2 " aria-readonly>Trending</h1>
          <Tabs defaultValue="day" className="w-[400px]" 
            onValueChange={(value) => setTimeWindow(value)}>

            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="day" aria-readonly>Today</TabsTrigger>
              <TabsTrigger value="week" aria-readonly>This Week</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)] bg-white">
      
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        {
          (loadingTrendingMovies) 
          ? (
            <div className="flex flex-row text-black">
              <h1>Loading...</h1>
            </div>
          ) : (
            <div className="flex flex-row text-black">
              <div className="container mx-auto p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                  {trendingMovies.map((movie: Movie, index: number) => (
                    <MovieCard key={index} movie={movie} index={index} />
                  ))}
                  </div>
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
      </div>
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