import { Cast } from "@/types/cast/cast.response";

export interface PopularCastState {
    popularCasts: Cast[];
    loading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
    totalResults: number;
}

export const popularCastInitialState: PopularCastState = {
    popularCasts: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 0,
    totalResults: 0
};