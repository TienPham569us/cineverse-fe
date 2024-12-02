export interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

export const authInitialState: AuthState = {
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};