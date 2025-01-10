import { Review } from "@/types/review/review.response"
import "./style.css";
import { Dispatch, SetStateAction } from "react";
import { media_base_url } from "@/constants/app_api";
import PosterFallback from "@/assets/no-poster.png";
import dayjs from "dayjs";
import Img from "../Img";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

const ReviewPopup = ({ show, setShow, review, setReview } : 
    {   show: boolean,
        setShow: Dispatch<SetStateAction<boolean>>,
        review: Review | null,
        setReview: Dispatch<SetStateAction<Review | null>>
    }) => {

    const hidePopup = () => {
        setShow(false);
        setReview(null);
    }

    const posterUrl = review && review.authorDetails.avatarPath
                      ? media_base_url + review.authorDetails.avatarPath
                      : PosterFallback.src;
      

    return (<>
        <div className={`modalPopup duration-400
            ${show ? "visible opacity-1 " : "opacity-0 hidden"}`}>

            <div className="opacityLayer duration-400" onClick={hidePopup}></div>
            
            <div className={`modalContent duration-250 
                ${show ? 'scale-100' : 'scale-20'}
            `}>
                {
                    review && (
                        <Card className="border-none shadow-none rounded-none ">
                            <CardHeader>
                                
                                    <div className="flex flex-row justify-start items-center gap-5 content-center">
                                        <div className="profileImg">
                                            <Img src={posterUrl} alt={review.authorDetails.avatarPath} className="imgInside"/>
                                        </div>

                                        <div className="flex flex-col items-start gap-2 justify-center">
                                            <CardTitle>A review by {review.authorDetails.username}</CardTitle>
                                            <CardDescription>
                                                Written by 
                                                <strong className="italic">{review.authorDetails.username}</strong> 
                                                on {dayjs(review.updatedAt).format("MMM D, YYYY")}
                                            </CardDescription>
                                        </div>

                                        <div className="closeBtn text-black" onClick={hidePopup}>
                                            X
                                        </div>
                                    </div>

                                    
                            </CardHeader>

                            <CardContent className="border-none p-3">
                            
                                <div className="grid w-full h-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    {/* <textarea value={item.content} 
                                    readOnly 
                                    className="reviewContent" 
                                    rows={5}
                                    placeholder="Review"/> */}
                                    <div className="reviewContentFull">
                                        {review.content} 
                                    </div>
                                    
                                </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                }
                
            </div>
        </div>
        
    </>)
}

export default ReviewPopup;