import { Review } from "@/types/review/review.response";

export interface ReviewState {
    reviews: Review[];
    loading: boolean;
    error: string | null;
}

export const reviewInitialState: ReviewState = {
    reviews: [],
    loading: false,
    error: null
}