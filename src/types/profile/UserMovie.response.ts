import { Movie } from "../movie/movie.response";

export interface UserMovie {    
    userId: string,
    movie: Movie,
    rating: number,
    favorite: boolean,
    inWatchList: boolean,
}

export interface Review {
    createdAt: string,
    updatedAt: string,
    review: string,
    userId: string,
}

export interface UserMoviePagination {
    results: UserMovie[],
    page: number,
    totalResults: number,
    totalPages: number
}

export interface UserMovieRating {
    info: UserMovie,
    reviews: Review[]
}

export interface UserMovieRatingPagination {
    results: UserMovieRating[],
    page: number,
    totalResults: number,
    totalPages: number
}