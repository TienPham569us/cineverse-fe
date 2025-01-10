import { MovieDetails } from "@/types/movie/movieDetails.response";
import { Fragment, useState } from "react";
import './style.css';
import Img from "@/components/Img";
import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import PosterFallback from "@/assets/no-poster.png";
import dayjs, { Dayjs } from 'dayjs';
import Genres from "../Genres/Genres";
import CircleRating from "../CircleRating/CircleRating";
import { PlayIcon } from "./PlayIcon";
import VideoPopup from "../VideoPopup/VideoPopup";
import { backdrop_base_url, media_base_url } from "@/constants/app_api";
import { VideoResponse } from "@/types/movie/video.response";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal/Modal";

const DetailsBanner = ({ detailsMovie, video } : { detailsMovie: MovieDetails, video: VideoResponse | null}) => {
  const [show, setShow] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isShowRatingModal, setIsShowRatingModal] = useState<boolean>(false);

  const director = detailsMovie.crew.filter((crew) => crew.job === "Director");  
  const writer = detailsMovie.crew.filter(
    (cr) => cr.job === "Screenplay" || cr.job === "Story" || cr.job === "Writer"
  );
  
  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  }
  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  }
  const openRatingModal = () => {
    setIsShowRatingModal(true);
  }
  const closeRatingModal = () => {
    console.log('close rating modal');
    setIsShowRatingModal(false);
  }
  const toggleShowRatingModal = () => {
    setIsShowRatingModal((prev) => !prev);
  }

  const toHoursAndMinutes = (totalMinutes: number) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
      };

    if (!detailsMovie) {
        return null;
    }

    return ( <>
    <div className="detailsBanner w-full bg-black pt-24 mb-12 md:mb-0 md:pt-30 md:min-h-[700px] relative">
      <Fragment>
        <div className="backdrop-img absolute inset-0 opacity-10 overflow-hidden">
          <Img src={`${backdrop_base_url}/${detailsMovie.backdropPath}`} 
                className="lazy-load-image-background w-full h-full object-cover object-center" />
        </div>
        <div className="opacity-layer w-full h-[250px] bg-gradient-to-b from-transparent to-[#04152d] absolute bottom-0 left-0"></div>
        <ContentWrapper className2="max-w-screen-xl">
          <div className="content flex flex-col relative gap-6 md:gap-12 md:flex-row">
            <div className="left flex-shrink-0">
              {detailsMovie.posterPath ? (
                <Img
                  className="posterImg w-full block rounded-lg md:max-w-[350px]"
                  src={detailsMovie.posterPath}
                />
              ) : (
                <Img className="posterImg  w-full block rounded-lg md:max-w-[350px]" src={PosterFallback.src} />
              )}
            </div>
            <div className="right text-white">
              <div className="title text-2xl leading-10 md:text-3xl md:leading-11">{`${
                detailsMovie.title
              } (${dayjs(detailsMovie.releaseDate).format("YYYY")})`}</div>
              <div className="subtitle text-lg leading-6 mb-4 italic opacity-50 md:text-xl md:leading-7">{detailsMovie.tagline}</div>

              <Genres data={detailsMovie.genres} /> 
              {/* type="name" */}

              <div className=" flex flex-col items-start gap-6 mb-6">
                <CircleRating rating={detailsMovie.voteAverage} />
                <div
                    className="playbtn flex items-center gap-5 cursor-pointer"
                    onClick={() => {
                      //TODO: Add video key
                      console.log('show video');
                      setShow(true);
                      setVideoId(video && video.results.length > 0 ? video.results[0].key : null);
                    }}
                  >
                    <PlayIcon />
                    <span className="text text-xl transition-all duration-700 ease-in-out">Watch Trailer</span>
                  </div>
                <div className="flex flex-row align-start items-center gap-6">
                  <button 
                    className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center"
                    onClick={toggleFavorite}>
                    <span className="text text-lg">
                      <FontAwesomeIcon icon={faHeart} className={`${isFavorite ? 'text-red-500' : 'text-white'}`}/>
                    </span>
                  </button>
                  <button  
                    className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center"
                    onClick={toggleBookmark}>
                    <span className="text text-lg">
                      <FontAwesomeIcon icon={faBookmark} className={`${isBookmarked ? 'text-red-500' : 'text-white'}`}/>
                    </span>
                  </button>

                  <div  
                    className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center"
                    onClick={openRatingModal}>
                    <span className="text text-lg">
                      <FontAwesomeIcon icon={faStar} className={`text-white`}/>
                    </span>

                    {
                     isShowRatingModal && (
                      <Modal 
                        isOpen={isShowRatingModal} 
                        onSubmit={closeRatingModal} 
                        onCancel={closeRatingModal} 
                        title={detailsMovie.title}
                        avarageRating={detailsMovie.voteAverage} />
                      )
                    }
                    
                  </div>

                  
                </div>
                
              </div>

              <div className="overview mb-6">
                <div className="heading text-2xl mb-2">Overview</div>
                <div className="description leading-6 md:pr-24">{detailsMovie.overview}</div>
              </div>

              <div className="info border-b border-white/10 py-4 flex gap-2">
                {detailsMovie.status && (
                  <div className="intoItem">
                    <span className="text bold text-bold">Status:</span>
                    <span className="text normal-text">{detailsMovie.status}</span>
                  </div>
                )}

                {detailsMovie.releaseDate && (
                  <div className="intoItem">
                    <span className="text bold text-bold">Release Date:</span>
                    <span className="text normal-text">
                      {dayjs(detailsMovie.releaseDate).format("MMM D, YYYY")}
                    </span>
                  </div>
                )}

                
                {
                  //TODO: Add budget and revenue
                /* {detailsMovie. && (
                  <div className="intoItem">
                    <span className="text bold">Runtime:</span>
                    <span className="text">
                      {toHoursAndMinutes(data.runtime)}
                    </span>
                  </div>
                )} */}
              </div>

              {director?.length > 0 && (
                <div className="info">
                  <span className="text bold text-bold">Director:</span>
                  <span className="text normal-text">
                    {director.map((dir, idx) => (
                      <span key={idx}>
                        {dir.name}
                        {director.length - 1 !== idx && ", "}
                      </span>
                    ))}
                  </span>
                </div>
              )}

              {writer?.length > 0 && (
                <div className="info">
                  <span className="text bold text-bold">Writer:</span>
                  <span className="text normal-text">
                    {writer.map((dir, idx) => (
                      <span key={idx}>
                        {dir.name}
                        {writer.length - 1 !== idx && ", "}
                      </span>
                    ))}
                  </span>
                </div>
              )}

              {
                //TODO: Add production companies
              /* {detailsMovie.createdBy?.length > 0 && (
                <div className="info">
                  <span className="text bold">Creator:</span>
                  <span className="text">
                    {data.created_by.map((dir, idx) => (
                      <span key={idx}>
                        {dir.name}
                        {data.created_by.length - 1 !== idx && ", "}
                      </span>
                    ))}
                  </span>
                </div>
              )} */}
            </div>
          </div>
        </ContentWrapper>
        <VideoPopup
          show={show}
          setShow={setShow}
          videoId={videoId}
          setVideoId={setVideoId}
        />
      </Fragment>
          
    </div>
    </>);
}

export default DetailsBanner;