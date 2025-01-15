import { Cast } from "@/types/cast/cast.response";
import { CastDetails } from "@/types/cast/castDetails.response";

export const FETCH_POPULAR_CASTS_START = 'FETCH_POPULAR_CASTS_START';
export const FETCH_POPULAR_CASTS_SUCCESS = 'FETCH_POPULAR_CASTS_SUCCESS';
export const FETCH_POPULAR_CASTS_FAILURE = 'FETCH_POPULAR_CASTS_FAILURE';

export const FETCH_CAST_DETAILS_START = 'FETCH_CAST_DETAILS_START';
export const FETCH_CAST_DETAILS_SUCCESS = 'FETCH_CAST_DETAILS_SUCCESS';
export const FETCH_CAST_DETAILS_FAILURE = 'FETCH_CAST_DETAILS_FAILURE';

export type FetchTrendingMoviesStartAction = { type: typeof FETCH_POPULAR_CASTS_START };
export type FetchTrendingMoviesSuccessAction = { type: typeof FETCH_POPULAR_CASTS_SUCCESS, 
    payload: {popularCasts: Cast[], totalPages: number, totalResults: number, page: number}}
export type FetchTrendingMoviesFailureAction = { type: typeof FETCH_POPULAR_CASTS_FAILURE, payload: string }

export type FetchCastDetailsStartAction = { type: typeof FETCH_CAST_DETAILS_START };
export type FetchCastDetailsSuccessAction = { type: typeof FETCH_CAST_DETAILS_SUCCESS, payload: CastDetails }
export type FetchCastDetailsFailureAction = { type: typeof FETCH_CAST_DETAILS_FAILURE, payload: string }

export type CastActionTypes =
 | FetchTrendingMoviesStartAction
 | FetchTrendingMoviesSuccessAction
 | FetchTrendingMoviesFailureAction
 | FetchCastDetailsStartAction
 | FetchCastDetailsSuccessAction
 | FetchCastDetailsFailureAction;