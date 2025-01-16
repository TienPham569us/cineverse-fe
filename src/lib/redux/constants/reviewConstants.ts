import { Review } from "@/types/review/review.response";

export const FETCH_REVIEWS_START = 'FETCH_REVIEWS_START';
export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
export const FETCH_REVIEWS_FAILURE = 'FETCH_REVIEWS_FAILURE';

export type FetchReviewsStartAction = { type: typeof FETCH_REVIEWS_START };
export type FetchReviewsSuccessAction = { type: typeof FETCH_REVIEWS_SUCCESS, 
    payload: {reviews: Review[]} }
export type FetchReviewsFailureAction = { type: typeof FETCH_REVIEWS_FAILURE, payload: string }

export type ReviewActionTypes =
 | FetchReviewsStartAction
 | FetchReviewsSuccessAction
 | FetchReviewsFailureAction;