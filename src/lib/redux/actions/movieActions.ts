import { ApiManager } from "@/api_manager/ApiManager";
import { Dispatch } from "redux";
import { fetchTrendingMoviesStart, fetchTrendingMoviesSuccess, fetchTrendingMoviesFailure } from "../actionCreators/movieActionCreators";
import { ENDPOINTS } from "@/api_manager/EndPoints";
import * as dotenv from 'dotenv';

dotenv.config();
const headers = {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    //'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
};

const API_BASE_URL: string ='http://localhost:8080'; // process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.themoviedb.org/3';
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
        dispatch(fetchTrendingMoviesStart());
    
        const response = await ApiManager.get(
            `${ENDPOINTS.MOVIE_DETAILS}/${movieId}`,
            headers,
            undefined,
            API_BASE_URL
        );
        console.log("response", response);

        dispatch(fetchTrendingMoviesSuccess(response));
        } catch (error: any) {
            console.error("Error fetching movie details:", error);
            dispatch(fetchTrendingMoviesFailure(error.message));
        }
    };
}