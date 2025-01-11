import Link from "next/link";
import "react-circular-progressbar/dist/styles.css";
import { Cast } from "@/types/person/cast.response";


export default function CastCard({ cast, index }: { cast: Cast, index: number }) {
  return (
    <Link 
        key={index} 
        className="relative w-full h-full p-4 shadow-2xl rounded-md" 
        href={`/casts/${cast.id}`}>
        
        <img 
            src={`${cast.profilePath}`} 
            alt={`${cast.profilePath}`} 
            className="object-cover w-full rounded-lg" />
        <div className="text-block flex flex-col text-white py-4 hover:text-[#22d3ee]">
          <div className="title text-[16px] md:text-[20px] mb-2 leading-[24px] whitespace-nowrap overflow-hidden text-ellipsis">
          {cast.name}
          </div>
        </div>
        {/* <div className="font-bold hover:text-[#22d3ee] text-black">{movie.title}</div>
        <div className="text-sm font-italic text-[#64748b]">{(movie.releaseDate != "" && movie.releaseDate != null) ? formatDate(movie.releaseDate) : ""}</div> */}
    </Link>
  );
}