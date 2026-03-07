import Link from "next/link";

interface ButtonProps {
  variant: "primary" | "secondary" | "warning";
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  link?: string;
}

const variantClasses = {
  primary: "bg-yellow-500 text-[#262626]",
  secondary: "border-yellow-500 border text-[#ececec]",
  warning: "bg-red-500 text-[#ececec]",
};

const defaultStyle =
  "font-semibold px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer inline-block";

export default function Button({
  variant,
  text,
  onClick,
  type = "button",
  link,
}: ButtonProps) {
  if (link) {
    return (
      <Link href={link} className={variantClasses[variant] + " " + defaultStyle}>
        {text}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={variantClasses[variant] + " " + defaultStyle}
    >
      {text}
    </button>
  );
}