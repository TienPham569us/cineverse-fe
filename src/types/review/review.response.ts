import { AuthorDetails } from "./authorDetails.response";

export interface Review {
    authorDetails: AuthorDetails;
    author: string;
    content: string;
    createdAt: string;
    id: string;
    updatedAt: string;
    url: string;
}