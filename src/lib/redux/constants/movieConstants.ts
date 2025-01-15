import { Genres } from "@/types/movie/genres.response";
import { Movie } from "@/types/movie/movie.response";
import { MovieDetails } from "@/types/movie/movieDetails.response";

export const FETCH_TRENDING_MOVIES_START = 'FETCH_TRENDING_MOVIES_START';
export const FETCH_TRENDING_MOVIES_SUCCESS = 'FETCH_TRENDING_MOVIES_SUCCESS';
export const FETCH_TRENDING_MOVIES_FAILURE = 'FETCH_TRENDING_MOVIES_FAILURE';

export const FETCH_MOVIE_DETAILS_START = 'FETCH_MOVIE_DETAILS_START';
export const FETCH_MOVIE_DETAILS_SUCCESS = 'FETCH_MOVIE_DETAILS_SUCCESS';
export const FETCH_MOVIE_DETAILS_FAILURE = 'FETCH_MOVIE_DETAILS_FAILURE';

export const FETCH_SEARCH_MOVIES_START = "FETCH_SEARCH_MOVIES_START";
export const FETCH_SEARCH_MOVIES_SUCCESS = "FETCH_SEARCH_MOVIES_SUCCESS";
export const FETCH_SEARCH_MOVIES_FAILURE = "FETCH_SEARCH_MOVIES_FAILURE";

export const FETCH_GENRES_START = "FETCH_GENRES_START";
export const FETCH_GENRES_SUCCESS = "FETCH_GENRES_SUCCESS";
export const FETCH_GENRES_FAILURE = "FETCH_GENRES_FAILURE";

export type FetchTrendingMoviesStartAction = { type: typeof FETCH_TRENDING_MOVIES_START };
export type FetchTrendingMoviesSuccessAction = { type: typeof FETCH_TRENDING_MOVIES_SUCCESS, 
    payload: {trendingMovies: Movie[], totalPages: number, totalResults: number, page: number} }
export type FetchTrendingMoviesFailureAction = { type: typeof FETCH_TRENDING_MOVIES_FAILURE, payload: string }

export type FetchMovieDetailsStartAction = { type: typeof FETCH_MOVIE_DETAILS_START };
export type FetchMovieDetailsSuccessAction = { type: typeof FETCH_MOVIE_DETAILS_SUCCESS, payload: MovieDetails }
export type FetchMovieDetailsFailureAction = { type: typeof FETCH_MOVIE_DETAILS_FAILURE, payload: string }

export type FetchSearchMoviesStartAction = { type: typeof FETCH_SEARCH_MOVIES_START };
export type FetchSearchMoviesSuccessAction = { type: typeof FETCH_SEARCH_MOVIES_SUCCESS,
    payload: {searchResults: Movie[], totalPages: number, totalResults: number, page: number};
};
export type FetchSearchMoviesFailureAction = {type: typeof FETCH_SEARCH_MOVIES_FAILURE, payload: string};

export type FetchGenresStartAction = { type: typeof FETCH_GENRES_START };
export type FetchGenresSuccessAction = { type: typeof FETCH_GENRES_SUCCESS, payload: {genres: Genres[]} }
export type FetchGenresFailureAction = { type: typeof FETCH_GENRES_FAILURE, payload: string }

export type MovieActionTypes =
 | FetchTrendingMoviesStartAction
 | FetchTrendingMoviesSuccessAction
 | FetchTrendingMoviesFailureAction
 | FetchMovieDetailsStartAction
 | FetchMovieDetailsSuccessAction
 | FetchMovieDetailsFailureAction
 | FetchSearchMoviesStartAction
 | FetchSearchMoviesSuccessAction
 | FetchSearchMoviesFailureAction
 | FetchGenresStartAction
 | FetchGenresSuccessAction
 | FetchGenresFailureAction;