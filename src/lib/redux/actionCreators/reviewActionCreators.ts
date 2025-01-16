import { Review } from "@/types/review/review.response"
import { FETCH_REVIEWS_FAILURE, FETCH_REVIEWS_START, FETCH_REVIEWS_SUCCESS } from "../constants/reviewConstants"

export const fetchReviewsStart = () => {
    return {
        type: FETCH_REVIEWS_START
    }
}

export const fetchReviewsSuccess = (payload: {reviews: Review[]}) => {
    return {
        type: FETCH_REVIEWS_SUCCESS,
        payload: payload
    }
}

export const fetchReviewsFailure = (error: string) => {
    return {
        type: FETCH_REVIEWS_FAILURE,
        payload: error
    }
}