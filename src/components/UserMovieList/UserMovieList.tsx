import { Movie } from "@/types/movie/movie.response";
import MovieCard from "../MovieCard";
import { Button } from "../ui/button";
import { Link } from "lucide-react";

const UserMovieList = ({movies, title, seeMoreHref} : 
    {
        movies: Movie[] | null
        title: string,
        seeMoreHref: string
    }) => {
    return (
        <div className="flex flex-row flex-wrap gap-5 text-black">
            <div className="flex flex-row justify-start items-center pt-5 content-center">
                <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
            
            <div className="container mx-auto p-4">
                <div className="justify-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
                    {movies && movies.map((movie: Movie, index: number) => {
                        return (
                            <MovieCard key={index} movie={movie} index={index} />
                        )
                    })}
                </div>
            </div>

            <div className="flex flex-row justify-end w-full">
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
            </div>
        
        </div>
    );
};

export default UserMovieList; 