import { sign } from "crypto";
import { authInitialState, AuthState } from "../initialStates/authInitialState";
import { signUpInitialState } from "../initialStates/signupInitialState";

export const saveAuthState = (state: AuthState) => {
    localStorage.setItem('authState', JSON.stringify(state));
}

export const getAuthState = () => {
    try {
        const serializedState = localStorage.getItem('authState');
        if (serializedState === null) {
            return authInitialState;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}

export const getUserSignupState = () => {
    try {
        const serializedState = localStorage.getItem('userSignupState');
        if (serializedState === null) {
            return signUpInitialState;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}

export const clearAuthState = () => {
    localStorage.removeItem('authState');
}

export const saveAuthToken = (token: string) => {
    const toBase64 = Buffer.from(token).toString('base64');
    localStorage.setItem("authToken", toBase64);
}

export const getAuthToken = () => {
    const token = localStorage.getItem("authToken");
    if (token === null) {
        return "";
    }
    return token;
}