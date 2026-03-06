import Button from "./button";

interface passCardprops{
    title:string;
    description:string;
    slot: number;
    price:number
}

export default function Pass({title,description,slot,price}:passCardprops){
    return(
        <div className="bg-[#ececec] w-1/4 min-h-2/3 rounded-4xl p-7 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex flex-col gap-5">
                <h1 className="text-4xl font-bold text-[#262626] tracking-tight">
                    {title}
                </h1>
                <p className="text-[#262626]/80 text-sm     leading-relaxed">
                    {description}
                </p>
                <div className="bg-[#262626]/5 rounded-2xl px-4 py-3 flex items-center justify-between">
                    <span className="text-[#262626] font-medium">
                        Slot left
                    </span>
                    <span className="text-lg font-semibold text-[#262626]">
                        {slot}
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-between mt-6">
                <h1 className="text-4xl font-bold text-[#262626]">
                    ₹{price}
                </h1>
                <Button
                variant="primary"
                text="Buy Now"
                />

      </div>

        </div>
    )
}