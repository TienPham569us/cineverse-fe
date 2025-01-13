import { ApiManager } from "@/api_manager/ApiManager";
import { Dispatch } from "redux";
import { fetchTrendingMoviesStart, fetchTrendingMoviesSuccess, fetchTrendingMoviesFailure, fetchSearchMoviesStart, fetchSearchMoviesSuccess, fetchSearchMoviesFailure, fetchMovieDetailsSuccess, fetchMovieDetailsFailure, fetchMovieDetailsStart, fetchGenresStart, fetchGenresSuccess, fetchGenresFailure } from "../actionCreators/movieActionCreators";
import { ENDPOINTS } from "@/api_manager/EndPoints";
import * as dotenv from 'dotenv';
import { VideoResponse } from "@/types/movie/video.response";
import { Movie } from "@/types/movie/movie.response";

dotenv.config();
const headers = {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    //'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
};

const API_BASE_URL: string = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'https://cineverse-be-ga2.onrender.com'; //'http://localhost:8080'; // process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.themoviedb.org/3';
export const fetchTrendingMovies = (timeWindow: string) => {
    return async (dispatch: Dispatch) => {
        try {
        dispatch(fetchTrendingMoviesStart());
    
        const response = await ApiManager.get(
            `${ENDPOINTS.TRENDING_MOVIES}?period=${timeWindow}`,
            headers,
            undefined,
            API_BASE_URL
        );
        console.log("response", response);

        dispatch(fetchTrendingMoviesSuccess({
            trendingMovies: response.results,
            totalPages: response.totalPages,
            totalResults: response.totalResults,
            page: response.page
        }));

        } catch (error: any) {
            console.error("Error fetching trending movies:", error);
            dispatch(fetchTrendingMoviesFailure(error.message));
        }
    };
}

export const fetchMovieDetails = (movieId: number) => {
    return async (dispatch: Dispatch) => {
        try {
        dispatch(fetchMovieDetailsStart());
    
        const response = await ApiManager.get(
            `${ENDPOINTS.MOVIE_DETAILS}/${movieId}`,
            headers,
            undefined,
            API_BASE_URL
        );
        console.log("response", response);

        dispatch(fetchMovieDetailsSuccess(response));
        } catch (error: any) {
            console.error("Error fetching movie details:", error);
            dispatch(fetchMovieDetailsFailure(error.message));
        }
    };
}

export const fetchSearchMovies = (query: string, page: number = 1, genresId: number[] = [], fromDate?: string, toDate?: string) => {
    return async (dispatch: Dispatch) => {
        try {
        dispatch(fetchSearchMoviesStart());

        const genresParam = genresId.length > 0 ? `&withGenres=${genresId.join(",")}` : "";
        const fromDateParam = fromDate ? `&fromDate=${fromDate}` : "";
        const toDateParam = toDate ? `&toDate=${toDate}` : "";
        const response = await ApiManager.get(
            `${ENDPOINTS.SEARCH_MOVIES}?query=${query}&page=${page}&limit=24${genresParam}${fromDateParam}${toDateParam}`,
            headers,
            undefined,
            API_BASE_URL
        );
        console.log("response", response);

        dispatch(fetchSearchMoviesSuccess({
            searchResults: response.results,
            totalPages: response.totalPages,
            totalResults: response.totalResults,
            page: response.page
        }));

        } catch (error: any) {
            console.error("Error fetching trending movies:", error);
            dispatch(fetchSearchMoviesFailure(error.message));
        }
    };
}

export const fetchVideo = async (movieId: number): Promise<VideoResponse | null> => {
    try {
        const newHeader = {
            ...headers,
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        }
        const response = await ApiManager.get(
            `movie/${movieId}/videos`,
            newHeader,
            undefined,
            'https://api.themoviedb.org/3'
        );
        console.log("response", response);
        const VideoResponse: VideoResponse = response;
        return VideoResponse;
    } catch (error: any) {
        console.error("Error fetching movie videos:", error);
        return null;
    }

}

export const fetchSimilarMovie = async (movieId: number): Promise<Movie[] | null> => {
    try {
        // const newHeader = {
        //     ...headers,
        //     'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        // }
        // const response = await ApiManager.get(
        //     `movie/${movieId}/similar`,
        //     //newHeader,
        //     headers,
        //     undefined,
        //     API_BASE_URL
        //     //'https://api.themoviedb.org/3'
        // );

        const response = await ApiManager.get(
            `${ENDPOINTS.TRENDING_MOVIES}?period=day`,
            headers,
            undefined,
            API_BASE_URL
        );
        console.log("response", response);

        return response.results;
    } catch (error: any) {
        console.error("Error fetching movie videos:", error);
        return null;
    }

}

export const fetchFavouriteMovies = async (): Promise<Movie[] | null> => {
    try {
        const response = await ApiManager.get(
           `${ENDPOINTS.TRENDING_MOVIES}?period=day&page=1`,
            headers,
            undefined,
            API_BASE_URL
        );
        console.log("response", response);

        return response.results.slice(0, 5);
    } catch (error: any) {
        console.error("Error fetching favourite movies:", error);
        return null;
    }

}

export const fetchLlmSearchMovies = (
    query: string, collectionName: string, amount: number, 
    threshold: number, page: number = 1) => {

    return async (dispatch: Dispatch) => {
        try {
        dispatch(fetchSearchMoviesStart());
        const response = await ApiManager.get(
            `${ENDPOINTS.LLM_SEARCH_MOVIES}?collectionName=${collectionName}&query=${query}&amount=${amount}&threshold=${threshold}`,
            headers,
            undefined,
            API_BASE_URL
        );
        console.log("response", response);

        dispatch(fetchSearchMoviesSuccess({
            searchResults: response.results,
            totalPages: response.totalPages,
            totalResults: response.totalResults,
            page: response.page
        }));

        } catch (error: any) {
            console.error("Error fetching llm search movies:", error);
            dispatch(fetchSearchMoviesFailure(error.message));
        }
    };
}

export const fetchGenres = () => {
    return async (dispatch: Dispatch) => {
        try {
        dispatch(fetchGenresStart());
    
        const response = await ApiManager.get(
            `${ENDPOINTS.ALL_GENRES}`,
            headers,
            undefined,
            API_BASE_URL
        );
        console.log("response", response);

        dispatch(fetchGenresSuccess({
            genres: response,
        }));

        } catch (error: any) {
            console.error("Error fetching genres:", error);
            dispatch(fetchGenresFailure(error.message));
        }
    };
}