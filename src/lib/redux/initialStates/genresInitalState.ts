import { Genres } from "@/types/movie/genres.response";

export interface GenresState {
    genres: Genres[] | null;
    loading: boolean;
    error: string | null;
}

export const genresInitialState: GenresState = {
    genres: null,
    loading: false,
    error: null
};