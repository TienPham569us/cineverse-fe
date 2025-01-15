export interface Profile {
    uid: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt?: string;
    profilePath?: string | null;
}