import { cn } from "@/utils/utils";
import { useState } from "react";
import { Slider } from "../ui/slider";
import RatingStar from "../RatingStar/RatingStar";
import { addReviewToMovie } from "@/lib/redux/actions/profileAction";

const Modal = ({ isOpen, setShow, onSubmit, onCancel, title, avarageRating, movieId, idToken } 
    : { isOpen: boolean, 
      setShow: (value: boolean) => void,
      onSubmit: () => void, 
      onCancel: () => void, 
      title: string, 
      avarageRating: number,
      movieId: number,
      idToken: string
    }) => {

    const [rating, setRating] = useState<number>(7); // Default rating is 7
    const [review, setReview] = useState<string>("");
    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRating(Number(event.target.value));
    };
  
    const getRatingLabel = (rating: number) => {
      switch (rating) {
        case 0:
          return "0 - Dumpster fire";
        case 1:
          return "1 - Absolute Trash";
        case 2:
          return "2 - Garbage";
        case 3:
          return "3 - Truly Bad";
        case 4:
          return "4 - Not Good";
        case 5:
          return "5 - Passable";
        case 6:
          return "6 - It's Alright";
        case 7:
          return "7 - Pretty Decent";
        case 8:
          return "8 - Really Good";
        case 9:
          return "9 - Greatness";
        case 10:
          return "10 - Champion";
        default:
          return "";
      }
    };

    const _handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      console.log('Cancel');
      setShow(false);
      onCancel();
    }

    const _handleSubmit = async () => {
      try {
        console.log('Submit');
        await addReviewToMovie(movieId, idToken, review, rating);
        setShow(false);
      } catch (error: any) {
        console.error("Error submit review:", error);
      }
    }

    return (<>
    <div className={`${isOpen ? 'block' : 'hidden'}`}>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-3xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full h-full md:h-auto">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">               
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Rating Movie:
                  <span className="ms-2 italic">{title}</span>
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={(e) => _handleCancel(e)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="p-4 md:p-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  _handleSubmit();
                  onSubmit();
                }
                }>
                <div className="grid gap-4 mb-4 grid-cols-2">
                
                <div className="col-span-2 flex flex-row justify-end">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                     <strong className="italic">{(avarageRating*10).toFixed(1)}%</strong> User Rating Score
                    </label>
                   
                </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="rating"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Rating Point
                    </label>
                    {/* <ReactSlider
                        className="horizontal-slider"
                        marks
                        markClassName="example-mark"
                        min={0}
                        max={9}
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                    />
                    {...props} */}
                    {/* <Slider
                      defaultValue={[10]}
                      max={10}
                      step={1}
                      min={1}
                      className={cn("w-[60%]", "h-2", "bg-gray-200", "rounded-lg", "appearance-none", "cursor-pointer", "dark:bg-gray-700")}                      
                    />
                    <input
                        type="range"
                        id="rating"
                        name="rating"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={handleRatingChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      /> */}
                      <RatingStar ratingValue={rating} onChangeRatingValue={setRating} />
                      <div className="mt-2 text-center text-sm font-medium text-gray-900 dark:text-white min-h-5">
                        {getRatingLabel(rating)}
                      </div>
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="review"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Reviews
                    </label>
                    <textarea
                      id="review"
                      rows={8}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write your review about this movie here"
                      value={review}
                      onChange={(event) => setReview(event.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex flex-row justify-center">
                  <button
                    type="submit"
                    className="text-white inline-flex text-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      )}
    </div>

    </>);
}

export default Modal;