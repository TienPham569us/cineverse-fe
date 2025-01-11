import { Movie } from "@/types/movie/movie.response";
import { formatDate } from "@/utils/dateUtils";
import { faHeart, faBookmark, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Modal from "../Modal/Modal";
import { useState } from "react";

const MovieListItem = ({ movie, handleClick } : 
    { 
        movie: Movie
        handleClick: () => void
    }) => {

    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [isShowRatingModal, setIsShowRatingModal] = useState<boolean>(false);

    return (<li className="overflow-hidden rounded-lg shadow-lg cursor-pointer w-full border border-solid border-2 " onClick={handleClick}>
      <a className="w-full flex flex-row " href={`/movies/${movie.id}`}>
        <div className="rounded-lg">
          <img alt={movie.title} src={movie.posterPath} className="object-cover w-full h-64 rounded-lg" />
        </div>

        <div className="flex flex-col rounded-full shadow-lg justify-around w-full py-5">
          <div className="flex flex-row px-3">
            <div className="circleRating w-[50px] h-[50px] py-4 bg-white rounded-full flex items-center justify-center shadow-lg">
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
                className="font-bold text-center"
              />
            </div>
            
            <div className="text-block flex flex-col text-white px-5 pb-4 hover:text-[#22d3ee]">
              <div className="title text-[16px] md:text-[20px] mb-2 leading-[24px] whitespace-nowrap overflow-hidden text-ellipsis">
                {movie.title}
              </div>
              <div className="date text-[14px] opacity-50 hover:text-[#22d3ee]">
                {(movie.releaseDate != "" && movie.releaseDate != null) ? formatDate(movie.releaseDate) : ""}
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between px-5 py-4 text-white">
            Overview
          </div>


          <div className="flex flex-row justify-start px-3 py-1 text-white gap-6">
            <button 
              className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center"
              onClick={()=>{}}>
              <span className="text text-lg">
                <FontAwesomeIcon icon={faHeart} className={`${isFavorite ? 'text-red-500' : 'text-white'}`}/>
              </span>
            </button>
            <button  
              className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center"
              onClick={()=>{}}>
              <span className="text text-lg">
                <FontAwesomeIcon icon={faBookmark} className={`${isBookmarked ? 'text-red-500' : 'text-white'}`}/>
              </span>
            </button>

            <div  
              className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center"
              onClick={()=>{}}>
              <span className="text text-lg">
                <FontAwesomeIcon icon={faStar} className={`text-white`}/>
              </span>

             
              
            </div>
          </div>
        </div>
        
       
      </a>
    </li>);
}

export default MovieListItem;