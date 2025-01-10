import { fetchSimilarMovie } from "@/lib/redux/actions/movieActions";
import { Movie } from "@/types/movie/movie.response";
import dayjs from "dayjs";
import { url } from "inspector";
import { title } from "process";
import { useEffect, useRef, useState } from "react"
import CircleRating from "../CircleRating/CircleRating";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Genres from "../Genres/Genres";
import Img from "../Img";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
  } from "react-icons/bs";
import { media_base_url } from "@/constants/app_api";
import PosterFallback from "@/assets/no-poster.png";
import Link from "next/link";

const Similar = ({ movieId } : { movieId: string}) => {    
    const carouselContainer = useRef<HTMLDivElement>(null);
    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const _fetchSimilarMovie = async (movieId: string) =>  {
        try {
            setLoading(true);
            const data =  await fetchSimilarMovie(Number(movieId))
            setMovies(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
        
    }
    useEffect(() => {
        _fetchSimilarMovie(movieId);
    }, [movieId]);

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
      <ContentWrapper>
        {title && movies!.length > 0 && (
          <div className="carouselTitle">{title}</div>
        )}
        {movies!.length > 0 && (
          <>
            <BsFillArrowLeftCircleFill
              className="carouselLeftNav arrow"
              onClick={() => navigation("left")}
            />
            <BsFillArrowRightCircleFill
              className="carouselRightNav arrow"
              onClick={() => navigation("right")}
            />
          </>
        )}
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
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
                    /* <Genres data={item.genreIds.slice(0, 2)} /> */}
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
          </div>
        ) : (
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
  