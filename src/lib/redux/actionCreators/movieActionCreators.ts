import { Movie } from "@/types/movie/movie.response"
import { FETCH_GENRES_FAILURE, FETCH_GENRES_START, FETCH_GENRES_SUCCESS, FETCH_MOVIE_DETAILS_FAILURE, FETCH_MOVIE_DETAILS_START, FETCH_MOVIE_DETAILS_SUCCESS, FETCH_SEARCH_MOVIES_FAILURE, FETCH_SEARCH_MOVIES_START, FETCH_SEARCH_MOVIES_SUCCESS, FETCH_TRENDING_MOVIES_FAILURE, FETCH_TRENDING_MOVIES_START, FETCH_TRENDING_MOVIES_SUCCESS } from "../constants/movieConstants"
import { MovieDetails } from "@/types/movie/movieDetails.response"
import { Genres } from "@/types/movie/genres.response"

export const fetchTrendingMoviesStart = () => {
    return {
        type: FETCH_TRENDING_MOVIES_START
    }
}

export const fetchTrendingMoviesSuccess = (
    payload: {trendingMovies: Movie[], totalPages: number, 
        totalResults: number, page: number}) => {
    return {
        type: FETCH_TRENDING_MOVIES_SUCCESS,
        payload: payload
    }
}

export const fetchTrendingMoviesFailure = (error: string) => {
    return {
        type: FETCH_TRENDING_MOVIES_FAILURE,
        payload: error
    }
}

export const fetchMovieDetailsStart = () => {
    return {
        type: FETCH_MOVIE_DETAILS_START,
      
    }
}

export const fetchMovieDetailsSuccess = (payload: MovieDetails) => {
    return {
        type: FETCH_MOVIE_DETAILS_SUCCESS,
        payload: payload
    }
}

export const fetchMovieDetailsFailure = (error: string) => {
    return {
        type: FETCH_MOVIE_DETAILS_FAILURE,
        payload: error
    }
}

export const fetchSearchMoviesStart = () => {
    return {
        type: FETCH_SEARCH_MOVIES_START
    }
}

export const fetchSearchMoviesSuccess = (
    payload: {
        searchResults: Movie[], totalPages: number, 
        totalResults: number, page: number
    }) => {
    return {
        type: FETCH_SEARCH_MOVIES_SUCCESS,
        payload: payload
    }
}

export const fetchSearchMoviesFailure = (error: string) => {
    return {
        type: FETCH_SEARCH_MOVIES_FAILURE,
        payload: error
    }
}

export const fetchGenresStart = () => {
    return {
        type: FETCH_GENRES_START
    }
}

export const fetchGenresSuccess = (
    payload: {genres: Genres[]}) => {
    return {
        type: FETCH_GENRES_SUCCESS,
        payload: payload
    }
}

export const fetchGenresFailure = (error: string) => {
    return {
        type: FETCH_GENRES_FAILURE,
        payload: error
    }
}
