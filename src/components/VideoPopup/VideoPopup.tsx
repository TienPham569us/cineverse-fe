import ReactPlayer from "react-player/youtube";

import "./style.css";
import { Dispatch, SetStateAction } from "react";

const VideoPopup = ({ show, setShow, videoId, setVideoId } 
    : { show: boolean, 
        setShow: (value: boolean) => void, 
        videoId: string | null, 
        setVideoId: Dispatch<SetStateAction<string | null>>
    }) => {

    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };
    return ( <>
        <div className={`videoPopup duration-400 
            ${show ? "visible opacity-1 " : "opacity-0 hidden"}`}>
            <div className="opacityLayer duration-400" onClick={hidePopup}></div>
            <div className={`videoPlayer duration-250 
                ${show ? 'scale-100' : 'scale-20'}
            `}>
                <span className="closeBtn" onClick={hidePopup}>
                Close
                </span>
                <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoId}`}
                controls
                width="100%"
                height="100%"
                playing={true}
                />
            </div>
        </div>
    </>);
}

export default VideoPopup;