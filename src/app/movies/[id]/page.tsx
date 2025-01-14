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
import Reviews from "@/components/Reviews/Reviews";
import Similar from "@/components/Similar/Similar";
import Recommendation from "@/components/Recommendation/Recommendation";
import Spinner from "@/components/Spinner";

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
      <nav className="flex justify-center space-x-4 my-4">
        <a href="#cast" className="text-blue-500 hover:underline">Cast</a>
        <a href="#video" className="text-blue-500 hover:underline">Videos</a>
        <a href="#recommendation" className="text-blue-500 hover:underline">Recommendation</a>
        <a href="#review" className="text-blue-500 hover:underline">Reviews</a>
      </nav>
      {
        loading ? (
          <Spinner />
        ) : 
        movie && (<>
          <DetailsBanner detailsMovie={movie} 
            video={videoResponse}/>
          
          <div id="cast">
            <Casts data={movie.cast} loading={loading} />
          </div>
          
          <div id="video">
            <VideosSections data={videoResponse} loading={loading} />
          </div>

          <div id="similar-movies">
            <Similar movieId={movie.id} title={"Similar Movies"} />
          </div>

          <div id="recommendation">
            <Recommendation movie={movie} title="Recommendations"/>
          </div>

          <div id="review">
            <Reviews reviews={movie.reviews} title="Reviews" />
          </div>

          
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
