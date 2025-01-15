import { LatestTrailerResponse, VideoResponse } from "@/types/movie/video.response";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { useRef, useState } from "react";
import { PlayIcon } from "../DetailsBanner/PlayIcon";
import Img from "../Img";
import VideoPopup from "../VideoPopup/VideoPopup";
import { faAngleLeft, faAngleRight, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";

const LatestTrailersSection = ({ data, loading } : { data: LatestTrailerResponse[] | null, loading: boolean }) => {
    const [show, setShow] = useState<boolean>(false);
    const [videoId, setVideoId] = useState<string | null>(null);
    const listRef = useRef<HTMLDivElement>(null);
    
    const scrollLeft = () => {
        if (listRef.current) {
            listRef.current.scrollBy({ left: -600, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (listRef.current) {
            listRef.current.scrollBy({ left: 600, behavior: "smooth" });
        }
    };
    return (
      <div className="videosSection relative bg-[#04152d] ">
        <ContentWrapper className2="max-w-screen-2xl">
          {!loading && data && data.length > 0 ? (
            <div className="relative flex flex-row me-5 md:me-0 w-full py-8" >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
                  style={{
                    opacity: 0.3,
                    backgroundImage: `url('https://image.tmdb.org/t/p/original//3V4kLQg0kSqPLctI5ziYWabAZYF.jpg')`,
                    zIndex: 0,
                  }}
                ></div>
                <div className="flex flex-col items-start justify-around">
                    <button
                        className="transform  text-white p-2 rounded-full max-h-[50px] md:max-h-[50px] text-center"
                        onClick={scrollLeft}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} className="text-bold text-6xl max-h-[50px]"/>
                    </button>
                </div>
                <div className="videos flex gap-2.5 overflow-y-hidden overflow-x-hidden -mx-5 px-5 md:gap-5 md:mx-0 md:px-0 w-full"
                    ref={listRef}>

                    {data?.map((item) => (
                        <div key={item?.id} className="videoItem w-[250px] flex-shrink-0 cursor-pointer">
                          <div
                              className="videoThumvideoThumbnail relative mb-4bnail"
                              onClick={() => {
                              setVideoId(item?.trailers[0].key);
                              setShow(true);
                              }}
                          >
                              <Img
                              src={`https://img.youtube.com/vi/${item?.trailers[0].key}/mqdefault.jpg`}
                              className="w-full block rounded-lg transition-all duration-700 ease-in-out"
                              />
                              <FontAwesomeIcon
                                  icon={faPlayCircle}
                                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12"
                              />
                              {/* <PlayIcon /> */}
                          </div>
                          <div className="videoTitle text-white text-sm leading-5 md:text-base md:leading-6">{item?.trailers[0].name}</div>
                          <div className="videoTitle text-white text-sm leading-5 md:text-base md:leading-6">{item?.title}</div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center justify-center ms-5 md:ms-0">
                    <button
                        className="transform  text-white p-2 rounded-full max-h-[50px] md:max-h-[50px] text-center"
                        onClick={scrollRight}
                    >
                            <FontAwesomeIcon icon={faAngleRight}  className="text-bold text-6xl max-h-[50px]"/>
                    </button>
                </div>
                
            </div>
          ) : (
            <div className="videoSkeleton flex gap-2.5 overflow-x-auto -mx-5 px-5 md:gap-5 md:mx-0 md:px-0  overflow-y-hidden overflow-x-hidden">
              {loadingSkeleton()}
              {loadingSkeleton()}
              {loadingSkeleton()}
              {loadingSkeleton()}
            </div>
          )}
        </ContentWrapper>
        <VideoPopup
          show={show}
          setShow={setShow}
          videoId={videoId}
          setVideoId={setVideoId}
        />
      </div>
    );
  };
  
  const loadingSkeleton = () => {
    return (
      <div className="skItem w-[150px] flex-shrink-0 md:w-1/4">
        <div className="thumb w-full aspect-[16/9] rounded-lg mb-2.5 skeleton"></div>
        <div className="row h-5 w-full rounded-lg mb-2.5 skeleton"></div>
        <div className="row2 h-5 w-3/4 rounded-lg skeleton"></div>
      </div>
    );
  };
  
  export default LatestTrailersSection;
  