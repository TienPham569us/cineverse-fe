import {FETCH_POPULAR_CASTS_FAILURE, FETCH_POPULAR_CASTS_START, FETCH_POPULAR_CASTS_SUCCESS, CastActionTypes, FETCH_CAST_DETAILS_START, FETCH_CAST_DETAILS_SUCCESS, FETCH_CAST_DETAILS_FAILURE } from "../constants/castConstants";
import { CastDetailsState, castDetailsInitialState } from "../initialStates/castDetailsInitialState";
import { PopularCastState, popularCastInitialState } from "../initialStates/popularCastInitialState";

export const popularCastsReducer = 
    (state: PopularCastState = popularCastInitialState, 
        action: CastActionTypes | any) : PopularCastState => {
    switch (action.type) {
        case FETCH_POPULAR_CASTS_START:
            return { ...state, loading: true, error: null };
        case FETCH_POPULAR_CASTS_SUCCESS:
            return { ...state, 
                popularCasts: action.payload.popularCasts,
                loading: false, 
                page: action.payload.page, 
                totalPages: action.payload.totalPages, 
                totalResults: action.payload.totalResults 
            };

        case FETCH_POPULAR_CASTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;

    };
} 

export const castDetailsReducer =
    (state: CastDetailsState = castDetailsInitialState,
        action: CastActionTypes | any): CastDetailsState => {
    switch (action.type) {
        case FETCH_CAST_DETAILS_START:
            return { ...state, loading: true, error: null };
        case FETCH_CAST_DETAILS_SUCCESS:
            return {
                ...state,
                castDetails: action.payload ? { 
                    ...action.payload, 
                    movieCredits: [...action.payload.movieCredits]
                } : null,
                loading: false
            };
        case FETCH_CAST_DETAILS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}