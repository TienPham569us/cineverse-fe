import { Movie } from "@/types/movie/movie.response";
import MovieCard from "../MovieCard";
import { Button } from "../ui/button";
import { Link } from "lucide-react";
import { HiChevronRight } from "react-icons/hi";

const UserMovieList = ({movies, title, seeMoreHref} : 
    {
        movies: Movie[] | null
        title: string,
        seeMoreHref: string
    }) => {
    return (
        <div className="flex flex-row flex-wrap gap-5 text-black pt-4">
            <div className="flex items-center space-x-2">
            {/* Vertical line */}
            <div className="w-1 h-6 bg-yellow-500"></div>
            
            {/* Ratings text */}
            <div className="flex items-center space-x-1">
                <p className="text-2xl text-white font-bold">{title}</p>
            </div>

            <div className="relative group" >
                <a
                className=""
                href={seeMoreHref}
                >
                    <HiChevronRight className="w-8 h-8 text-white cursor-pointer" onClick={() => {}}/>
                </a>
                
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">
                See more
                </div>
            </div>
            </div>
            
            <div className="container mx-auto">
                <div className="justify-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
                    {movies && movies.map((movie: Movie, index: number) => {
                        return (
                            <MovieCard key={index} movie={movie} index={index} />
                        )
                    })}
                </div>
            </div>

            {/* <div className="flex flex-row justify-end w-full">
                <a
                    className=""
                    href={seeMoreHref}
                >
                    <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {}}
                    >
                        See more
                    </Button>
                </a>
            </div> */}
        
        </div>
    );
};

export default UserMovieList; 