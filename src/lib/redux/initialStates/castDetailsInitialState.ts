import { CastDetails } from "@/types/cast/castDetails.response";

export interface CastDetailsState {
    castDetails: CastDetails | null;
    loading: boolean;
    error: string | null;
}

export const castDetailsInitialState: CastDetailsState = {
    castDetails: null,
    loading: false,
    error: null
};