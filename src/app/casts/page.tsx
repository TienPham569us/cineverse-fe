'use client';

import CustomHeader from "@/components/header";
import CustomFooter from "@/components/footer";
import { AppDispatch, RootState} from "@/lib/redux/store";
import { useSearchParams } from 'next/navigation'
import Link from "next/link";
import React, { Suspense, use, useEffect, useState } from "react";
import { connect, useDispatch} from "react-redux";
import Spinner from "@/components/Spinner";
import { Cast } from "@/types/person/cast.response";
import { fetchPopularCasts } from "@/lib/redux/actions/castActions";
import CastCard from "@/components/CastCard";
import { Input } from "@/components/ui/input";

interface PopularCastsPageProps {
  loadingPopularCasts: boolean;
  errorPopularCasts: string | null;
  popularCasts: Cast[];
  totalPages: number;
  fetchPopularCasts: (query: string, page: number) => Promise<void>;
}

const PopularCastsContent: React.FC<PopularCastsPageProps> = props => {
  const dispatch = useDispatch<AppDispatch>();
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>(searchParams.get("query") || "");
  const [page, setPage] = useState<number>(parseInt(searchParams.get("page") || "1"));
  const [arrCurNumOfPages, setArrCurNumOfPages] = useState<(number | string)[]>([]);
  const { loadingPopularCasts, errorPopularCasts, popularCasts, totalPages, fetchPopularCasts } = props;

  useEffect(() => {
    setIsClient(true);
    fetchPopularCasts(query, page);
  }, [dispatch, page]);

  useEffect(() => {
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
    fetchPopularCasts(query, 1); // Reset to first page when performing a new search
    setPage(1);
  };

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <div className="bg-darkBlue">
      <CustomHeader />
      <div className="w-full container mx-auto h-[100px] pt-16 px-12">
        <div className="flex items-center">
          <Input
            placeholder="Search for casts..."
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
      </div>
      <div className="container mx-auto flex justify-between items-center pt-8 px-16">
        <div className="flex items-center text-white text-xl font-bold">
          Popular Cast
        </div>
      </div>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
            {loadingPopularCasts ? (
                <Spinner />
            ) : popularCasts.length > 0 ? (
                <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
                    {popularCasts.map((cast, index: number) => (
                      <CastCard key={index} cast={cast} index={index} />
                    ))}
                </div>
                </div>
            ) : (
                <div className="flex flex-row">
                <h1 className="text-white">No results found.</h1>
                </div>
            )}

            {errorPopularCasts && (
                <div className="flex flex-row">
                <h1 className="text-[#dc2626]">Error: {errorPopularCasts}</h1>
                </div>
            )}

            {/* Pagination */}
            <div className="flex gap-2 mt-4">
            <button
              disabled={page === 1 || loadingPopularCasts}
              onClick={() => setPage(1)}
              className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
            >
              {"<<"}
            </button>
            <button
              disabled={page === 1 || loadingPopularCasts}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
            >
              {"<"}
            </button>
            {arrCurNumOfPages.map((item, index) => (
              <button
                key={index}
                disabled={item === "..." || loadingPopularCasts}
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
              disabled={page === totalPages || loadingPopularCasts || totalPages === 0}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
            >
              {">"}
            </button>
            <button
              disabled={page === totalPages || loadingPopularCasts || totalPages == 0}
              onClick={() => setPage(totalPages)}
              className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
            >
              {">>"}
            </button>  
            </div>
        </main>
      </div>
      <CustomFooter />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
    
      loadingPopularCasts: state.popularCasts.loading,
      errorPopularCasts: state.popularCasts.error,
      popularCasts: state.popularCasts.popularCasts,
      totalPages: state.popularCasts.totalPages
    
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    
  fetchPopularCasts: (query: string, page: number) =>
    dispatch(fetchPopularCasts(query, page)),
    
});

const ConnectedPopularCastPageContent = connect(mapStateToProps, mapDispatchToProps)(PopularCastsContent);

export default function PopularCastsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConnectedPopularCastPageContent />
    </Suspense>
  );
}