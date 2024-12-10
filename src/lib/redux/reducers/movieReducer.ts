import { FETCH_MOVIE_DETAILS_FAILURE, FETCH_MOVIE_DETAILS_START, FETCH_MOVIE_DETAILS_SUCCESS, FETCH_TRENDING_MOVIES_FAILURE, FETCH_TRENDING_MOVIES_START, FETCH_TRENDING_MOVIES_SUCCESS, MovieActionTypes } from "../constants/movieConstants";
import { movieDetailsInitialState, MovieDetailsState } from "../initialStates/movieDetailsInitialState";
import { trendingMovieInitialState, TrendingMovieState } from "../initialStates/trendingMovieInitialState";

export const trendingMoviesReducer = 
    (state: TrendingMovieState = trendingMovieInitialState, 
        action: MovieActionTypes | any) : TrendingMovieState => {
    switch (action.type) {
        case FETCH_TRENDING_MOVIES_START:
            return { ...state, loading: true, error: null };
        case FETCH_TRENDING_MOVIES_SUCCESS:
            return { ...state, 
                trendingMovies: action.payload.trendingMovies, //[...state.trendingMovies, ...action.payload.trendingMovies] , 
                loading: false, 
                page: action.payload.page, 
                totalPages: action.payload.totalPages, 
                totalResults: action.payload.totalResults 
            };

        case FETCH_TRENDING_MOVIES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;

    };
} 

export const movieDetailsReducer =
    (state: MovieDetailsState = movieDetailsInitialState,
        action: MovieActionTypes | any): MovieDetailsState => {
    switch (action.type) {
        case FETCH_MOVIE_DETAILS_START:
            return { ...state, loading: true, error: null };
        case FETCH_MOVIE_DETAILS_SUCCESS:
            return { ...state, movieDetails: action.payload, loading: false };
        case FETCH_MOVIE_DETAILS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}