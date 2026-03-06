interface InputProps{
    variant:"primary";
    placeholder:string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type:string;
}

const variantClasses={
    "primary":"w-[90%]"
}

const defaultStyle="border border-[#ececec] py-2 px-2 rounded-2xl"


export default function InputField({variant,placeholder,onChange,type}:InputProps){
    return(
        <input type={type} placeholder={placeholder} onChange={onChange} className={variantClasses[variant]+" "+defaultStyle}/>
    )
}