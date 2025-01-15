import { Movie } from "../movie/movie.response";

export interface UserMovie {    
    userId: string,
    movie: Movie,
    rating: number,
    favorite: boolean,
    inWatchList: boolean,
}

export interface UserMoviePagination {
    results: UserMovie[],
    page: number,
    totalResults: number,
    totalPages: number
}