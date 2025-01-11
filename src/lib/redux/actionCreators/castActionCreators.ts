import { Cast } from "@/types/cast/cast.response"
import {FETCH_CAST_DETAILS_FAILURE, FETCH_CAST_DETAILS_START, FETCH_CAST_DETAILS_SUCCESS, FETCH_POPULAR_CASTS_FAILURE, FETCH_POPULAR_CASTS_START, FETCH_POPULAR_CASTS_SUCCESS} from "../constants/castConstants"
import { CastDetails } from "@/types/cast/castDetails.response"

export const fetchPopularCastsStart = () => {
    return {
        type: FETCH_POPULAR_CASTS_START
    }
}

export const fetchPopularCastsSuccess = (
    payload: {popularCasts: Cast[], totalPages: number, 
        totalResults: number, page: number}) => {
    return {
        type: FETCH_POPULAR_CASTS_SUCCESS,
        payload: payload
    }
}

export const fetchPopularCastsFailure = (error: string) => {
    return {
        type: FETCH_POPULAR_CASTS_FAILURE,
        payload: error
    }
}

export const fetchCastDetailsStart = () => {
    return {
        type: FETCH_CAST_DETAILS_START,
      
    }
}

export const fetchCastDetailsSuccess = (payload: CastDetails) => {
    return {
        type: FETCH_CAST_DETAILS_SUCCESS,
        payload: payload
    }
}

export const fetchCastDetailsFailure = (error: string) => {
    return {
        type: FETCH_CAST_DETAILS_FAILURE,
        payload: error
    }
}
