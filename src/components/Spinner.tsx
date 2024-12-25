export default function Spinner()  {
    return (
    <div
      className={`${
        true ? "h-[700px]" : "h-[150px]"
      } w-full flex items-center justify-center relative`}
    >
      <svg
        className="animate-spin z-10 w-[50px] h-[50px]"
        viewBox="0 0 50 50"
      >
        <circle
          className="stroke-[hsl(210,70%,75%)] stroke-[5] fill-none rounded-full animate-dash"
          cx="25"
          cy="25"
          r="20"
        ></circle>
      </svg>
    </div>
    )
}
  