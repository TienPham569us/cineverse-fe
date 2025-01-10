'use client';
import { useState, use, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import CustomHeader from "@/components/header";
import { ToastContainer, toast } from 'react-toastify';
import { MovieDetails } from "@/types/movie/movieDetails.response";
import { fetchMovieDetails, fetchVideo } from "@/lib/redux/actions/movieActions";
import { usePathname } from "next/navigation";
import { backdrop_base_url, media_base_url } from "@/constants/app_api";
import DetailsBanner from "@/components/DetailsBanner/detailsBanner";
import { VideoResponse } from "@/types/movie/video.response";
import Casts from "@/components/Casts/Casts";
import CustomFooter from "@/components/footer";
import VideosSections from "@/components/VideosSections.tsx/VideosSections";

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
    const [videoResponse, setVideoResponse] = useState<VideoResponse | null>(null);

    const _fetchVideo = async (id: number) => {
      try {
        const result: VideoResponse | null = await fetchVideo(Number(id));
        setVideoResponse(result);
      } catch (error)
      {
        console.error("Error fetching video:", error);
      }
    }
  
    useEffect(() => {
      setIsClient(true);
      const segments = pathname.split("/");
      const id = segments[segments.length - 1]; // Assuming the last segment is the ID

      if (id && !isNaN(Number(id))) {
        fetchMovieDetails(Number(id));

        _fetchVideo(Number(id));
      }

    }, [dispatch, pathname]);
  
    if (!isClient) {
      return null; // Render nothing on the server
    }
  

    return (<>
      <CustomHeader />
      {
        loading ? <h1>Loading...</h1> : 
        movie && (<>
          <DetailsBanner detailsMovie={movie} 
            video={videoResponse}/>
          <Casts data={movie.cast} loading={loading} />
          <VideosSections data={videoResponse} loading={loading} />
          
        </>)
      }
      <CustomFooter />
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

  export default function MovieDetailsPage() {
    return (
      <ConnectedMovieDetailsPageContent />
    );
  }



  /*<div className="items-center justify-items-center min-h-screen bg-white">
        <main className="flex flex-col gap-3 items-center sm:items-center">        
          <div><ToastContainer /></div>
          {
            (loading) 
            ? (<div className="flex flex-row text-black">
                <h1>Loading...</h1>
              </div>
              ) : (
              <div className="flex flex-row text-black rounded-md m-1 w-max">
                <div className="container relative p-1 w-max">
                  <div
                    id="backdrop"
                    className="absolute inset-0 bg-cover bg-center opacity-60 rounded-md"
                    style={{ backgroundImage: `url(${backdrop_base_url}/${movie?.backdropPath})` }}
                  ></div>

                  <div className="relative z-10 flex flex-row sm:grid-cols-4 lg:grid-cols-6" id='content'>
                    <div className="flex flex-row max-w-56 max-h-xs ms-1 me-5">
                      <img 
                        src={`${media_base_url}/${movie?.posterPath}`} 
                        alt={`${media_base_url}/${movie?.posterPath}`} 
                        className="object-cover w-full rounded-lg " />
                         
                    </div>
                    
                    <div className="flex flex-col">
                      <h1 className="text-3xl font-bold me-2 " aria-readonly>
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
                        <h1 className="italic text-cyan-900">{movie?.tagline} </h1>
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
      </div>*/

          /*<img id='backdrop'
                        src={`${backdrop_base_url}/${movie?.backdropPath}`} 
                        alt={`${backdrop_base_url}/${movie?.backdropPath}`} 
                        className="object-cover w-full rounded-lg backdrop-image absolute inset-0 bg-cover bg-center opacity-50" 
                  />*/