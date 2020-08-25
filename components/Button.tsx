import React from "react";

function Button({
  children,
  className,
  ...rest
}: {
  children: any;
  className?: string;
  rest?: any[];
}) {
  return (
    <button
      className={
        className ??
        "px-3 py-2 font-semibold tracking-wider text-white bg-gray-800 shadow-md"
      }
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
