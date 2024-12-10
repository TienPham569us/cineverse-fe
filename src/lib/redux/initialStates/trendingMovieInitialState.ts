import { Movie } from "@/types/movie/movie.response";

export interface TrendingMovieState {
    trendingMovies: Movie[];
    loading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
    totalResults: number;
}

export const trendingMovieInitialState: TrendingMovieState = {
    trendingMovies: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 0,
    totalResults: 0
};