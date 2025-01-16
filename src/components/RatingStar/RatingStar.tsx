
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
const RatingStar = ({ ratingValue, onChangeRatingValue } : 
    { ratingValue: number, onChangeRatingValue: Dispatch<SetStateAction<number>> 
     }) => {
     
    const handleRatingChange = (value: number) => {
        onChangeRatingValue(value);
    };

          
    return (<>
        <div className="flex items-center justify-around">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <FontAwesomeIcon
                key={value}
                icon={faStar}
                className={`cursor-pointer text-3xl ${ratingValue >= value ? 'text-yellow-400' : 'text-gray-300'}`}
                onClick={() => handleRatingChange(value)}
            />
        ))}
      </div>
    </>);
};

export default RatingStar;