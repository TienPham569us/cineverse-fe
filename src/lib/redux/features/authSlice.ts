import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

type InitialState = {
    value: AuthState;
}

type AuthState = {
    isAuth: boolean,
    uid: string,
    access_token: string,
    email: string,
    username: string,
    isModerator: boolean,
}
// const initialState: InitialState = {
//     value: {
//         isAuth: false,
//         username: "",
//         uid: "",
//         isModerator: false,
//     }
// }

export const setAuthToken = (token: string, name: string) => {
    const toBase64 = Buffer.from(token).toString('base64');
    localStorage.setItem(name, toBase64);
}

export const saveAuthState = (state: AuthState) => {
    localStorage.setItem('authState', JSON.stringify(state));
}

export const loadAuthState = (): AuthState => {
    const state = localStorage.getItem('authState');
    return state ? JSON.parse(state) : initialState;
}

export type LoginResponse = {
    access_token?: string,
    message?: string,
    username?: string,
    email?: string,
    uid?: string,
    // error?: string,
    // statusCode?: number,
};
//const initialState: Partial<LoginResponse> = {};

const initialState: AuthState = {
    isAuth: false,
    username: "",
    email: "",
    uid: "",
    isModerator: false,
    access_token: "",
};

export const auth = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("authState");
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, { payload }) => {
                    console.log('payload: ', payload);
                    setAuthToken(payload.data.access_token ?? "", "auth_token");
                    state.isAuth = true;
                    state.access_token = payload.data.access_token ?? "";
                    state.username = payload.data.username ?? "";
                    state.email = payload.data.email ?? "";
                    state.uid = payload.data.uid ?? "";
                    saveAuthState(state);
                    return state;
                    // if (payload.data && payload.data.message) {
                    //     state.isAuth = false;
                    // }
                    //return payload;
                }
            )
            .addMatcher(
                authApi.endpoints.getProfileData.matchFulfilled,
                (state, { payload }) => {
                    state.email = payload.data.email;
                    state.username = payload.data.username;
                    state.uid = payload.data.id;
                    saveAuthState(state);
                    //return { ...state, ...payload };
                }
            )
    },
});


//export const { setAuth, logOut, login } = auth.actions;
export const { logout } = auth.actions;
export default auth.reducer;