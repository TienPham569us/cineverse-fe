import { Review } from "@/types/review/review.response";
import dayjs from "dayjs";
import Img from "../Img";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { media_base_url } from "@/constants/app_api";
import PosterFallback from "@/assets/no-poster.png";
import "./style.css"
const PartialCardReview = ({ review, onClick } : 
    { review: Review, 
        onClick: (review: Review) => void
    }) => {

    const posterUrl = review.authorDetails.avatarPath
                      ? media_base_url + review.authorDetails.avatarPath
                      : PosterFallback.src;
                      
    return (
        <Card className="">
            <CardHeader>
                <div className="flex flex-row justify-start items-center gap-5 content-center">
                    <div className="profileImg">
                        <Img src={posterUrl} alt={review.authorDetails.avatarPath} className="imgInside"/>
                    </div>

                    <div className="flex flex-col items-start gap-2 justify-center">
                        <CardTitle>A review by {review.authorDetails.username}</CardTitle>
                        <CardDescription>
                            Written by 
                            <strong className="italic mx-1">{review.authorDetails.username}</strong> 
                            on {dayjs(review.updatedAt).format("MMM D, YYYY")}
                        </CardDescription>
                        <CardFooter className="ps-0 ">
                            <div className="flex flex-row items-start justify-start bg-darkBlue text-white p-2 rounded-lg">
                                <span className="text-sm">Rating: {review.authorDetails.rating}</span>
                            </div>
                        </CardFooter>
                    </div>

                </div>
            </CardHeader>

            <CardContent>
            
                <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    {/* <textarea value={item.content} 
                    readOnly 
                    className="reviewContent" 
                    rows={5}
                    placeholder="Review"/> */}
                    <div className="reviewContent">
                    {review.content} 
                    </div>
                    
                </div>
                </div>
            </CardContent>

            <CardFooter className="flex justify-end">
                <Button 
                    variant="outline"
                    onClick={()=>onClick(review)}
                >
                    read more...
                </Button>
            </CardFooter>
        </Card>
    )
}

export default PartialCardReview;