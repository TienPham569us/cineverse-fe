import { fetchSimilarMovie } from "@/lib/redux/actions/movieActions";
import { Movie } from "@/types/movie/movie.response";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react"
import CircleRating from "../CircleRating/CircleRating";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Img from "../Img";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
  } from "react-icons/bs";
import { media_base_url } from "@/constants/app_api";
import PosterFallback from "@/assets/no-poster.png";
import Link from "next/link";
import "./style.css";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MovieCard from "../MovieCard";

const Similar = ({ movieId, title } : { movieId: number, title: string }) => {    
    const carouselContainer = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [movies, setMovies] = useState<Movie[] | null>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const _fetchSimilarMovie = async (movieId: number) =>  {
        try {
            setLoading(true);
            const data =  await fetchSimilarMovie((movieId))
            setMovies(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
        
    }
    useEffect(() => {
        _fetchSimilarMovie(movieId);
    }, [movieId]);

    const scrollLeft = () => {
      if (listRef.current) {
          listRef.current.scrollBy({ left: -600, behavior: "smooth" });
      }
    };

    const scrollRight = () => {
        if (listRef.current) {
            listRef.current.scrollBy({ left: 600, behavior: "smooth" });
        }
    };

    const navigation = (dir: string) => {
        const container = carouselContainer.current;
    
        const scrollAmount =
          dir === "left"
            ? container!.scrollLeft  - (container!.offsetWidth - 20)
            : container!.scrollLeft + (container!.offsetWidth - 20);
    
        container!.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      };

    return (<>
         <div className="carousel">
         <ContentWrapper className2="max-w-screen-2xl">
            {title && movies!.length > 0 && (
              <div className="carouselTitle text-2xl text-white pt-20 mb-2 ms-6 ps-6">
              <span className="ms-4 font-bold">
                  {title}
              </span>
            </div>
            )}
          </ContentWrapper>

          <ContentWrapper className2="max-w-screen-2xl relative  w-full">
          {!loading && movies!.length > 0  ? (<div>
            <div className="relative flex flex-row me-5 md:me-0 w-full">
                
                <div className="flex flex-col items-start justify-around">
                    <button
                        className="transform  text-white p-2 rounded-full max-h-[50px] md:max-h-[50px] text-center"
                        onClick={scrollLeft}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} className="text-bold text-6xl"/>
                    </button>
                </div>
                <div className="videos relative flex flex-row justify-start w-full gap-5 overflow-y-hidden overflow-x-hidden -mx-5 px-5 md:gap-5 md:mx-0 md:px-0"
                    ref={listRef}>

                    {movies?.map((item) => {
                      const posterUrl = item.posterPath
                        ? media_base_url + item.posterPath
                        : PosterFallback.src;

                      return (
                       
                        <div key={item.id} className="relative flex-shrink-0 cursor-pointer w-[250px] h-[500px]"> 
                           <MovieCard movie={item} index={item.id} detailSize={true}/>
                        </div>
                        
                      );
                    })}
                </div>

                <div className="flex flex-col items-center justify-center ms-5 md:ms-0">
                    <button
                        className="transform  text-white p-2 rounded-full max-h-[30px] md:max-h-[30px] text-center"
                        onClick={scrollRight}
                    >
                            <FontAwesomeIcon icon={faAngleRight}  className="text-bold text-6xl"/>
                    </button>
                </div>
              </div>
            </div>) : (
            <div className="loadingSkeleton">
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
            </div>
          )}
        </ContentWrapper>
    </div>
    </>);
}

export default Similar;

const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  /* <div className="carouselItems" ref={carouselContainer}>
              {movies?.map((item) => {
                const posterUrl = item.posterPath
                  ? media_base_url + item.posterPath
                  : PosterFallback.src;

                return (
                  <div key={item.id} className="carouselItem">
                    <Link
                      className="posterBlock"
                      href={`/movies/${item.id}`}
                    
                    >
                      <Img src={posterUrl} alt={item.title} />
                      <CircleRating rating={item.voteAverage} />
                      { //TODO
                       <Genres data={item.genreIds.slice(0, 2)} />}
                      </Link>
                      <div className="textBlock">
                        <span className="title">{item.title}</span>
                        <span className="date">
                          {dayjs(item.releaseDate).format("MMM D, YYYY")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>*/
  