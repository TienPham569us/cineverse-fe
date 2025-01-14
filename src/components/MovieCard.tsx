import { Movie } from "@/types/movie/movie.response";
import { formatDate } from "@/utils/dateUtils";
import Link from "next/link";
import { media_base_url } from "@/constants/app_api";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


export default function MovieCard({ movie, index, detailSize }: { movie: Movie, index: number, detailSize?: boolean }) {
  return (
    <Link 
        key={index} 
        className="relative w-full h-full p-4 shadow-2xl rounded-md " 
        href={`/movies/${movie.id}`}>
        
        <img 
            src={`${media_base_url}/${movie.posterPath}`} 
            alt={`${media_base_url}/${movie.posterPath}`} 
            className="object-cover w-full rounded-lg" />
        <div className={`circleRating absolute ${detailSize && detailSize===true ? 'top-4 left-0' : 'top-[0px] left-3 '} w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center shadow-lg`}>
          <CircularProgressbar
            value={movie.voteAverage}
            maxValue={10}
            text={`${movie.voteAverage.toFixed(1)}`}
            styles={buildStyles({
              pathColor:
                movie.voteAverage < 5
                  ? "red"
                  : movie.voteAverage < 7.0
                  ? "orange"
                  : "green",
              textSize: "34px",
              textColor: "#04152d",
              trailColor: "transparent",
            })}
            className="font-bold"
          />
        </div>
        <div className="text-block flex flex-col text-white py-4 hover:text-[#22d3ee]">
          <div className="title text-[16px] md:text-[20px] mb-2 leading-[24px] whitespace-nowrap overflow-hidden text-ellipsis">
          {movie.title}
          </div>
          <div className="date text-[14px] opacity-50 hover:text-[#22d3ee]">
          {(movie.releaseDate != "" && movie.releaseDate != null) ? formatDate(movie.releaseDate) : ""}
          </div>
        </div>
        {/* <div className="font-bold hover:text-[#22d3ee] text-black">{movie.title}</div>
        <div className="text-sm font-italic text-[#64748b]">{(movie.releaseDate != "" && movie.releaseDate != null) ? formatDate(movie.releaseDate) : ""}</div> */}
    </Link>
  );
}