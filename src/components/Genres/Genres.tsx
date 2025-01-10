import { Genre } from "@/types/movie/movieDetails.response";
import "./style.css";

const  Genres = ({ data } : { data: Genre[] }) => {
    return (
        <div className="genres  mb-6 flex flex-wrap  gap-1.5">
            {data.map((genre) => (
                <div key={genre.id} className="genre bg-pink-500 px-1.5 py-0.5 text-xs rounded text-white whitespace-nowrap">
                    {genre.name}
                </div>
            ))}
        </div>
    );
}

export default Genres;