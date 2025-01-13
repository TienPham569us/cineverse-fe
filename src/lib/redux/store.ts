import  { Action, configureStore, Dispatch  } from '@reduxjs/toolkit';
//import authReducer from './features/authSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
//import { authApi } from './features/authApi';
import authReducer, { userSignupReducer } from './reducers/authReducer';
import thunk, {ThunkMiddleware, ThunkAction} from 'redux-thunk';
import { getAuthState, getUserSignupState } from './localStorageUtil/local_storage_utils';
import { trendingMovieInitialState } from './initialStates/trendingMovieInitialState';
import { movieDetailsInitialState } from './initialStates/movieDetailsInitialState';
import { genresReducer, movieDetailsReducer, searchMoviesReducer, trendingMoviesReducer } from './reducers/movieReducer';
import { castDetailsReducer, popularCastsReducer } from './reducers/castReducer';

const preloadedState = {
    auth: getAuthState(),
    userSignup: getUserSignupState(),
    trendingMovies: trendingMovieInitialState,
    movieDetails: movieDetailsInitialState
};

export const store = configureStore({
    reducer: {
        auth: authReducer,
        userSignup: userSignupReducer,
        trendingMovies: trendingMoviesReducer,
        movieDetails: movieDetailsReducer,
        searchMovies: searchMoviesReducer,
        popularCasts: popularCastsReducer,
        castDetails: castDetailsReducer,
        genres: genresReducer,
        //[authApi.reducerPath]: authApi.reducer,
    },
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk as any as ThunkMiddleware),
        //getDefaultMiddleware().concat(authApi.middleware),
    preloadedState: preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;