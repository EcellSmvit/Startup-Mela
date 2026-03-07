interface InputProps{
    variant:"primary";
    placeholder:string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type:string;
    value?:string;
}

const variantClasses={
    "primary":"w-[90%]"
}

const defaultStyle="border border-[#ececec] py-2 px-2 rounded-2xl"


export default function InputField({variant,placeholder,onChange,type,value}:InputProps){
    return(
        <input value={value} type={type} placeholder={placeholder} onChange={onChange} className={variantClasses[variant]+" "+defaultStyle}/>
    )
}