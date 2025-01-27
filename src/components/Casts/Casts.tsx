import { Cast } from "@/types/person/cast.response";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { profile_base_url } from "@/constants/app_api";
import avatar from "@/assets/avatar.png";
import Img from "../Img";
import "./style.css";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Casts = ({ data, loading } : { data: Cast[], loading: boolean}) => {
    const listRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (listRef.current) {
            listRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (listRef.current) {
            listRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    return (
      <div className="castSection relative bg-[#04152d] ">
        <ContentWrapper className2="max-w-screen-2xl">
          <div className="sectionHeading text-2xl text-white mb-6 ms-6 ps-6 pt-16">
            <span className="ms-4 font-bold">Top Cast</span>
            
            </div>
        </ContentWrapper>
        <ContentWrapper className2="max-w-screen-2xl">
          {!loading && data && data?.length > 0 ?  (
            <div className="">
             {/* <button
                    className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                    onClick={scrollLeft}
                >
                    &lt;
                </button>  */}
            <div className="relative flex flex-row me-5 md:me-0 w-full">
                <div className="flex flex-col items-start justify-around">
                    <button
                        className="transform  text-white p-2 rounded-full max-h-[50px] md:max-h-[50px] text-center"
                        onClick={scrollLeft}
                    >
                       <FontAwesomeIcon icon={faAngleLeft} className="text-bold text-6xl"/>
                    </button>
                </div>
               
                <div className="listItems flex gap-5 overflow-y-hidden overflow-x-hidden scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0"
                    ref={listRef}
                >
                    {data?.map((item) => {
                        const imgUrl = item.profilePath
                        ? profile_base_url + item.profilePath
                        : avatar.src;
                        return (
                          <a key={item.id} href={`/casts/${item.id}`} className="listItem text-center text-white">
                            <div className="listItem text-center text-white">
                                <div className="profileImg w-[125px] h-[125px] rounded-full overflow-hidden mb-4 md:w-[175px] md:h-[175px] md:mb-6">
                                    <Img src={imgUrl} className="w-full h-full object-cover object-top block" />
                                </div>
                                <div className="name text-sm leading-5 font-semibold md:text-lg md:leading-6">{item.name}</div>
                                <div className="character text-sm leading-5 opacity-50 md:text-base md:leading-6">{item.character}</div>
                            </div>
                        </a>
                        );
                    })}
                </div>
                
                <div className="flex flex-col items-center justify-center ms-5 md:ms-0">
                    <button
                        className="transform  text-white p-2 rounded-full max-h-[30px] md:max-h-[30px] text-center"
                        onClick={scrollRight}
                    >
                         <FontAwesomeIcon icon={faAngleRight}  className="text-bold text-6xl"/>
                    </button>
                </div>
            </div>
           {/* <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                    onClick={scrollRight}
                >
                    &gt;
                </button> */}
            
        </div>) : (
            <div className="castSkeleton flex gap-5 overflow-y-hidden -mx-5 px-5 md:mx-0 md:px-0">
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
            </div>
          )}
        </ContentWrapper>
      </div>
    );
  };

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle w-[125px] h-[125px] rounded-full mb-4 md:w-[175px] md:h-[175px] md:mb-6 skeleton"></div>
        <div className="row w-full h-5 rounded-lg mb-2.5 skeleton"></div>
        <div className="row2 w-3/4 h-5 rounded-lg mx-auto skeleton"></div>
      </div>
    );
  };

  
  export default Casts;