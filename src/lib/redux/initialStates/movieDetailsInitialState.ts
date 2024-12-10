import { MovieDetails } from "@/types/movie/movieDetails.response";

export interface MovieDetailsState {
    movieDetails: MovieDetails | null;
    loading: boolean;
    error: string | null;
}

export const movieDetailsInitialState: MovieDetailsState = {
    movieDetails: null,
    loading: false,
    error: null
};