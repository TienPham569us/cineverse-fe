import { Movie } from "@/types/movie/movie.response";
import { useRef } from "react";
import MovieCard from "../MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const TrendingMoviesCarousel = ({ trendingMovies }: { trendingMovies: Movie[] }) => {
  const listRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-[#04152d]">
      <div className="relative flex flex-row items-center justify-center">
        {/* Nút cuộn trái */}
        <button
          className="transform text-white p-2 rounded-full max-h-[50px] text-center"
          onClick={scrollLeft}
        >
          <FontAwesomeIcon icon={faAngleLeft} className="text-bold text-6xl max-h-[50px]"/>
        </button>

        {/* Carousel */}
        <div
          className="flex gap-5 overflow-y-hidden overflow-x-hidden scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0"
          ref={listRef}
        >
          {trendingMovies !== null && trendingMovies.map((movie: Movie, index: number) => (
            <div key={index} className="min-w-[240px]">
              <MovieCard movie={movie} index={index} />
            </div>
          ))}
        </div>

        {/* Nút cuộn phải */}
        <button
          className="transform text-white p-2 rounded-full max-h-[50px] text-center"
          onClick={scrollRight}
        >
          <FontAwesomeIcon icon={faAngleRight}  className="text-bold text-6xl max-h-[50px]"/>
        </button>
      </div>
    </div>
  );
};

export default TrendingMoviesCarousel;