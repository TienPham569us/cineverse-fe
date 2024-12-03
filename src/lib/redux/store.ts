import  { Action, configureStore, Dispatch  } from '@reduxjs/toolkit';
//import authReducer from './features/authSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
//import { authApi } from './features/authApi';
import authReducer from './reducers/authReducer';
import thunk, {ThunkMiddleware, ThunkAction} from 'redux-thunk';

const loadAuthState = () => {
    try {
        const serializedState = localStorage.getItem('authState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const preloadedState = {
    auth: loadAuthState(),
};

export const store = configureStore({
    reducer: {
        auth: authReducer,
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