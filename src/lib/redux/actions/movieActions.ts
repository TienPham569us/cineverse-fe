import { ApiManager } from "@/api_manager/ApiManager";
import { Dispatch } from "redux";
import { fetchTrendingMoviesStart, fetchTrendingMoviesSuccess, fetchTrendingMoviesFailure, fetchSearchMoviesStart, fetchSearchMoviesSuccess, fetchSearchMoviesFailure, fetchMovieDetailsSuccess, fetchMovieDetailsFailure, fetchMovieDetailsStart, fetchGenresStart, fetchGenresSuccess, fetchGenresFailure } from "../actionCreators/movieActionCreators";
import { ENDPOINTS } from "@/api_manager/EndPoints";
import * as dotenv from 'dotenv';
import { LatestTrailerResponse, VideoResponse } from "@/types/movie/video.response";
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
            `movie/${movieId}/similar`,
            headers,
            undefined,
            API_BASE_URL
        );
        console.log("response", response);
        const similarMovies: Movie[] = response.results;
        return similarMovies;
    } catch (error: any) {
        console.error("Error fetching movie videos:", error);
        return null;
    }

}

export const fetchFavouriteMovies = async (page: number = 1, idToken: string | null): Promise<{ movies: Movie[]; totalPages: number } | null> => {
    try {
        const newHeader = {
            ...headers,
            'Authorization': `Bearer ${idToken}`,
        }

        const response = await ApiManager.get(
           `${ENDPOINTS.FAVOURITE_LIST}?page=${page}`,
            newHeader,
            undefined,
            API_BASE_URL
        );
        console.log("response", response);

        if (response && response.results) {
            // Lọc và ánh xạ dữ liệu từ response để chỉ lấy các Movie
            const movies: Movie[] = response.results
                .filter((item: any) => item.movie)
                .map((item: any) => item.movie);

            const totalPages = response.totalPages ?? 1;
        
            return { movies, totalPages };
        }
        return null;
    } catch (error: any) {
        console.error("Error fetching favourite movies:", error);
        throw error;
    }

}

export const fetchWatchListdMovies = async (page: number = 1, idToken: string | null): Promise<{ movies: Movie[]; totalPages: number } | null> => {
    try {
        const newHeader = {
            ...headers,
            'Authorization': `Bearer ${idToken}`,
        }

        const response = await ApiManager.get(
           `${ENDPOINTS.WATCHLIST}?page=${page}`,
            newHeader,
            undefined,
            API_BASE_URL
        );
        console.log("response", response);

        if (response && response.results) {
            // Lọc và ánh xạ dữ liệu từ response để chỉ lấy các Movie
            const movies: Movie[] = response.results
                .filter((item: any) => item.movie)
                .map((item: any) => item.movie);
            
            const totalPages = response.totalPages ?? 1;
            return { movies, totalPages };
        }
        return null;
    } catch (error: any) {
        console.error("Error fetching favourite movies:", error);
        throw error;
    }

}

export const fetchRatingListdMovies = async (page: number = 1, idToken: string | null): Promise<{ movies: Movie[]; totalPages: number } | null> => {
    try {
        const newHeader = {
            ...headers,
            'Authorization': `Bearer ${idToken}`,
        }

        const response = await ApiManager.get(
           `${ENDPOINTS.RATING_LIST}?page=${page}`,
            newHeader,
            undefined,
            API_BASE_URL
        );
        console.log("response", response);

        if (response && response.results) {
            // Lọc và ánh xạ dữ liệu từ response để chỉ lấy các Movie
            const movies: Movie[] = response.results
                .filter((item: any) => item.info && item.info.movie)
                .map((item: any) => item.info.movie);
            
            const totalPages = response.totalPages ?? 1;
            return { movies, totalPages };
        }
        return null;
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

export const fetchRecommendationMoviesByReasonedMatch = async (movie: Movie): Promise<Movie[] | null> => {
    try {
        const threshold = 0.5;
        const amount = 24;
        const collectionName = "movies";
        const prompt = `find movies similar to movie has title ${movie.title} and tmdb_id is ${movie.id}, which are simimar in theme, or genre, or cast, or other features, except the movie i provided`;

        const response = await ApiManager.get(
            `${ENDPOINTS.LLM_SEARCH_MOVIES}?collectionName=${collectionName}&query=${prompt}&amount=${amount}&threshold=${threshold}`,
            headers,
            undefined,
            API_BASE_URL
        );
        console.log("response", response);

        return response.results;

        // const response = await ApiManager.get(
        //     `${ENDPOINTS.TRENDING_MOVIES}?period=day`,
        //     headers,
        //     undefined,
        //     API_BASE_URL
        // );
        // console.log("response", response);

        // return response.results;
    } catch (error: any) {
        console.error("Error fetching recommendation movies:", error);
        return null;
    }

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

export const fetchLatestTrailer = async (): Promise<LatestTrailerResponse[] | null> => {
    try {
        const response = await ApiManager.get(
            `${ENDPOINTS.LATEST_TRAILER}`,
            headers,
            undefined,
            API_BASE_URL
        );
        console.log("response", response);
        const listLatestTrailerResponse: LatestTrailerResponse[] = response;
        return listLatestTrailerResponse;
    } catch (error: any) {
        console.error("Error fetching movie videos:", error);
        throw new Error(String(error || "Unknown error occurred"));;
    }

}

export const fetchPoplarMovies = async (): Promise<Movie[] | null> => {
    try {
        const response = await ApiManager.get(
            `${ENDPOINTS.POPULAR_MOVIES}`,
            headers,
            undefined,
            API_BASE_URL
        );
        console.log("response", response);
        const listPopularMovies: Movie[] = response;
        return listPopularMovies;
    } catch (error: any) {
        console.error("Error fetching movie videos:", error);
        return null;
    }

}