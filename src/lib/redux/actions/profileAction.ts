import { ApiManager } from "@/api_manager/ApiManager";
import { Dispatch } from "redux";
import { ENDPOINTS } from "@/api_manager/EndPoints";
import * as dotenv from 'dotenv';
import { UserMovie, UserMoviePagination } from "@/types/profile/UserMovie.response";

dotenv.config();
const headers = {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    //'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
};

const API_BASE_URL: string = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'https://cineverse-be-ga2.onrender.com'; //'http://localhost:8080'; // process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.themoviedb.org/3';

export const addMovieToWatchlist = async (movieId: number, idToken: string) => {
    try {
        
        const newHeaders = {
            ...headers,
            'Authorization': `Bearer ${idToken}`,
        }
        const response = await ApiManager.post(
            `${ENDPOINTS.WATCHLIST}`,
            { movieId: movieId },
            newHeaders,
            undefined,
            API_BASE_URL
        );
        console.log("response add movie to watch list", response);

        return response.message;

    } catch (error: any) {
        console.error("Error adding movie to watchlist:", error);
    }
}

export const removeMovieFromWatchlist = async (movieId: number, idToken: string) => {
    try {
        
        const newHeaders = {
            ...headers,
            'Authorization': `Bearer ${idToken}`,
        }
        const response = await ApiManager.delete(
            `${ENDPOINTS.WATCHLIST}/${movieId}`,
            newHeaders,
            undefined,
            API_BASE_URL
        );
        console.log("response remove movie to watch list", response);

        return response.message;

    } catch (error: any) {
        console.error("Error remove movie to watchlist:", error);
    }
}

export const addMovieToFavouriteList = async (movieId: number, idToken: string) => {
    try {
        
        const newHeaders = {
            ...headers,
            'Authorization': `Bearer ${idToken}`,
        }
        const response = await ApiManager.post(
            `${ENDPOINTS.FAVOURITE_LIST}`,
            { movieId: movieId },
            newHeaders,
            undefined,
            API_BASE_URL
        );
        console.log("response add movie to favourite list", response);

        return response.message;

    } catch (error: any) {
        console.error("Error adding movie to favourite list:", error);
    }
}

export const removeMovieFromFavouriteList = async (movieId: number, idToken: string) => {
    try {
        
        const newHeaders = {
            ...headers,
            'Authorization': `Bearer ${idToken}`,
        }
        const response = await ApiManager.delete(
            `${ENDPOINTS.FAVOURITE_LIST}/${movieId}`,
            newHeaders,
            undefined,
            API_BASE_URL
        );
        console.log("response remove movie to favourite list", response);

        return response.message;

    } catch (error: any) {
        console.error("Error remove movie to favourite list:", error);
    }
}

export const addReviewToMovie = async (movieId: number, idToken: string, review: string, rating: number ) => {
    try {
        
        const newHeaders = {
            ...headers,
            'Authorization': `Bearer ${idToken}`,
        }
        const response = await ApiManager.post(
            `${ENDPOINTS.REVIEW}`,
            {   
                movieId: movieId,
                review: review,
            },
            newHeaders,
            undefined,
            API_BASE_URL
        );
        console.log("response add review to movie", response);

        const responseRating = await ApiManager.post(
            `${ENDPOINTS.RATING}`,
            {   
                movieId: movieId,
                rating: rating,
            },
            newHeaders,
            undefined,
            API_BASE_URL
        );
        console.log("response add rating to movie", responseRating);

        return response.message;

    } catch (error: any) {
        console.error("Error add review to movie:", error);
    }
}

export const fetchMyMovieDetails = async (movieId: number, idToken: string): Promise<UserMovie | null>=> {
    try {
        
        const newHeaders = {
            ...headers, 
            'Authorization': `Bearer ${idToken}`,
        }
        const response = await ApiManager.get(
            `${ENDPOINTS.MY_MOVIE_DETAILS}?movieId=${movieId}`,
            newHeaders,
            undefined,
            API_BASE_URL, 
            true
        );
        console.log("response fetch my movie details", response);

        if (response.status === 404) {
            return null;
        }
        
        return response.result;
    } catch (error: any) {
        console.error("Error fetching my movie details:", error);
    }
    return null;
}


export const fetchWatchList = async (idToken: string, page: number): Promise<UserMoviePagination | null> => {
    try {
        
        const newHeaders = {
            ...headers, 
            'Authorization': `Bearer ${idToken}`,
        }

        const response = await ApiManager.get(
            `${ENDPOINTS.WATCHLIST}?page=${page}`,
            newHeaders,
            undefined,
            API_BASE_URL,
            true
        );

        console.log("response", response);

        return response;
    } catch (error: any) {
        console.error("Error fetching recommendation movies:", error);
        return null;
    }
}

export const fetchFavouriteList = async (idToken: string, page: number): Promise<UserMoviePagination | null> => {
    try {
        
        const newHeaders = {
            ...headers, 
            'Authorization': `Bearer ${idToken}`,
        }

        const response = await ApiManager.get(
            `${ENDPOINTS.FAVOURITE_LIST}?page=${page}`,
            newHeaders,
            undefined,
            API_BASE_URL,
            true
        );

        console.log("response", response);

        return response;
    } catch (error: any) {
        console.error("Error fetching favour movies:", error);
        return null;
    }
}


export const fetchRatingList = async (idToken: string, page: number): Promise<UserMoviePagination | null> => {
    try {
        
        const newHeaders = {
            ...headers, 
            'Authorization': `Bearer ${idToken}`,
        }

        const response = await ApiManager.get(
            `${ENDPOINTS.RATING_LIST}?page=${page}`,
            newHeaders,
            undefined,
            API_BASE_URL,
            true
        );

        console.log("response", response);

        return response;
    } catch (error: any) {
        console.error("Error fetching favour movies:", error);
        return null;
    }
}