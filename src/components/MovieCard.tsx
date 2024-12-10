import { Movie } from "@/types/movie/movie.response";
import { formatDate } from "@/utils/dateUtils";
import Link from "next/link";
import CircularProgressBar from "./CircularProgressBar";

const media_base_url = "https://media.themoviedb.org/t/p/w220_and_h330_face"; 

export default function MovieCard({ movie, index }: { movie: Movie, index: number }) {
  return (
    <Link 
        key={index} 
        className="relative w-full h-full p-4 hover:shadow-lg rounded-md" 
        href={`/movies/${movie.id}`}>
        
        <img 
            src={`${media_base_url}/${movie.posterPath}`} 
            alt={`${media_base_url}/${movie.posterPath}`} 
            className="object-cover w-full rounded-lg" />
        <div className="font-bold hover:text-[#22d3ee]">{movie.title}</div>
        <div className="text-sm font-italic text-[#64748b]">{formatDate(movie.releaseDate)}</div>
    </Link>
  );
}