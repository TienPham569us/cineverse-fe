'use client';

import CustomHeader from "@/components/header";
import { fetchSearchMovies, fetchTrendingMovies } from "@/lib/redux/actions/movieActions";
import { AppDispatch, RootState, useAppSelector } from "@/lib/redux/store";
import { Movie } from "@/types/movie/movie.response";
import React, {Suspense, useEffect, useState } from "react";
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
import { useSearchParams } from 'next/navigation'
import MovieCard from "@/components/MovieCard";

interface SearchPageProps {
    loadingSearchMovies: boolean;
    errorSearchMovies: string | null;
    searchResults: Movie[];
    totalPages: number;
    fetchSearchMovies: (query: string, page: number) => void;
}

const SearchContent: React.FC<SearchPageProps> = props => {
  const dispatch = useDispatch<AppDispatch>();
  const [isClient, setIsClient] = useState(false);
  const auth = useAppSelector((state: RootState) => state.auth);
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>(searchParams.get("query") || "");
  const [page, setPage] = useState<number>(parseInt(searchParams.get("page") || "1"));
  const [arrCurNumOfPages, setArrCurNumOfPages] = useState<(number | string)[]>([]);
  const { loadingSearchMovies, errorSearchMovies, searchResults, totalPages, fetchSearchMovies } = props;

  useEffect(() => {
    setIsClient(true);
    if (query.trim()) {
      console.log("call")
      fetchSearchMovies(query, page);
      console.log(totalPages)
    }
  }, [dispatch, page]);

  useEffect(() => {
    console.log("ok")
    if (totalPages > 0) {
      const dots = "...";
      let tempArray = [];

      if (totalPages <= 5) {
        tempArray = Array.from({ length: totalPages }, (_, i) => i + 1);
      } else if (page <= 3) {
        tempArray = [1, 2, 3, 4, dots, totalPages];
      } else if (page > totalPages - 3) {
        tempArray = [1, dots, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        tempArray = [1, dots, page - 1, page, page + 1, dots, totalPages];
      }

      setArrCurNumOfPages(tempArray);
    }
  }, [dispatch, page, totalPages]);

  const handleSearch = () => {
    if (query.trim()) {
      fetchSearchMovies(query, 1); // Reset to first page when performing a new search
      setPage(1);
    }
  };

  if (!isClient) {
    return null; // Render nothing on the server
  }

return (
    <div className="bg-white">
      <CustomHeader />
      <div className="p-3 m-2 bg-white">
        <div className="flex items-center">
          <Input
            placeholder="Search for movies..."
            className="flex-1 text-black border border-solid border-black"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="m-2 button-auth"
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)] bg-white">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
            {loadingSearchMovies ? (
                <div className="flex flex-row text-black">
                <h1>Loading...</h1>
                </div>
            ) : searchResults.length > 0 ? (
                <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
                    {searchResults.map((movie: Movie, index: number) => (
                    <MovieCard key={index} movie={movie} index={index} />
                    ))}
                </div>
                </div>
            ) : (
                <div className="flex flex-row">
                <h1 className="text-black">No results found.</h1>
                </div>
            )}

            {errorSearchMovies && (
                <div className="flex flex-row">
                <h1 className="text-[#dc2626]">Error: {errorSearchMovies}</h1>
                </div>
            )}

            {/* Pagination */}
            <div className="flex gap-2 mt-4">
            <button
              disabled={page === 1 || loadingSearchMovies}
              onClick={() => setPage(1)}
              className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
            >
              {"<<"}
            </button>
            <button
              disabled={page === 1 || loadingSearchMovies}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
            >
              {"<"}
            </button>
            {arrCurNumOfPages.map((item, index) => (
              <button
                key={index}
                disabled={item === "..." || loadingSearchMovies}
                onClick={() => {
                  if (typeof item === "number") {
                    setPage(item);
                  }
                }}
                className={`px-4 py-2 rounded ${
                  page === item ? "bg-[#000] text-white" : "bg-gray-300"
                }`}
              >
                {item}
              </button>
            ))}
            <button
              disabled={page === totalPages || loadingSearchMovies}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
            >
              {">"}
            </button>
            <button
              disabled={page === totalPages || loadingSearchMovies}
              onClick={() => setPage(totalPages)}
              className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
            >
              {">>"}
            </button>  
            </div>
            {/* <div className="flex gap-2 mt-4">
                <button
                disabled={page <= 1 || loadingSearchMovies}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                Previous
                </button>
                <button
                disabled={loadingSearchMovies}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                Next
                </button>
            </div> */}
        </main>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
    return {
      loadingSearchMovies: state.searchMovies.loading,
      errorSearchMovies: state.searchMovies.error,
      searchResults: state.searchMovies.searchResults,
      totalPages: state.searchMovies.totalPages
    };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
      fetchSearchMovies: (query: string, page: number) =>
        dispatch(fetchSearchMovies(query, page)),
    };
};

const ConnectedSeachPageContent = connect(mapStateToProps, mapDispatchToProps)(SearchContent);

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConnectedSeachPageContent />
    </Suspense>
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