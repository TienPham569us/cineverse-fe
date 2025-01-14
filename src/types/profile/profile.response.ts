export interface Profile {
    uid: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt?: string;
    profilePath?: string | null;
}