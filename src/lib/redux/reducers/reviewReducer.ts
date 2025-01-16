import { ReviewActionTypes, FETCH_REVIEWS_START, FETCH_REVIEWS_SUCCESS, FETCH_REVIEWS_FAILURE } from "../constants/reviewConstants";
import { reviewInitialState, ReviewState } from "../initialStates/reviewInitialState";

export const reviewsReducer = (state = reviewInitialState, action: ReviewActionTypes | any): ReviewState => {
    switch (action.type) {
        case FETCH_REVIEWS_START:
            return { ...state, loading: true, error: null };
        case FETCH_REVIEWS_SUCCESS:
            return { ...state, reviews: action.payload.reviews, loading: false };
        case FETCH_REVIEWS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}