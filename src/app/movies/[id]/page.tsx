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
          <Reviews reviews={movie.reviews} title="Reviews" />
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
