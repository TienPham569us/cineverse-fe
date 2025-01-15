import { ApiManager } from "@/api_manager/ApiManager";
import { Dispatch } from "redux";
import { fetchPopularCastsStart, fetchPopularCastsSuccess, fetchPopularCastsFailure, fetchCastDetailsStart, fetchCastDetailsSuccess, fetchCastDetailsFailure} from "../actionCreators/castActionCreators";
import { ENDPOINTS } from "@/api_manager/EndPoints";
import * as dotenv from 'dotenv';
dotenv.config();
const headers = {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    //'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
};

const API_BASE_URL: string = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'https://cineverse-be-ga2.onrender.com'; //'http://localhost:8080'; // process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.themoviedb.org/3';
export const fetchPopularCasts = (query: string, page: number = 1) => {
    return async (dispatch: Dispatch) => {
        try {
        dispatch(fetchPopularCastsStart());
    
        const response = await ApiManager.get(
            `${ENDPOINTS.POPULAR_CASTS}?query=${query}&page=${page}`,
            headers,
            undefined,
            API_BASE_URL
        );
        console.log("response", response);

        dispatch(fetchPopularCastsSuccess({
            popularCasts: response.results,
            totalPages: response.totalPages,
            totalResults: response.totalResults,
            page: response.page
        }));

        } catch (error: any) {
            console.error("Error fetching trending movies:", error);
            dispatch(fetchPopularCastsFailure(error.message));
        }
    };
}

export const fetchCastDetails = (castId: number) => {
    return async (dispatch: Dispatch) => {
        try {
        dispatch(fetchCastDetailsStart());
    
        const response = await ApiManager.get(
            `${ENDPOINTS.CAST_DETAILS}/${castId}`,
            headers,
            undefined,
            API_BASE_URL
        );
        console.log("response", response);

        dispatch(fetchCastDetailsSuccess(response));
        } catch (error: any) {
            console.error("Error fetching cast details:", error);
            dispatch(fetchCastDetailsFailure(error.message));
        }
    };
}