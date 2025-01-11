export interface Profile {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    profilePath?: string | null;
}