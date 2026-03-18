interface CardProps{
    eventType:string;
    eventName:string;
    eventDetails:string;
    buttonText:string
    eventCat:string
}

export default function Eventcard({eventType,eventName,eventDetails,buttonText,eventCat}:CardProps){
    return(
        <div>
        <div className="relative rounded-2xl bg-black/70 backdrop-blur-xl p-6 w-full max-w-sm flex flex-col justify-between border border-white/10 shadow-lg">
        <span className="text-xs font-semibold text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full w-fit">
          {eventType}
        </span>

        <h2 className="mt-4 text-xl font-bold text-white leading-tight">
          {eventName}
        </h2>

        <p className="mt-2 text-sm text-gray-400">
            {eventDetails}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <button className="text-sm font-medium text-white bg-[#6D4DFE] hover:bg-indigo-500 transition px-4 py-2 rounded-lg">
            {buttonText}
          </button>

          <span className="text-xs text-gray-500">
            {eventCat}
          </span>
        </div>

      </div>
        </div>
    )
}