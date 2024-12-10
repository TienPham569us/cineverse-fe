export interface SignupState {
    loading: boolean;
    error: string | null;
    message: string | null;
}

export const signUpInitialState: SignupState = {
    loading: false,
    error: null,
    message: null
};