'use client';
import Link from "next/link";
import { FormEvent, useState, FocusEvent, use, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import CustomHeader from "@/components/header";
import { ToastContainer, toast } from 'react-toastify';
import { MovieDetails } from "@/types/movie/movieDetails.response";
import { fetchMovieDetails } from "@/lib/redux/actions/movieActions";


interface MovieDetailsPageProps {
  loading: boolean;
  error: string | null;
  movie: MovieDetails | null;
  fetchMovieDetails: (id: number) => void;
  id: string;
}

const MovieDetailsPageContent: React.FC<MovieDetailsPageProps> = props => {
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { id, loading, error, movie, fetchMovieDetails } = props;


  useEffect(() => {
    setIsClient(true);
    fetchMovieDetails(Number(id));
  }, [dispatch]);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (<>
    <CustomHeader />
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">        
        <div><ToastContainer /></div>
        <div className="flex flex-row text-black">
          <h1 className="text-black">Profile Page</h1>
        </div>
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
export default function MovieDetailsPage({params}: { params: { id: string } }) {
  return (
    <ConnectedMovieDetailsPageContent id={params.id} />
  );
}

