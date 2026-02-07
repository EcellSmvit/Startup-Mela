
interface ImgProps{
    variant:"Img1" | "Img2" | "Img3" | "Img4" | "Img5" | "Img6" | "Img7" | "Img8" | "Img9" ;
    url:string;
}
const variantClasses ={
    "Img1":"top-[65%] left-[15%]",
    "Img2":"top-[10%] left-[5%]",
    "Img3":"top-[40%] left-[21%]",
    "Img4":"top-[75%] left-[30%]",
    "Img5":"top-[15%] left-[50%]",
    "Img6":"top-[40%] left-[66%]",
    "Img7":"top-[70%] left-[75%]",
    "Img8":"top-[15%] left-[80%]",
    "Img9":"top-[45%] left-[42%]",
}

const defaultimgStyle = "absolute w-24 scale-3d shadow"


function Imagecard({variant,url}:ImgProps) {
  return (
    <div className={variantClasses[variant]+" "+defaultimgStyle}>
        <img src={url} alt="" />
    </div>
  )
}

export default Imagecard