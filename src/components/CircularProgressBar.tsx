export default function CircularProgressBar({ percentage} : {percentage: number})  {

    return (
  
      <div className="w-20 h-20 rounded-full relative">
  
        <div 
  
          className="w-full h-full rounded-full bg-gray-200"
  
          style={{ clipPath: `circle(${percentage}% at 50% 50%)` }}
  
        >
  
          <div 
  
            className="w-full h-full rounded-full bg-blue-500"
  
            style={{ clipPath: `circle(50% at 50% 50%)` }}
  
          ></div>
  
        </div>
  
      </div>
  
    );
  
  }
  