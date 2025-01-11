'use client';

import CustomHeader from "@/components/header";
import CustomFooter from "@/components/footer";
import { AppDispatch, RootState} from "@/lib/redux/store";
import { usePathname, useSearchParams } from 'next/navigation'
import Link from "next/link";
import React, { Suspense, use, useEffect, useState } from "react";
import { connect, useDispatch} from "react-redux";
import Spinner from "@/components/Spinner";
import { Cast } from "@/types/person/cast.response";
import { fetchCastDetails, fetchPopularCasts } from "@/lib/redux/actions/castActions";
import CastCard from "@/components/CastCard";
import { CastDetails } from "@/types/cast/castDetails.response";
import { media_base_url } from "@/constants/app_api";

interface CastDetailsPageProps {
  loadingCastDetails: boolean;
  errorCastDetails: string | null;
  castDetails: CastDetails | null;
  fetchCastDetails: (page: number) => void;
}

const CastDetailsContent: React.FC<CastDetailsPageProps> = props => {
  const pathname = usePathname(); // Hook to get the current pathname
    
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loadingCastDetails, errorCastDetails, castDetails, fetchCastDetails } = props;

  const [showFullBiography, setShowFullBiography] = useState(false);
  const [showAllMovies, setShowAllMovies] = useState(false);
  const maxLength = 200;
  const maxMovies = 5;

  const handleToggleMovies = () => {
    setShowAllMovies(!showAllMovies);
  };

  const handleToggle = () => {
    setShowFullBiography(!showFullBiography);
  };

  useEffect(() => {
    setIsClient(true);
    const segments = pathname.split("/");
    const id = segments[segments.length - 1]; // Assuming the last segment is the ID

    if (id && !isNaN(Number(id))) {
      fetchCastDetails(Number(id));
    }

  }, [dispatch, pathname]);

  if (!isClient) {
    return null; // Render nothing on the server
  }


    return (
    <>
      <CustomHeader />
      {
        loadingCastDetails ? (
          <Spinner />
        ) : castDetails ? (
          <div className="bg-darkBlue text-white min-h-screen pt-16 px-12">
            <div className="max-w-6xl mx-auto p-4">
              {/* Layout container */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Section */}
                <div className="col-span-1">
                  {/* Profile Image */}
                  <img
                    src={castDetails.profilePath}
                    alt="Profile"
                    className="w-full rounded-md object-cover mb-4"
                  />

                  {/* Personal Info */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
                    <div className="space-y-2">
                      <p><strong>Known For:</strong> {castDetails.knownFor}</p>
                      <p><strong>Gender:</strong> {castDetails.gender == 1 ? 'Male': 'Female'}</p>
                      <p><strong>Birthday:</strong> {castDetails.birthday}</p>
                      <p><strong>Place of Birth:</strong> {castDetails.placeOfBirth}</p>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="col-span-2">
                  {/* Biography */}
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold">{castDetails.name}</h1>
                    <p className="mt-4 text-gray-400">
                      {showFullBiography
                        ? castDetails.biography
                        : `${castDetails.biography.substring(0, maxLength)}...`}
                    </p>
                    {castDetails.biography.length > maxLength && (
                      <button
                        onClick={handleToggle}
                        className="text-blue-500 mt-2"
                      >
                        {showFullBiography ? 'Show less' : 'Show more'}
                      </button>
                    )}
                  </div>

                  {/* Known For */}
                  {/* <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Known For</h2>
                    <div className="flex gap-4 overflow-x-scroll">
                      {['My Sassy Girl', 'The Classic', 'A Year-End Medley', 'Windstruck', 'Cyborg She', 'Time Renegades'].map(
                        (movie, index) => (
                          <div key={index} className="w-32">
                            <img
                              src="https://via.placeholder.com/150" // Thay bằng URL thực tế
                              alt={movie}
                              className="w-full rounded-md"
                            />
                            <p className="mt-2 text-center text-gray-300 text-sm">{movie}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div> */}

                  {/* Directing */}
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Directing</h2>
                    <table className="w-full border-collapse text-gray-400">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="text-left py-2 px-2">Year</th>
                          <th className="text-left py-2 px-2">Title</th>
                          <th className="text-left py-2 px-2">Role</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        castDetails.movieCredits
                        .sort((a, b) => {
                          const yearA = a.releaseDate ? parseInt(a.releaseDate.split("-")[0]) : null;
                          const yearB = b.releaseDate ? parseInt(b.releaseDate.split("-")[0]) : null;

                          // Mục không có năm (null) sẽ lên đầu
                          if (yearA === null) return 1;
                          if (yearB === null) return -1;

                          // Sắp xếp theo năm giảm dần
                          return yearB - yearA;
                        })
                        .slice(0, showAllMovies ? castDetails.movieCredits.length : maxMovies).map((item, index) => (
                          
                          <tr key={index} className="border-b border-gray-700">
                            <td className="py-2">{item.releaseDate ? item.releaseDate.split("-")[0] : "N/A"}</td>
                            <td className="py-2 flex items-center space-x-2">
                            <Link href={`/movies/${item.id}`} className="flex items-center m-2 ">
                              <img
                                src={`${media_base_url}/${item.posterPath}`} 
                                alt={item.title}
                                className="w-10 h-14 object-cover"
                              />
                              <span className="text-white hover:text-pink-500 px-2">{item.title}</span>
                            </Link>
                            </td>
                            <td className="py-2">Acting</td>
                          </tr>
                        ))
                      }
                      </tbody>
                    </table>
                    {castDetails.movieCredits.length > maxMovies && (
                      <button
                        onClick={handleToggleMovies}
                        className="text-blue-500 mt-4"
                      >
                        {showAllMovies ? 'Show less' : 'Show more'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-darkBlue text-white min-h-screen pt-16 px-12 flex flex-col justify-center items-center">
            <div className="flex items-center text-white mb-4">
              <span className="text-2xl">404 -</span>
              <span className="text-1xl ml-2">Cast Not Found</span>
            </div>
          </div>
        )
      }
      
      <CustomFooter />
    </>
    );
  }
  
  const mapStateToProps = (state: RootState) => ({
    loadingCastDetails: state.castDetails.loading,
    errorCastDetails: state.castDetails.error,
    castDetails: state.castDetails.castDetails,
  });
  
  const mapDispatchToProps = (dispatch: AppDispatch) => ({
    fetchCastDetails: (id: number) => dispatch(fetchCastDetails(id)),
  });
  
 const ConnectedCastDetailsPageContent = connect(mapStateToProps, mapDispatchToProps)(CastDetailsContent);

  export default function MovieDetailsPage() {
    return (
      <ConnectedCastDetailsPageContent />
    );
  }