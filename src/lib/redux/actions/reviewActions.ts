import { ENDPOINTS } from "@/api_manager/EndPoints";
import * as dotenv from 'dotenv';
import { ApiManager } from "@/api_manager/ApiManager";
import { Dispatch } from "redux";
import { fetchReviewsFailure, fetchReviewsStart, fetchReviewsSuccess } from "../actionCreators/reviewActionCreators";

dotenv.config();
const headers = {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    //'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
};

const API_BASE_URL: string = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'https://cineverse-be-ga2.onrender.com';

export const fetchReviewByMovieId = (movieId: number) => {
    return async (dispatch: Dispatch) => {
        try {
        dispatch(fetchReviewsStart());

        const response = await ApiManager.get(
                    `${ENDPOINTS.MOVIE_DETAILS}/${movieId}`,
                    headers,
                    undefined,
                    API_BASE_URL,
                    true
                );
        console.log("response movie details", response);

        if (response.status === 404) {
            dispatch(fetchReviewsFailure("Movie not found"));
            return;
        }

        dispatch(fetchReviewsSuccess({
            reviews: response.reviews
        }));

        } catch (error: any) {
            console.error("Error fetching reviews of movies:", error);
            dispatch(fetchReviewsFailure(error.message));
        }
    };
}