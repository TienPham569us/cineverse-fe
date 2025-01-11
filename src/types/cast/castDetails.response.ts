export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  releaseDate: string;
}

export interface CastDetails {
    id: number;
    name: string;
    biography: string;
    birthday: string;
    gender: number;
    placeOfBirth: string;
    knownFor: string;
    profilePath: string;
    movieCredits: MovieDetails[];
}

