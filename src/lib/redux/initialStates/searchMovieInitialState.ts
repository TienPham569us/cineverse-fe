import { Movie } from "@/types/movie/movie.response";

export interface SearchMoviesState {
    searchResults: Movie[];
    loading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
    totalResults: number;
}

export const searchMovieInitialState: SearchMoviesState = {
    searchResults: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 0,
    totalResults: 0
};