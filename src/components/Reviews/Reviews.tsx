import { Review } from "@/types/review/review.response";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { useRef, useState } from "react";
import './style.css';
import PartialCardReview from "../PartialCardReview/PartialCardReview";
import ReviewPopup from "../ReviewPopup/ReviewPopup";

const Reviews = ({ reviews, title }: { reviews: Review[], title: string}) => {
    const carouselContainer = useRef<HTMLDivElement>(null);
    
    const [loading, setLoading] = useState<boolean>(false);
    const [showReviewPopup, setShowReviewPopup] = useState<boolean>(false);
    const [review, setReview] = useState<Review | null>(null);

    const handleClickReview = (review: Review) => {
      setShowReviewPopup(true);
      setReview(review);
    }

    return (<>
        <div className="carousel relative bg-[#04152d]">
          <ContentWrapper className2="max-w-screen-2xl">
            {title && reviews!.length > 0 && (
              <div className="sectionHeading text-2xl text-white pt-6 mb-6 ms-6 ps-6">
                <span className="ms-4">
                    {title}
                </span>
              </div>
            )}
          </ContentWrapper>

          <ContentWrapper className2="max-w-screen-2xl reviewsPanel mx-6">           
            {!loading ? (
                reviews?.map((item) => {
                  return (
                    <div key={item.id} className="carouselItem">
                      <PartialCardReview review={item} onClick={handleClickReview}/>
                    </div>
                  );
                })
            ) : (
              <div className="loadingSkeleton">
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
              </div>
            )}
          </ContentWrapper>

          <ReviewPopup 
            show={showReviewPopup}
            setShow={setShowReviewPopup}
            review={review}
            setReview={setReview}
          />
      </div>
   </>);
}


export default Reviews;

const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };
  