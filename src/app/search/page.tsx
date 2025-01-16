'use client';

import CustomHeader from "@/components/header";
import { fetchGenres, fetchLlmSearchMovies, fetchSearchMovies, fetchTrendingMovies } from "@/lib/redux/actions/movieActions";
import { AppDispatch, RootState, useAppSelector } from "@/lib/redux/store";
import { Movie } from "@/types/movie/movie.response";
import React, {Suspense, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input"
import { formatDate } from "@/utils/dateUtils";
import { useSearchParams } from 'next/navigation'
import MovieCard from "@/components/MovieCard";
import CustomFooter from "@/components/footer";
import "./styles.css";
import Spinner from "@/components/Spinner";
import { Genres } from "@/types/movie/genres.response";

interface SearchPageProps {
    loadingSearchMovies: boolean;
    errorSearchMovies: string | null;
    searchResults: Movie[];
    totalPages: number;
    fetchSearchMovies: (query: string, page: number, selectedGenres: number[], fromDate ?: string, toDate ?: string) => void;
    fetchLlmSearchMovies: (query: string, collectionName: string, amount: number, threshold: number, page: number) => void;
    fetchGenres: () => void;
    genresResult: Genres[];
}

const SearchContent: React.FC<SearchPageProps> = props => {
  const dispatch = useDispatch<AppDispatch>();
  const [isClient, setIsClient] = useState(false);
  const auth = useAppSelector((state: RootState) => state.auth);
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>(searchParams.get("query") || "");
  const [page, setPage] = useState<number>(parseInt(searchParams.get("page") || "1"));
  const [arrCurNumOfPages, setArrCurNumOfPages] = useState<(number | string)[]>([]);
  const { loadingSearchMovies, errorSearchMovies, searchResults, totalPages, fetchSearchMovies, fetchLlmSearchMovies, genresResult, fetchGenres } = props;
  const [searchType, setSearchType] = useState<string>("normal");
  const llmCollectionSearch = "movies";
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [errorDate, setErrorDate] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    fetchSearchMovies(query, page, selectedGenres, fromDate, toDate);
    fetchGenres();
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
    } else {
      setArrCurNumOfPages([1]);
    }
  }, [dispatch, page, totalPages]);

  const handleSearch = () => {
    if (searchType === "llm-search") {
      if (query.trim()){
        fetchLlmSearchMovies(query, llmCollectionSearch, 24, 0.5, 1); // Reset to first page when performing a new search
        setPage(1);
      }
    } else {
      if (!validateDates()) {
        return;
      }
      fetchSearchMovies(query, 1, selectedGenres, fromDate, toDate); // Reset to first page when performing a new search
      setPage(1);
    }
  };

  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]
    );
  };

  const validateDates = (): boolean => {
    const today = new Date();

    if (fromDate) {
      const from = new Date(fromDate);
      if (from > today) {
        setErrorDate("From Date cannot be in the future.");
        return false;
      }
    }

    if (toDate) {
      const to = new Date(toDate);
      if (to > today) {
        setErrorDate("To Date cannot be in the future.");
        return false;
      }
    }

    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);

      if (from > to) {
        setErrorDate("From Date must be earlier than or equal to To Date.");
        return false;
      }
    }

    setErrorDate(null);
    return true;
  };

  if (!isClient) {
    return null; // Render nothing on the server
  }

return (
    <div className="bg-darkBlue">
      <CustomHeader />
      <div className="w-full container mx-auto h-[150px] pt-16 px-12">
        <div className="flex flex-col"> 
        <div className="flex items-center">
          <Input
            placeholder="Search for movies..."
            className="flex-1 text-white border border-solid border-white"
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
          <div>
            <label className="text-white me-3" htmlFor="searchType">Search type:</label>
            <select className="selectWrapper"
              id='searchType'
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="normal">Normal search</option>
              <option value="llm-search">LLM Search</option>
            </select>
          </div>
          
        </div>
       
      </div>

      <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
            {genresResult == null || loadingSearchMovies ? (
                <Spinner />
            ) : searchResults.length > 0 ? (
                <div className={searchType !== "normal" ? "container mx-auto p-8" : "flex container mx-auto p-8"}>
                  {/* Side bar */}
                  {searchType === "normal" && 
                  <div className="w-1/4 bg-darkBlue text-white border border-white border-opacity-50 rounded-md">
                    {/* Release Dates */}
                    <div className="flex justify-between">
                      <h2 className="text-lg font-bold p-4">Filters</h2>
                      <button
                        onClick={handleSearch}
                        className="m-2 button-auth"
                      >
                        Apply
                      </button>
                    </div>
                    <div className="p-4 border-y border-white">
                      <label className="block text-base font-bold mb-2">Release Dates</label>
                      <div className="flex flex-col gap-2">
                        From<input
                          type="date"
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                          className="p-2 bg-gray-800 text-white rounded border border-white focus:outline-none"
                          placeholder="From"
                        />
                        <button
                          type="button"
                          onClick={() => setFromDate("")}
                          className="text-white bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
                        >
                          x
                        </button>
                        To<input
                          type="date"
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                          className="p-2 bg-gray-800 text-white rounded border border-white focus:outline-none"
                          placeholder="To"
                        />
                        <button
                          type="button"
                          onClick={() => setToDate("")}
                          className="text-white bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
                        >
                          x
                        </button>
                        {errorDate && <p className="text-red-500">{errorDate}</p>}
                      </div>
                    </div>

                    {/* Genres */}
                    <div className="mb-4 p-4 border-white">
                      <label className="block text-base font-bold mb-4">Genres</label>
                      <div className="flex flex-wrap gap-2">
                        {genresResult.map((genre) => (
                          <button
                            key={genre.id}
                            onClick={() => toggleGenre(genre.id)}
                            className={`px-3 py-1 rounded-full ${
                              selectedGenres.includes(genre.id)
                                ? "bg-pink-500 border-pink-500"
                                : "bg-gray-800 border-white"
                            } text-white border hover:bg-pink-500 hover:border-pink-500`}
                          >
                            {genre.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  }
                  <div className={searchType !== "normal" ? "w-full" : "w-3/4"}>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
                        {searchResults.map((movie: Movie, index: number) => (
                        <MovieCard key={index} movie={movie} index={index} />
                        ))}
                    </div>
                  </div>
                </div>
            ) : (
                <div className="flex flex-row">
                <h1 className="text-white">No results found.</h1>
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
              disabled={page === totalPages || loadingSearchMovies || totalPages === 0}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
            >
              {">"}
            </button>
            <button
              disabled={page === totalPages || loadingSearchMovies || totalPages === 0}
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
      <CustomFooter />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
    return {
      loadingSearchMovies: state.searchMovies.loading,
      errorSearchMovies: state.searchMovies.error,
      searchResults: state.searchMovies.searchResults,
      totalPages: state.searchMovies.totalPages,
      genresResult: state.genres.genres || []
    };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
      fetchSearchMovies: (query: string, page: number, selectedGenres: number[], fromDate ?: string, toDate ?: string) =>
        dispatch(fetchSearchMovies(query, page, selectedGenres, fromDate, toDate)),

      fetchLlmSearchMovies: (query: string, collectionName: string, 
        amount: number, threshold: number, page: number) =>
          
          dispatch(fetchLlmSearchMovies(query, collectionName, amount, 
            threshold, page)),

      fetchGenres: () => dispatch(fetchGenres())
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