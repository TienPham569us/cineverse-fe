import { Movie } from "@/types/movie/movie.response";
import { formatDate } from "@/utils/dateUtils";
import Link from "next/link";
import CircularProgressBar from "./CircularProgressBar";
import { media_base_url } from "@/constants/app_api";


export default function MovieCard({ movie, index }: { movie: Movie, index: number }) {
  return (
    <Link 
        key={index} 
        className="relative w-full h-full p-4 shadow-lg rounded-md" 
        href={`/movies/${movie.id}`}>
        
        <img 
            src={`${media_base_url}/${movie.posterPath}`} 
            alt={`${media_base_url}/${movie.posterPath}`} 
            className="object-cover w-full rounded-lg" />
        <div className="font-bold hover:text-[#22d3ee]">{movie.title}</div>
        <div className="text-sm font-italic text-[#64748b]">{(movie.releaseDate != "" && movie.releaseDate != null) ? formatDate(movie.releaseDate) : ""}</div>
    </Link>
  );
}