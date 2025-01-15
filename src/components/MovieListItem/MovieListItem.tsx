import { Movie } from "@/types/movie/movie.response";
import { formatDate } from "@/utils/dateUtils";
import { faHeart, faBookmark, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { UserMovie } from "@/types/profile/UserMovie.response";
import { useDispatch, useSelector } from "react-redux";
import { AuthState } from "@/lib/redux/initialStates/authInitialState";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { addMovieToFavouriteList, addMovieToWatchlist, fetchMyMovieDetails, removeMovieFromFavouriteList, removeMovieFromWatchlist } from "@/lib/redux/actions/profileAction";
import { FAVOURITE_LIST, WATCHLIST } from "@/lib/redux/constants/listMovieConstants";

const MovieListItem = ({ movie, handleClick, userMovie, listType, removeFromList } : 
    { 
        movie: Movie
        handleClick: () => void,
        userMovie: UserMovie,
        listType: string,
        removeFromList: (movieId: number) => void
    }) => {

    const [isFavorite, setIsFavorite] = useState<boolean>(userMovie.favorite || false);
    const [isBookmarked, setIsBookmarked] = useState<boolean>(userMovie.inWatchList || false);
    const [isShowRatingModal, setIsShowRatingModal] = useState<boolean>(false);

    const [userMovieDetails, setUserMovieDetails] = useState<UserMovie | null>(userMovie); 
    
    const profileData: AuthState = useSelector((state: RootState) => state.auth);

    const _fetchMyMovieDetails = async (movieId: number, idToken: string) => {
      try {
        const response = await fetchMyMovieDetails(movieId, idToken);
        setUserMovieDetails(response);
        
        if (response) { 
          if (response.favorite === true) {
            setIsFavorite(true);
          }
          if (response.inWatchList === true) {
            setIsBookmarked(true);
          }
        }
  
      } catch (error: any) {
          console.error("Error fetching my movie details:", error);
      }  
    }

    const toggleFavorite = async (event: React.MouseEvent) => {
      event.stopPropagation();

        if (isFavorite === false) {
          try {
            await addMovieToFavouriteList(movie!.id, profileData.idToken ?? '');
            setIsFavorite(true);
          } catch (error) {
            console.error("Error adding movie to favorites list:", error);
          }
        } else {
          try {
            console.log('remove movie from favorites list');
            await removeMovieFromFavouriteList(movie!.id, profileData.idToken ?? '');
            setIsFavorite(false);

            if (listType === FAVOURITE_LIST) {
              removeFromList(movie!.id);
            }
          } catch (error) {
            console.error("Error remove movie from favorites list:", error);
          }
        }
        
        
      }
    
    const toggleBookmark = async (event: React.MouseEvent) => {
      event.stopPropagation();  
      if (isBookmarked === false) {
        try {
          console.log('add movie to watchlist');
          await addMovieToWatchlist(movie!.id, profileData.idToken ?? '');
          setIsBookmarked(true);
        } catch (error) {
          console.error("Error adding movie to watchlist:", error);
        }
      } else {
        try {
          console.log('remove movie from watchlist');
          await removeMovieFromWatchlist(movie!.id, profileData.idToken ?? '');
          setIsBookmarked(false);

          if (listType === WATCHLIST) {
            removeFromList(movie!.id);
          }
        } catch (error) {
          console.error("Error remove movie from watchlist:", error);
        }
      }
      
    }

    return (<li className="overflow-hidden rounded-lg shadow-lg cursor-pointer w-full border border-solid border-2 " onClick={handleClick}>
      <div className="w-full flex flex-row ">
      <a className="flex flex-row " href={`/movies/${movie.id}`}>
        <div className="rounded-lg">
          <img alt={movie.title} src={movie.posterPath} className="object-cover w-full h-64 rounded-lg" />
        </div>
      </a>

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
            
            <a className="text-block flex flex-col text-white px-5 pb-4 hover:text-[#22d3ee]" href={`/movies/${movie.id}`}>
              
              <div className="title text-[16px] md:text-[20px] mb-2 leading-[24px] whitespace-nowrap overflow-hidden text-ellipsis">
                {movie.title}
              </div>
              <div className="date text-[14px] opacity-50 hover:text-[#22d3ee]">
                {(movie.releaseDate != "" && movie.releaseDate != null) ? formatDate(movie.releaseDate) : ""}
              </div>
            </a>
          </div>

          <div className="flex flex-row justify-between px-5 py-4 text-white">
            {movie.voteCount} votes
          </div>
         


          <div className="flex flex-row justify-start px-3 py-1 text-white gap-6">
            <button 
              className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center"
              onClick={e => toggleFavorite(e)}>
              <span className="text text-lg">
                <FontAwesomeIcon icon={faHeart} className={`${isFavorite ? 'text-red-500' : 'text-white'}`}/>
              </span>
            </button>
            <button  
              className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center"
              onClick={e => toggleBookmark(e)}>
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
        
       
        </div>
    </li>);
}

export default MovieListItem;