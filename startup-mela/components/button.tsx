"use client";

import Link from "next/link";

interface ButtonProps {
  variant: "primary" | "secondary" | "warning";
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  link?: string;
  disable?: string;
}

const variantClasses = {
  primary: "bg-[#014E87] text-white",
  secondary: "border-[#ffffff] border text-[#ececec]",
  warning: "bg-red-500 text-[#ececec]",
};

const defaultStyle =
  "font-semibold px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer inline-block";

export default function Button({
  variant,
  text,
  onClick,
  type = "button",
  link,
}: ButtonProps) {

  const handleScroll = () => {
    if (link?.startsWith("#")) {
      const el = document.querySelector(link);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 👉 SCROLL CASE
  if (link?.startsWith("#")) {
    return (
      <button
        type="button"
        onClick={handleScroll}
        className={variantClasses[variant] + " " + defaultStyle}
      >
        {text}
      </button>
    );
  }

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