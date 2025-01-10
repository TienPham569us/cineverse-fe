
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.css";

const CircleRating = ({ rating }: { rating: number}) => {
    return (
      <div className="circleRating max-w-[70px] bg-black2  rounded-full p-0.5 md:max-w-[90px]">
        <CircularProgressbar
          className="CircularProgressbar-text text-white text-[34px] font-bold fill-black"
          value={rating}
          maxValue={10}
          text={rating.toFixed(1)}
          styles={buildStyles({
            pathColor: 
            rating < 5 ? "red" : rating < 7 ? "orange" : "green",
          })}
        />
      </div>
    );
  };
  
  export default CircleRating;
