export interface VideoItem {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    official: boolean;
    published_at: string;
    site: string;
    size: number;
    type: string;
  }
  
export interface VideoResponse {
    id: number;
    results: VideoItem[];
}

export interface LatestTrailerResponse {
  id: number;
  title: string;
  trailers: VideoItem[];
}