'use client';
import { useState, use, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import CustomHeader from "@/components/header";
import { ToastContainer, toast } from 'react-toastify';
import { MovieDetails } from "@/types/movie/movieDetails.response";
import { fetchMovieDetails } from "@/lib/redux/actions/movieActions";
import { usePathname } from "next/navigation";
import { backdrop_base_url, media_base_url } from "@/constants/app_api";


interface MovieDetailsPageProps {
    loading: boolean;
    error: string | null;
    movie: MovieDetails | null;
    fetchMovieDetails: (id: number) => void;
    //id: string;
  }
  
  const MovieDetailsPageContent: React.FC<MovieDetailsPageProps> = props => {
    const pathname = usePathname(); // Hook to get the current pathname
    
    const [isClient, setIsClient] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, movie, fetchMovieDetails } = props;

  
    useEffect(() => {
      setIsClient(true);
      const segments = pathname.split("/");
      const id = segments[segments.length - 1]; // Assuming the last segment is the ID

      if (id && !isNaN(Number(id))) {
        fetchMovieDetails(Number(id));
      }

    }, [dispatch, pathname]);
  
    if (!isClient) {
      return null; // Render nothing on the server
    }
  
    /*<img id='backdrop'
                        src={`${backdrop_base_url}/${movie?.backdropPath}`} 
                        alt={`${backdrop_base_url}/${movie?.backdropPath}`} 
                        className="object-cover w-full rounded-lg backdrop-image absolute inset-0 bg-cover bg-center opacity-50" 
                  />*/
    return (<>
      <CustomHeader />
      <div className="items-center justify-items-center min-h-screen  bg-white">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">        
          <div><ToastContainer /></div>
          {
            (loading) 
            ? (<div className="flex flex-row text-black">
                <h1>Loading...</h1>
              </div>
              ) : (
              <div className="flex flex-row text-white">
                <div className="container relative p-1">
                  <div
                    id="backdrop"
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{ backgroundImage: `url(${backdrop_base_url}/${movie?.backdropPath})` }}
                  ></div>

                  <div className="relative z-10 flex flex-row sm:grid-cols-4 lg:grid-cols-6" id='content'>
                    <div className="flex flex-row text-white max-w-56 max-h-xs ms-1 me-5">
                      <img 
                        src={`${media_base_url}/${movie?.posterPath}`} 
                        alt={`${media_base_url}/${movie?.posterPath}`} 
                        className="object-cover w-full rounded-lg " />
                         
                    </div>
                    
                    <div className="flex flex-col text-white">
                      <h1 className="text-3xl font-bold text-white me-2 " aria-readonly>
                        {movie?.title}
                      </h1>
                      <div className="flex flex-row">
                        <h1 className="font-bold me-3">Release Date: </h1>
                        <p>{movie?.releaseDate}</p>
                      </div>
                      <div className="flex flex-row">
                        <h1 className="font-bold me-3">Genres: </h1>
                        {
                          movie?.genres.map((genre, index) => (
                            <span key={genre.id} className="me-1">
                              {genre.name}
                              {index < movie.genres.length - 1 && ", "}
                            </span>
                          ))
                        }
                      </div>
                      <div  className="flex flex-row">
                        <h1 className="font-bold me-1">Rating: </h1>
                        <p>{(movie?.voteAverage ?? 0) * 10}%</p>
                        <p className="mx-1">by </p>
                        <p className="font-bold">{movie?.voteCount} users</p>

                    
                      </div>
                      <div  className="flex flex-row">
                        <h1 className="font-bold me-1">Status: </h1>
                        <p>{movie?.status}</p>
                        
                      </div>
                      <div className="mt-4">
                        <h1 className="italic text-slate-300">{movie?.tagline} </h1>
                      </div>
                      <div>
                        <h1 className="font-bold ">Overview</h1>
                      <p>{movie?.overview}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )
          }
          <div className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
          </div>
        </main>
      </div>
      </>
    );
  }
  
  const mapStateToProps = (state: RootState) => ({
    loading: state.movieDetails.loading,
    error: state.movieDetails.error,
    movie: state.movieDetails.movieDetails,
  });
  
  const mapDispatchToProps = (dispatch: AppDispatch) => ({
    fetchMovieDetails: (id: number) => dispatch(fetchMovieDetails(id)),
  });
  
 const ConnectedMovieDetailsPageContent = connect(mapStateToProps, mapDispatchToProps)(MovieDetailsPageContent);

export default ConnectedMovieDetailsPageContent;