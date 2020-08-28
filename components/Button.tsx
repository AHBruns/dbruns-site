import React from "react";

function Button({
  children,
  className,
  alt,
  ...rest
}: {
  children: any;
  className?: string;
  alt: string;
  rest?: any[];
}) {
  return (
    <button
      className={
        className ??
        "px-3 py-2 font-semibold tracking-wider text-white bg-gray-800 shadow-md"
      }
      aria-label={alt}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
