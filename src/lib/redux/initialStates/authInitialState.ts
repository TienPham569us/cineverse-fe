export interface AuthState {
    idToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    userUid: string | null,
    email: string | null,
}

export const authInitialState: AuthState = {
    idToken: null,
    refreshToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    userUid: null,
    email: null
};